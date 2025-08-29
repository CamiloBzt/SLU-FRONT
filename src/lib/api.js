import Vue from "vue";
import VueApollo from "vue-apollo";
import { createApolloClient, restartWebsockets } from "vue-cli-plugin-apollo/graphql-client";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo);

const AUTH_TOKEN = "sessionToken";

// Http endpoint
const httpEndpoint = process.env.VUE_APP_API_URL || "http://localhost:5000";

// Cache con configuración opcional para mejorar normalización
const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       myList: {
  //         merge(existing = [], incoming) {
  //           return incoming;
  //         },
  //       },
  //     },
  //   },
  // },
});

const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  httpLinkOptions: {
    credentials: "include",
  },
  cache,
  getAuth: () => localStorage.getItem(AUTH_TOKEN),
};

// Crear cliente Apollo
export const { apolloClient } = createApolloClient({
  ...defaultOptions,
});

export function createProvider(options = {}) {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: "cache-first",
        errorPolicy: "all",
      },
    },
    errorHandler(error) {
      console.log("%cGraphQL Error", "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;", error.message);
    },
  });

  return apolloProvider;
}

// LOGIN: guardar token y limpiar cache
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  Vue.nextTick(() => {
    setTimeout(async () => {
      try {
        if (!apolloClient.queryManager || !apolloClient.queryManager.queries.size) {
          // no hay consultas en vuelo, puedes hacer resetStore sin problemas
          await apolloClient.resetStore();
        }
      } catch (error) {
        console.error("Error al resetear el store:", error.message);
      }
    }, 1000);
  });
}

// LOGOUT: eliminar token y limpiar cache
export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.clearStore();
  } catch (e) {
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
