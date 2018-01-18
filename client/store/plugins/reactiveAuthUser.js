module.exports = function (feathersClient) {
  return function (store) {
    feathersClient.service('users').on('patched', (user) => {
      const currentUser = store.state.auth.user;
      if (currentUser && (currentUser._id === user._id)) {
        store.dispatch('auth/populateUser', user._id);
      }
    });
  }
}
