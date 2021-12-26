<template>
  <el-table
    ref="detailsTable"
    :data="data"
    :header-cell-style="{ color: '#444444' }"
    style="width: 100%; max-height: calc(100vh - 180px); overflow: auto"
    stripe
    highlight-current-row
    height="600px"
  >
    <el-table-column property="id" label="KANAL" min-width="35" align="center">
      <template slot-scope="scope"
        ><SvgIconFirstChannel
          :status="scope.row.is_active"
          :device_id="scope.row.channel_id"
        ></SvgIconFirstChannel>
      </template>
    </el-table-column>
    <el-table-column
      property="is_active"
      label="KATEGORİ"
      min-width="35"
      align="center"
    ></el-table-column>
    <el-table-column
      property="has_video_loss"
      label="VİDEO KAYBI"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="scope.row.has_video_loss"
        ></SvgIconChannelStatus>
      </template>
    </el-table-column>
    <el-table-column
      property="HAREKET ALGILAMA"
      label="HAREKET ALGILAMA"
      min-width="40"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="scope.row.motion_detect"
        ></SvgIconChannelStatus>
      </template>
    </el-table-column>
    <el-table-column
      property="has_sabotage"
      label="VİDEO SABOTAJ"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="scope.row.has_sabotage"
        ></SvgIconChannelStatus>
      </template>
    </el-table-column>
    <el-table-column
      property="sabotage"
      label="SAHNE DEĞİŞİMİ"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="scope.row.has_scene_change"
          :device_id="scope.row.channel_id"
        ></SvgIconChannelStatus>
      </template>
    </el-table-column>
    <el-table-column
      property="trouble"
      label="ANLIK GÖRÜNTÜ"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <!-- <el-button @click.native.prevent="snapshotClick(scope.$index, data)"> -->
        <SvgIconSnapshot
          @click.native.prevent="snapshotClick(scope.row.channel_id)"
          :status="scope.row.is_active"
        ></SvgIconSnapshot>
        <!-- </el-button> -->
      </template>
    </el-table-column>
    <el-table-column
      property="by_pass"
      label="KAYIT İNDİR"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope">
        <SvgIconDownload
          @click.native.prevent="downloadRecord(scope.row.channel_id)"
          :status="scope.row.is_active"
        ></SvgIconDownload>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import SvgIconAlarm from '@/components/atomic/device/hap/svg-icon-alarm.vue'
// import SvgIconFault from '@/components/atomic/device/hap/svg-icon-fault.vue'
// import SvgIconSabotage from '@/components/atomic/device/hap/svg-icon-sabotage.vue'
import SvgIconFirstChannel from '@/assets/icons/device-details/svg-icon-first-channel.vue'
import SvgIconChannelStatus from '@/assets/icons/device-details/svg-icon-channel-status.vue'
import SvgIconSnapshot from '@/assets/icons/device-details/svg-icon-snaphot.vue'
import SvgIconDownload from '@/assets/icons/device-details/svg-icon-download.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailsTable',
  components: {
    SvgIconChannelStatus,
    SvgIconFirstChannel,
    SvgIconSnapshot,
    SvgIconDownload
    // SvgIconAlarm,
    // SvgIconFault,
    // SvgIconSabotage
  },
  data() {
    return {
      selected_channel_id: null
    }
  },
  props: {
    data: { default: [] }
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice'
    })
  },
  methods: {
    downloadRecord(val) {
      this.$emit('onDownloadRecordClick', val)
    },
    snapshotClick(val1) {
      this.$emit('onSnapshotClick', val1)
      this.selected_channel_id = val1
    }
  }
}
</script>

<style></style>
