<template>
  <div class="register-container">
    <form @submit.prevent="register" class="register-form">
      <h2>Register</h2>
      <label for="email">Email:</label>
      <input v-model="email" type="email" required />

      <label for="password">Password:</label>
      <input v-model="password" type="password" required />

      <label for="confirmPassword">Confirm Password:</label>
      <input v-model="confirmPassword" type="password" required />

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Submitting...' : 'Register' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p class="register-link">
        Already have an account? 
        <router-link to="/login">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { supabase } from "../supabase/init";
export default {
  name:"Register",
  data() {
    return {
      email: '',
      password: '',
      isLoading:false,
      confirmPassword: '',
      errorMessage:null,
      successMessage:null,
    };
  },
  methods: {
    async register() {
      try {
        this.isLoading=true;
        if (this.password !== this.confirmPassword) {
          console.error('Passwords do not match');
          return;
        }
        const { error } = await supabase.auth.signUp({
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
          this.successMessage='Register successfully!';
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register-form {
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
