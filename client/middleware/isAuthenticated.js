export default function ({ store, redirect }) {
  const isAuthenticated = !!store.state.auth.payload;
  if (!isAuthenticated) {
    redirect('/login');
  }
}
