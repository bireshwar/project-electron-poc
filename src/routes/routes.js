import store from '../store';

const guard = async (to, from, next) => {
  if (store.state.user.authenticated) {
    next();
  } else {
    next('/login');
  }
};

const routes = [{
  path: "/",
  name: "login",
  component: () => import('@/pages/Login.vue'),
  meta: {
    requiresGuest: true
  }
}, {
  path: "/dashboard",
  name: "Dashboard",
  component: () => import('@/pages/Dashboard.vue'),
  meta: {
    requiresAuth: true
  }
}, {
  path: "/new-snippet",
  name: "New Snippet",
  component: () => import('@/pages/NewSnippet.vue'),
  meta: {
    requiresAuth: true
  }
}, {
  path: "/existing-snippet",
  name: "Existing Snippets",
  component: () => import('@/pages/ExistingSnippet.vue'),
  meta: {
    requiresAuth: true
  }
}];

export default routes;
