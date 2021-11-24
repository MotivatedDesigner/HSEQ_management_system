<template>
  <b-row>
    <b-col>
      <hazards />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import GoodTableBasic from './GoodTableBasic.vue'
import SafetyTable from './SafetyTable.vue'
import Hazards from './Hazards.vue'

export default {
  components: {
    BRow,
    BCol,
    SafetyTable,
    GoodTableBasic,
    Hazards,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
