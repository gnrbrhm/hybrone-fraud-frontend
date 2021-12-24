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
import { mapActions } from 'vuex'
export default {
  name: 'UserPermissions',
  components: {
    UserPermissionHeader,
    DataTable,
    UserPermissionList
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    ...mapActions({
      getUsers: 'auth/getUsers'
    }),
    getUserList() {
      let result = this.getUsers()
      result.then((r) => {
        this.data = r.data.data.users
      })
      console.log('Result', result)
      return result
    }
  },
  created() {
    this.getUserList()
  },
  mounted() {}
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
