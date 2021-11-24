<template>
  <b-card title="Hazards logs">

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
        <span v-if="props.column.field === 'location'" class="text-nowrap">
          {{ props.row.location.name }}
        </span>

        <!-- Column: Status -->
        <span v-else-if="props.column.field === 'state'">
          <b-badge :variant="statusVariant(props.row.state.name)">
            {{ props.row.state.name }}
          </b-badge>
        </span>

        <!-- Column: createdBy -->
        <span class="text-nowrap" v-else-if="props.column.field === 'createdBy'">
            {{ props.row.createdBy.name }}
        </span>
        <!-- Column: source -->
        <span class="text-nowrap" v-else-if="props.column.field === 'source'">
            {{ props.row.source.name }}
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

  <!-- Add Alerts Modal -->
    <b-modal
      id="modal-add-alert"
      title="Alert"
      no-close-on-esc
      centered
      @ok="showAlert = true"
      ok-title="Add"
    >    
      <b-row>
        <b-col cols="10" offset="1" class="pt-1">
          <b-form-group
            label="Title"
            label-for="alrt-title"
            >
            <b-form-input
              id="alrt-title"
              placeholder="ie: Boiling water in Area 2"
              autocomplete="off"
              v-model="alertTitle"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Description"
            label-for="altr-name"
          >
              <b-form-textarea
              id="alrt-description"
              placeholder="Includs who, what & where"
              rows="1"
              v-model="alertDescription"
              autocomplete="off"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Risk"
            label-for="risk"
          >
            <v-select
              id="risk"
              v-model="risk"
              :options="risks"
            >
            </v-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  <!-- Add actions Modal -->
    <b-modal
      id="modal-add-action"
      title="Action"
      no-close-on-esc
      centered
      @ok="showAction = true"
      ok-title="Add"
    >    
      <b-row>
        <b-col cols="10" offset="1" class="pt-1">
          <b-form-group
            label="Title"
            label-for="act-title"
            >
            <b-form-input
              id="act-title"
              placeholder="ie: Cut the Power"
              autocomplete="off"
              v-model="actionTitle"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Is There First Aid Required?"
            label-for="sup-name"
          >
              <b-form-textarea
              id="action-description"
              placeholder="Includs who, what & where"
              rows="1"
              autocomplete="off"
              v-model="actionDescription"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Assigned To"
            label-for="assign-name"
          >
             <vue-autosuggest
            :suggestions="filteredOptionsAction"
            :render-suggestion="renderSuggestion"
            :get-suggestion-value="getSuggestionValue2"
            :limit="10"
            :input-props="{id:'autosuggest__input',class:'form-control', placeholder:'Employee name'}"
            @input="onInputChangeAction"
          >
            <template slot-scope="{suggestion}">
              <span style="border: 1px solid red;" class="my-suggestion-item">{{ suggestion.item.name }}</span>
            </template>
          </vue-autosuggest>
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Due Date"
            label-for="date-time"
          >
            <flat-pickr
              class="form-control"
              placeholder="Due Date"
              autocomplete="off"
              v-model="actionDate"
              :config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
    <!-- review hazard Modal -->
    <b-modal
      id="modal-controll-hazard"
      title="Hazard Controll"
      no-close-on-esc
      centered
      @ok="showControll = true"
      ok-title="Save"
    >    
      <b-row >
        <b-col cols="10" offset="1" class="pt-1">
          <b-form-group
            label="Controll Title"
            label-for="controll-title"
            >
              <b-form-input
                id="controll-title"
                placeholder="ie: Cut the Power"
                autocomplete="off"
                v-model="controllTitle"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Description"
            label-for="controll-description"
          >
            <b-form-textarea
              id="controll-description"
              placeholder="Includs who, what & where"
              rows="1"
              autocomplete="off"
            />
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Controll Type"
            label-for="Controll-type"
            >
            <v-select
              id="Controll-type"
              label="name"
              v-model="controllType"
              :options="controllTypes"
            >
              <template #option="{ name }">
                <span> {{ name }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
        <b-col cols="10" offset="1">
          <b-form-group
            label="Due Date"
            label-for="date-time"
          >
            <flat-pickr
              class="form-control"
              placeholder="Due Date"
              autocomplete="off"
              v-model="HazardDateTime"
              :config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
    <!-- review hazard Modal -->
    <b-modal
      id="modal-review-hazard"
      title="Hazard Review"
      no-close-on-esc
      centered
      @ok="showReview = true"
      ok-title="Save"
    >    
      <b-row >
        <b-col cols="12">
          <div @click="toggleAns(ans1Visible)" v-b-toggle.review-hazard-1 class="card">
            <div class="card-header py-1">
                <h4 class=" mb-0">Supervisor Review</h4>
                <h4 class="text-muted mb-0">1 / 3</h4>
            </div>
          </div>
            <b-collapse  id="review-hazard-1"  v-model="ans1Visible">
              <div class="card my-card">
                <b-row>
                  <b-col cols="10" offset="1" class="pt-1">
                    <b-form-group
                      label="Supervisor Name"
                      label-for="sup-name"
                      >
                        <vue-autosuggest
                          :suggestions="filteredOptions"
                          :render-suggestion="renderSuggestion"
                          :get-suggestion-value="getSuggestionValue"
                          :limit="10"
                          se
                          :input-props="{id:'autosuggest__input',class:'form-control', placeholder:'Supervisor name'}"
                          @input="onInputChange"
                        >
                          <template slot-scope="{suggestion}">
                            <span style="border: 1px solid red;" class="my-suggestion-item">{{ suggestion.item.name }}</span>
                          </template>
                        </vue-autosuggest>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-collapse>

          <div @click="toggleAns(ans2Visible)" v-b-toggle.review-hazard-2 class="card">
            <div class="card-header py-1">
                <h4 class=" mb-0">Risk Assessment</h4>
                <h4 class="text-muted mb-0">2 / 3</h4>
            </div>
          </div>
          <b-collapse  id="review-hazard-2" v-model="ans2Visible">
            <div class="card my-card">
              <b-row>
                <b-col cols="10" offset="1" class="pt-1">
                  <b-form-group
                    label="Hazard Type"
                    label-for="Hazard-type"
                    >
                    <v-select
                      id="Hazard-type"
                      label="name"
                      v-model="hazardType"
                      :options="hazardTypes"
                    >
                      <template #option="{ name }">
                        <span> {{ name }}</span>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="10" offset="1">
                  <b-form-group
                    label="Description"
                    label-for="rev-description"
                  >
                    <b-form-textarea
                      id="rev-description"
                      placeholder="Includs who, what & where"
                      rows="1"
                      autocomplete="off"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="10" offset="1">
                  <b-form-group
                    label="Hazard Likelihood"
                    label-for="Hazard-likelihood"
                    >
                    <v-select
                      id="Hazard-likelihood"
                      label="name"
                      v-model="hazardLikely"
                      :options="hazardLikelies"
                    >
                      <template #option="{ name }">
                        <span> {{ name }}</span>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="10" offset="1">
                  <b-form-group
                    label="Hazard Seriousness"
                    label-for="Hazard-Seriousness"
                    >
                    <v-select
                      id="Hazard-Seriousness"
                      label="name"
                      v-model="hazardSeriou"
                      :options="hazardSerious"
                    >
                      <template #option="{ name }">
                        <span> {{ name }}</span>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
          </b-collapse>

          <div @click="toggleAns(ans3Visible)" v-b-toggle.review-hazard-3  class="card">
            <div class="card-header py-1">
                <h4 class=" mb-0">Equipments</h4>
                <h4 class="text-muted mb-0">3 / 3</h4>
            </div>
          </div>
          <b-collapse  id="review-hazard-3" v-model="ans3Visible">
            <div class="card my-card">
              <b-row>
                <b-col cols="10" offset="1" class="pt-1">
                  <b-form-group
                    label="Was There any Assets Involved?"
                    label-for="sup-name"
                  >
                    <input id="ans3-y" name="ans3" type="radio" value="Yes" style="display:none;"/>
                    <label @click="showAns3a1 = true" for="ans3-y" class="btn btn-secondary mr-1" >Yes</label>
                    <input id="ans3-n" name="ans3" type="radio" value="No" style="display:none;"/>
                    <label for="ans3-n" class="btn btn-secondary mr-1" >No</label>
                  </b-form-group>
                </b-col>
                <b-col cols="10" offset="1" v-if="showAns3a1">
                  <b-form-group
                    label-for="Hazard-assets"
                    >
                    <v-select
                      id="Hazard-assets"
                      label="name"
                      v-model="Asset"
                      :options="Assets"
                    >
                      <template #option="{ name }">
                        <span> {{ name }}</span>
                      </template>
                    </v-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
          </b-collapse>

        </b-col>
      </b-row>
    </b-modal>
  <!-- Sign off Modal -->
    <b-modal
      id="modal-add-sign"
      title="Please Sign Off"
      no-close-on-esc
      ok-title="Save"
      @ok="addSign"
      centered
    >    
        <b-row @click="setMiddleState" class="justify-content-around">
            <b-col cols="12"> 
<div class="wrapper">
  <canvas id="signature-pad" class="signature-pad" width=400 height=200></canvas>
</div>              <div>
              </div>
            </b-col>
        </b-row>
    </b-modal>
  <!-- Select state Modal -->
    <b-modal
      id="modal-select-state-hazard"
      title="Please Select a State"
      no-close-on-esc
      centered
    >    
        <b-row @click="setMiddleState" class="justify-content-around">
            <button class="btn btn-outline-warning" data-state="Active">Active</button>
            <button class="btn btn-outline-success" data-state="Closed"> Case Closed </button>
        </b-row>
    </b-modal>
  
    <b-modal v-if="clickedRow"
      id="modal-hazard"
      title="Hazard"
      ok-title="Save"
      no-close-on-esc
      @ok="addAction"
      centered
    >    
        <b-row>
          <b-col cols="3">
            <b-card title="Hazard Details">
              <h5 class="card-subtitle text-muted mt-2">Title</h5>
              <p>{{clickedRow.title}}</p>
              <h5 class="card-subtitle text-muted mt-1">Description</h5>
              <p>{{clickedRow.description}}</p>
              <h5 class="card-subtitle text-muted mt-1">Date & Time</h5>
              <p>{{clickedRow.createdAt}}</p>
              <h5 class="card-subtitle text-muted mt-1">Source</h5>
              <p>{{clickedRow.source.name}}</p>
              <h5 class="card-subtitle text-muted mt-1">Location</h5>
              <p>{{clickedRow.location.name}}</p>
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card title="Hazard Management" class="mb-1">
              <div class="d-flex justify-content-around align-items-center pt-1">
                <div class="arrow-state" 
                  :class="{'active-step' : clickedRow.state.name != 'Logged'}"
                  @click="previewsState"
                >
                  <feather-icon icon="ChevronLeftIcon" size="32"/>
                </div>
                <h4>
                  State :   
                  <b-badge :variant="statusVariant(clickedRow.state.name)">
                    {{ clickedRow.state.name }}
                  </b-badge>
                </h4>
                <button class="arrow-state"
                  :class="{'active-step' : clickedRow.state.name != 'Closed'}"
                  @click="nextState"  
                >
                  <feather-icon icon="ChevronRightIcon" size="32"/>
                </button>
              </div>
            </b-card>
            <b-card v-if="clickedRow.state.name != 'Logged'">
              <b-tabs>
                <b-tab title="Supervisor Review">
                  <div class="d-flex justify-content-end">
                    <button @click="$bvModal.show('modal-review-hazard')" 
                      class="btn btn-sm btn-outline-dark"
                    >
                      <feather-icon icon="PlusIcon"/>
                    </button>
                  </div>
                  <div class="mt-2 d-flex align-items-center justify-content-between my-rev" v-if="showReview">
                    <div class="d-flex align-items-center">
                      <b-avatar src="/13-small.png" class="mr-50"></b-avatar>
                      <div class="detail">
                        <b-card-text class="mb-0">{{inspectorName}}</b-card-text>
                      </div>
                    </div>
                    <div class="d-flex text-muted align-items-center">
                      <h5 class="mr-2 text-muted my-title mb-0">
                        <feather-icon icon="ClockIcon" />
                        {{clickedRow.date}}
                      </h5>
                      <feather-icon size="18" icon="Edit2Icon" style="margin-right:4px;" />
                      <feather-icon size="20" icon="XIcon" />
                    </div>
                    </div>
                </b-tab>
                <b-tab v-if="showActiveTabs" title="Controlls">
                  <div class="d-flex justify-content-end">
                    <button @click="$bvModal.show('modal-controll-hazard')" 
                      class="btn btn-sm btn-outline-dark"
                    >
                      <feather-icon icon="PlusIcon"/>
                    </button>
                  </div>
                  <div class="mt-2 d-flex align-items-center justify-content-between my-rev" v-if="showControll">
                    <div class="d-flex align-items-center">
                      <div class="detail">
                        <b-card-text class="mb-0">{{controllTitle}}</b-card-text>
                        <b-card-text class="mb-0 text-muted">{{controllType.name}}</b-card-text>
                      </div>
                    </div>
                    <div class="d-flex text-muted align-items-center">
                      <h5 class="mr-2 text-muted my-title mb-0">
                        <feather-icon icon="ClockIcon" />
                        {{clickedRow.date}}
                      </h5>
                      <feather-icon size="18" icon="Edit2Icon" style="margin-right:4px;" />
                      <feather-icon size="20" icon="XIcon" />
                    </div>
                    </div>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
          <b-col cols="3">
            <b-card title="More">
              <h5 class="card-subtitle mt-2 mb-1">Actions</h5>
              <div v-if="showAction == false" @click="$bvModal.show('modal-add-action')" class="btn btn-light w-100">
                <feather-icon icon="PlusIcon" />
              </div>
              <div v-b-toggle.action v-if="showAction == true"  class="card mb-1">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <b-avatar src="/13-small.png" class="mr-50"></b-avatar>
                    <div class="detail">
                      <b-card-text class="mb-0">Lisa Abdo</b-card-text>
                    </div>
                  </div>
                  <div class="d-flex text-muted align-items-center">
                      <feather-icon size="20" icon="PlusIcon" style="margin-right:4px;" />
                      <feather-icon size="18" icon="Edit2Icon" style="margin-right:4px;" />
                      <feather-icon size="20" icon="XIcon"/>
                  </div>
                </div>
                <b-collapse id="action">
                  <div class="card mb-0">
                    <h5 class="card-subtitle text-muted mt-2">Title</h5>
                    <p>Cut the power</p>
                    <h5 class="card-subtitle text-muted mt-1">Description</h5>
                    <p>Cut the power on the 6 stage area 2</p>
                    <h5 class="card-subtitle text-muted mt-1">Due Date</h5>
                    <p>2021/09/12 12:00 PM</p>
                  </div>
                </b-collapse>
              </div>
              <h5 class="card-subtitle mt-2 mb-1">Alerts</h5>
              <div v-if="showAlert == false" @click="$bvModal.show('modal-add-alert')" class="btn btn-light w-100">
                <feather-icon icon="PlusIcon" />
              </div>
              <div v-b-toggle.action v-if="showAlert == true"  class="card mb-1">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <b-avatar src="/risk.png" class="mr-50"></b-avatar>
                    <div class="detail">
                      <b-card-text class="mb-0">{{alertTitle}}</b-card-text>
                    </div>
                  </div>
                  <div class="d-flex text-muted align-items-center">
                      <feather-icon size="20" icon="PlusIcon" style="margin-right:4px;" />
                      <feather-icon size="18" icon="Edit2Icon" style="margin-right:4px;" />
                      <feather-icon size="20" icon="XIcon"/>
                  </div>
                </div>
                <b-collapse id="action">
                  <div class="card mb-0">
                    <h5 class="card-subtitle text-muted mt-2">Title</h5>
                    <p>Cut the power</p>
                    <h5 class="card-subtitle text-muted mt-1">Description</h5>
                    <p>Cut the power on the 6 stage area 2</p>
                    <h5 class="card-subtitle text-muted mt-1">Due Date</h5>
                    <p>2021/09/12 12:00 PM</p>
                  </div>
                </b-collapse>
              </div>
              <h5 class="card-subtitle mt-2 mb-1">Atachments</h5>
              <label v-if="!attachment" for="attachment" class="btn btn-light w-100">
                <input @change="addAttachment" type="file" id="attachment" style="display:none;">
                <feather-icon icon="PlusIcon" />
              </label>
              <div v-if="attachment" class="card mb-0">
                <img :src="attachment" alt="">    
              </div>
              <h5 class="card-subtitle mt-2 mb-1">Sign Offs</h5>
              <div v-if="!signData"  @click="signOff" class="btn btn-light w-100">
                <feather-icon icon="PlusIcon" />
              </div>
              <div v-if="signData"  class="card mb-0">
                <img :src="signData" alt="">    
              </div>
            </b-card>
          </b-col>
        </b-row>
    </b-modal>
  </b-card>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
  BCard, BModal, BCol, BRow, BTabs, BTab, BCollapse, VBToggle, BCardText, BFormTextarea
} from 'bootstrap-vue'
import { VueAutosuggest } from 'vue-autosuggest'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { employeesQuery, postAction, postAlert, supNamesQuery, hazardsQuery, url } from "@core/query"
import axios from 'axios'
import flatPickr from "vue-flatpickr-component"
import vSelect from 'vue-select'
import SignaturePad from "signature_pad"
export default {
  directives: {
  'b-toggle': VBToggle
},
  components: { 
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
  },
  data() {
    return {
      alertTitle: '',
      alertDescription: '',
      employees: [],
      actionTitle: '',
      actionDescription: '',
      actionDate: '',
      HazardDateTime : null,
      signData: '',
      attachment:false,
      showAction: false,
      showAlert: false,
      inspectorName: null,
      showAns2A1: false,
      showAns3a1: false,
      controllTypes: [{name: 'PPE'}, {name: 'Administration'}, {name: 'Engineering'}, {name: 'Isolation'}, {name: 'Substitution'}, {name: 'Elimination'}],
      controllType: {name: 'Select a Type'},
      hazardTypes: [{name: 'Biological'}, {name: 'Chemical'}, {name: 'Physical'}, {name: 'Psychological'}, {name: 'Radiation'}],
      hazardType: {name: 'Select a Type'},
      hazardLikelies: [{name: 'Very Likely'}, {name: 'Likely'}, {name: 'Possible'}, {name: 'Unlikely'}],
      hazardLikely: {name: 'Select a Likelihood'},
      hazardSerious: [{name: 'Catastrophic'}, {name: 'High'}, {name: 'Moderate'}, {name: 'Minor'}, {name: 'Negligble'}],
      hazardSeriou: {name: 'Select its Seriousness'},
      risks: ['Heigh','Medium','Low'],
      risk: 'Select a Risk',
      Employees: [{name: 'Jack cherak'}, {name: 'Lisa Abdo'}, {name: 'Youssef Chouni'}],
      Asset: {name: 'Select an Asset'},
      Assets: [{name: 'Motor Engin'}, {name: 'Fan x12'}, {name: 'Clack r13'}, {name: 'Lamon Area1'}, {name: 'Lamon Area2'}, {name: 'Paint 100'}],
      injuries: [{name: 'Face'}, {name: 'Head'}, {name: 'Right Leg'}, {name: 'Left Leg'}, {name: 'Right Arm'}, {name: 'Left Arm'}],
      injury: {name: 'Select an Injury'},
      pageLength: 10,
      ans1Visible: false,
      ans2Visible: false,
      ans3Visible: false,
      ans4Visible: false,
      filteredOptions: [],
      filteredOptionsAction: [],
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
          label: 'Source',
          field: 'source',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Source',
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
      middleState: null,
      showActiveTabs: false,
      supNames: [],
      showReview: false,
      showControll: false,
      signaturePad: null,
      controllTitle: '',
    }
  },
  methods:{
    addAction() {
      if(this.actionTitle != '')
      axios
      .post(url, {query: postAction(this.actionTitle, this.actionDescription)})
      .then(res => {
        console.log(res)
      })
      if(this.alertTitle != '')
      axios
      .post(url, {query: postAlert(this.alertTitle, this.alertDescription)})
      .then(res => {
        console.log(res)
      })
    },
    addSign() {
        if (!this.signaturePad) {
        return alert("Please provide a signature first.");
        }
        this.signData = this.signaturePad.toDataURL('image/png');
    },
    signOff() {
      this.$bvModal.show('modal-add-sign')
      setTimeout(()=>{
        this.signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
          backgroundColor: 'rgb(255, 255, 255)'
        });
      },1000)
      
    },
    addAttachment() {
      this.attachment = document.querySelector('#attachment').value.replace('C:\\fakepath\\', '/')
    },
    toggleAns(ans) {
      this.ans1Visible = this.ans2Visible = this.ans3Visible = this.ans4Visible = false
    },
    getSuggestionValue(suggestion) {
      this.inspectorName = suggestion.item.name;
      return suggestion.item.name
    },
    getSuggestionValue2(suggestion) {
      this.actionAssignTo = suggestion.item.id;
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
    onInputChangeAction(text) {
      if (text === '' || text === undefined) {
        return
      }

      /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
      this.filteredOptionsAction = [{
        data: this.employees.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, this.limit),
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
    setMiddleState(event) {
      if(event.target.tagName == 'BUTTON') {
        this.clickedRow.state.name = this.middleState  =  event.target.dataset.state
        if(this.middleState == 'Active') this.showActiveTabs = true
        this.$bvModal.hide('modal-select-state-hazard')
      }
    },
    onRowClick(params){
      this.clickedRow = params.row
      this.$bvModal.show('modal-hazard')
    },
    nextState() {
      if(this.clickedRow.state.name == 'Logged') return this.clickedRow.state.name = 'Review'
      else if(this.clickedRow.state.name == 'Review') return this.$bvModal.show('modal-select-state-hazard')
      else return this.clickedRow.state.name = 'Closed'
    },
    previewsState() {
      if(this.clickedRow.state.name == 'Review') return this.clickedRow.state.name = 'Logged'
      else if(this.clickedRow.state.name == 'Closed') 
        return this.clickedRow.state.name = this.middleState == 'Closed' ? 'Logged' : this.middleState 
      else return this.clickedRow.state.name = 'Logged'
    }
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
      .get(url,
        {params: {query: hazardsQuery}}
      )
      .then(res => this.rows = res.data.data.hazards)

    axios
      .get(url, {params: {query: supNamesQuery}} )
      .then(res => {
        this.supNames = res.data.data.employees
      })
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
#modal-hazard .modal-dialog {
  width: 95% !important;
  height: 90% !important;
  margin: auto !important;
  padding: 0 !important;
  max-width: 90% !important;
}

#modal-hazard .modal-content {
  height: auto !important;
  min-height: 90% !important;
  /* border-radius: 0 !important; */
}
</style>