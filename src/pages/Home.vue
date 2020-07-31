<template>
  <div class="home row justify-content-center">
    <Blogs v-for="blog in blogs" :blogData="blog" :key="blog.id" />
  </div>
</template>


<script>
import Blogs from "../components/blog";
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllBlogs");
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
  },
  methods: {},
  components: {
    Blogs,
  },
};
</script>


<style scoped>
</style>
