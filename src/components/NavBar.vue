<template>
  <nav class="navbar rounded-box shadow-base-300/20 shadow-sm">
    <div class="w-full md:flex md:items-center md:gap-2">
      <div class="flex items-center justify-between">
        <div class="navbar-start items-center justify-between max-md:w-full">
          <a
            class="link text-base-content link-neutral text-xl font-bold no-underline"
            href="#"
            >FlyonUI</a
          >
          <div class="md:hidden">
            <button
              type="button"
              class="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square"
              data-collapse="#default-navbar-collapse"
              aria-controls="default-navbar-collapse"
              aria-label="Toggle navigation"
            >
              <span
                class="icon-[tabler--menu-2] collapse-open:hidden size-4"
              ></span>
              <span
                class="icon-[tabler--x] collapse-open:block hidden size-4"
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div
        id="default-navbar-collapse"
        class="md:navbar-end collapse hidden grow basis-full overflow-hidden transition-[height] duration-300 max-md:w-full"
      >
        <ul class="menu md:menu-horizontal gap-2 p-0 text-base max-md:mt-2">
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
