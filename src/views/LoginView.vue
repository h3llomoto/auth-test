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
  if (!login.value || !password.value) {
    userStore.setError('Please fill empty fields');
    return;
  }

  await userStore.loginUser(login.value, password.value);
  if (userStore.isAuth) {
    router.push({ name: 'user' });
  }
}

watch(() => [login.value, password.value], () => {
  if (userStore.error) {
    userStore.setError('');
  }
});

</script>

<template>
  <main>
    <form
      class="login-form wrapper"
    >
      <div class="title">
        Authorization
      </div>
      <div class="login-form_element">
        <label
          for="login"
          class="login-form_label"
        >Username</label>
        <input
          v-model="login"
          name="login"
          class="login-form_input"
        />
      </div>
      <div class="login-form_element">
        <label
          for="login"
          class="login-form_label"
        >Password</label>
        <input
          v-model="password"
          name="password"
          type="password"
          class="login-form_input"
        />
      </div>
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

<style scoped lang="scss">
.login-form {
  &_element {
    margin: 0 auto 15px;
  }
  &_error {
    padding: 10px 0 0;
  }
}
</style>
