<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <locale /> -->
      <dark-Toggler class="d-none d-lg-block" />
      <notification-dropdown />
      <user-dropdown-worker />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav,
} from 'bootstrap-vue'
// import Locale from './components/Locale.vue'
import DarkToggler from './components/DarkToggler.vue'
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdownWorker from './components/UserDropdownWorker.vue'

export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    DarkToggler,
    NotificationDropdown,
    UserDropdownWorker,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
