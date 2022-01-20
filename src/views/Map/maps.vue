<template>
  <div>
    <ListFilter
      class="top"
      @onActionClick="handleActionClick"
      @onFilteredData="handleFilteredData"
    ></ListFilter>

    <div class="legand-map">
      <span class="legand-text">
        <i class="normal"></i>
        Normal
      </span>
      <span class="legand-text">
        <i class="non-device"></i>
        Cihaz Yok
      </span>
      <span class="legand-text"> <i class="fault"></i> Hatalı </span>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import endpoints from '@/endpoints/index.js'
import ListFilter from '@/components/list/list-filter'
import leaflet from 'leaflet'
import ls from 'leaflet-search'
import * as L1 from 'leaflet.markercluster'
import { mapActions } from 'vuex'
// import MapFilter from '@/components/filter/map-filter'
export default {
  name: 'Maps',
  data() {
    return {
      map: null,
      markers: null,
      device_id: '',
      location: [],
      locations: [],
      premises: [],
      premise: [],
      device_state: {
        state: {
          is_connection: null,
          is_storage: null,
          is_record: null,
          is_last_signal: null
        },
        channels: {
          first: null,
          second: null,
          thirdth: null,
          forth: null
        }
      }
    }
  },
  components: {
    ListFilter
  },
  methods: {
    ...mapActions({
      getVguardDevicesForMap: 'device/getVguardDevicesForMap'
    }),
    async handleFilteredData(val) {
      this.map.removeLayer(this.markers)
      this.locations = []
      console.log('Maps Filter Data', val)
      await this.getPremiseLocation(val)
    },
    handleStateFilter(val) {
      this.map.removeLayer(this.markers)
      this.locations = []
      this.premises = val.data.devices
      this.premises.forEach((element) => {
        this.location.push(element.premise.location.lat)
        this.location.push(element.premise.location.long)
        this.location.push(element.premise.location.province)
        this.location.push(element)
        this.location.push(element.premise.custom_premise_id)
        this.locations.push(this.location)
        this.location = []
      })
      this.createMarker(this.locations)
    },
    routeDeviceDetail() {
      this.$router.push({
        name: 'DeviceDetail',
        params: { device_id: this.device_id }
      })
    },
    onSubmitFilter(val) {
      this.map.flyTo([val.data.lat, val.data.long], 14)
    },
    onLocationFilter(val) {
      if (val) this.map.flyTo([val.data.lat, val.data.long], 10)
      else
        this.$notify({
          text: 'Aradığınız ilde İstasyon bulunmamaktadır.',
          type: 'error'
        })
    },
    async createPopup(status) {
      let popup = {
        popupContent:
          "<div><span>İstasyon ID</span></div><div class='column-2'><div class='first-row'>Kanal Durumları</div><div class='second-row'><div class='first-channel-success'></div></div><div class='third-row'>Sağlık Durumları</div><div class='fourht-row'></div></div>",
        popupOptions: {
          maxWidth: '500',
          className: 'another-popup' // classname for another popup
        }
      }
      return popup
    },
    async getDeviceStatus(config) {
      console.log('Config', config)
      if (config.hardware_type_id == 3) {
        let channels = config.channels
        // let channels = []

        // config.channels.forEach((channel) => {
        //   let channels_events = config.events.filter((event) => {
        //     return event.channel_id == channel.channel_id
        //   })
        //   if (channels_events.length > 0) {
        //     channels.push({
        //       channel_id: channel.channel_id,
        //       category: channel.category,
        //       status: channel.status,
        //       ...channels_events[0]
        //     })
        //   } else {
        //     channels.push({
        //       channel_id: channel.channel_id,
        //       category: channel.category,
        //       status: channel.status
        //       // is_active: false
        //     })
        //   }
        // })
        this.device_state.state.is_connection =
          config.is_active == true ? !config.network_error : null
        this.device_state.state.is_storage =
          config.is_active == true ? !config.disk_error : null
        this.device_state.state.is_record =
          config.is_active == true ? !config.record_error : null
        this.device_state.state.is_last_signal =
          config.is_active == true ? !config.datetime_error : null
        this.device_state.channels.first = channels[0].status
          ? channels[0].is_active && !channels[0].show_warning
          : null
        this.device_state.channels.second = channels[1].status
          ? channels[1].is_active && !channels[1].show_warning
          : null
        this.device_state.channels.thirdth = channels[2].status
          ? channels[2].is_active && !channels[2].show_warning
          : null
        this.device_state.channels.forth = channels[3].status
          ? channels[3].is_active && !channels[3].show_warning
          : null
      } else {
        if (!config.network_error) {
          this.device_state.channels.first =
            config.is_active == true ? config.events[0].is_active : null
          this.device_state.channels.second =
            config.is_active == true ? config.events[1].is_active : null
          this.device_state.channels.thirdth =
            config.is_active == true ? config.events[2].is_active : null
          this.device_state.channels.forth =
            config.is_active == true ? config.events[3].is_active : null
        } else {
          this.device_state.channels.first = false
          this.device_state.channels.second = false
          this.device_state.channels.thirdth = false
          this.device_state.channels.forth = false
        }
        this.device_state.state.is_connection =
          config.is_active == true ? config.network_error : null
        this.device_state.state.is_storage =
          config.is_active == true ? config.disk_error : null

        this.device_state.state.is_record =
          config.is_active == true ? config.record_error : null
        this.device_state.state.is_last_signal =
          config.is_active == true ? config.datetime_error : null
      }
      return this.device_state
    },
    createMarker(addressPoints) {
      let L = leaflet
      let device_status
      // var markers = new L.MarkerClusterGroup()
      this.markers = new L.MarkerClusterGroup()
      addressPoints.forEach((item) => {
        if (item[3]) {
          device_status = this.getDeviceStatus(item[3].devices)
        }
        var title = item[2].name
        var myIcon
        var marker
        if (item[3]) {
          // .statuses.includes('normal')
          this.device_id = item[3].devices.id
          myIcon = L.divIcon({
            className: item[3].is_online
              ? 'leaflet-custom-success-marker'
              : 'leaflet-custom-fault-marker',
            html: `<span class="custom-marker-span">ID : ` + item[4] + `</span>`
          })
          marker = L.marker(new L.LatLng(item[0], item[1]), {
            icon: myIcon
          })
          var popupContent =
            `<div class='column-1'>
         <div class="atm_id_label">İstasyon ID</div>
          <span class="atm_id_text">` +
            item[4] +
            `</span>
          </div>
          <div class='column-2'>
          <div class='first-row'>Kanal Durumları</div>
          <div class='second-row'>
          <div class='` +
            (this.device_state.channels.first != null
              ? this.device_state.channels.first
                ? 'first-channel-success'
                : 'first-channel-fault'
              : 'first-channel-undefined') +
            `'></div>
                      <div class='` +
            (this.device_state.channels.second != null
              ? this.device_state.channels.second
                ? 'second-channel-success'
                : 'second-channel-fault'
              : 'second-channel-undefined') +
            `'></div>
                      <div class='` +
            (this.device_state.channels.thirdth != null
              ? this.device_state.channels.thirdth
                ? 'thirdth-channel-success'
                : 'thirdth-channel-fault'
              : 'thirdth-channel-undefined') +
            `'></div>
                      <div class='` +
            (this.device_state.channels.forth != null
              ? this.device_state.channels.forth
                ? 'forth-channel-success'
                : 'forth-channel-fault'
              : 'forth-channel-undefined') +
            `'></div>

            </div>
            <div class='third-row'>Sağlık Durumları</div>
            <div class='fourht-row'>
          <div class='` +
            (this.device_state.state.is_connection
              ? 'connection-success'
              : 'connection-fault') +
            `'></div>
                      <div class='` +
            (this.device_state.state.is_storage
              ? 'record-success'
              : 'record-fault') +
            `'></div>
                      <div class='` +
            (this.device_state.state.is_record
              ? 'signal-success'
              : 'signal-fault') +
            `'></div>
                      <div class='` +
            (this.device_state.state.is_last_signal
              ? 'senkron-success'
              : 'senkron-fault') +
            `'></div>
            </div>
            </div>`
          var popupOptions = {
            maxWidth: '500',
            className: 'another-popup' // classname for another popup
          }
          marker.bindPopup(popupContent, popupOptions)
        } else {
          myIcon = L.divIcon({
            className: 'leaflet-custom-non-device-marker',
            html: `<span class="custom-marker-span">ID : ` + item[4] + `</span>`
          })
          marker = L.marker(new L.LatLng(item[0], item[1]), {
            icon: myIcon
          })
          // var popupNonDeviceContent = 'Cihaz Bulunmamaktadır.'
          // var popupNonDeviceOptions = {
          //   maxWidth: '500',
          //   className: 'another-non-device-popup' // classname for another popup
          // }
          // marker.bindPopup(popupNonDeviceContent, popupNonDeviceOptions)
        }
        marker.on('mouseover', function (e) {
          this.openPopup()
        })
        marker.on('mouseout', function (e) {
          this.closePopup()
        })
        let temp = {
          gotoDetail: () => {
            this.$router.push({
              name: 'DeviceDetail',
              params: { device_id: item[3].devices.id }
            })
          }
        }
        marker.on('click', function (e) {
          temp.gotoDetail()
        })
        this.markers.addLayer(marker)
      })
      for (var i = 0; i < addressPoints.lenght; i++) {
        var a = addressPoints[i]
        var title = a[2]
        var marker = L.marker(new L.LatLng(a[0], a[1]), {
          title: title,
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        })
        marker.bindPopup(title)
        marker.on('click', function (e) {
          this.routeDeviceDetail()
        })
        marker.on('mouseover', function (e) {
          this.openPopup()
        })
        marker.on('mouseout', function (e) {
          this.closePopup()
        })
        this.markers.addLayer(marker)
      }
      // markers.refreshClusters(marker_icon);

      this.map.addLayer(this.markers)
    },
    async mapingFunction(val) {
      this.premises = val
      this.premises.forEach((element) => {
        this.location.push(element.premise.location.lat)
        this.location.push(element.premise.location.long)
        this.location.push(element.premise.location.province)
        this.location.push({ devices: element })
        this.location.push(element.premise.custom_premise_id)
        this.locations.push(this.location)
        this.location = []
      })
      this.createMarker(this.locations)
    },
    async getPremiseLocation(payload) {
      let devices = await this.getVguardDevicesForMap({ ...payload })
      // this.mapingFunction(r.data.data.premises)
      this.mapingFunction(devices)
    }
  },
  created() {
    this.getPremiseLocation()
  },
  mounted() {
    let L = leaflet
    this.map = L.map('map').setView([38.963745, 35.243322], 6)
    delete L.Icon.Default.prototype._getIconUrl
    // eslint-disable-next-line
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })

    var addressPoints = new Array(this.locations)
    var southWest = L.latLng(26.712, 45.227)
    var northEast = L.latLng(36.774, 42.125)
    var bounds = L.latLngBounds(southWest, northEast)
    L.tileLayer('http://10.100.0.34:8081/tile/{z}/{x}/{y}.png', {
      // L.tileLayer('http://34.79.135.127:8081/tile/{z}/{x}/{y}.png', {
      maxZoom: 18,
      maxBounds: bounds,
      zoomControl: false,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'base'
    })
      .addTo(this.map)
      .on('mouseover,')
    var markers = new L.MarkerClusterGroup()
    this.map.zoomControl.setPosition('botttomleft')
    this.map.fitBounds(bounds)
    this.map.addLayer(markers)
  }
}
</script>

