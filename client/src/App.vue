<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: { Header },
  methods: {
    ...mapActions(["setPagesAction", "setCategoriesAction"]),
    ...mapActions({ initialiazeCart: "cart/initialiazeCart" }),
  },
  created() {
    this.setPagesAction();
    this.setCategoriesAction();
    this.initialiazeCart(this.$store);
  },
};
</script>

<style>
</style>
