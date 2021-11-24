<template>
  <div>
    <!-- Stats Card w/ Area Chart -->
    <b-row>
      <b-col lg="3" sm="6">
        <div class="card justify-content-end" style="min-height: 200px;">
          <svg style="margin: auto;" height="60px" aria-hidden="true" focusable="false" data-prefix="fa-thin" data-icon="address-book" class="svg-inline--fa fa-address-book fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M400 0h-320C53.49 0 32 21.49 32 48v416C32 490.5 53.49 512 80 512h320c26.51 0 48-21.49 48-48v-416C448 21.49 426.5 0 400 0zM432 464c0 17.64-14.36 32-32 32h-320c-17.64 0-32-14.36-32-32v-416c0-17.64 14.36-32 32-32h320c17.64 0 32 14.36 32 32V464zM240 256c35.35 0 64-28.65 64-64s-28.65-64-64-64c-35.34 0-64 28.65-64 64S204.7 256 240 256zM240 144C266.5 144 288 165.5 288 192s-21.53 48-48 48S192 218.5 192 192S213.5 144 240 144zM496 64h-8C483.6 64 480 67.58 480 72s3.582 8 8 8h8v64h-8C483.6 144 480 147.6 480 152S483.6 160 488 160h8C504.8 160 512 152.8 512 144v-64C512 71.16 504.8 64 496 64zM496 320h-8C483.6 320 480 323.6 480 328s3.582 8 8 8h8v64h-8c-4.418 0-8 3.582-8 8S483.6 416 488 416h8c8.836 0 16-7.164 16-16v-64C512 327.2 504.8 320 496 320zM496 192h-8C483.6 192 480 195.6 480 200s3.582 8 8 8h8v64h-8C483.6 272 480 275.6 480 280S483.6 288 488 288h8C504.8 288 512 280.8 512 272v-64C512 199.2 504.8 192 496 192zM272 288h-64C163.9 288 128 323.9 128 368v8C128 380.4 131.6 384 136 384s8-3.578 8-8V368c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v8c0 4.422 3.578 8 8 8S352 380.4 352 376V368C352 323.9 316.1 288 272 288z" fill="currentColor"/></svg>
          <div class="btn btn-dark">Contact Manager</div>
        </div>
      </b-col>
      <b-col lg="3" sm="6">
        <div class="card justify-content-end" style="min-height: 200px;">
          <svg style="margin: auto;" height="60px" color="#28c76f" aria-hidden="true" focusable="false" data-prefix="fa-thin" data-icon="book-bookmark" class="svg-inline--fa fa-book-bookmark fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 384V32c0-17.67-14.33-32-32-32H64C28.66 0 0 28.65 0 64v391.1c0 30.93 25.07 56 56 56L439.1 512C444.4 512 448 508.4 448 504c0-4.422-3.586-8.008-8.008-8.008H416v-79.99C433.7 416 448 401.7 448 384zM176 16h160v215.1l-74.94-61.31C259.6 168.6 257.8 168 256 168s-3.594 .6094-5.062 1.812L176 231.1V16zM400 495.1H56c-23.38 0-42.13-20.14-39.8-43.99c2.016-20.78 20.7-36.02 41.57-36.02L400 416V495.1zM56 399.1c-15.68 0-29.82 6.516-40 16.93V64c0-26.47 21.53-48 48-48h96v232c0 3.094 1.781 5.906 4.562 7.234c2.812 1.344 6.094 .9062 8.5-1.047L256 186.3l82.94 67.84C340.4 255.4 342.2 256 344 256c1.156 0 2.344-.25 3.438-.7656C350.2 253.9 352 251.1 352 248V16h64c8.836 0 16 7.164 16 16v352c0 8.824-7.18 15.1-16 15.1L56 399.1z" fill="currentColor"/></svg>
          <div class="btn btn-success">Policies & Procedures</div>
        </div>
      </b-col>

      <b-col lg="3" sm="6">
        <div class="card justify-content-end" style="min-height: 200px;">
          <svg style="margin: auto;" height="60px" color="#ea5455" aria-hidden="true" focusable="false" data-prefix="fa-thin" data-icon="square-exclamation" class="svg-inline--fa fa-square-exclamation fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 304c4.406 0 8-3.578 8-8v-176c0-4.422-3.594-8-8-8S216 115.6 216 120v176C216 300.4 219.6 304 224 304zM384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96C448 60.65 419.3 32 384 32zM432 416c0 26.47-21.53 48-48 48H64c-26.47 0-48-21.53-48-48V96c0-26.47 21.53-48 48-48h320c26.47 0 48 21.53 48 48V416zM224 352c-8.836 0-16 7.164-16 16S215.2 384 224 384s16-7.164 16-16S232.8 352 224 352z" fill="currentColor"/></svg>
          <div @click="$bvModal.show('modal-incident-worker')" class="btn btn-danger">Log an Incident</div>
        </div>
      </b-col>

      <b-col lg="3" sm="6">
        <div class="card justify-content-end" style="min-height: 200px;">
        <svg style="margin: auto;" height="60px" color="#ff9f43" aria-hidden="true" focusable="false" data-prefix="fa-thin" data-icon="skull-crossbones" class="svg-inline--fa fa-skull-crossbones fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M149.1 237.3L144.5 263.1C141.9 275.8 149.1 288 160.1 288h126c11.13 0 19.13-12.25 16.5-24.88l-5.502-25.88c41.76-22.38 69.1-62.75 69.1-109.3C368 57.25 303.5 0 224 0C144.5 0 79.99 57.25 79.99 127.1C79.99 174.5 108.2 214.9 149.1 237.3zM224 16c70.59 0 128 50.24 128 112c0 38.92-23.02 74.49-61.57 95.15c-6.275 3.363-9.574 10.47-8.094 17.43l5.486 25.8C288.5 269.4 287.1 271.7 287 272L161.6 272.1C160.9 271.7 159.5 269.4 160.1 266.5l5.5-25.88c1.48-6.963-1.818-14.07-8.094-17.43C118.1 202.5 95.98 166.9 95.98 128C95.98 66.24 153.4 16 224 16zM240.5 384l203.4-113c3.859-2.156 5.25-7.031 3.109-10.88c-2.172-3.906-7.031-5.25-10.89-3.125L224 374.8L11.9 257c-3.859-2.125-8.734-.8125-10.89 3.125C-1.136 263.1 .255 268.8 4.114 271L207.5 384l-203.4 113c-3.859 2.156-5.25 7.031-3.109 10.88C2.474 510.5 5.208 512 8.005 512c1.328 0 2.656-.3125 3.891-1L224 393.2l212.1 117.8C437.3 511.7 438.7 512 439.1 512c2.797 0 5.531-1.469 6.1-4.125c2.141-3.844 .7499-8.719-3.109-10.88L240.5 384zM271.1 176c17.64 0 31.1-14.36 31.1-31.1c0-17.64-14.36-32-31.1-32s-31.1 14.36-31.1 32C239.1 161.6 254.4 176 271.1 176zM271.1 128c8.812 0 15.1 7.188 15.1 16C287.1 152.8 280.8 160 271.1 160c-8.812 0-15.1-7.188-15.1-15.1C255.1 135.2 263.2 128 271.1 128zM176 176c17.64 0 31.1-14.36 31.1-31.1c0-17.64-14.36-32-31.1-32s-31.1 14.36-31.1 32C144 161.6 158.4 176 176 176zM176 128c8.812 0 15.1 7.188 15.1 16C192 152.8 184.8 160 176 160C167.2 160 160 152.8 160 144C160 135.2 167.2 128 176 128z" fill="currentColor"/></svg>          
        <div @click="$bvModal.show('modal-hazard-worker')" class="btn btn-warning">Log a Hazard</div>
        </div>
      </b-col>

    </b-row>
    <ActionsTable />

    <b-modal
      id="modal-hazard-worker"
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
      id="modal-incident-worker"
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
              v-model="category"
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
      sources :  [{name: 'Site Inspection'}, {name: 'General Observation'}, {name: 'Incident'}],
      incidentTitle: null,
      incidentDescription: null,
      incidentDateTime: null,
      category: {name: 'Select a category'},
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
          "6138a1235a5edd09f813fcb1",
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
          this.category.id,
          this.location.id,
          this.incidentDateTime,
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
      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
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