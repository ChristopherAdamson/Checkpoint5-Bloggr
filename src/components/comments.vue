<template>
  <div class="comments col-8">
    <!-- <img class="img-fluid icon float-right mt-2" :src="commentData.creator.picture" /> -->
    <h5>By: {{commentData.creatorEmail}}</h5>
    <p>{{commentData.body}}</p>
  </div>
</template>


<script>
export default {
  name: "comments",
  data() {
    return {};
  },
  props: ["commentData"],
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>