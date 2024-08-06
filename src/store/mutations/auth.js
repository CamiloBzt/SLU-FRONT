import state from "../state"
import VueJwtDecode from 'vue-jwt-decode'
export default {
  LOGIN_USER(state, user) {
    state.auth.authStatus = true
    state.auth.user = { ...user }
  },

  SET_TOKEN(state, token) {
    const user = VueJwtDecode.decode(token)
    
    state.auth.user = {
      ...state.auth.user,
      id: user.id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      roleId: user.roleId,
      token
    }
  },

  setMenuActions(state, body) {
    state.ui.menu = body.menu
    // state.ui.menu = {
    //   ...state.ui.menu,
    //   ...body.menu,
    // }
  },

  setUsersList(state, users) {
    state.auth.list = users.users
  },
  setUserEdit(state, item) {
    state.auth.item = item
  },
  setUserSignature(state, signature) {
    state.auth.userSignature = signature
  },
  deleteUser(state, id) {
    let { list }= state.auth
    state.auth.list= list.filter(x=> x.id !== id)
  },
  setActivationSuccess(state) {
    state.auth.activationOk = true;
  },

  setTokenOutlook(state, token) {
    if (token !== null && token !== '') {
      state.auth.isSingingSuccesOutlook = true
    }
    state.auth.tokenOutlook = token
  },
  
  LOGOUT_USER(state) {
    state.auth.authStatus = ''
    state.auth.tokenOutlook = ''
    state.auth.isSingingSuccesOutlook = false;
    localStorage.removeItem('tokenOutlook')
    state.auth.token = '' && localStorage.removeItem('sessionToken')
  }
}