<template>
  <div class="row">
    <div class="col-12">
      <div class="form-group m-2" @closed="v$.$reset()">
        <label for="">Name</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.order.name.$model"
        />
        <validation-error :validation="$v.order.name" />
      </div>
      <div class="form-group m-2">
        <label for="">Email</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.order.email.$model"
        />
        <validation-error :validation="$v.order.email" />
      </div>
      <div class="form-group m-2">
        <label for="">Address</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.order.address.$model"
        />
        <validation-error :validation="$v.order.address" />
      </div>
    </div>
    <div class="col-12 text-center">
      <router-link class="btn btn-secondary m-1" to="/cart">Back</router-link>
      <button
        :class="
          $v.order.name.$invalid ||
          $v.order.email.$invalid ||
          $v.order.address.$invalid
            ? 'btn btn-light m-1'
            : 'btn btn-primary m-1'
        "
        @click="submitOrder"
      >
        Place order
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import ValidationError from "./ValidationError.vue";

export default {
  components: { "validation-error": ValidationError },
  data() {
    return {
      order: {
        name: "",
        email: "",
        address: "",
      },
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
    }),
    ...mapGetters({
      total: "cart/totalPrice",
    }),
  },
  validations: {
    order: {
      name: { required },
      email: { required, email },
      address: { required },
    },
  },
  methods: {
    ...mapActions({
      storeOrder: "orders/storeOrderAction",
      clearCartData: "cart/clearCartData",
    }),
    async submitOrder() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const order = new FormData();

        order.append("name", this.order.name);
        order.append("email", this.order.email);
        order.append("address", this.order.address);
        order.append("cart", JSON.stringify(this.cart));
        order.append("total", this.total);

        await this.storeOrder(order);

        this.clearCartData();
        this.$router.push("/thanks");
      }
    },
  },
};
</script>