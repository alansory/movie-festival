<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <label for="email">Email:</label>
      <input v-model="email" type="email" required />

      <label for="password">Password:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { supabase } from "../supabase/init";
// import { useRouter } from "vue-router";

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const { user, error, session } = await supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });

        if (error) {
          console.error('Login error:', error.message);
        } else {
          console.log('Logged in user:', user);
          await localStorage.setItem('supabaseToken', session.access_token);
          // const router = useRouter();
          // router.push({name : "Dashboard"});
          // this.$router.push({ name: "Dashboard" });
          this.$router.push({ name: "Dashboard" });
          // Redirect or perform actions upon successful login
        }
      } catch (error) {
        console.error('Login error:', error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-form {
  width: 620px;
  padding: 45px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 12px;
  background-color: #43bb9f;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 80px; /* Set the desired width for the button */
  margin-top: 10px;
}

button:hover {
  background-color: #fff;
  color: #43bb9f;
  border: 2px solid #43bb9f;
}
</style>
