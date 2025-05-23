<template>
  <nav class="navbar rounded-box justify-between gap-4 shadow-base-300/20 shadow-sm">
    <div class="navbar-start">
      <Sidebar />
    </div>

    <div class="navbar-center flex items-center">
      <a
        class="link text-base-content link-neutral text-xl font-bold no-underline"
        href="#"
      >
        Uptime Monitor
      </a>
    </div>

    <div class="navbar-end items-center gap-4">
      <div class="relative inline-flex">
        <button
          type="button"
          class="flex items-center"
          @click="toggleDropdown"
          aria-haspopup="menu"
          :aria-expanded="isDropdownOpen.toString()"
          aria-label="Dropdown"
        >
          <div class="avatar cursor-pointer">
            <div class="size-9.5 rounded-full">
              <img
                :src="user.picture"
                alt="avatar"
              />
            </div>
          </div>
        </button>

        <ul
          v-show="isDropdownOpen"
          class="absolute right-0 mt-2 z-50 min-w-60 rounded-box bg-base-100 shadow"
          role="menu"
          @click.outside="isDropdownOpen = false"
        >
          <li class="dropdown-header gap-2 px-4 py-2 border-b border-base-200">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  :src="user.picture"
                  alt="avatar"
                />
              </div>
            </div>
            <div>
              <h6 class="text-base-content text-base font-semibold">{{ user.name }}</h6>
              <!-- <small class="text-base-content/50">Admin</small> -->
            </div>
          </li>
          <li>
            <a class="dropdown-item px-4 py-2 hover:bg-base-200 flex gap-2" href="#">
              <span class="icon-[tabler--user]"></span>
              My Profile
            </a>
          </li>
          <li>
            <a class="dropdown-item px-4 py-2 hover:bg-base-200 flex gap-2" href="#">
              <span class="icon-[tabler--settings]"></span>
              Settings
            </a>
          </li>
          <li class="px-4 py-2 border-t border-base-200">
            <a class="btn btn-error btn-soft btn-block" href="#">
              <span class="icon-[tabler--logout]"></span>
              <Logout />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Sidebar from './Sidebar.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Logout from './Logout.vue';

const { user, isAuthenticated } = useAuth0();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

function handleClickOutside(event) {
  const dropdown = document.querySelector('[aria-haspopup="menu"]')?.parentElement;
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>
