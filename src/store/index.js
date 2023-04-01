import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getTodos(){
      if(!localStorage.getItem('todos')){
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const URL = 'https://jsonplaceholder.typicode.com/todos?_limit=3'
          xhr.open('GET', URL)
          xhr.responseType = 'json';
          xhr.addEventListener('load', () => {
            resolve(xhr.response);
          })
          xhr.addEventListener('error', () => {
            reject(xhr.response);
          })
          xhr.send();
        })
        .then(data => {
          localStorage.setItem('todos', JSON.stringify(data));
        })
        .catch(data => console.error('Some error with', data))
      }
    }
  },
  modules: {
  }
})
