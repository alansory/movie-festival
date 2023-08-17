<template>
  <Navigation />
  <router-view />
</template>

<script>
import store from "./store/index";
import { supabase } from "./supabase/init";
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  setup(){
    supabase.auth.onAuthStateChange((_, session) => {
      store.commit('setUser', session);
    });
  }
}
</script>
