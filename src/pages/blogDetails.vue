<template>
  <div class="activeBlog">
    <div class="row justify-content-center">
      <div class="col-8">
        <img
          v-if="blogDetails.blog.creator"
          class="img-fluid size-img icon float-right mt-2"
          :src="blogDetails.blog.creator.picture"
        />
        <img
          v-else-if="!blogDetails.blog.creator"
          class="img-fluid size-img icon float-right mt-2"
          src="https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png"
        />
        <h1 class="text-center">{{blogDetails.blog.title}}</h1>
        <h5>By: {{blogDetails.blog.creatorEmail}}</h5>
        <p class="text-left">{{blogDetails.blog.body}}</p>
        <div class="row justify-content-center">
          <button
            @click="showComments = !showComments"
            class="btn btn-sm btn-primary mr-5"
          >Comments: {{blogDetails.comments.length}}</button>
          <button
            v-if="profile.email.length == blogDetails.blog.creatorEmail.length"
            @click="deleteBlog"
            class="btn btn-danger btn-sm ml-5"
          >Delete Blog?</button>
          <button
            v-if="profile.email.length == blogDetails.blog.creatorEmail.length"
            data-toggle="modal"
            data-target="#three"
            class="btn btn-success btn-sm ml-5"
          >Edit Blog?</button>
          <quickModal id="three" :key="3">
            <div slot="header">Edit your Blog</div>
            <form @submit="editBlog" slot="body">
              <div class="form-group">
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  placeholder="Enter New Title?"
                />
                <input
                  v-model="body"
                  type="text"
                  class="form-control"
                  placeholder="Enter New body?"
                />
                <button type="submit" class="btn btn-sm btn-block btn-info">Edit Blog</button>
              </div>
            </form>
          </quickModal>
        </div>
        <div v-if="showComments" class="row text-left">
          <div class="col-12">
            <button
              v-if="this.$auth.isAuthenticated"
              data-toggle="modal"
              data-target="#one"
              class="btn"
            >Post a Comment</button>
            <quickModal id="one" :key="1">
              <div slot="header">Create a Comment</div>
              <form @submit="addComment" slot="body">
                <div class="form-group">
                  <input
                    v-model="commentContent"
                    type="text"
                    class="form-control"
                    placeholder="Enter Comment"
                  />
                  <button type="submit" class="btn btn-sm btn-block btn-info">Post Comment</button>
                </div>
              </form>
            </quickModal>
          </div>
          <Comments
            v-for="comment in blogComments"
            :blogData="blogDetails.blog"
            :profile="profile"
            :commentData="comment"
            :key="comment.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import quickModal from "../components/quickModal";
import Comments from "../components/comments";
export default {
  name: "activeBlog",
  data() {
    return {
      showComments: false,
      commentContent: "",
      title: null,
      body: null,
    };
  },
  mounted() {
    this.$store.dispatch("getBlogDetails", this.$route.params.id);
    this.$store.dispatch("loadProfile");
  },
  computed: {
    blogDetails() {
      return this.$store.state.blogDetails;
    },
    blogComments() {
      return this.$store.state.blogDetails.comments;
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    addComment() {
      $("#one").modal("hide");
      this.$store.dispatch("addComment", {
        body: this.commentContent,
        blogId: this.blogDetails.blog.id,
        creatorEmail: this.$store.state.profile.email,
        creator: this.$auth.userInfo,
      });
      this.commentContent = "";
    },
    refreshBlog() {
      this.$store.dispatch("getBlogDetails", this.$route.params.id);
    },
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.blogDetails.blog.id);
      this.$router.push({ name: "Home" });
    },
    editBlog() {
      $("#three").modal("hide");
      if (this.title && this.body) {
        this.$store.dispatch("editBlog", {
          title: this.title,
          body: this.body,
          blogId: this.$route.params.id,
        });
      } else if (this.title && !this.body) {
        this.$store.dispatch("editBlog", {
          title: this.title,
          blogId: this.$route.params.id,
        });
      } else if (!this.title && this.body) {
        this.$store.dispatch("editBlog", {
          body: this.body,
          blogId: this.$route.params.id,
        });
      }
      this.title = null;
      this.body = null;
    },
  },
  components: {
    Comments,
    quickModal,
  },
};
</script>


<style scoped>
.size-img {
  max-height: 300px;
  max-width: auto;
  min-height: 300px;
}
</style>