import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    yourBlogs: [],
    blogDetails: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, blogData) {
      state.blogs = blogData
    },
    setBlogDetails(state, blogData) {
      state.blogDetails = blogData
    },
    setNewComment(state, commentData) {
      state.blogDetails.comments.unshift(commentData)
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("/blogs")
        console.log(res.data);
        commit("setBlogs", res.data)
      } catch (error) { console.error(error) }
    },
    async getBlogDetails({ commit, dispatch }, blogId) {
      try {
        let res = await api.get("blogs/" + blogId)
        console.log(res.data);
        commit("setBlogDetails", res.data)
      } catch (error) { console.error(error) }
    },
    async addComment({ commit, dispatch }, payload) {
      try {
        let res = await api.post("comments/", payload)
        console.log(res);
        commit("setNewComment", res.data)
      } catch (error) { console.error(error) }
    }
  },
});
