<template>
  <div>
    <Sidebar></Sidebar>
    <router-view>
      <Auth></Auth>
    </router-view>
  </div>
</template>

<script>
import Auth from '../views/Auth/auth.vue'
import Sidebar from '@/components/sidebar/sidebar.vue'

export default {
  name: 'auth',
  components: {
    Auth,
    Sidebar
  }
}
</script>
