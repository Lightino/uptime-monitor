<template>
  <div class="container mx-auto">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Login from "./components/Login.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated } = useAuth0();
</script>
