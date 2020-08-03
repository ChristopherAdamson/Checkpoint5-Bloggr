<template>
  <div class="home row justify-content-center">
    <div class="col-12">
      <div class="row justify-content-center">
        <button
          v-if="this.$auth.isAuthenticated"
          data-toggle="modal"
          data-target="#two"
          class="btn btn-lg btn-primary text-center"
        >Post a Blog</button>
      </div>
      <quickModal id="two" :key="2">
        <div slot="header">Create a Blog</div>
        <form @submit="addBlog" slot="body">
          <div class="form-group">
            <input
              v-model="title"
              required
              type="text"
              class="form-control"
              placeholder="Enter Title"
            />
            <input
              v-model="body"
              required
              type="text"
              class="form-control"
              placeholder="Enter Body"
            />
            <select v-modal="tags">
              <option>Tags?</option>
              <option value="gaming">Gaming</option>
              <option value="books">Books</option>
              <option value="cooking">Cooking</option>
            </select>

            <button type="submit" class="btn btn-sm btn-block btn-info">Post Blog</button>
          </div>
        </form>
        <div slot="footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button class="btn btn-warning" @click="published = false">Save as draft</button>
        </div>
      </quickModal>
    </div>
    <div class="row justify-content-center">
      <Blogs v-for="blog in blogs" :blogData="blog" :profile="profile" :key="blog.id" />
    </div>
  </div>
</template>


<script>
import quickModal from "../components/quickModal";
import Blogs from "../components/blog";
export default {
  name: "home",
  data() {
    return {
      title: "",
      body: "",
      published: true,
      tags: null,
      imgUrl: undefined,
    };
  },
  mounted() {
    this.$store.dispatch("getAllBlogs");
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("loadProfile");
    } else if (!this.$auth.isAuthenticated) {
      this.$store.dispatch("loadFakeProfile");
    }
  },
  computed: {
    blogs() {
      return this.$store.state.blogs.sort((a, b) => a.updatedAt - b.updatedAt);
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    addBlog() {
      $("#two").modal("hide");
      this.$store.dispatch("addBlog", {
        title: this.title,
        body: this.body,
        published: this.published,
        tags: [this.tags],
        creatorEmail: this.$store.state.profile.email,
        creator: this.$auth.userInfo,
      });
      this.title = "";
      (this.body = ""), (this.published = true), (this.tags = null);
    },
  },
  components: {
    Blogs,
    quickModal,
  },
};
</script>


<style scoped>
</style>
