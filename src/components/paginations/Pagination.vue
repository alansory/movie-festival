<template>
  <button
    data-page-btn="first"
    data-page-num="1"
    class="pag-btns btn-arrow"
    @click="loadPage(currentPage - 1)" :disabled="currentPage === 1"
  >
    Previous
  </button>
  <span>Page {{ currentPage }} of {{ totalPages }}</span>
  <button
    data-page-btn="last"
    class="pag-btns btn-arrow"
    :data-page-num="pagination.current_page_last - 1"
    @click="loadPage(currentPage + 1)"
  >
    Next
  </button>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
    },
    fetchLists: {
      type: Function,
      required: true
    }
  },
  setup(props){
    const currentPage = ref(1);
    const itemsPerPage = 10; 
    let totalPages = 18;
    const loadPage = (page) => {
      if (page >= 1) {
        currentPage.value = page;
        props.fetchLists(page, itemsPerPage);
      }
    };
    return {
      itemsPerPage,
      currentPage,
      totalPages,
      loadPage
    };
  }
}
</script>