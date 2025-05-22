<template>
  <nav
    class="navbar rounded-box justify-between gap-4 shadow-base-300/20 shadow-sm"
  >
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
      <div
        class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]"
      >
        <button
          id="dropdown-scrollable"
          type="button"
          class="dropdown-toggle flex items-center"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          <div class="avatar">
            <div class="size-9.5 rounded-full">
              <img
                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                alt="avatar 1"
              />
            </div>
          </div>
        </button>
        <ul
          class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-avatar"
        >
          <li class="dropdown-header gap-2">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                  alt="avatar"
                />
              </div>
            </div>
            <div>
              <h6 class="text-base-content text-base font-semibold">
                John Doe
              </h6>
              <small class="text-base-content/50">Admin</small>
            </div>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              <span class="icon-[tabler--user]"></span>
              My Profile
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              <span class="icon-[tabler--settings]"></span>
              Settings
            </a>
          </li>
          <li class="dropdown-footer gap-2">
            <a class="btn btn-error btn-soft btn-block" href="#">
              <span class="icon-[tabler--logout]"></span>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
</script>
