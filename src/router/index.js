import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from "../supabase/init";
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Trending from '../views/Trending.vue';
import Dashboard from '../views/Dashboard.vue';
import MovieForm from '../views/MovieForm.vue';
import MovieDetail from '../components/movies/MovieDetail.vue';
const routes = [
  {
    props: true,
    path: '/',
    name: 'Home',
    meta:{
      title:"Home",
      auth:false
    },
    component: Home
  },
  {
    props: true,
    path: '/movie/:movieId',
    name: 'MovieDetail',
    meta:{
      title:"Movie Detail",
      auth:false
    },
    component: MovieDetail
  },
  {
    props: true,
    path: '/trending',
    name: 'Trending',
    meta:{
      title:"Trending",
      auth:false
    },
    component: Trending
  },
  {
    props: (route) => ({
      searchTerm: route.query.q || '',
    }),
    path: '/search',
    name: 'Search',
    meta:{
      title:"Search",
      auth:false
    },
    component: Search
  },
  {
    props: true,
    path: '/login',
    name: 'Login',
    meta:{
      title:"Login",
      auth:false
    },
    component: Login
  },
  {
    props: true,
    path: '/register',
    name: 'Register',
    meta:{
      title:"Register",
      auth:false
    },
    component: Register
  },
  {
    props: true,
    path: '/dashboard',
    name: 'Dashboard',
    meta:{
      title:"Dashboard",
      auth:true
    },
    component: Dashboard
  },
  {
    props: true,
    path: '/admin/movie/create',
    name: 'MovieCreate',
    meta:{
      title:"Movie Create",
      auth:true
    },
    component: MovieForm
  },
  {
    props: true,
    path: '/admin/movie/:movieId',
    name: 'MovieUpdate',
    meta:{
      title:"Movie Update",
      auth:true
    },
    component: MovieForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;