<style lang="scss">
// .layout {
//   margin-left: 0px;
//   margin-right: 0px;
// }
#map {
  width: 100%;
  height: 100vh;
  margin-left: 12px !important;
}
.leaflet-zoom-animated {
  left: -5px !important;
  bottom: -20px !important;
}
// Marker Class
.leaflet-custom-success-marker {
  background-image: url('../../assets/maps-icon/success-marker.svg');
  background-repeat: no-repeat;
  width: 56px !important;
  height: 39px !important;
}
.leaflet-custom-fault-marker {
  background-image: url('../../assets/maps-icon/fault-marker.svg');
  background-repeat: no-repeat;
  width: 56px !important;
  height: 39px !important;
}
.leaflet-custom-non-device-marker {
  background-image: url('../../assets/maps-icon/non-device-marker.svg');
  background-repeat: no-repeat;
  width: 56px !important;
  height: 39px !important;
}
.custom-marker-span {
  color: #ffffff;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 6px;
}

// Custom Popup class
.another-popup .leaflet-popup-content-wrapper {
  background: #ffffff;
  font-size: 12px;
  line-height: 24px;
  border-radius: 5px;
  width: 308px;
  height: 162px;
  left: 50px;
}
.another-non-device-popup .leaflet-popup-content-wrapper {
  background: #ffffff;
  font-size: 12px;
  line-height: 24px;
  border-radius: 5px;
  width: auto;
  height: auto;
  left: 0px !important;
}
.another-popup .leaflet-popup-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 140px 6px;
  // grid-template-rows: repeat(1, 140px);
  grid-gap: 20px;
}
.another-popup .leaflet-popup-content .atm_id_label {
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
}
.another-popup .leaflet-popup-content .atm_id_text {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
}
.another-popup .leaflet-popup-content .column-1 {
  grid-column: 1/2;
  display: grid;
  grid-template-rows: repeat(4, 0.25fr);
  grid-gap: 5px;
}
.another-popup .leaflet-popup-content .column-2 {
  grid-column: 2/5;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 5px;
}
.another-popup .leaflet-popup-content .column-2 .first-row {
  font-family: Roboto;
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
}
.another-popup .leaflet-popup-content .column-2 .third-row {
  @extend .first-row;
}
.another-popup .leaflet-popup-content .column-2 .second-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .first-channel-success {
  background-image: url('../../assets/maps-icon/channel-1-success.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .first-channel-fault {
  background-image: url('../../assets/maps-icon/channel-1-fault.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .first-channel-undefined {
  background-image: url('../../assets/maps-icon/channel-1-undefined.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .second-channel-success {
  background-image: url('../../assets/maps-icon/channel-2-success.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .second-channel-fault {
  background-image: url('../../assets/maps-icon/channel-2-fault.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .second-channel-undefined {
  background-image: url('../../assets/maps-icon/channel-2-undefined.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .thirdth-channel-success {
  background-image: url('../../assets/maps-icon/channel-3-success.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .thirdth-channel-fault {
  background-image: url('../../assets/maps-icon/channel-3-fault.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .thirdth-channel-undefined {
  background-image: url('../../assets/maps-icon/channel-3-undefined.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .forth-channel-success {
  background-image: url('../../assets/maps-icon/channel-4-success.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .forth-channel-fault {
  background-image: url('../../assets/maps-icon/channel-4-fault.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .second-row
  .forth-channel-undefined {
  background-image: url('../../assets/maps-icon/channel-4-undefined.svg');
  background-repeat: no-repeat;
}
.another-popup
  .leaflet-popup-content
  .column-2
  .fourht-row
  .connection-success {
  background-image: url('../../assets/maps-icon/healt-icon/connection-success.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row .connection-fault {
  background-image: url('../../assets/maps-icon/healt-icon/connection-fault.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row .record-success {
  background-image: url('../../assets/maps-icon/healt-icon/record-success.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row .record-fault {
  background-image: url('../../assets/maps-icon/healt-icon/record-fault.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row .signal-success {
  background-image: url('../../assets/maps-icon/healt-icon/signal-success.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row .signal-fault {
  background-image: url('../../assets/maps-icon/healt-icon/signal-fault.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row .senkron-success {
  background-image: url('../../assets/maps-icon/healt-icon/senkron-success.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content .column-2 .fourht-row .senkron-fault {
  background-image: url('../../assets/maps-icon/healt-icon/senkron-fault.svg');
  background-repeat: no-repeat;
}
.another-popup .leaflet-popup-content-wrapper a {
  color: rgba(200, 200, 200, 0.1);
}
.another-popup .leaflet-popup-tip-container {
  width: 450px;
  height: 200px;
}
.another-popup .leaflet-popup-tip {
  background: transparent;
  border: none;
  box-shadow: none;
}
.legand-map {
  position: absolute;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  left: 90%;
  top: 87%;
  width: 150px;
  height: 100px;
  z-index: 9999;
  opacity: 0.5;
}
.legand-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
}
.normal {
  background-color: #6fcf97;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 7px;
}
.non-device {
  background-color: #f2994a;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 7px;
}
.fault {
  background-color: #eb5757;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 7px;
}
</style>
