<template>
  <div class="comments col-8">
    <div v-if="blogData.creatorEmail.length == profile.email.length" class="dropdown">
      <button
        class="btn btn-secondary float-right btn-sm dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button
          v-if="profile.email.length == commentData.creatorEmail.length"
          class="dropdown-item btn- btn-sm btn-success"
          data-toggle="modal"
          data-target="#four"
        >Edit</button>
        <button class="dropdown-item btn- btn-sm btn-danger" @click="deleteComment">Delete</button>
      </div>
    </div>
    <div v-else-if="profile.email.length == commentData.creatorEmail.length" class="dropdown">
      <button
        class="btn btn-secondary btn-sm float-right dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button
          class="dropdown-item btn- btn-sm btn-success"
          data-toggle="modal"
          data-target="#four"
        >Edit</button>
        <button class="dropdown-item btn- btn-sm btn-danger" @click="deleteComment">Delete</button>
      </div>
    </div>
    <img v-if="blogData.creator" class="img-fluid icon mt-2" :src="commentData.creator.picture" />
    <img
      v-else-if="!blogData.creator"
      class="img-fluid icon mt-2"
      src="https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png"
    />
    <h5>By: {{commentData.creatorEmail}}</h5>
    <p>{{commentData.body}}</p>
    <quickModal id="four" :key="4">
      <div slot="header">Edit your comment</div>
      <form @submit="editComment" slot="body">
        <div class="form-group">
          <input
            v-model="commentContent"
            type="text"
            class="form-control"
            placeholder="Enter Comment"
          />
          <button type="submit" class="btn btn-sm btn-block btn-info">Post Edited Comment</button>
        </div>
      </form>
    </quickModal>
  </div>
</template>


<script>
import quickModal from "../components/quickModal";
export default {
  name: "comments",
  data() {
    return {
      commentContent: null,
    };
  },
  props: ["commentData", "profile", "blogData"],
  computed: {},
  methods: {
    editComment() {
      $("#four").modal("hide");
      this.$store.dispatch("editComment", {
        editedComment: this.commentContent,
        commentId: this.commentData.id,
        blogId: this.commentData.blogId,
      });
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", {
        commentId: this.commentData.id,
        blogId: this.blogData.id,
      });
    },
  },
  components: {
    quickModal,
  },
};
</script>


<style scoped>
.icon {
  max-width: 25px;
  max-height: 25px;
}
</style>