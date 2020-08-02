<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt />
    <p>{{ profile.email }}</p>
    <button @click="showBlogs = !showBlogs">Your Blogs</button>
    <div class="row" v-if="showBlogs">
      <Blogs v-for="blog in blogs" :blogData="blog" :profile="profile" :key="blog.id" />
    </div>
  </div>
</template>

<script>
import Blogs from "../components/blog";
export default {
  name: "Profile",
  data() {
    return {
      showBlogs: false,
    };
  },
  mounted() {
    this.$store.dispatch("getYourBlogs");
    this.$store.dispatch("loadProfile");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    blogs() {
      return this.$store.state.yourBlogs;
    },
  },
  methods: {},
  components: {
    Blogs,
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>