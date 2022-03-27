<template>
    <div class="layout-px-spacing">
        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/events">{{ $t('events') }}</a></li>
                                <li class="breadcrumb-item">{{ event_name }}</li>
                                <li class="breadcrumb-item active" aria-current="page"><span>{{ $t('subevents') }}</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>
        <div class="row layout-top-spacing">
          <div class="col-xl-6 col-lg-6 col-md-6 col-6 layout-spacing">
            <h4>{{ event_name }}</h4>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-6 layout-spacing" style="text-align: right;">
                <b-button 
                tag="a" 
                variant="primary" 
                class="ml-2"
                @click="showNewSubscriberModal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12">
                        </line>
                    </svg>
                    {{ $t('add_new_subscriber') }}
                </b-button>
          </div>
        </div>
        <!-- modalnewsubscriber -->
          <b-modal id="modalnewsubscriber" :title="this.$t('add_new_event')" size="lg">
              <b-form v-if="itemModel" @submit.prevent="addNewSubscriber">
                  <div class="row">
                    <div class="col-lg-6 col-12 mx-auto">
                      <b-form-group :label="this.$t('nome')">
                        <b-input v-model="itemModel.nome" type="text"></b-input>
                      </b-form-group>
                    </div>
                    <div class="col-lg-6 col-12 mx-auto">
                      <b-form-group :label="this.$t('cognome')">
                        <b-input v-model="itemModel.cognome" type="text"></b-input>
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4 col-12 mx-auto">
                      <b-form-group :label="this.$t('email')">
                        <b-input v-model="itemModel.email" type="text"></b-input>
                      </b-form-group>
                    </div>
                    <div class="col-lg-4 col-12 mx-auto">
                      <b-form-group :label="this.$t('telefono')">
                        <b-input v-model="itemModel.telefono" type="text"></b-input>
                      </b-form-group>
                    </div>
                    <div class="col-lg-4 col-12 mx-auto">
                      <b-form-group :label="this.$t('company')">
                        <b-input v-model="itemModel.company" type="text"></b-input>
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6 col-12 mx-auto">
                      <b-form-group :label="this.$t('ruolo')">
                        <b-input v-model="itemModel.ruolo" type="text"></b-input>
                      </b-form-group>
                    </div>
                    <div class="col-lg-6 col-12 mx-auto">
                      <b-form-group :label="this.$t('department')">
                        <b-select v-model="itemModel.department">
                          <b-select-option v-for="dep in departments" :key="dep.dipartimento" :value="dep.idDipartimento">{{ dep.dipartimento }}</b-select-option>
                        </b-select>
                      </b-form-group>
                    </div>
                  </div>
                  <b-button v-if="loading" type="submit" variant="primary" class="my-4" disabled>
                    <b-spinner style="width: 1rem; height: 1rem;" type="grow"></b-spinner>
                    Creating...
                  </b-button>
                  <b-button v-else type="submit" variant="primary" class="my-4">{{ $t('submit') }}</b-button>
              </b-form>
              
              <template #modal-footer>
                  <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('modalnewevent')"><i class="flaticon-cancel-12"></i>{{ $t('discard') }}</b-button>
              </template>
          </b-modal>
        <!-- end modalnewsubscriber -->
        <div class="row layout-top-spacing">

            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                        <div class="table-header">
                            <div class="d-flex align-items-center">
                                <span>Results :</span>
                                <span class="ml-2">
                                    <b-select v-model="table_option.page_size" size="sm">
                                        <b-select-option value="5">5</b-select-option>
                                        <b-select-option value="10">10</b-select-option>
                                        <b-select-option value="20">20</b-select-option>
                                        <b-select-option value="50">50</b-select-option>
                                    </b-select>
                                </span>
                            </div>
                            <div class="header-search">
                                <b-input v-model="table_option.search_text" size="sm" placeholder="Search..." />
                                <div class="search-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </div>
                            </div>
                        </div>

                        <b-table ref="basic_table" responsive hover :items="items" :fields="columns" :per-page="table_option.page_size" :current-page="table_option.current_page" :filter="table_option.search_text"
                                 sort-by="name" :show-empty="true" @filtered="on_filtered">
                            <template #cell(salary)="row">
                                ${{row.item.salary}}
                            </template>
                            <template #cell(action)="row">
                                <a href="javascript:;" class="cancel" @click="delete_row(row.item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                </a>
                            </template>
                        </b-table>

                        <div class="table-footer">
                            <div class="dataTables_info">Showing {{meta.total_items ? meta.start_index + 1 : 0}} to {{meta.end_index + 1}} of {{meta.total_items}}</div>
                            <div class="paginating-container pagination-solid flex-column align-items-right">
                                <b-pagination v-model="table_option.current_page" :total-rows="table_option.total_rows" :per-page="table_option.page_size" prev-text="Prev" next-text="Next" first-text="First" last-text="Last" first-class="first" prev-class="prev" next-class="next" last-class="last" class="rounded">
                                    <template #first-text>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                                    </template>
                                    <template #prev-text>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                                    </template>
                                    <template #next-text>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                                    </template>
                                    <template #last-text>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                                    </template>
                                </b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import api from '@/api.js'
    export default {
        metaInfo: { title: 'Bootstrap Basic Table' },
        data() {
            return {
                event_name: "", subEvents: [], departments: [],
                items: [], columns: [],
                table_option: { total_rows: 0, current_page: 1, page_size: 10, search_text: '' },
                meta: {},
                is_select_all: false, selected_rows: [],
                flatPickrVisible: false,
                flatPickrConfig: {
                  static: true,
                  dateFormat: 'Y-m-d\\TH:i:S'
                },
                loading: false,
                defaultItem: {
                  name: '',
                  company: '',
                  description: '',
                  startDate: Date.now(),
                  endDate: Date.now(),
                  type: 'a',
                  status: 'o'
                },
                newSubscriberItem: {
                  nome: '',
                  cognome: '',
                  email: '',
                  telefono: '',
                  company: '',
                  ruolo: '',
                  department: ''
                },
                itemModel: null
            }
        },
        watch: {
            table_option: {
                handler: function () { this.get_meta(); },
                deep: true
            },
        },
        async created() {
            await this.getSubeventsByEventId()
            this.bind_data();
        },
        methods: {
            bind_data() {
                this.columns = [
                    { key: 'dipartimento', label: this.$t('pertecipanti') },
                    { key: 'recipientsCount', label: this.$t('recipients') },
                    { key: 'bouncesCount', label: this.$t('bounces') },
                    { key: 'notSentsCount', label: this.$t('notSents') },
                    { key: 'viewsCount', label: this.$t('views') },
                    { key: 'clicksCount', label: this.$t('clicks') },
                    { key: 'bookedsCount', label: this.$t('bookeds') },
                    { key: 'notBookedsCount', label: this.$t('notBookeds') },
                    { key: 'interestedsCount', label: this.$t('interesteds') },
                    { key: 'attendeesCount', label: this.$t('attendees') },
                    { key: 'notAttendeesCount', label: this.$t('notAttendees') },
                    { key: 'viewsSum', label: this.$t('viewsSum') },
                    { key: 'clicksSum', label: this.$t('clicksSum') },
                    { key: 'action', label: 'Actions', class: 'actions text-center' }
                ];
                this.items = this.departments;

                this.table_option.total_rows = this.items.length;
                this.get_meta();
            },
            on_filtered(filtered_items) {
                this.refresh_table(filtered_items.length);
            },
            delete_row(item) {
                if (confirm('Are you sure want to delete selected row ?')) {
                    this.items = this.items.filter(d => d.id != item.id);
                    this.refresh_table(this.items.length);
                }
            },
            refresh_table(total) {
                this.table_option.total_rows = total;
                this.table_option.currentPage = 1;
            },
            get_meta() {
                var startPage; var endPage;
                var totalPages = this.table_option.page_size < 1 ? 1 : Math.ceil(this.table_option.total_rows / this.table_option.page_size);
                totalPages = Math.max(totalPages || 0, 1);

                var maxSize = 5;
                var isMaxSized = typeof maxSize !== 'undefined' && maxSize < totalPages;
                if (isMaxSized) {
                    startPage = Math.max(this.table_option.current_page - Math.floor(maxSize / 2), 1);
                    endPage = startPage + maxSize - 1;

                    if (endPage > totalPages) { endPage = totalPages; startPage = endPage - maxSize + 1; }
                }
                else { startPage = 1; endPage = totalPages; }
                let startIndex = (this.table_option.current_page - 1) * this.table_option.page_size;
                let endIndex = Math.min(startIndex + this.table_option.page_size - 1, this.table_option.total_rows - 1);

                var pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
                this.meta = {
                    total_items: this.table_option.total_rows,
                    current_page: this.table_option.current_page,
                    page_size: this.table_option.page_size,
                    total_pages: totalPages,
                    start_page: startPage,
                    end_page: endPage,
                    start_index: startIndex,
                    end_index: endIndex,
                    pages: pages
                };
            },
            async getSubeventsByEventId() {
                try {
                  const response = await api.get('api/v1/events/'+this.$route.params.id)
                  //console.log(response.data.items)
                  this.event_name = response.data.items.name
                  this.subEvents = response.data.items.subEvents
                  //this.items = response.data.items
                } catch(e) {
                  this.errors.push(e)
                }
                try {
                  const res = await api.get('api/v1/statistics/ByIdEvent/'+this.$route.params.id)
                  console.log(res.data.items)
                  this.departments = res.data.items
                } catch(e) {
                  this.errors.push(e)
                }
            },
            showNewSubscriberModal() {
                this.itemModel = Object.assign({}, this.newSubscriberItem)
                this.$bvModal.show('modalnewsubscriber')
            },
        }
    };
</script>
