import { createRouter, createWebHistory } from 'vue-router';
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
    component: Home
  },
  {
    props: true,
    path: '/movie/:movieId',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    props: true,
    path: '/trending',
    name: 'Trending',
    component: Trending
  },
  {
    props: (route) => ({
      searchTerm: route.query.q || '',
    }),
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    props: true,
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    props: true,
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    props: true,
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    props: true,
    path: '/admin/movie/create',
    name: 'MovieCreate',
    component: MovieForm
  },
  {
    props: true,
    path: '/admin/movie/:movieId',
    name: 'MovieUpdate',
    component: MovieForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
