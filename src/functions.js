import {
  format,
} from 'date-fns';


import { createTodoForm, closeModal, projectForm, displayTasks } from './DOM';

const fetchTodoArrayFromLocalStorage = () => {
  const todoArray = JSON.parse(localStorage.getItem('arrayOfTodos') || '[]');
  return todoArray;
};
const fetchProjectArrayFromLocalStorage = () => {
  const projectsArray = JSON.parse(localStorage.getItem('arrayOfProjects') || '[]');
  return projectsArray;
};

const saveTodoArrayInLocalStorage = (todoArray) => {
  console.log(todoArray);
  localStorage.setItem('arrayOfTodos', JSON.stringify(todoArray));
};
const saveProjectArrayInLocalStorage = (projectsArray) => {
  localStorage.setItem('arrayOfProjects', JSON.stringify(projectsArray));
};

function deleteTodoObjFromArray(array, domId) {
  const newArray = array.filter(object => object.id !== parseInt(domId, 10));
  return newArray;
}

function deleteTodo(e, callback) {
  const todoArray = fetchTodoArrayFromLocalStorage()
    .filter(object => object.id !== parseInt(e.target.id, 10));
  saveTodoArrayInLocalStorage(todoArray);
  callback();
}

function deleteTodoHTML(target) {
  target.parentNode.parentNode.remove();
}

function lastId(todosArray) {
  let biggestID = 0;
  if (todosArray === undefined || todosArray.length === 0) {
    biggestID = 1;
  } else {
    todosArray.forEach((object) => {
      if (object.id > biggestID) {
        biggestID = object.id;
      }
    });
  }
  return biggestID;
}

const todoConstructor = (title, description, duedate, priority, project, id) => {
  const isDone = false;
  id += 1;
  return {
    title,
    description,
    duedate,
    priority,
    project,
    isDone,
    id,
  };
};

function createProjectForm(globalArray) {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = projectForm;
  document.getElementById('projectTitle').focus();
  const submitProjectbtn = document.getElementById('submit-project-form');
  submitProjectbtn.addEventListener('click', () => {
    const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
    if (!globalArray.includes(projectTitle)) {
      globalArray.push(projectTitle);
    }
    const ul = document.getElementById('aside-project-list');
    const li = document.createElement('li');
    li.setAttribute('id', 'btnbyProject');
    const a = document.createElement('a');
    a.innerText = projectTitle;
    li.append(a);
    ul.append(li);

    modalContainer.innerHTML = '';
  });
  document.querySelectorAll('#close-project-modal').forEach(item => {
    item.addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });
  });
}

function displayAllTasks() {
  const todoArray = fetchTodoArrayFromLocalStorage();
  displayTasks(todoArray);
  document.querySelectorAll('.delete').forEach(item => {
    item.addEventListener('click', (e) => { deleteTodo(e, displayAllTasks); });
  });
}

function loadProjects(arrayOfProjects) {
  const ul = document.getElementById('aside-project-list');
  arrayOfProjects.forEach(project => {
    const li = document.createElement('li');
    ul.appendChild(li);
    const a = document.createElement('a');
    a.setAttribute('id', 'btnbyProject');
    li.appendChild(a);
    a.innerHTML = project;
  });
}

function displaybyProject(array) {
  // if (array === undefined || array.length === 0) {
  //   return array;
  // }
  // const parent = document.getElementById('aside-project-list');
  // const arraybyProject = [];
  // for (let i = 0; i < array.length; i += 1) {
  //   const child = parent.childNodes[i];
  //   if (array[i].project === child.textContent) {
  //     arraybyProject.push(array[i]);
  //   }
  // }
  // displayTasks(arraybyProject);
  // return array;
  const btnbyProject = document.getElementById('btnbyProject');
  console.log(btnbyProject);
}

function displayTasksforToday() {
  const array = fetchTodoArrayFromLocalStorage();
  if (array === undefined || array.length === 0) {
    return array;
  }
  const date = `${format(new Date(), 'yyyy-M-d')}`;
  const arrayTodayTask = [];
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].duedate.includes(date)) {
      arrayTodayTask.push(array[i]);
    }
  }
  displayTasks(arrayTodayTask);
  return array;
}

function submitTodoForm(e) {
  let newTodo = {};
  let todosArray = fetchTodoArrayFromLocalStorage();
  const todoTitle = document.getElementById('todoTitle');
  const todoDescription = document.getElementById('todoDescription');
  const selectProject = document.getElementById('selectProject');
  const todoDueDate = document.getElementById('todoDueDate');
  const todoPriority = document.getElementById('todoPriority');

  newTodo = todoConstructor(
    todoTitle.value,
    todoDescription.value,
    todoDueDate.bulmaCalendar.date.start,
    todoPriority.checked,
    selectProject.value,
    lastId(todosArray),
  );
  if (todosArray === undefined) {
    todosArray = [];
  }
  todosArray.push(newTodo);
  saveTodoArrayInLocalStorage(todosArray);
  closeModal(e);
}

function displayToDoModal() {
  createTodoForm(fetchProjectArrayFromLocalStorage());
  const formSubmit = document.getElementById('submit-todo-form');
  formSubmit.addEventListener('click', (e) => {
    submitTodoForm(e);
  });
  document.querySelectorAll('#delete-todo-modal').forEach(item => {
    item.addEventListener('click', e => { closeModal(e); });
  });
}

export {
  createProjectForm,
  displayToDoModal,
  displayTasks,
  displayAllTasks,
  displaybyProject,
  displayTasksforToday,
  deleteTodoObjFromArray,
  deleteTodoHTML,
  loadProjects,
};