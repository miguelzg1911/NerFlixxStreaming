<template>
  <div class="login-wrapper">
    <nav class="login-nav">
      <h1 class="logo" @click="$router.push('/')">NERFLIXX</h1>
    </nav>

    <main class="login-body">
      <div class="login-box">
        <h2>Inicia sesión</h2>
        
        <form @submit.prevent="handleLogin">
          <NerInput 
            v-model="email" 
            placeholder="Email o número de teléfono" 
            type="email" 
            theme="dark" 
            class="input-group"
          />
          <NerInput 
            v-model="password" 
            placeholder="Contraseña" 
            type="password" 
            theme="dark" 
            class="input-group"
          />
          
          <p v-if="error" class="error-msg">{{ error }}</p>

          <NerButton type="submit" size="medium" class="login-btn">
            {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
          </NerButton>
        </form>

        <div class="login-help">
          <div class="remember-me">
            <input type="checkbox" id="remember">
            <label for="remember">Recuérdame</label>
          </div>
          <a href="#">¿Necesitas ayuda?</a>
        </div>

        <div class="login-footer-info">
          <p>¿Primera vez en Nerflixx? 
            <router-link to="/register">Suscríbete ahora</router-link>.
          </p>
          <p class="captcha-text">
            Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.
          </p>
        </div>
      </div>
    </main>

    <NerFooter class="login-footer-container" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';
import NerInput from '@/components/common/NerInput.vue';
import NerButton from '@/components/common/NerButton.vue';
import NerFooter from '@/components/common/NerFooter.vue';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await authService.login({
      email: email.value,
      password: password.value
    });

    localStorage.setItem('token', response.token);
    localStorage.setItem('userRole', response.role);

    if (response.role === 'Admin') {
      router.push('/admin');
    } else {
      router.push('/profiles');
    }
  } catch (err: any) {
    error.value = 'Contraseña incorrecta o usuario no encontrado.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b37a-b320-4f31-91d0-3b11603c2cc3/d7455850-2522-4414-b490-50d4814d2325/CO-es-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
}

.login-nav { 
  padding: 20px 50px; 
}

.logo { 
  color: #e50914; 
  font-size: 2.8rem; 
  font-weight: bold; 
  cursor: pointer;
}

.login-body {
  flex: 1; 
  display: flex; 
  justify-content: center; 
  align-items: flex-start;
  padding: 20px 0 80px;
}

.login-box {
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 68px;
  width: 100%;
  max-width: 450px;
  border-radius: 4px;
  color: white;
  box-sizing: border-box;
}

h2 { 
  margin-bottom: 28px; 
  font-size: 2rem; 
  font-weight: bold; 
}

.input-group {
  margin-bottom: 16px;
}

.login-btn { 
  margin-top: 24px; 
  width: 100%;
  font-weight: bold;
  height: 50px;
}

.error-msg {
  background: #e87c03;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  margin: 15px 0;
}

.login-help {
  display: flex;
  justify-content: space-between;
  color: #b3b3b3;
  font-size: 0.85rem;
  margin-top: 15px;
}

.remember-me { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
}

.login-footer-info { 
  margin-top: 60px; 
  color: #737373; 
  font-size: 1rem;
}

.login-footer-info a { 
  color: white; 
  text-decoration: none; 
}

.login-footer-info a:hover { 
  text-decoration: underline; 
}

.captcha-text { 
  font-size: 0.8rem; 
  margin-top: 15px;
  line-height: 1.3;
}

.login-footer-container {
  background: rgba(0, 0, 0, 0.75) !important;
  color: #737373 !important;
  padding: 30px 0
};
</style>
