import './styles.css';
import { compareAsc, format } from 'date-fns';
const toDoList = [];
const titleInput = document.querySelector("#title-input")
const notesInput = document.querySelector("#notes-input")
const deadLineInput = document.querySelector("#deadline-input")
const priorityInput = document.querySelector('#priority-input')
const addButton = document.getElementById('add');
const pageHeader = document.querySelector('#page-header');
const pageBody = document.querySelector('#page-body');



class ToDoItem {
  constructor(description, notes, deadLine, priority) {
    this.description = description;
    this.notes = notes;
    this.deadLine = deadLine;
    this.priority = priority;
  }
};

const createToDoItem = function () {
  const toDo = new ToDoItem(titleInput.value, notesInput.value, deadLineInput.value, priorityInput.value);
  toDoList.push(toDo);
  console.log(toDoList);
};

addButton.addEventListener('click', createToDoItem, false);

const hideForm = (() => {
  const formClosingButton = document.querySelector("#closing-button");
  const toDoForm = document.querySelector('#todo-form')
  
  const closeForm = () => {
    toDoForm.classList.add('invisible');
    pageBody.classList.remove('tint');
    pageHeader.classList.remove('tint');
  };

  formClosingButton.addEventListener('click', closeForm, false);
})();

// const printDates = (() => {
//   dates.forEach((date) => {
//     let h2 = document.createElement('h2');
//     let dateDiv = document.createElement('div');
//     h2.innerText = date;
//     const checkOff = document.createElement('input');
//     checkOff.type = 'checkbox'
//     dateDiv.appendChild(checkOff);
//     dateDiv.style.cssText = 'display: flex;'
//     dateDiv.appendChild(h2);
//     document.body.appendChild(dateDiv);
    
//   })
// })();

// function storageAvailable (type) {
//   let storage;
//   try {
//     storage = window[type];
//     let x = '__storage_test__';
//     storage.setItem(x, x);
//     storage.removeItem(x);
//     return true;
//   }
//   catch (e) {
//     return e instanceof DOMException && (
//       e.code === 22 ||
//       e.code === 1014 ||
//       e.name === 'QuotaExceededError' ||
//       e.name === 'NS_ERROR_DOM_QUOTA_REACHED') 
//       (storage && storage.length !== 0)
//   }
// };

// const colorSelector = document.createElement('input');
// colorSelector.type = 'color'
// document.body.append(colorSelector);
// const h2 = document.querySelectorAll('h2');
// h2.forEach((heading) => {
//   heading.style.cssText = `color: ${localStorage['backgroundColor']};`
// })
// colorSelector.addEventListener('change', function () {
//   console.log(this.value);
//   localStorage.setItem('backgroundColor', this.value);
//   console.log(localStorage);
//   if(storageAvailable('localStorage')) {
//     const h2 = document.querySelectorAll('h2')
//     h2.forEach((heading) => {
//       heading.style.cssText = `color: ${localStorage['backgroundColor']};`
//     })
//   }
// })

// colorSelector.value = localStorage['backgroundColor'];



// console.log(localStorage);
