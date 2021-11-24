<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Incident types</b-card-title>
      <b-dropdown
        text="This year"
        variant="transparent"
        class="chart-dropdown "
        right
        no-caret
        toggle-class="p-0 mb-25"
        size="sm"
      >
        <b-dropdown-item
          v-for="day in chartData.lastDays"
          :key="day"
        >
          {{ day }}
        </b-dropdown-item>
      </b-dropdown>
    </b-card-header>

    <b-card-body>

      <!-- apex chart -->
      <vue-apex-charts
        type="donut"
        height="275"
        :options="sessionsByDeviceDonut.chartOptions"
        :series="sessionsByDeviceDonut.series"
      />

    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BDropdown, BDropdownItem, BCardBody,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BCardBody,
    VueApexCharts,
  },
  data() {
    return {
      chartData: {},
      sessionsByDeviceDonut: {
        series: [58.6, 34.9, 6.5],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          labels: ['On-site', 'Off-site', 'Injury'],
          dataLabels: {
            enabled: false,
          },
          legend: { show: false },
          comparedResult: [2, -3, 8],
          stroke: { width: 0 },
          colors: [$themeColors.primary, $themeColors.warning, $themeColors.danger],
        },
      },
    }
  },
  created() {
    this.$http.get('/card/card-analytics/sessions-device').then(res => { this.chartData = res.data })
  },
}
</script>
