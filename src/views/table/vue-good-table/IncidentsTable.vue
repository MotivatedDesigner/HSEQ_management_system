<template>
  <b-row>
    <b-col>
      <incidents />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import GoodTableBasic from './GoodTableBasic.vue'
import SafetyTable from './SafetyTable.vue'
import Incidents from './Incidents.vue'

export default {
  components: {
    BRow,
    BCol,
    SafetyTable,
    GoodTableBasic,
    Incidents,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
