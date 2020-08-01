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
        <h1>{{blogDetails.blog.title}}</h1>
        <h5>By: {{blogDetails.blog.creatorEmail}}</h5>
        <p>{{blogDetails.blog.body}}</p>
        <button
          @click="showComments = !showComments"
          class="btn btn-sm"
        >Comments: {{blogDetails.comments.length}}</button>
        <div v-if="showComments" class="row">
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
          <Comments v-for="comment in blogComments" :commentData="comment" :key="comment.id" />
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
    };
  },
  mounted() {
    this.$store.dispatch("getBlogDetails", this.$route.params.id);
  },
  computed: {
    blogDetails() {
      return this.$store.state.blogDetails;
    },
    blogComments() {
      return this.$store.state.blogDetails.comments;
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
}
</style>