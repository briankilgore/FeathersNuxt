import storage from '~/helpers/feathers-storage';


export default async function ({ store, redirect }) {
  console.log('check-auth');
  const accessToken = storage.getItem('feathers-jwt');
  // console.log(accessToken);
  if (accessToken && !store.state.auth.payload) {
    console.log('Authenticating...');
    await store.dispatch('auth/authenticate', { strategy: 'jwt', accessToken })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        store.dispatch('auth/logout');
      })
  } else {
    console.log('Something else happened');
  }
}
