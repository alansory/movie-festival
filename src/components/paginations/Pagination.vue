<template>
  <button
    data-page-btn="first"
    data-page-num="1"
    class="pag-btns btn-arrow"
  >
    Page {{ pagination.page }}
  </button>
  <button
    data-page-btn="back"
    class="pag-btns btn-arrow"
    :data-page-num="pagination.page - 1"
  >
    Back
  </button>
  <button
    data-page-btn="last"
    class="pag-btns btn-arrow"
    :data-page-num="pagination.current_page_last - 1"
  >
    Page {{ pagination.current_page_last - 1 }}
  </button>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
    }
  },
  // setup(props){
  //   console.log("pahi -->", props.pagination)
  // }
}
</script>