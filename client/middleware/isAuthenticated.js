export default function ({ store, redirect }) {
  if (!store.state.auth.payload) {
    redirect('/login');
  }
}
