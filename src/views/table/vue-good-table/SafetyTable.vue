<template>
  <b-card title="Safety alerts">
    <!-- search input -->
    <div class="custom-search d-flex justify-content-start">
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>

    <!-- table -->
  <vue-perfect-scrollbar
    :settings="perfectScrollbarSettings"
    class="scroll-area"
    style="height: 230px;"
    tagname="ul"
    @ps-scroll-y="evt => { shallShadowBottom = evt.srcElement.scrollTop > 0 }"
  >
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
  
          <!-- Column: Name -->
          <span
            v-if="props.column.field === 'fullName'"
            class="text-nowrap"
          >
              <span class="text-nowrap">{{ props.row.fullName }}</span>
          </span>
  
          <!-- Column: Status -->
          <span v-else-if="props.column.field === 'status'">
            <b-badge :variant="statusVariant(props.row.status)">
              {{ props.row.status }}
            </b-badge>
          </span>
  
          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
  </vue-perfect-scrollbar>

  </b-card>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
  BCard} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import store from '@/store/index'

export default {
  components: {
    BCard,
    VueGoodTable,
    VuePerfectScrollbar,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
    perfectScrollbarSettings : {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    },
      pageLength: 3,
      dir: false,
      columns: [
        {
          label: 'Title',
          field: 'title',
        },
        {
          label: 'Location',
          field: 'location',
        },
        {
          label: 'Status',
          field: 'status',
        },
      ],
      rows: [],
      searchTerm: '',
      status: [{
        1: 'Current',
        2: 'Fixed',
        3: 'Risk',
        4: 'Resigned',
        5: 'Applied',
      },
      {
        1: 'light-primary',
        2: 'light-success',
        3: 'light-danger',
        4: 'light-warning',
        5: 'light-info',
      }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current : 'light-dark',
        Fixed : 'light-success',
        Risk     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.$http.get('/good-table/safetyAlerts')
      .then(res => { this.rows = res.data })
  },
}
</script>
