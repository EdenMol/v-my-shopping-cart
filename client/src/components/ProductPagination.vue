<template>
  <nav class="mt-5">
    <ul class="pagination">
      <li
        class="page-item"
        v-if="currentPage !== 1"
        @click="getProducts(currentPage - 1)"
      >
        <button class="btn btn-secondary mx-1">Previous</button>
      </li>
      <li
        class="page-item"
        v-for="(page, i) in pageCount"
        :key="i"
        @click="getProducts(page)"
      >
        <button
          class="btn mx-1"
          :class="[i + 1] === currentPage ? 'btn-primary' : 'btn-secondary'"
        >
          {{ page }}
        </button>
      </li>
      <li
        class="page-item"
        v-if="currentPage !== pageCount"
        @click="getProducts(currentPage + 1)"
      >
        <button class="btn btn-secondary mx-1">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["pageCount", "currentPage"]),
  },
  methods: {
    ...mapActions(["setProductsByCategoryPaginationAction"]),
    ...mapMutations(["setCurrentPage"]),
    getProducts(page) {
      this.setCurrentPage(page);
      this.setProductsByCategoryPaginationAction(page);
    },
  },
};
</script>