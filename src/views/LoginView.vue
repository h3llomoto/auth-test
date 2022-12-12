<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const login = ref('');
const password = ref('');

async function handleLogin(e: MouseEvent) {
  e.preventDefault();

  await userStore.loginUser(login.value, password.value);
  if (userStore.isAuth) {
    router.push({ name: 'user' });
  }
}

watch(() => [login.value, password.value], () => {
  if (userStore.error) {
    userStore.clearError();
  }
});

</script>

<template>
  <main>
    <form
      class="login-form"
    >
      <input
        v-model="login"
        name="login"
        class="login-form_input"
      />
      <input
        v-model="password"
        name="password"
        class="login-form_input"
      />
      <button
        class="login-form_button"
        @click="handleLogin"
      >
        Log in
      </button>
      <div
        v-if="userStore.error"
        class="login-form_error"
      >
        {{ userStore.error }}
      </div>
    </form>
  </main>
</template>
