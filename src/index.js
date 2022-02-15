import './styles.css';
import { compareAsc, format } from 'date-fns';

class toDo {
  constructor(description, notes, dueDate, priority, project) {
    this.description = description;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
};

const toDoList = [];


// const dates = [
//   `Due Date: ${format(new Date(1995, 6, 2), 'yyyy-MM-dd')}`,
//   `Due Date: ${format(new Date(1987, 1, 11), 'yyyy-MM-dd')}`,
//   `Due Date: ${format(new Date(1989, 6, 10), 'yyyy-MM-dd')}`
// ];

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
