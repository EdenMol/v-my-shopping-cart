<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Shopping Cart</router-link>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <!-- <div class="collapse navbar-collapse" id="navbarsExampleDefault"> -->
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active" v-for="(p, i) in pages" :key="i">
        <router-link
          class="nav-link"
          v-if="p.slug != 'home'"
          :to="'/' + p.slug"
          >{{ p.name }}</router-link
        >
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/admin">Admin</router-link>
      </li>
    </ul>
    <!-- </div> -->
    <cart-summary class="float-right" />
  </nav>
</template>

<script>
import { mapState } from "vuex";
import CartSummary from "./CartSummary.vue";

export default {
  components: { "cart-summary": CartSummary },
  computed: {
    ...mapState(["pages"]),
  },
};
</script>