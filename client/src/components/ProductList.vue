<template>
  <div class="row mt-3">
    <CategoryList />
    <div class="col-9">
      <div class="row">
        <div
          class="col-4 mt-3"
          v-for="(product, index) in products"
          :key="index"
        >
          <p>
            <img :src="productImages + product.image" class="img-fluid" />
          </p>
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>{{ product.price | currency }}</p>
          <p>
            <button class="btn btn-primary" @click="handleAddProduct(product)">
              Add to cart
            </button>
          </p>
        </div>
      </div>
      <product-pagination />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CategoryList from "./CategoryList.vue";
import ProductPagination from "./ProductPagination.vue";

export default {
  components: { CategoryList, ProductPagination },
  computed: {
    ...mapState(["products", "productImages"]),
  },
  methods: {
    ...mapActions(["setProductsByCategoryAction"]),
    ...mapMutations(["setCurrentCategory", "setCurrentPage"]),
    ...mapMutations({
      addProduct: "cart/addProduct",
    }),
    handleAddProduct(product) {
      this.addProduct(product);
    },
  },
  created() {
    this.setCurrentPage(1);
    const category = this.$route.params.category;
    this.setProductsByCategoryAction(category);
    this.setCurrentCategory(category);
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurrentPage(1);
    const category = to.params.category;
    this.setProductsByCategoryAction(category);
    this.setCurrentCategory(category);
    next();
  },
};
</script>