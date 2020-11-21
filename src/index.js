import './styles.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import {
  createProjectForm,
  displayToDoModal,
  displayTasks,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
  loadProjects,
}
  from './functions';

// let toDos;

// localStorage.setItem('toDos', JSON.stringify(toDos));
// toDos = JSON.parse(localStorage.getItem('toDos') || '[]');
// toDos.push({id: 1, foo: "bar"});
// console.log(toDos);
let arrayOfProjects = [];

if (localStorage.getItem('arrayOfProjects') !== null) {
  arrayOfProjects = JSON.parse(localStorage.getItem('arrayOfProjects'));
} else {
  localStorage.setItem('arrayOfProjects', JSON.stringify(['hello', 'world']));
  arrayOfProjects = JSON.parse(localStorage.getItem('arrayOfProjects'));
}
let arrayOfTodos = [];
if (localStorage.getItem('arrayOfTodos') !== null) {
  arrayOfTodos = JSON.parse(localStorage.getItem('arrayOfTodos'));
} else {
  localStorage.setItem('arrayOfTodos', JSON.stringify([{"title":"ASD","description":"ASD","duedate":"2020-01-01T00:00","priority":true,"project":"hello","isDone":false,"id":1},{"title":"ASD","description":"ASD","duedate":"2020-01-01T00:00","priority":true,"project":"hello","isDone":false,"id":2},{"title":"ASD","description":"ASD","duedate":"2020-01-01T00:00","priority":true,"project":"hello","isDone":false,"id":3},{"title":"ASD","description":"ASD","duedate":"2020-01-01T00:00","priority":true,"project":"hello","isDone":false,"id":4},{"title":"ASD","description":"ASD","duedate":"2020-11-21T00:00","priority":true,"project":"hello","isDone":false,"id":5},{"title":"ASD","description":"ASD","duedate":"2020-11-21T03:30","priority":true,"project":"hello","isDone":false,"id":6}]));
  arrayOfTodos = JSON.parse(localStorage.getItem('arrayOfTodos'));
}

function addEventListenerByClass(className, event, fn) {
  const list = document.getElementsByClassName(className);
  for (let i = 0, len = list.length; i < len; i += 1) {
    list[i].addEventListener(event, fn);
  }
}
const newTodoBtn = document.getElementById('newTodoFormBtn');
newTodoBtn.addEventListener('click', () => {
  displayToDoModal();
});

const newProjectBtn = document.getElementById('newProjectBtn');
newProjectBtn.addEventListener('click', () => {
  createProjectForm(arrayOfProjects);
});


const btnAllTasks = document.getElementById('btnAllTasks');
btnAllTasks.addEventListener('click', () => {
  displayTasks();
  addEventListenerByClass('delete', 'click', (e) => {
    arrayOfTodos = deleteTodoObjFromArray(arrayOfTodos, e.target.id);
    displayTasks(arrayOfTodos);
    return arrayOfTodos;
  });
});

const btnTodayTasks = document.getElementById('btnTodayTasks');
btnTodayTasks.addEventListener('click', () => {
  displayTasksforToday(arrayOfTodos);
  addEventListenerByClass('delete', 'click', (e) => {
    arrayOfTodos = deleteTodoObjFromArray(arrayOfTodos, e.target.id);
    deleteTodoHTML(e.target);
    return arrayOfTodos;
  });
});

window.addEventListener('DOMContentLoaded', (event) => {
  loadProjects(arrayOfProjects);
  // const btnbyProject = document.getElementById('btnbyProject');
  const btnbyProject = document.getElementById('aside-project-list');
  btnbyProject.addEventListener('click', (e) => {
    console.log(btnbyProject.textContent);
    console.log(e.target.innerText);
  });
});
