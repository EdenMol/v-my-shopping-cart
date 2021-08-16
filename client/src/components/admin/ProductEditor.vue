<template>
  <div>
    <h2 class="text-center p-2">
      {{ editMode ? "Edit product" : "Add product" }}
    </h2>
    <h4
      v-if="$v.$invalid && $v.$dirty"
      class="bg-danger text-white text-center p-2"
    >
      Only image field is mandatory!Others required fields
    </h4>

    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" v-model="product.name" />
    </div>
    <div class="form-group">
      <label for="">Description</label>
      <textarea class="form-control" v-model="product.description"></textarea>
    </div>
    <div class="form-group">
      <label for="">Price</label>
      <input
        type="number"
        class="form-control"
        v-model.number="product.price"
      />
    </div>
    <div class="form-group">
      <label for="">Image</label>
      <input type="file" class="form-control" @change="onFileSelected" />
      <p v-if="editMode" class="mt-3">
        Current image:
        <img :src="productImages + product.image" width="100" />
      </p>
    </div>
    <div class="form-group">
      <label for="">Category</label>
      <select class="form-control" @change="onChange">
        <option :value="null">Choose the category</option>
        <option
          v-for="(c, i) in categories"
          :key="i"
          :value="c.slug"
          :selected="c.slug == product.category"
        >
          {{ c.name }}
        </option>
      </select>
    </div>

    <div class="text-center">
      <router-link class="btn btn-secondary m-1" to="/adim/pages"
        >Back</router-link
      >
      <button class="btn btn-primary m-1" @click="handleProduct">
        {{ editMode ? "Edit" : "Add" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  validations: {
    product: {
      name: { required },
      description: { required },
      price: { required },
      category: { required },
    },
  },
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        image: null,
        category: null,
      },
    };
  },
  computed: {
    ...mapState(["categories", "productImages"]),
    editMode() {
      return this.$route.params["op"] == "edit";
    },
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["editProduct", "addProduct"]),

    onFileSelected(e) {
      this.product.image = e.target.files[0];
    },
    onChange(e) {
      this.product.category = e.target.value;
    },
    async handleProduct() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const product = new FormData();

        product.append("name", this.product.name);
        product.append("description", this.product.description);
        product.append("price", this.product.price);
        product.append("imageUpload", this.product.image);
        product.append(
          "category",
          this.product.category.slug || this.product.category
        );

        if (this.editMode) {
          //edit
          product.append("id", this.product._id);
          product.append("image", this.product.image.name);

          await this.editProduct(product);
        } else {
          //add
          await this.addProduct(product);
        }
        this.setCurrentPage(1);
        this.$router.push("/admin/products");
      }
    },
  },
  created() {
    if (this.editMode) {
      Object.assign(
        this.product,
        this.$store.getters.productById(this.$route.params["id"])
      );
    }
  },
};
</script>