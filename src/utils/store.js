import Vue from "vue";


export const store = Vue.observable({
  progressBar: false,
  userLogged:{}
});

export const mutations = {
  setProgressBar(value) {
    store.progressBar = value;
  },
  setUserLogged(value) {
    store.userLogged = value;
  },
  getUserLogger() {
   const user =  store.userLogged;
   return user;
  }
};
