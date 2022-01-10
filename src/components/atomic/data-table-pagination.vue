<template>
  <div
    :class="
      ['Service', 'List'].includes(this.$route.name) == true
        ? 'pagination_block'
        : 'pagination_block-self'
    "
  >
    <span
      v-if="['Service', 'List'].includes(this.$route.name)"
      class="total_count"
    >
      {{ getSelectedRowsLength }} Seçili</span
    >
    <el-pagination
      class="paginate"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="current_page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="getCurrentLimit"
      layout="sizes, prev, pager, next"
      :total="getTotalRecord"
      :popper-class="'popper'"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DataTablePagination',
  data() {
    return {
      selected_pagi: {
        // limit: this.paginate.per_page,
        // page: this.current_page,
        limit: this.getCurrentPage,
        page: this.getCurrentLimit
      }
    }
  },
  props: {
    paginate: {
      type: Object,
      default: () => {
        return {
          to: 10,
          per_page: 10,
          total_record: 50
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getCurrentLimit: 'pagination/getCurrentLimit',
      getCurrentPage: 'pagination/getCurrentPage',
      getTotalRecord: 'pagination/getTotalRecord'
    }),
    getSelectedRowsLength() {
      return this.$store.state.dataTable.selectedRows.length
    },
    current_page() {
      return parseInt(this.paginate.to / this.paginate.per_page)
    }
  },
  methods: {
    ...mapActions({
      setCurrentPage: 'pagination/setCurrentPage',
      setCurrentLimit: 'pagination/setCurrentLimit',
      setSelectedPage: 'pagination/setSelectedPage',
      setSelectedLimit: 'pagination/setSelectedLimit'
    }),
    handleSizeChange(val) {
      // this.selected_pagi.limit = val;
      // this.selected_pagi.page = 1;
      this.setCurrentLimit(val)
      this.$emit('onChangeSize', this.selected_pagi)
    },
    handleCurrentChange(val) {
      if (val) {
        // this.selected_pagi.page = val;
        // this.selected_pagi.limit = this.paginate.per_page;
        this.setCurrentPage(val)
        this.$emit('onChangeCurrentPage', this.selected_pagi)
      }
    }
  },
  mounted() {
    // this.setCurrentPage(1);
    // this.setCurrentLimit(10);
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

.pagination_block {
  display: flex;
  justify-content: center;
  max-width: 100%;
  .paginate {
    align-items: center;
    // margin-left: 25%;
  }
  padding: 27px 38px 12px 32px;
}
.pagination_block-self {
  @extend .pagination_block;
  display: flex;
  margin-top: 16px;
  justify-content: flex-end;
}
.el-pagination__sizes .el-select {
  position: absolute;
  right: 20px;
}
.el-pager .number {
  padding: 3px;
  font-family: SF Pro Text, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  text-align: center;

  /* Gray Dark */

  color: #444444;
  background: $hybrone_background_color !important;
  /* Hybrone Light Blue */

  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 4px;
  &.active {
    border: 1px solid $hybrone_light_blue;
    color: $hybrone_light_blue !important;
  }
}
.total_count {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  justify-content: flex-start;
  //   margin-right: 50%;
  color: $hybrone_light_blue;
}
// .el-pager .number {
//   background: $hybrone_background_color;
//   /* Hybrone Light Blue */

//   border: 1px solid $hybrone_light_blue;
//   box-sizing: border-box;
//   border-radius: 4px;
// }
</style>
