<template>
  <div class="page-wrapper">
      <NerNavbar minimal>
        <template #right>
          <button @click="logoutTemp" class="logout-link">Cerrar sesión</button>
        </template>
      </NerNavbar>

    <main class="plans-body">
      <div class="plans-content">
        <span class="step-indicator">PASO <b>2</b> DE <b>3</b></span>
        <h2>Selecciona el plan ideal para ti</h2>
        
        <div class="benefits-list">
          <p>✔️ Ve todo lo que quieras. Sin anuncios.</p>
          <p>✔️ Recomendaciones exclusivas para ti.</p>
          <p>✔️ Cambia o cancela tu plan cuando quieras.</p>
        </div>

        <div class="plans-grid">
          <div 
            v-for="plan in plans" 
            :key="plan.id" 
            class="plan-card"
            :class="{ active: selectedPlanId === plan.id }"
            @click="selectedPlanId = plan.id"
          >
            <div class="plan-header">
              {{ plan.name }}
              <div v-if="selectedPlanId === plan.id" class="check-badge">✓</div>
            </div>
            <div class="plan-info">
              <div class="info-row">
                <span>Precio mensual</span>
                <span>${{ plan.price.toLocaleString() }}</span>
              </div>
              <div class="info-row">
                <span>Calidad de video</span>
                <span>{{ plan.name === 'Premium' ? 'Óptima' : 'Buena' }}</span>
              </div>
              <div class="info-row">
                <span>Resolución</span>
                <span>{{ plan.name === 'Premium' ? '4K + HDR' : '1080p' }}</span>
              </div>
              <div class="info-row">
                <span>Resolucion Maxima</span>
                <span>{{ plan.maxResolution }} Resoluciones</span>
              </div>
            </div>
          </div>
        </div>

        <div class="button-container">
          <NerButton 
            size="large" 
            :disabled="!selectedPlanId"
            @click="confirmPlan"
          >
            Siguiente
          </NerButton>
        </div>
      </div>
    </main>

    <NerFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';
import type { Plan, RegisterRequest } from '@/types/types';
import NerNavbar from '@/components/common/NerNavbar.vue';
import NerButton from '@/components/common/NerButton.vue';
import NerFooter from '@/components/common/NerFooter.vue';

const router = useRouter();
const plans = ref<Plan[]>([]);
const selectedPlanId = ref<string | null>(null);

onMounted(async () => {
  try {
    plans.value = await authService.getPlans();
  } catch (error) {
    console.error("Error cargando planes:", error);
  }
});

const logoutTemp = () => {
  sessionStorage.clear();
  router.push('/register');
};

const confirmPlan = async () => {
  if (!selectedPlanId.value) return;

  const email = sessionStorage.getItem('temp_email') || '';
  const password = sessionStorage.getItem('temp_password') || '';

  const registerData: RegisterRequest = {
    username: email,
    email: email,
    password: password,
    planId: selectedPlanId.value
  };

  try {
    await authService.register(registerData);
    sessionStorage.clear();
    alert("¡Cuenta creada con éxito! Por favor inicia sesión.");
    router.push('/login');
  } catch (error) {
    console.error("Error en registro final:", error);
    alert("Hubo un problema al crear tu cuenta.");
  }
};
</script>

<style scoped>
.page-wrapper { 
  background: white; 
  min-height: 100vh; 
  display: flex; 
  flex-direction: column; 
}

.plans-body { 
  flex: 1; 
  display: flex; 
  justify-content: center; 
  padding: 40px 20px; 
}

.plans-content { 
  max-width: 1000px; 
  width: 100%; 
  text-align: center; 
}

.step-indicator { 
  font-size: 0.8rem; 
  color: #333; 
}

h2 { 
  font-size: 2rem; 
  font-weight: bold; 
  margin: 10px 0 20px; 
  color: #333; 
}

.benefits-list { 
  text-align: left; 
  max-width: 600px; 
  margin: 0 auto 30px; 
  color: #333; 
}

.plans-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.plan-card {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.6;
  max-width: 250px;
}

.plan-card.active {
  opacity: 1;
  border-color: var(--nerflixx-red);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-5px);
}

.plan-header {
  background: var(--nerflixx-light-gray);
  color: white;
  padding: 25px;
  font-weight: bold;
  font-size: 1.2rem;
  position: relative;
}

.active .plan-header { 
  background: var(--nerflixx-red); 
}

.check-badge {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--nerflixx-red);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.plan-info { 
  padding: 20px; 
  color: #737373; 
  font-size: 0.9rem; 
}

.info-row {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-row span:first-child { 
  font-size: 0.8rem; 
}

.info-row span:last-child { 
  font-weight: bold; 
  color: #333; 
  margin-top: 4px; 
}

.button-container { 
  display: flex; 
  justify-content: center; 
}

.logout-link { 
  background: none; 
  border: none; 
  font-weight: bold; 
  cursor: pointer; 
  color: #333; 
  font-size: 1.1rem; 
}

.logout-link:hover { 
  text-decoration: underline; 
}

</style>