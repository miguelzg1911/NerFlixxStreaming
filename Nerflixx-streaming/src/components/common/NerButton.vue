<template>
  <button 
    :class="['ner-button', variant, size]" 
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  type: 'button',
  disabled: false
});
</script>

<style scoped>
.ner-button {
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}

.primary { background-color: var(--nerflixx-red); color: white; }
.primary:hover:not(:disabled) { background-color: #b9090b; }

.secondary { background-color: var(--nerflixx-light-gray); color: white; }

.outline { 
  background: transparent; 
  border: 1px solid var(--nerflixx-light-gray); 
  color: var(--nerflixx-light-gray); 
}

.large { padding: 18px; font-size: 1.5rem; }
.medium { padding: 12px; font-size: 1rem; }

.ner-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>