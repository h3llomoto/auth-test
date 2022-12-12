import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface User {
  id: number,
  fName: string,
  lName: string,
  birthday: string,
}

export const useUserStore = defineStore('user', () => {
  const user = ref<null | User>(null);
  const isAuth = computed<boolean>(() => !!user.value);
  const error = ref('');
  const isLoading = ref(true);

  async function loginUser(login: string, password: string) {
    try {
      const result = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.status === 200) {
        user.value = await result.json();
      } else if (result.status === 401) {
        error.value = 'The email address or password is incorrect';
      }
    } catch (e) {
      error.value = 'Error while sending request';
      console.error(e);
    }
  }

  async function getUser() {
    if (user.value) {
      const login = sessionStorage.getItem('login')

      if (login) {
        isLoading.value = false;
        return;
      }

      user.value = null;
    }

    isLoading.value = true;

    try {
      const result = await fetch('/auth', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.status === 200) {
        user.value = await result.json();
      }
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
    }
  }

  function clearError() {
    error.value = '';
  }

  return {
    user,
    isAuth,
    isLoading,
    error,
    loginUser,
    getUser,
    clearError,
  };
});
