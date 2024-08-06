export default {
  setRolesList (state, list) {
    state.roles.list = list
  },
  setPermissions(state, permission) {
    state.roles = {
      ...state.roles,
      ...permission
    }
  },
  setActionRole(state, body) {
    state.roles.isNew = body.isNew
    state.roles.item = {}
  },
  setRoleSelected(state, body) {
    state.roles.item = {
      ...state.roles.item,
      ...body,
    }
    console.log("TOLE", state.roles.item)
    state.roles.isNew = false
  },
  setRoleViews(state, body) {
    const views = state.roles.item.views ? state.roles.item.views : [body]
    let viewModified = views.find(x=> x.viewId === body.viewId)
    if(viewModified)
      viewModified = body
    else views.push(body)
    state.roles.item.views = views
    console.log(state.roles.item.views, body)
  },
  onEditRole(state, body) {
    state.roles.item[body.key] = body.value
  }
}