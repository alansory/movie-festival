<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <label for="email">Email:</label>
      <input v-model="email" type="email" required />

      <label for="password">Password:</label>
      <input v-model="password" type="password" required />

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Submitting...' : 'Login' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p class="register-link">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { supabase } from "../supabase/init";
export default {
  name:"Login",
  data() {
    return {
      email: '',
      password: '',
      isLoading:false,
      errorMessage:null,
      successMessage:null,
    };
  },
  methods: {
    async login() {
      try {
        this.isLoading=true;
        const { error, session } = await supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });
        if (error) {
          this.isLoading=false;
          this.errorMessage=error.message;
          this.successMessage=null;
        } else {
          this.isLoading=false;
          this.errorMessage=null;
          this.successMessage='Login successfully!';
          await localStorage.setItem('supabaseToken', session.access_token);
          this.$router.push({ name: "Dashboard" });
        }
      } catch (error) {
        this.isLoading=false;
        this.errorMessage=error.message;
        this.successMessage=null;
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
  width: 100px;
  margin-top: 10px;
}

button:hover {
  background-color: #fff;
  color: #43bb9f;
  border: 2px solid #43bb9f;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.register-link a {
  color: #43bb9f;
  text-decoration: underline;
}

.register-link a:hover {
  color: #2d8770;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
}

.success-message {
  color: #43bb9f;
  margin-top: 10px;
}
</style>
