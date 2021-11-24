<template>
<div>
  <div @click="$bvModal.show('modal-TIPS')" class="btn btn-primary mb-2">
    Make a TIPS
  </div>
    <b-card title="TIPS logs">
  
      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        @on-row-click="onRowClick"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
      >
       <template
          slot="table-row"
          slot-scope="props"
        >
          <!-- Column: Name -->
          <span
            v-if="props.column.field == 'IAD' || props.column.field == 'DAD'"
            class="text-nowrap"
          >
              <span class="text-nowrap">{{  props.formattedRow[props.column.field] }}</span>
          </span>
          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
            
          </span>
        </template>
        <!-- pagination -->
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap ">
                Showing 1 to
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['3','5','10']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> of {{ props.total }} entries </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
    
      <b-modal
        id="modal-TIPS"
        :title="'TIPS _ ' + modalTitle"
        :ok-title="okTitle"
        no-close-on-esc
        v-b-modal.modal-xl
        centered
      >    
        <b-row>
          <b-col cols="6">
            <b-card class="mb-0">
              <b-form-group
                label="Region"
                class="mb-3"
              >
                <v-select
                  v-model="region"
                  :options="regions"
                >
                </v-select>
              </b-form-group>
              <b-form-group
                label="Site"
                class="mb-3"
              >
                <v-select
                  v-model="site"
                  :options="sites"
                >
                </v-select>
              </b-form-group>
              <b-form-group
                label="Emplacement"
                style="margin-bottom: 4.25rem !important;"
              >
                <v-select
                  v-model="emplacement"
                  :options="emplacements"
                >
                </v-select>
              </b-form-group>
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card class="mb-0">
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    label="Numéro ZAP"
                    class="mb-2"
                  >
                    <b-form-input type="number" placeholder="ZAP Number"/>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    label="Numéro GAP"
                    class="mb-2"
                  >
                    <b-form-input type="number" placeholder="GAP Number"/>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group
                label="Nom du Poste"
                class="mb-2"
              >
                <b-form-input placeholder="Post Name"/>
              </b-form-group>
              <b-form-group
                label="Nome de L’observateur "
                class="mb-2"
              >
                <b-form-input placeholder="Observer Name"/>
              </b-form-group>
              <b-form-group
                label="Nom des Employés"
              >
                <b-form-tags
                  v-model="employees"
                  placeholder=""
                  class="mb-2"
                />
              </b-form-group>
            </b-card>
          </b-col>
        </b-row>
      </b-modal>
    </b-card>
    <b-card title="TIPS">
    <div class="d-flex justify-content-between flex-wrap">
      <div class="mb-2 mb-sm-0">
        <span class="text-muted">Trèves Injury Prevention System</span>
      </div>
      <div class="d-flex align-content-center mb-2 mb-sm-0">
        <h1 class="font-weight-bolder ">
          5.3K
        </h1>
        <div class="pt-25 ml-75">
          <b-badge variant="light-secondary">
            <feather-icon
              icon="ArrowUpIcon"
              size="12"
              class="text-success align-middle"
            />
            <span class="font-weight-bolder align-middle"> 24%</span>
          </b-badge>
        </div>
      </div>
    </div>
    <!-- echart -->
    <app-echart-line :option-data="optionTIPS" />
  </b-card>
    <b-row>
      <b-col cols="6">
        <b-card title="Immediate vs Differed Actions per Month">
          <app-echart-bar
            :option-data="actionOptions"
          />
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card title="Safe vs UnSafe Acts/Conditions per Month">
          <app-echart-bar
            :option-data="actOptions"
          />
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card title="Immediate vs Differe Actions per Year">
          <div class="pie-text text-center">
            <h2 class="font-weight-bolder">
              640
            </h2>
            <span class="font-weight-bold">Total</span>
          </div>
          <app-echart-doughnut :series="seriesActions" />
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card title="Safe vs Unsafe Acts/Conditions per Year">
          <div class="pie-text text-center">
            <h2 class="font-weight-bolder">
              740
            </h2>
            <span class="font-weight-bold">Total</span>
          </div>
          <app-echart-doughnut :series="seriesActs" />
        </b-card>
      </b-col>
    </b-row>
