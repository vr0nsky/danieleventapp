<template>
    <div class="layout-px-spacing apps-invoice-list">

        <portal to="breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">{{ $t('events') }}</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>{{ $t('list') }}</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </portal>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-md-12 col-12 layout-spacing">
                <h4>{{ $t('all_events') }}</h4>
            </div>
        </div>

        <div class="row">

            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6">
                    <div class="custom-table">
                        <div class="table-header">
                            <div class="d-flex align-items-center flex-column flex-sm-row flex-shrink-0">
                                <div class="d-flex order-1 order-sm-0 align-items-center">
                                    <span>{{ $t('results') }} :</span>
                                    <span class="ml-2">
                                        <b-select v-model="table_option.page_size" size="sm">
                                            <b-select-option value="5">5</b-select-option>
                                            <b-select-option value="10">10</b-select-option>
                                            <b-select-option value="20">20</b-select-option>
                                            <b-select-option value="50">50</b-select-option>
                                        </b-select>
                                    </span>
                                </div>
                                <div class="mb-3 mb-sm-0 order-0 order-sm-1 mr-sm-2">
                                    <b-button 
                                    tag="a" 
                                    
                                    variant="primary" 
                                    class="ml-2"
                                    v-b-modal.modalnewevent
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                                            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12">
                                            </line>
                                        </svg>
                                        {{ $t('add_new_event') }}
                                    </b-button>
                                </div>
                            </div>
                            <!-- modalnewevent -->
                                <b-modal id="modalnewevent" :title="this.$t('add_new_event')" size="lg">

                                    <b-form>
                                        <div class="row">
                                            <div class="col-lg-6 col-12 mx-auto">
                                                <b-form-group :label="this.$t('event_name')">
                                                    <b-input type="text" :placeholder="this.$t('event_name')"></b-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-lg-6 col-12 mx-auto">
                                                <b-form-group :label="this.$t('company_name')">
                                                    <b-input type="text" :placeholder="this.$t('company_name')"></b-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12 col-12 mx-auto">
                                                <b-form-group :label="this.$t('description')">
                                                    <b-textarea rows="2"></b-textarea>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-12 mx-auto">
                                                <b-form-group :label="this.$t('start_date')">
                                                    <flat-pickr v-model="date1" class="form-control flatpickr active"></flat-pickr>
                                                </b-form-group>
                                            </div>
                                            <div class="col-lg-6 col-12 mx-auto">
                                                <b-form-group :label="this.$t('end_date')">
                                                    <flat-pickr v-model="date1" class="form-control flatpickr active"></flat-pickr>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-12 mx-auto">
                                                <b-form-group :label="this.$t('type')">
                                                    <b-input type="text" :placeholder="this.$t('type')"></b-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-lg-6 col-12 mx-auto">
                                                <b-form-group :label="this.$t('status')">
                                                    <b-select :value="1">
                                                        <b-select-option value="1">{{ $t('open') }}</b-select-option>
                                                        <b-select-option value="2">{{ $t('closed') }}</b-select-option>
                                                    </b-select>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <b-button type="submit" variant="primary" class="my-4">{{ $t('submit') }}</b-button>
                                    </b-form>
                                    
                                    <template #modal-footer>
                                        <b-button variant="default" data-dismiss="modal" @click="$bvModal.hide('modalnewevent')"><i class="flaticon-cancel-12"></i>{{ $t('discard') }}</b-button>
                                    </template>
                                </b-modal>
                            <!-- end modalnewevent -->
                            <div class="header-search">
                                <b-input v-model="table_option.search_text" size="sm" placeholder="Search..." />
                                <div class="search-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </div>
                            </div>
                        </div>

                        <b-table ref="basic_table" responsive hover :items="items" :fields="columns" :per-page="table_option.page_size" :current-page="table_option.current_page" :filter="table_option.search_text"
                                 sort-by="invoice" :show-empty="true" @filtered="on_filtered">
                            <template #cell(company)="row">
                                <div class="d-flex">
                                    <p class="align-self-center mb-0 admin-name">{{row.value}}</p>
                                </div>
                            </template>
                            <template #cell(name)="row">
                                <div class="d-flex">
                                    <span class="inv-email">
                                    {{row.value}}
                                    </span>
                                </div>
                            </template>
                            <template #cell(description)="row">
                                <span class="inv-email">
                                    <i>{{row.value}}</i>
                                </span>
                            </template>
                            <template #cell(startDate)="row">
                                <span class="inv-date">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    {{row.value}}
                                </span>
                            </template>
                            <template #cell(status)="row">
                                <b-badge :variant="badgeclass(row.value)" class="inv-status">{{badgelabel(row.value)}}</b-badge>
                            </template>
                            <template #cell(actions)="row">
                                <div class="position-relative">
                                    <b-button tag="a" :href="'/products/' + row.item.idEvent" variant="info" class="ml-2" size="sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        {{row.value}}
                                    </b-button>
                                    <b-button 
                                    variant="warning" 
                                    class="ml-2" 
                                    size="sm"
                                    id="editeventBtn"

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        {{row.value}}
                                    </b-button>
                                </div>
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
    import axios from 'axios';
    import '@/assets/sass/apps/invoice-list.scss';
    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    export default {
        metaInfo: { title: 'Events List' },
        components: {
            flatPickr
        },
        data() {
            return {
                items: [], columns: [], posts: [], errors: [],
                table_option: { total_rows: 0, current_page: 1, page_size: 10, search_text: '' },
                meta: {},
                is_select_all: false, selected_rows: [],
                date1: '2020-09-04',
                date2: '2020-09-04',
            }
        },
        watch: {
            table_option: {
                handler: function () {
                    this.get_meta();
                    this.clear_selection();
                },
                deep: true
            },
        },
        created() {
            axios.get('https://read.prendoquota.it/api/v1/events')
            .then(response => {
              // JSON responses are automatically parsed.
              this.items = response.data.items
            })
            .catch(e => {
              this.errors.push(e)
            })
        },
        mounted() {
            this.bind_data();
        },
        methods: {
            bind_data() {
                this.columns = [
                    { key: 'company', label: this.$t('company'), sortable: true },
                    { key: 'name', label: this.$t('name'), sortable: true },
                    { key: 'description', label: this.$t('description'), sortable: true },
                    { key: 'startDate', label: this.$t('start_date'), sortable: true },
                    { key: 'status', label: this.$t('status'), sortable: true },
                    { key: 'actions', label: '', class: 'actions text-center' }
                ];
                
                /*
                this.items = [
                    { id: 1, invoice: '081451', company: 'Laurie Fox', name: 'Evento 1', description: 'bla bla bla', startdate: '15 Dec 2020', status: { key: 'Open', class: 'success' } },
                    { id: 3, invoice: '081681',  company: 'James Taylor', name: 'Evento 2', description: 'bla bla bla', startdate: '27 Dec 2020',  status: { key: 'Closed', class: 'danger' } }
                ];
                */
                
                this.table_option.total_rows = this.items.length;
                this.get_meta();
            },
            on_filtered(filtered_items) {
                this.refresh_table(filtered_items.length);
            },
            delete_row(item) {
                if (confirm('Are you sure want to delete selected row ?')) {

                    if (item) {
                        this.items = this.items.filter(d => d.id != item.id);
                    }
                    else {
                        this.items = this.items.filter(d => !this.selected_rows.includes(d.id));
                    }
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
            badgeclass(string){
                if(string == "o"){
                    return "success"
                }
                if(string == "c"){
                    return "danger"
                }
            },
            badgelabel(string){
                if(string == "o"){
                    return this.$t('open')
                }
                if(string == "c"){
                    return this.$t('closed')
                }
            }

        }
    };
</script>

