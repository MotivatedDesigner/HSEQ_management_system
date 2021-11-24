<template>
  <b-row>
    <b-col lg="6" md="12">
      <good-table-basic />
    </b-col>
    <b-col lg="6" md="12">
      <safety-table />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import GoodTableBasic from './GoodTableBasic.vue'
import SafetyTable from './SafetyTable.vue'

export default {
  components: {
    BRow,
    BCol,
    SafetyTable,
    GoodTableBasic,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
