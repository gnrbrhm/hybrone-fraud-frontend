<template>
  <div class="map-view">
    <MapView class="view" v-if="isRendered"></MapView>
  </div>
</template>

<script>
import MapView from "@/components/map/map-view";

export default {
  name: "CreateMap",
  components: {
    MapView,
  },
  data() {
    return {
      premise: null,
      isRendered: false,
    };
  },
  mounted() {
    this.isRendered = true;
  },
};
</script>

<style lang="scss" scoped>
.map-view .view {
  overflow: hidden;
  display: flex !important;
  width: 750px !important;
  height: 722px !important;
  border: 1px solid #007db7;
  box-sizing: border-box;
  border-radius: 10px;
}
</style>
