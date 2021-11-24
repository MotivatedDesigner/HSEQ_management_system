<template>
  <div>
    <!-- Stats Card w/ Area Chart -->
    <b-row>
      <b-col lg="3" sm="6">
        <statistic-card-with-area-chart
          v-if="subscribersGained.analyticsData"
          color="dark"
          actionTitle="Manage actions"
          :statistic="kFormatter(subscribersGained.analyticsData.subscribers)"
          statistic-title="Overdue actions this year"
          :chart-data="subscribersGained.series"
        />
      </b-col>

      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="quarterlySales.analyticsData"
          actionTitle="Log a hazard"
          color="warning"
          :statistic="kFormatter(quarterlySales.analyticsData.sales)"
          statistic-title="Hazards this year"
          :chart-data="quarterlySales.series"
          modal="modal-hazard"
        />
      </b-col>

      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="ordersRecevied.analyticsData"
          actionTitle="Log an incident"
          color="danger"
          :statistic="kFormatter(ordersRecevied.analyticsData.orders)"
          statistic-title="Incidents this year"
          :chart-data="ordersRecevied.series"
          modal="modal-incident"
        />
      </b-col>

            <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="revenueGenerated.analyticsData"
          actionTitle="Manage inspections"
          color="success"
          :statistic="kFormatter(revenueGenerated.analyticsData.revenue)"
          statistic-title="Inspections this year"
          :chart-data="revenueGenerated.series"
        />
      </b-col>
    </b-row>
    <ActionsTable />
    <b-button
        v-b-modal.modal-incident class="w-100">Incidents</b-button>
    <IncidentsTable />
    <b-row>
      <b-col lg="6" sm="12">
        <CardAnalyticSaleLineChart />
      </b-col>
      <b-col lg="6" sm="12">
        <CardAnalyticSessionsByDevice />
      </b-col>
    </b-row>
    <b-button v-b-modal.modal-hazard class="w-100">Hazards</b-button>
        <HazardsTable />
    <b-row>
      <b-col lg="6" sm="12">
        <CardAnalyticSaleLineChart2 />
      </b-col>
      <b-col lg="6" sm="12">
        <CardAnalyticSessionsByDevice2 />
      </b-col>
    </b-row>

    <b-modal
      id="modal-hazard"
      title="Log a Hazard"
      ok-title="Log"
      centered
      @ok="hazardLogHandler"
    >    
    <b-form @submit.prevent>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Hazard title"
            label-for="hazard-title"
            label-cols-md="4"
          >
            <b-form-input
              id="hazard-title"
              placeholder="ie: Cut in Electric Wire "
              autocomplete="off"
              v-model="hazardTitle"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Hazard description"
            label-for="hazard-description"
            label-cols-md="4"
          >
            <b-form-textarea
              id="hazard-description"
              placeholder="Includs who, what & where"
              rows="1"
              autocomplete="off"
              v-model="hazardDescription"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Date & Time"
            label-for="date-time-hazard"
            label-cols-md="4"
          >
            <flat-pickr
              class="form-control"
              placeholder="Date & Time of the Hazard"
              autocomplete="off"
              v-model="hazardDateTime"
              :config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Hazard Source"
            label-for="hazard-Source"
            label-cols-md="4"
            >
            <v-select
              id="hazard-Source"
              label="name"
              v-model="source"
              :options="sources"
            >
              <template #option="{ name }">
                <span> {{ name }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
          <b-col cols="12">
          <b-form-group
            label="Hazard location"
            label-for="hazard-location"
            label-cols-md="4"
            >
            <v-select
              id="hazard-location"
              label="name"
              v-model="location"
              :options="locations"
            >
              <template #option="{ name }">
                <span> {{ name }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
          </b-row>
        </b-form>
    </b-modal>

    <b-modal
      id="modal-incident"
      title="Log an incident"
      ok-title="Log"
      centered
      @ok="incidentLogHandler"
    >    
    <b-form @submit.prevent>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Incident title"
            label-for="incident-title"
            label-cols-md="4"
          >
            <b-form-input
              id="incident-title"
              placeholder="ie: slipped in kitchen"
              autocomplete="off"
              v-model="incidentTitle"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Incident description"
            label-for="incident-description"
            label-cols-md="4"
          >
            <b-form-textarea
              id="incident-description"
              placeholder="Includs who, what & where"
              rows="1"
              autocomplete="off"
              v-model="incidentDescription"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Date & Time"
            label-for="date-time"
            label-cols-md="4"
          >
            <flat-pickr
              class="form-control"
              placeholder="Date & Time of the incident"
              autocomplete="off"
              v-model="incidentDateTime"
              :config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
            />
          </b-form-group>
        </b-col>
          <b-col cols="12">
          <b-form-group
            label="Incident category"
            label-for="incident-category"
            label-cols-md="4"
            >
            <v-select
              id="incident-category"
              label="name"
              v-model="incidentCategory"
              :options="categories"
            >
              <template #option="{ name }">
                <span> {{ name }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
          <b-col cols="12">
          <b-form-group
            label="Incident location"
            label-for="incident-location"
            label-cols-md="4"
            >
            <v-select
              id="incident-location"
              label="name"
              v-model="location"
              :options="locations"
            >
              <template #option="{ name }">
                <span> {{ name }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
        <b-col cols="12">
        <b-form-group
            label="Employee involved"
            label-for="incident-Employee"
            label-cols-md="4"
            >
          <vue-autosuggest
            :suggestions="filteredOptions"
            :render-suggestion="renderSuggestion"
            :get-suggestion-value="getSuggestionValue"
            :limit="10"
            se
            :input-props="{id:'autosuggest__input',class:'form-control', placeholder:'Employee name'}"
            @input="onInputChange"
          >
            <template slot-scope="{suggestion}">
              <span style="border: 1px solid red;" class="my-suggestion-item">{{ suggestion.item.name }}</span>
            </template>
          </vue-autosuggest>
        </b-form-group>
        </b-col>
          </b-row>
        </b-form>
    </b-modal>
  </div>

</template>

<script>
import { BRow, BCol, BButton, BModal, BForm, BFormGroup, BFormInput, BFormCheckbox,
  BFormTextarea, BAvatar, BCardText
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { VueAutosuggest } from 'vue-autosuggest'
import ActionsTable from "../table/vue-good-table/ActionsTable.vue"
import IncidentsTable from "../table/vue-good-table/IncidentsTable.vue"
import HazardsTable from "../table/vue-good-table/HazardsTable.vue"
import CardAnalyticSaleLineChart from "../card/card-analytic/CardAnalyticSaleLineChart.vue"
import CardAnalyticSaleLineChart2 from "../card/card-analytic/CardAnalyticSaleLineChart2.vue"
import CardAnalyticSessionsByDevice from "../card/card-analytic/CardAnalyticSessionsByDevice.vue"
import CardAnalyticSessionsByDevice2 from "../card/card-analytic/CardAnalyticSessionsByDevice2.vue"
import StatisticCardWithAreaChart from "../card/card-analytic/StatisticCardWithAreaChart.vue"
import { kFormatter } from '@core/utils/filter'
import flatPickr from "vue-flatpickr-component"
import { postHazard, postIncident, loggingData, url } from "@core/query"
import axios from "axios"
import faker from "faker"
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
    BFormTextarea,
    BAvatar, 
    BCardText,
    VueAutosuggest,
    flatPickr,
    vSelect,
    HazardsTable,
    IncidentsTable,
    ActionsTable,
    StatisticCardWithAreaChart,
    CardAnalyticSessionsByDevice2,
    CardAnalyticSessionsByDevice,
    CardAnalyticSaleLineChart2,
    CardAnalyticSaleLineChart,
  },
  data() {
    return {
      // Area charts
      subscribersGained: {},
      revenueGenerated: {},
      quarterlySales: {},
      ordersRecevied: {},
      hazardTitle: null,
      hazardDescription: null,
      hazardDateTime: null,
      source : {name: 'Select a Source'},
      sources: [],
      incidentTitle: null,
      incidentDescription: null,
      incidentDateTime: null,
      incidentCategory: {name: 'Select a category'},
      categories: [],
      location: {name: 'Select a location'},
      locations: [],
      employee: null,
      employees: [],
      filteredOptions: [],
      limit: 10,
    }
  },
  created() {
    // Subscribers gained
      axios
      .get(url, {params: {query: loggingData}} )
      .then(res => {
        this.locations = res.data.data.locations
        this.categories = res.data.data.categories
        this.sources = res.data.data.sources
        this.employees = res.data.data.employees
      })

    this.$http.get('/card/card-statistics/actions')
      .then(response => { this.subscribersGained = response.data })

    // Revenue Generated
    this.$http.get('/card/card-statistics/inspections')
      .then(response => { this.revenueGenerated = response.data })

    // Sales
    this.$http.get('/card/card-statistics/hazards')
      .then(response => { this.quarterlySales = response.data })

    // Orders
    this.$http.get('/card/card-statistics/incidents')
      .then(response => { this.ordersRecevied = response.data })

    // Site Traffic gained
    this.$http.get('/card/card-statistics/site-traffic')
      .then(response => { this.siteTraffic = response.data })

    // Active Users
    this.$http.get('/card/card-statistics/active-users')
      .then(response => { this.activeUsers = response.data })

    // Newsletter
    this.$http.get('/card/card-statistics/newsletter')
      .then(response => { this.newsletter = response.data })
  },
  methods: {
    kFormatter,
    getSuggestionValue(suggestion) {
      this.employee = suggestion.item.id;
      return suggestion.item.name
    },
    hazardLogHandler() {
      axios
      .post(url, {query: postHazard(
          this.hazardTitle,
          this.hazardDescription,
          this.location.id,
          this.hazardDateTime,
          "6138a1165a5edd09f813fcb0",
          this.source.id
        )})
      .then(res => {
        console.log(res)
      })
    },
    incidentLogHandler() {
      axios
      .post(url, {query: postIncident(
          this.incidentTitle,
          this.incidentDescription,
          this.incidentDateTime,
          this.incidentCategory.id,
          this.location.id,
          this.employee
        )})
      .then(res => {
        console.log(res)
      })
    },
onInputChange(text) {
      if (text === '' || text === undefined) {
        return
      }

      this.filteredOptions = [{
        data: this.employees.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit),
      }]
    },
    renderSuggestion(suggestion) {
    const dev = suggestion.item
    return (
      <div class="d-flex align-items-center">
        <b-avatar src={faker.image.avatar()} class="mr-50"></b-avatar>
        <div class="detail">
          <b-card-text class="mb-0">{dev.name}</b-card-text>
        </div>
      </div>
    )
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-autosuggest.scss';
</style>
