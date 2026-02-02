<template>
  <div class="page-wrapper">
    <NerNavbar>
      <template #right>
        <router-link to="/login" class="login-link">Iniciar sesión</router-link>
      </template>
    </NerNavbar>

    <main class="reg-body">
      <div class="reg-container">
        <span class="step-indicator">PASO <b>1</b> DE <b>3</b></span>
        <h2>Crea una contraseña para comenzar tu membresía</h2>
        <p>¡Faltan pocos pasos para terminar!<br>También odiamos el papeleo.</p>

        <form @submit.prevent="handleNext">
          <NerInput 
            v-model="email" 
            placeholder="Email" 
            type="email" 
            theme="light" 
          />
          <NerInput 
            v-model="password" 
            placeholder="Añadir una contraseña" 
            type="password" 
            theme="light" 
          />
          <NerButton type="submit" size="large">Siguiente</NerButton>
        </form>
      </div>
    </main>

    <NerFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NerNavbar from '@/components/common/NerNavbar.vue';
import NerInput from '@/components/common/NerInput.vue';
import NerButton from '@/components/common/NerButton.vue';
import NerFooter from '@/components/common/NerFooter.vue';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleNext = () => {
  sessionStorage.setItem('temp_email', email.value);
  sessionStorage.setItem('temp_password', password.value);
  router.push('/plans');
};
</script>

<style scoped>
.page-wrapper {
  background: white; 
  min-height: 100vh; 
  display: flex; 
  flex-direction: column; 
}

.reg-body { 
  flex: 1; 
  display: flex; 
  justify-content: center; 
  padding: 60px 20px; 
}

.reg-container { 
  max-width: 440px; 
  width: 100%; 
}

.step-indicator { 
  font-size: 0.8rem; 
  display: block; 
  margin-bottom: 10px; 
}

h2 { 
  font-size: 2rem; 
  font-weight: bold; 
  margin-bottom: 15px; 
  color: #333; 
}

p { 
  font-size: 1.1rem; 
  margin-bottom: 20px; 
  color: #333; 
}

.login-link { 
  color: #333; 
  font-weight: bold; 
  text-decoration: none; 
  font-size: 1.1rem; 
}

.login-link:hover { 
  text-decoration: underline; 
}
</style>