<template>
  <div class="blog col-3 border rounded shadow-sm my-3 mx-5" v-if="blogData.published">
    <img
      v-if="blogData.creator"
      class="img-fluid icon float-right mt-2"
      :src="blogData.creator.picture"
    />
    <img
      v-else-if="!blogData.creator"
      class="img-fluid icon float-right mt-2"
      src="https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png"
    />
    <h4>{{blogData.title}}</h4>
    <h5>By: {{blogData.creatorEmail}}</h5>

    <div class="row justify-content-around">
      <button @click="blogDetailsPage" class="btn btn-info btn-sm float-right">Open Blog?</button>
      <button
        v-if="profile.email.length == blogData.creatorEmail.length"
        @click="deleteBlog"
        class="btn btn-danger btn-sm"
      >Delete Blog?</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "blog",
  data() {
    return {};
  },
  props: ["blogData", "profile"],
  mounted() {},
  computed: {},
  methods: {
    blogDetailsPage() {
      // gives id of blog to store, moves to active blog page(need to create) that has a mounted that will populate that blog on the page from the ID given, also need to write route in router... you got this!
      this.$router.push({ name: "Blog", params: { id: this.blogData.id } });
    },
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.blogData.id);
    },
  },
  components: {},
};
</script>


<style scoped>
.icon {
  height: 50px;
  width: 50px;
}
</style>