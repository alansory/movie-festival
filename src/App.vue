<template>
  <Navigation />
  <router-view />
</template>

<script>
import { ref } from 'vue';
// import store from "./store/index";
import { supabase } from "./supabase/init";
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  setup(){
    // Create data / vars
    const appReady = ref(null);

    // Check to see if user is already logged in
    const user = supabase.auth.user();

    // If user does not exist, need to make app ready
    if(!user){
      appReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session) => {
      // store.methods.setUser(session);
      console.log('masuk -->', session)
      appReady.value=true;
    });

    return { appReady };
  }
}
</script>
