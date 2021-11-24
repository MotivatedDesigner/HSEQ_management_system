<template>
  <layout-worker>

    <router-view />

  </layout-worker>
</template>

<script>
import LayoutWorker from '@core/layouts/layout-vertical/LayoutWorker.vue'

export default {
  components: {
    LayoutWorker,
  },
}
</script>
