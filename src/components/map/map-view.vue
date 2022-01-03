<template>
  <div>
    <div v-if="this.$route.name === 'Map'" class="legand-map">
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
    <div id="map" :style="this.$route.name !== 'Map' ? 'margin:0' : ''"></div>
  </div>
</template>

<script>
import leaflet from 'leaflet'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { bus } from '@/main.js'
export default {
  name: 'MapView',
  data() {
    return {
      maps: null,
      marker: null,
      isRender: true,
      bus: {}
    }
  },
  props: {
    premise: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      getCurrentLocation: 'getCurrentLocation'
    })
  },
  methods: {
    ...mapActions({
      setSelectedLocation: 'setSelectedLocation'
    }),
    async addMarkerAndFlyTo(val) {
      console.log('Val', val)
      leaflet.marker([val.lat, val.long]).addTo(this.maps)
      this.maps.flyTo([val.lat, val.long], 14)
      this.$forceUpdate()
    },
    handleCurrentChangeRowPremise() {
      this.addMarkerAndFlyTo(this.getCurrentLocation.location)
    }
  },
  mounted() {
    let L = leaflet
    this.maps = leaflet.map('map').setView([38.963745, 35.243322], 6)
    L.tileLayer(this.$map, {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'base'
    }).addTo(this.maps)
    if (this.$route.name == 'Premises') {
      console.log('GetCurrentLocation Premise', this.getCurrentLocation)
      this.addMarkerAndFlyTo(this.getCurrentLocation.location)
    }
    // if (this.$route.name == "CreatePremise") {
    if (['CreatePremise', 'UpdatePremise'].includes(this.$route.name)) {
      this.maps.on('click', (e) => {
        if (this.marker) this.maps.removeLayer(this.marker)
        this.marker = L.marker(e.latlng).addTo(this.maps)
        this.$store.dispatch('setSelectedLocation', {
          ...this.marker.getLatLng()
        })
        this.selected_location = true
      })
    }

    bus.$on('onCurrentChangeRowPremise', () =>
      this.handleCurrentChangeRowPremise()
    )
  }
}
</script>
<style lang="scss">
#map {
  width: 100%;
  height: 100vh;
  margin-left: 14px;
}
/*Lejant Scss */
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
  font-family: Roboto, sans-serif;
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
