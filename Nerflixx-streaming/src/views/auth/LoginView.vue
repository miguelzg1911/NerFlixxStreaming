<template>
  <div class="login-wrapper">
    <nav class="login-nav">
      <h1 class="logo">NERFLIXX</h1>
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
          />
          <NerInput 
            v-model="password" 
            placeholder="Contraseña" 
            type="password" 
            theme="dark" 
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

    <NerFooter class="login-footer" />
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

    // Guardamos el JWT y el rol si es necesario
    localStorage.setItem('token', response.token);
    
    // Una vez logueado, vamos a la selección de perfiles
    router.push('/profiles');
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
              url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6ed3b94-94d9-4fa5-a75d-68b4ef207360/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
}

.login-nav { 
  padding: 20px 50px; 
}

.logo { 
  color: var(--nerflixx-red); 
  font-size: 2.5rem; 
  font-weight: bold; 
}

.login-body {
  flex: 1; 
  display: flex; 
  justify-content: center; 
  align-items: flex-start; 
  padding-top: 20px; 
}

.login-box {
  background: rgba(0, 0, 0, 0.75);
  padding: 60px 68px 40px;
  width: 100%;
  max-width: 450px;
  border-radius: 4px;
  color: white;
}

h2 { 
  margin-bottom: 28px; 
  font-size: 2rem; 
  font-weight: bold; 
}

.login-btn { 
  margin-top: 24px; 
  font-size: 1.1rem; 
}

.error-msg {
  background: #e87c03;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.login-help {
  display: flex;
  justify-content: space-between;
  color: #b3b3b3;
  font-size: 0.8rem;
  margin-top: 10px;
}

.remember-me { 
  display: flex; 
  align-items: center; 
  gap: 5px; 
}

.login-footer-info { 
  margin-top: 50px; 
  color: #737373; 
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
}

/* Ajuste del footer para que sea oscuro en el login */
.login-footer {
  background: rgba(0, 0, 0, 0.75) !important;
  border: none !important;
  color: #737373 !important;
}
</style>