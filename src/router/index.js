import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Trending from '../views/Trending.vue';
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
