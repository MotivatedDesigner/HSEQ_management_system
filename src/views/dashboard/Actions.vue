<template>
  <b-card title="Hazards logs">

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

        <!-- Column: createdBy -->
        <span class="text-nowrap" v-if="props.column.field === 'assignedBy'">
            {{ props.row.assignedBy.name }}
        </span>
        <!-- Column: createdBy -->
        <span class="text-nowrap" v-else-if="props.column.field === 'assignedTo'">
            {{ props.row.assignedTo.name }}
        </span>
        <!-- Column: source -->
        <span class="text-nowrap" v-else-if="props.column.field === 'state'">
            {{ props.row.state.name }}
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
  BCard, BModal, BCol, BRow, BTabs, BTab, BCollapse, VBToggle, BCardText, BFormTextarea
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import {  actionsQuery, url } from "@core/query"
import axios from 'axios'
export default {
  directives: {
  'b-toggle': VBToggle
},
  components: { 
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
  },
  data() {
    return {
      pageLength: 10,
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
          label: 'Created At',
          field: 'createdAt',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Due Date',
          field: 'dueDate',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Assigned By',
          field: 'assignedBy',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Employee',
          },
        },
        {
          label: 'Assigned To',
          field: 'assignedTo',
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
        1: 'Current',
        2: 'Review',
        3: 'Investigation',
        4: 'Due',
        5: 'Done',
      },
      {
        1: 'light-dark',
        2: 'light-primary',
        3: 'light-warning',
        4: 'light-danger',
        5: 'light-success',
      }],
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        Current: 'light-dark',
        Review: 'light-primary',
        Investigation: 'light-warning',
        Due: 'light-danger',
        Done: 'light-success',
      }
      return status => statusColor[status]
    },
  },
  created() {
    axios
      .get(url,
        {params: {query: actionsQuery}}
      )
      .then(res => this.rows = res.data.data.Actions)

  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
