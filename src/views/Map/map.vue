<template>
  <div>
    <ListFilter></ListFilter>
    <MapView></MapView>
  </div>
</template>

<script>
import leaflet from "leaflet";
import ListFilter from "@/components/list/list-filter";
import MapView from "@/components/map/map-view";

export default {
  name: "Map",
  components: {
    ListFilter,
    MapView,
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    let L = leaflet;
    this.map = leaflet.map("map").setView([38.963745, 35.243322], 6);
    // this.$map.addTo(this.map);
    // console.log(this.map);
    L.tileLayer(this.$map, {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: "base",
    }).addTo(this.map);
  },
};
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
