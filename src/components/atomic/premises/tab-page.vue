<template>
  <div class="tab-pane-container">
    <el-tabs
      :stretch="true"
      type="card"
      @tab-click="handleClick"
      style="width: 100%"
    >
      <el-tab-pane label="LOKASYON">
        <PremiseDetail></PremiseDetail>
      </el-tab-pane>
      <el-tab-pane label="KİŞİLER"
        ><PremisePersons></PremisePersons>
      </el-tab-pane>
      <el-tab-pane label="CİHAZLAR"
        ><PremiseDevices></PremiseDevices
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { PREMISE_DEVICES } from '@/constant'
import PremisePersons from '@/components/premises/premise-persons'
import PremiseDevices from '@/components/premises/premise-devices'
import PremiseDetail from '@/components/premises/premise-detail'
import { mapGetters } from 'vuex'
export default {
  name: 'TabPage',
  components: {
    PremisePersons,
    PremiseDevices,
    PremiseDetail
  },
  data() {
    return {
      map: null,
      activeName: 'location',
      premise_device: []
    }
  },
  computed: {
    ...mapGetters({
      getSelectedRow: 'dataTable/getSelectedRow'
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },

  created() {
    this.premise_device = [...PREMISE_DEVICES]
  },
  mounted() {
    console.log('This.GetSelected', this.getSelectedRow)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
.tab-pane-container {
  max-width: 100%;
}
.el-tabs__header .is-top {
  border-radius: 10px 0px 0px 0px;
}
.el-tabs__nav {
  background-color: #e5e5e5;
  // border-radius: 10px 0px 0px 0px;
  // border-bottom: 1px solid black !important;
}
.el-tabs__item {
  width: 150px !important;
  height: 50px !important;
  background-color: #e5e5e5;
  // border-bottom: 1px solid black !important;
}
.is-top {
  height: 50px !important;
  border-bottom: 1px solid black;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
}
.is-active {
  background-color: #fff;
  border-left: 1px solid black !important;
  border-top: 1px solid black !important;
  border-right: 1px solid black !important;
  border-bottom: 1px solid transparent !important;
  border-radius: 10px 10px 0px 0px !important;
  height: 50px !important;
}

.el-tabs__content {
  top: -15px;
  // border-top: 1px solid black;
  margin: 0px;
  width: 463px;
  height: auto;
  border-radius: 0px 0px 0px 10px;
  background: $hybrone_background_color;
}
</style>
