import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },
  getters: {
    todos (state) {
      return state.todos;
    }
  },
  mutations: {
    setTodos(state, todos){
      state.todos = todos;
    }
  },
  actions: {
    getTodos(context){
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
        context.commit('setTodos', data);
      })
      .catch(data => console.error('Some error with', data))
    }
  },
  modules: {
  }
})
