<template>
  <div>
    <b-card title="Attributes">
      <h4 class="text-muted px-1 mb-1">Essential</h4>
      <div class="row px-1 mb-2">
        <div class="col-4">
          <b-form-group label="Concept">
            <v-select
              v-model="concept"
              :options="concepts"
            />
          </b-form-group>
        </div>
        <div class="col-4">
          <b-form-group label="Group By">
            <v-select
              v-model="group"
              :options="groups"
            />
          </b-form-group>
        </div>
        <div class="col-4">
          <b-form-group label="Chart Type">
            <v-select
              v-model="chartType"
              :options="chartTypes"
            />
          </b-form-group>
        </div>
      </div>
      <h4 class="text-muted  px-1 mb-1">Additional</h4>
      <div class="row px-1 mb-1">
        <div class="col-3">
          <v-select
            v-model="filter"
            :options="filters"
          />
          <v-select
            v-model="operation"
            :options="operations"
          />
          <b-form-input placeholder="Enter a Value"/>
        </div>
      </div>
      <div class="btn btn-primary btn-sm">Show Report</div>
      <div class="btn btn-outline-dark btn-sm ml-1">Add Filter</div>
    </b-card>
    <b-card title="Summary">
     <div class="mx-auto w-50">
        <div class="pie-text text-center">
          <h2 class="font-weight-bolder">
            640
          </h2>
          <span class="font-weight-bold">Total</span>
        </div>
        <app-echart-doughnut :series="seriesActions" />
     </div>
    </b-card>
  </div>
</template>

<script>
import AppEchartDoughnut from '@core/components/charts/echart/AppEchartDoughnut.vue'
import { BCard, BFormGroup, BFormInput } from "bootstrap-vue"
import vSelect from 'vue-select'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components:{
    BCard,
    BFormGroup,
    BFormInput,
    AppEchartDoughnut,
    vSelect,
    FeatherIcon,
  },
  data() {
    return{
      seriesActions: [  
        {
          name: 'Regions',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 320, name: 'ASIA' },
            { value: 420, name: 'CEUR' },
            { value: 220, name: 'SOA' },
            { value: 120, name: 'NOA' },
            { value: 140, name: 'Group' },
          ],
        },
      ],
      concept: 'Select a Concept',
      concepts: ['Hazards', 'Incidents', 'TIPS'],
      group: 'Select a Group',
      groups: ['Site', 'Region', 'Location'],
      chartType: 'Select a Type',
      chartTypes: ['Pie', 'Line', 'Bar', 'Column'],
      filter: 'Select a Filter',
      filters: ['Site', 'Location', 'Bar', 'Column'],
      operation: 'Select an Op',
      operations: ['=', '>', '<', '>='],
    }
  }
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>