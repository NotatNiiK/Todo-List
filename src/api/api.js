import generateTime from "./generateTime";
function getTodos(){
    if(!localStorage.getItem('todos')){
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
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
        data = data.map(todo =>{
          todo.completed = false;
          todo.isEdited = false;
          todo.time = generateTime()
          return todo;
        });
        localStorage.setItem('todos', JSON.stringify(data));
      })
      .catch(data => console.error('Some error with', data))
    }
}

export default getTodos;