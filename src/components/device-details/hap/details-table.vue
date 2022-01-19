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
          :status="
            scope.row.status
              ? scope.row.is_active && !scope.row.show_warning
              : null
          "
          :device_id="scope.row.channel_id"
        ></SvgIconFirstChannel>
      </template>
    </el-table-column>
    <el-table-column
      property="category"
      label="KATEGORİ"
      min-width="35"
      align="center"
      ><template slot-scope="scope">
        {{ scope.row.category.toUpperCase() }}
      </template>
    </el-table-column>
    <el-table-column
      property="has_video_loss"
      label="VİDEO KAYBI"
      min-width="35"
      align="center"
    >
      <template slot-scope="scope"
        ><SvgIconChannelStatus
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.has_video_loss
              : null
          "
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
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.motion_detect
              : null
          "
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
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.has_sabotage
              : null
          "
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
          :status="
            scope.row.status && scope.row.is_active
              ? !scope.row.has_scene_change
              : null
          "
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
        <el-button
          :disabled="
            !scope.row.status ||
            !scope.row.is_active ||
            !getPermissions['take_snapshot']
          "
          class="button"
        >
          <!-- :disabled="!scope.row.status && !this.getPermissions['take_snapshot']" -->
          <!-- scope.row.status &&
              getPermissions['download_records'] && -->
          <SvgIconSnapshot
            @click="snapshotClick(scope.row.channel_id)"
            :status="scope.row.status && scope.row.is_active"
          ></SvgIconSnapshot>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      property="by_pass"
      label="KAYIT İNDİR"
      min-width="35"
      align="center"
    >
      <!-- :disabled="!scope.row.status && !this.getPermissions['download_records']" -->

      <template slot-scope="scope">
        <el-button
          :disabled="
            !scope.row.status ||
            !scope.row.is_active ||
            !getPermissions['download_record']
          "
          class="button"
          @click="downloadRecord(scope.row.channel_id)"
        >
          <!-- scope.row.status &&
              getPermissions['download_records'] && -->
          <SvgIconDownload
            :status="scope.row.status && scope.row.is_active"
          ></SvgIconDownload>
        </el-button>
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
  watch: {
    data: function (val) {
      console.log('Gelen DAta', val)
    }
  },
  computed: {
    ...mapGetters({
      getDevice: 'device/getDevice',
      getPermissions: 'auth/getPermissions'
    }),
    statusCheckRecordDownload() {
      return this.getPermissions['download_record']
    },
    statusCheckSnapshotDownload() {
      return this.getPermissions['take_snapshot']
    }
  },
  methods: {
    downloadRecord(val) {
      console.log('Emit ÜStü', val)
      this.$emit('onDownloadRecordClick', val)
    },
    snapshotClick(val1) {
      console.log(val1)
      this.$emit('onSnapshotClick', val1)
      this.selected_channel_id = val1
    }
  },
  mounted() {
    console.log('Permission Channel', this.getPermissions)
  }
}
</script>

<style lang="scss" scoped>
.button {
  padding: 0px;
  margin: 0px;
  border: none;
  background: none;
  &:hover {
    background-color: #e0e0e0;
  }
}
</style>
