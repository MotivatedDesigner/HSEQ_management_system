<template>
    <section id="home"
    :class="[skinClasses]"
    class="h-100"
    >
      <header style="padding-top: 1px;">
      <nav class="navbar navbar-expand-lg mt-4">
        <div class="container" style="margin: 0 auto;">
          <a class="navbar-brand" href="#">
            <img style="height: 50px" class="logo logo-dark" :src="require('@/assets/images/logo/logo.svg')" alt="Leland Logo"
          /></a>
          <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" style="flex-grow: 0;" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">FAQs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
              </li>
              <li class="nav-item">
                <b-button v-b-modal.modal-login class="nav-link nav-accent btn-hover-transition">Login</b-button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    
  <section id="hero">
    <div class="container d-flex align-items-center justify-content-between h-100" style="margin: 0 auto;">
      <div class="hero-intro">
        <h1 class="mb-3">SAFETY IS NO ACCIDENT</h1>
        <h5 class="mb-5">The smart safety management platform that fits your business</h5>
        <div class="d-flex">
          <a href="#" class="btn-action btn-action-secondary btn-hover-transition">WATCH VIDEO</a>
          <a href="#" class="btn-action btn-action-primary btn-hover-transition">FREE TRIAL</a>
        </div>
      </div>
      <div class="hero-image"></div>
    </div>
  </section>

    <b-modal
      id="modal-login"
      title="Login"
      ok-title="Login"
      centered
      @ok="login"
    >    
    <b-form @submit.prevent>
      <b-row>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              placeholder="Please enter your email"
              autocomplete="off"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              placeholder="Please enter your password"
              type="password"
              autocomplete="off"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
        <b-form-checkbox
        checked="true"
        v-model="selected"
        id="remember"
        value="true"
      >
        Remember me
      </b-form-checkbox>
        </b-col>
          </b-row>
        </b-form>
    </b-modal>

    </section>
</template>


<script>
// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar } from '@vueuse/core'

import store from '@/store'

import { BRow, BCol, BButton, BModal, BForm, BFormGroup, BFormInput, BFormCheckbox,
  BCardText
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BCardText,
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  beforeCreate() {
    document.body.classList.add('overflow-hidden')
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
  },
  methods:{
    login(){
      this.$router.push({name: 'dashboard-home'})
    }
  },
  data(){
    return {
      selected : 'true'
    }
  },
  setup() {
    const { skin, skinClasses } = useAppConfig()

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade',
    })

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, val => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })

    return {
      skinClasses,
    }
  },
}
</script>
