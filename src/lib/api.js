import Vue from "vue";
import VueApollo from "vue-apollo";
import { setContext } from "apollo-link-context";
import { createApolloClient, restartWebsockets } from "vue-cli-plugin-apollo/graphql-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo);

const AUTH_TOKEN = "sessionToken";

// Http endpoint
const httpEndpoint = process.env.VUE_APP_API_URL || "http://localhost:5000";

// Auth link: incluye el token en cada request
const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token || "",
    },
  };
});

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

// Link HTTP con soporte para uploads multipart
const uploadLink = createUploadLink({
  uri: httpEndpoint,
  credentials: "include",
});

const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  // Encadenar authLink -> uploadLink para soportar cabeceras + Upload scalar
  link: authLink.concat(uploadLink),
  cache,
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

/*import Vue from "vue";
import VueApollo from "vue-apollo";
import { setContext } from "apollo-link-context";
import { createApolloClient, restartWebsockets } from "vue-cli-plugin-apollo/graphql-client";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo);
const AUTH_TOKEN = "sessionToken";

const httpEndpoint = process.env.VUE_APP_API_URL || "http://localhost:5001";

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token || "",
    },
  };
});

const cache = new InMemoryCache();

const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  link: authLink,
  cache,
};

export const { apolloClient, wsClient } = createApolloClient({
  ...defaultOptions,
});
apolloClient.wsClient = wsClient;

export function createProvider(options = {}) {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
      },
    },
    errorHandler(error) {
      console.log("%cError", "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;", error.message);
    },
  });

  return apolloProvider;
}

export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
  } catch (e) {
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
  } catch (e) {
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}*/
