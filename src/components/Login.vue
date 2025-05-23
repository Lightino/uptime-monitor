<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white px-6">
    <div class="bg-base-100 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6">
        
      <div class="text-5xl text-primary">
        <span class="icon-[tabler--lock]"></span>
      </div>

      <h1 class="text-2xl font-bold">Login to Dashboard</h1>
      <p class="text-sm text-base-content/60">Use your account to continue</p>

      <button
        @click="login"
        class="btn btn-primary w-full text-white font-semibold tracking-wide"
      >
        <span class="icon-[tabler--login] mr-2 size-5"></span>
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const { loginWithRedirect } = useAuth0();

    return {
      login: () => loginWithRedirect(),
    };
  },
};
</script>
