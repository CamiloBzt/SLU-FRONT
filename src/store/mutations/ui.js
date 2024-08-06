export default {
  addNotification (state, notification) {
    state.ui.notifications = [...state.ui.notifications, notification]
  },
  setLanguage (state, language) {
    state.ui.language = language
    sessionStorage.setItem('language', language)
  },
  deleteNotification (state, notification) {
    state.ui.notifications = state.ui.notifications.filter(value => value.datetime !== notification)
  },
}