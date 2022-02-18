class ToDoItem {
  constructor(title, notes, deadLine, priority, project) {
    this.title = title;
    this.notes = notes;
    this.deadLine = deadLine;
    this.priority = priority;
    // this.project = project.id
  }
};

function storageAvailable (type) {
  let storage;
  try {
    storage = window[type];
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') 
      (storage && storage.length !== 0)
  }
};

const toDoList = [];

const toDoForm = (() => {
  const pageBody = document.querySelector('#page-body');
  const pageHeader = document.querySelector('#page-header'); 
  const formClosingButton = document.querySelector("#closing-button");
  const addToDoButton = document.querySelector('#add-todo');
  const toDoForm = document.querySelector('#todo-form');
  const titleInput = document.querySelector("#title-input")
  const notesInput = document.querySelector("#notes-input")
  const deadLineInput = document.querySelector("#deadline-input")
  const priorityInput = document.querySelector('#priority-input')
  const toDoAddButton = document.getElementById('add');
  
  const closeForm = () => {
    toDoForm.classList.add('invisible');
    pageBody.classList.remove('tint');
    pageHeader.classList.remove('tint');
  };

  const openTodoForm = () => {
    toDoForm.classList.remove('invisible')
    pageBody.classList.add('tint');
    pageHeader.classList.add('tint');
  }

  const clearToDoForm = () => {
    titleInput.value = '';
    notesInput.value = '';
    deadLineInput.value = 'MM-dd-yyyy';
    priorityInput.value = 'Please Choose One';
  }

  const rePopulateToDoArray = (object) => {
    while(toDoList.length >= 0) {
      toDoList.pop();
    }

    for(let i = 0; i < object.length; i++) {
      toDoList.push(object[i]);
    }
    console.log(toDoList)
  }

  const createToDoItem = function () {
    const toDo = new ToDoItem(titleInput.value, notesInput.value, deadLineInput.value, priorityInput.value);
    clearToDoForm();
    closeForm();
    if(storageAvailable('localStorage')) {
      if(!localStorage.getItem(toDo.title)) {
        localStorage.setItem(toDo.title, JSON.stringify(toDo));
        rePopulateToDoArray(localStorage);
      }
    } else {
      alert('There is no local Storage here!')
    }
    
  };
  
  formClosingButton.addEventListener('click', closeForm, false);
  addToDoButton.addEventListener('click', openTodoForm, false);
  toDoAddButton.addEventListener('click', createToDoItem, false);
  
  return {toDoList};
})();

export{ toDoForm, toDoList }


// if(localStorage.getItem('toDoList')) {
//   localStorage.removeItem('toDoList');
//   localStorage.setItem(`toDoList`, JSON.stringify(toDoList))
//   console.log(localStorage.length)
// } else {
//   localStorage.setItem('toDoList', JSON.stringify(toDoList));
// }