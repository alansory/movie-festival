<template>
  <nav 
    ref="navigationRef"
    class="movie-sidebar-nav" 
    :class="{active: isActive}"  
  >
    <div class="sidebar-web-logo">
      <figure class="logo-container">
        <img src="../assets/images/web-logo.png" class="logo-img" alt="" />
        <figcaption class="logo-name">MOVIE FESTIVAL</figcaption>
      </figure>
    </div>
    <div class="sidebar-buttons">
      <div class="search-input-container">
        <form
          action="#"
          data-type-btn="form-btn"
          class="sidebar-form nav-form-btn"
        >
          <button 
            class="sidebar-search-btn nav-search-btn"
            @click="onClick"
          >
            <i class="bx bx-search-alt"></i>
          </button>
          <input 
            type="text"
            class="sidebar-search-input"
            placeholder="Search Movies ..."
            name=""
            id=""
          />
        </form>
        <h3 class="secondary-title">Search</h3>
      </div>
      <ul class="nav-lists sidebar-lists-btn">
        <li class="nav-list sidebar-expansion-btn">
          <a
            data-page="expand"
            data-type-btn="expand"
            class="nav-btn sidebar-expand-btn"
          >
            <i class="bx bx-chevrons-right"></i>
          </a>
          <h3 class="secondary-title expand-secondary">Expand</h3>
        </li>
        <li class="nav-list">
          <router-link data-page="home" class="nav-btn" :to="{ name : 'Home' }" @click="setActivePage('home')">
            <i class="bx bx-home" :class="{ active: activePage === 'home' }"></i>
            <h3 class="nav-title">Home</h3>
          </router-link>
          <h3 class="secondary-title">Home</h3>
        </li>
        <li class="nav-list">
          <router-link data-page="trending" class="nav-btn" :to="{ name : 'Trending' }" @click="setActivePage('trending')">
            <i class="bx bxs-hot" :class="{ active: activePage === 'trending' }"></i>
            <h3 class="nav-title">Trending</h3>
          </router-link>
          <h3 class="secondary-title">Trending</h3>
        </li>
        <li class="nav-list">
          <a data-page="movies-pop" class="nav-btn" @click="setActivePage('login')">
            <i class='bx bxs-user-account' :class="{ active: activePage === 'login' }"></i>
            <h3 class="nav-title">Login</h3>
          </a>
          <h3 class="secondary-title">Login</h3>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from "../store/index";
import { computed, ref } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
import { onClickOutside } from '@vueuse/core';

export default {
  name: 'Navigation',
  props: {
    msg: String
  },
  methods: {
    onClick(event) {
      event.preventDefault();
      this.isActive = !this.isActive;
    },
  },
  setup(){
    const activePage = ref(null);
    const isActive = ref(false);
    const router = useRouter();
    const navigationRef = ref(null);
    const user = computed (() => store.state.user);
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({name : "Home"});
    };
    const setActivePage = (page) => {
      activePage.value = page;
    };
    onClickOutside(navigationRef, () => {
      if (isActive.value) {
        isActive.value = false;
      }
    });
    return  { logout, user, isActive, navigationRef, activePage, setActivePage };
  }
}
</script>
