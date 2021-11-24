<template>
  <b-card title="Incidents logs">


    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
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
          v-if="props.column.field == 'category'"
          class="text-nowrap"
        >
            <span class="text-nowrap">{{ props.row.category.name }}</span>
        </span>
        <span
          v-else-if="props.column.field == 'location'"
          class="text-nowrap"
        >
            <span class="text-nowrap">{{ props.row.location.name }}</span>
        </span>
        <span
          v-else-if="props.column.field == 'createdBy'"
          class="text-nowrap"
        >
            <span class="text-nowrap">{{ props.row.createdBy.name }}</span>
        </span>

        <!-- Column: Status -->
        <span v-else-if="props.column.field == 'state'">
          <b-badge :variant="statusVariant(props.row.state.name)">
            {{ props.row.state.name }}
          </b-badge>
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
  </b-card>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
  BCard} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import { incidentsQuery, url } from "@core/query"
import axios from 'axios'
export default {
  components: {
    BCard,
    VueGoodTable,
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
      pageLength: 3,
      dir: false,
      columns: [
        {
          label: 'Title',
          field: 'title',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Title',
          },
        },
        {
          label: 'Category',
          field: 'category',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Category',
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
          label: 'Created At',
          field: 'createdAt',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Created By',
          field: 'createdBy',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Employee',
          },
        },
        {
          label: 'State',
          field: 'state',
          filterOptions: {
            enabled: true,
            placeholder: 'Search State',
          },
        },
      ],
      rows: [],
      searchTerm: '',
      status: [{
        1: 'Logged',
        2: 'Review',
        3: 'Investigation',
        4: 'Injury',
        5: 'Applied',
      },
      {
        1: 'light-dark',
        2: 'light-success',
        3: 'light-warning',
        4: 'light-danger',
        5: 'light-danger',
      }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Logged : 'light-dark',
        Review : 'light-success',
        Investigation     : 'light-warning',
        Injury     : 'light-danger',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
  },
  created() {
    axios
      .get(url,
        {params: {query: incidentsQuery}}
      )
      .then(res => this.rows = res.data.data.incidents)
  },
}
</script>
