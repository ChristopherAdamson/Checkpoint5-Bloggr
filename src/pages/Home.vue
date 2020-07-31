<template>
  <div class="home row">
    Welcome to Bloggr!
    <div class="col-12">
      <router-link :to="{ name: 'Books' }" class="nav-link">Books</router-link>
      <router-link :to="{ name: 'Cooking' }" class="nav-link">Cooking</router-link>
      <router-link :to="{ name: 'Gaming' }" class="nav-link">Gaming</router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>
