<template>
  <div class="col-3">
    <h3>Categories</h3>
    <ul class="nav flex-column mt-3">
      <li class="nav-item">
        <router-link class="nav-link" to="/categories/all">All</router-link>
      </li>
      <li class="nav-item" v-for="(category, index) in categories" :key="index">
        <router-link class="nav-link" :to="'/categories/' + category.slug">{{
          category.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["categories"]),
  },
};
</script>
<style scoped>
a.router-link-active {
  background: rgb(191, 191, 241);
  color: white;
}
</style>