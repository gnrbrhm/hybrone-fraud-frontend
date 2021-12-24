<template>
  <div class="user-premise">
    <div class="header"><UserPermissionHeader></UserPermissionHeader></div>
    <div class="content">
      <DataTable :data="data"></DataTable>
      <UserPermissionList></UserPermissionList>
    </div>
  </div>
</template>

<script>
import UserPermissionHeader from '@/components/settings/user-permission-header.vue'
import DataTable from '@/components/atomic/data-table.vue'
import UserPermissionList from '@/components/settings/user-permission-list.vue'
// import { mapActions } from 'vuex'
export default {
  name: 'UserPermissions',
  components: {
    UserPermissionHeader,
    DataTable,
    UserPermissionList
  },
  data() {
    return {
      data: [],
      user: [
        {
          id: 7,
          created_at: '2021-12-15T17:03:05.649995+03:00',
          updated_at: '2021-12-15T17:03:05.649995+03:00',
          name: 'Halil',
          username: 'halil',
          is_admin: true,
          phone: '5555555555',
          restricted_premises: null,
          type: 1,
          permission: {
            id: 0,
            created_at: '0001-01-01T00:00:00Z',
            updated_at: '0001-01-01T00:00:00Z',
            user_id: 0,
            device_list_status_report_create: false,
            device_show_in_map: false,
            device_show_in_dashboard: false,
            device_show_event: false,
            device_events_status_report_create: false,
            take_snapshot: false,
            download_record: false,
            device_access_web_ui: false,
            location_create: false,
            location_edit: false,
            location_delete: false,
            device_create: false,
            device_edit: false,
            device_delete: false,
            service_create: false,
            service_delete: false,
            service_status_finished: false,
            service_report_create_and_download: false,
            service_data_import: false,
            query_period_edit: false,
            data_export: false,
            data_import: false,
            user_show_event: false,
            user_event_export: false,
            user_list_show: false,
            user_create: false,
            user_delete: false
          }
        },
        {
          id: 8,
          created_at: '2021-12-15T17:03:05.649995+03:00',
          updated_at: '2021-12-15T17:03:05.649995+03:00',
          name: 'Batuhan',
          username: 'Batuhan',
          is_admin: true,
          phone: '5555555555',
          restricted_premises: null,
          type: 2,
          permission: {
            id: 0,
            created_at: '0001-01-01T00:00:00Z',
            updated_at: '0001-01-01T00:00:00Z',
            user_id: 0,
            device_list_status_report_create: false,
            device_show_in_map: false,
            device_show_in_dashboard: false,
            device_show_event: false,
            device_events_status_report_create: false,
            take_snapshot: false,
            download_record: false,
            device_access_web_ui: false,
            location_create: false,
            location_edit: false,
            location_delete: false,
            device_create: false,
            device_edit: false,
            device_delete: false,
            service_create: false,
            service_delete: false,
            service_status_finished: false,
            service_report_create_and_download: false,
            service_data_import: false,
            query_period_edit: false,
            data_export: false,
            data_import: false,
            user_show_event: false,
            user_event_export: false,
            user_list_show: false,
            user_create: false,
            user_delete: false
          }
        }
      ]
    }
  },
  methods: {},
  created() {},
  mounted() {
    this.data = [...this.user]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.user-premise {
  display: flex;
  flex-direction: column;
  .header {
    min-width: 100%;
    color: #000;
  }
  .content {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    min-width: 100%;
    color: rgb(211, 35, 35);
    margin-left: 14px;
  }
}
</style>
