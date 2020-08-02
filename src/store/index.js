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
      window.localStorage.setItem("Profile", JSON.stringify(state.profile))
    },
    loadProfile(state) {
      let storedProfile = JSON.parse(window.localStorage.getItem("Profile"))
      if (storedProfile) {
        state.profile = storedProfile
      }
    },
    setBlogs(state, blogData) {
      state.blogs = blogData
    },
    setBlogDetails(state, blogData) {
      state.blogDetails = blogData
    },
    setNewComment(state, commentData) {
      state.blogDetails.comments.unshift(commentData)
    },
    setNewBlog(state, blogData) {
      state.blogs.unshift(blogData)
    },
    setYourBlogs(state, blogData) {
      state.yourBlogs = blogData
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
    },
    async addBlog({ commit, dispatch }, payload) {
      try {
        let res = await api.post("blogs/", payload)
        console.log(res);
        commit("setNewBlog", res.data)
      } catch (error) { console.error(error) }
    },
    async getYourBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("profile/blogs")
        console.log(res.data);
        commit("setYourBlogs", res.data)
      } catch (error) { console.error(error) }
    },
    loadProfile({ commit }) {
      commit("loadProfile")
    },
    async deleteBlog({ commit, dispatch }, blogId) {
      try {
        let res = await api.delete("blogs/" + blogId)
        console.log(res);
        dispatch("getYourBlogs")
        dispatch("getAllBlogs")
      } catch (error) { console.error(error) }
    }
  },
});