</div>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
  BCard, BModal, BCol, BRow, BTabs, BTab, BCollapse, VBToggle, BCardText, BFormTextarea,BFormTags
} from 'bootstrap-vue'
import { VueAutosuggest } from 'vue-autosuggest'
import { VueGoodTable } from 'vue-good-table'
import { employeesQuery, url } from "@core/query"
import axios from 'axios'
import flatPickr from "vue-flatpickr-component"
import vSelect from 'vue-select'
import AppEchartBar from '@core/components/charts/echart/AppEchartBar.vue'
import AppEchartLine from '@core/components/charts/echart/AppEchartLine.vue'
import AppEchartDoughnut from '@core/components/charts/echart/AppEchartDoughnut.vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  directives: {
  'b-toggle': VBToggle
},
  components: { 
    BFormTags,
    AppEchartLine,
    AppEchartDoughnut,
    AppEchartBar,
    flatPickr,
    BCard,
    BFormTextarea,
    VueGoodTable,
    BAvatar,
    BCardText,
    BModal, 
    BCollapse,
    BCol, 
    BRow,
    BBadge,
    BTabs, 
    BTab,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    vSelect,
    VueAutosuggest,
    FeatherIcon,
  },
  data() {
    return {
      employees: ['Hatim Doe','Youssef Due'],
      okTitle:'Next',
      modalTitle:'General Info',
      regions: ['ASIA', 'CEUR', 'NOA', 'SOA', 'WEUR', 'Group'],
      region: 'Please Select a Region',
      emplacements: ['Office', 'Labs', 'Logistics', 'Modling', 'Vac Molding', 'Welding'],
      emplacement: 'Please Select an Emplacement',
      sites: ['Treves Wuhan', 'Treves Shenyang', 'Treves RUS', 'Treves Bayern', 'TSK', 'Treves Cz', 'Tredin'],
      site: 'Please Select a Site',
      makeTIPS: false,
      optionTIPS: {
        xAxisData: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        series: ['210', '390', '250', '320', '480', '590', '410', '650', '760', '800', '840', '800', '930'],
      },
      seriesActs: [
        {
          color : ['#28c76f', '#ea5455'],
          name: 'Actions',
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
            { value: 400, name: 'Safe Acts' },
            { value: 240, name: 'UnSafe Acts' },
          ],
        },
      ],
      seriesActions: [  
        {
          color : ['#28c76f', '#ea5455'],
          name: 'Actions',
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
            { value: 320, name: 'Immediate Actions' },
            { value: 420, name: 'Differed Actions' },
          ],
        },
      ],
      actOptions: {
        xAxis: [
          {
            type: 'value',
          },
        ],
        yAxis: [
          {
            type: 'category',
            data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Nevember' , 'December'],
            splitLine: { show: false },
          },
        ],
        grid: {
          left: '74px',
          right: '60px',
          bottom: '30px',
          width: '72%'
        },
        series: [
          {
            name: '# Safe Acts/Conditions',
            type: 'bar',
            stack: 'advertising',
            data: [45, 75, 50,40, 70, 75, 70, 65,85,50, 60, 65],
            itemStyle: {color: '#28c76f'},
            barWidth: '50%',
          },
          {
            name: '# UnSafe Acts/Conditions',
            type: 'bar',
            stack: 'advertising',
            data: [55, 25, 50, 60, 30, 25, 30,35,15,50, 40, 35],
            itemStyle: {color: '#ea5455'},
            barWidth: '50%',
          },
        ],
      },
      actionOptions: {
        xAxis: [
          {
            type: 'value',
          },
        ],
        yAxis: [
          {
            type: 'category',
            data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Nevember' , 'December'],
            splitLine: { show: false },
          },
        ],
        grid: {
          left: '74px',
          right: '60px',
          bottom: '30px',
          width: '72%'
        },
        series: [
          {
            name: '# Immediate Actions',
            type: 'bar',
            stack: 'advertising',
            data: [50, 60, 65, 45, 40, 70, 75, 70, 75, 50,85, 65],
            itemStyle: {color: '#28c76f'},
            barWidth: '50%',
          },
          {
            name: '# Differed Actions',
            type: 'bar',
            stack: 'advertising',
            data: [50, 40, 35, 55, 60, 30, 25, 30, 25, 50,15,35],
            itemStyle: {color: '#ea5455'},
            barWidth: '50%',
          },
        ],
      },
      pageLength: 5,
      dir: false,
      columns: [
        {
          label: 'Date',
          field: 'date',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Site',
          field: 'site',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Site',
          },
        },
        {
          label: 'Location',
          field: 'location',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Location',
          },
        },
        {
          label: 'Immediate Actions Description',
          field: 'IAD',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Description',
          },
        },
        {
          label: 'Differed Actions Description',
          field: 'DAD',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Description',
          },
        },
      ],
      rows: [
        {
          date: '2021-09-08 08:20',
          site: 'Treves Wuhan',
          location: 'Office',
          IAD: 'NA',
          DAD: '1-28/22/2021-N Lopez-Reparer'
        },
        {
          date: '2021-10-18 10:00',
          site: 'Treves Bayern',
          location: 'Finishing',
          IAD: 'Opération Rangement de Poste',
          DAD: 'Mantanance réparation de la protection'
        },
        {
          date: '2021-10-28 12:00',
          site: 'Treves RUS',
          location: 'Cutting',
          IAD: 'The safety gloves are shared',
          DAD: 'none'
        },
        {
          date: '2021-11-02 08:00',
          site: 'Treves RUS',
          location: 'Assembly',
          IAD: '1-05/02/2021 - hamza - Mise en Place',
          DAD: 'Mettre sur un Support de la machine'
        },
        {
          date: '2021-11-08 09:00',
          site: 'MPAP',
          location: 'Chemistry',
          IAD: 'Serve reccord d\'eou',
          DAD: 'Demander au Fourniseoeur de person'
        },
        {
          date: '2021-09-08 08:20',
          site: 'Treves Wuhan',
          location: 'Office',
          IAD: 'NA',
          DAD: '1-28/22/2021-N Lopez-Reparer'
        },
        {
          date: '2021-10-18 10:00',
          site: 'Treves Bayern',
          location: 'Finishing',
          IAD: 'Opération Rangement de Poste',
          DAD: 'Mantanance réparation de la protection'
        },
        {
          date: '2021-10-28 12:00',
          site: 'Treves RUS',
          location: 'Cutting',
          IAD: 'The safety gloves are shared',
          DAD: 'none'
        },
        {
          date: '2021-11-02 08:00',
          site: 'Treves RUS',
          location: 'Assembly',
          IAD: '1-05/02/2021 - hamza - Mise en Place',
          DAD: 'Mettre sur un Support de la machine'
        },
        {
          date: '2021-11-08 09:00',
          site: 'MPAP',
          location: 'Chemistry',
          IAD: 'Serve reccord d\'eou',
          DAD: 'Demander au Fourniseoeur de per'
        },
      ],
      searchTerm: '',
      status: [{
        1: 'Logged',
        2: 'Review',
        3: 'Investigation',
        4: 'Injury',
        5: 'Closed',
      },
      {
        1: 'light-dark',
        2: 'light-primary',
        3: 'light-warning',
        4: 'light-danger',
        5: 'light-success',
      }],
      clickedRow: null, 
    }
  },
  methods:{
    getSuggestionValue(suggestion) {
      this.inspectorName = suggestion.item.name;
      return suggestion.item.name
    },
    onInputChange(text) {
      if (text === '' || text === undefined) {
        return
      }

      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
      this.filteredOptions = [{
        data: this.supNames.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit),
      }]
    },
    renderSuggestion(suggestion) {
    const dev = suggestion.item
    return (
      <div class="d-flex align-items-center">
        <b-avatar src={require(`@/assets/images/avatars/${dev.avatar}`)} class="mr-50"></b-avatar>
        <div class="detail">
          <b-card-text class="mb-0">{dev.name}</b-card-text>
        </div>
      </div>
    )
    },
    onRowClick(params){
      this.clickedRow = params.row
      this.$bvModal.show('modal-hazard')
    },
  },
  computed: {
    statusVariant() {
      const statusColor = {
        Logged: 'light-dark',
        Review: 'light-primary',
        Investigation: 'light-warning',
        Injury: 'light-danger',
        Closed: 'light-success',
      }
      return status => statusColor[status]
    },
  },
  created() {

    axios
      .get(url, {params: {query: employeesQuery}} )
      .then(res => {
        this.employees = res.data.data.employees
      })
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-good-table.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-autosuggest.scss';
</style>

<style>
#modal-review input[type="radio"]:checked + label{
  background: var(--cyan) !important;
  border-color: transparent !important;
}
.my-rev{
  padding: .6rem 1rem !important;
  border: 1px solid var(--dark);
  border-radius:  8px;
}
.my-title{
  position: relative;
}
.my-title::after{
  position: absolute;
  content: '';
  background: #b9b9c3 !important;
  width: 2px;
  height: 100%;
  top: 0;
  right: -11px;
}
.my-card{
  margin-top: -18px;
}
#modal-select-state___BV_modal_footer_ button{
  display: none !important;
}
.active-step{
    cursor: pointer;
}
.active-step::after{
  border: 1px solid var(--success) !important;
}
.active-step svg{
  color: var(--success) !important;
}
.arrow-state{
  all: unset;
  position: relative;
}
.arrow-state::after{
  position: absolute;
  content: '';
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 1px solid #6e6b7b;
  border-radius: 50px;
}
#modal-TIPS .modal-dialog {
  width: 60% !important;

  margin: auto !important;
  padding: 0 !important;
  max-width: 100% !important;
}

#modal-TIPS .modal-content {
  height: auto !important;
}
</style>