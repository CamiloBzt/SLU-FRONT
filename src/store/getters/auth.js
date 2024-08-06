export default {
  /* (state) destructured */
  isAuthenticated(state) {
    return !!state.auth.user.token
  },
  authStatus: ({ auth: { authStatus } }) => authStatus,
  user: ({ auth: { user } }) => user,
  userSignature: ({ auth: { userSignature } }) => userSignature
}