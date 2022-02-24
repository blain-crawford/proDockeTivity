import { toDoForm, toDoList, addToDoListItemToThingsToDo, projectForm, clearThingsToDoBeforeRepopulation, generalFormFunction } from './forms.js';
import { storageAvailable, autoPopulateThingsToDo, autoPopulateProjects } from './index.js';
import { projectInteractions, Project } from './projects.js';

const toDoInteractions = (() => {
  const pageBody = document.querySelector('#page-body');
  const pageHeader = document.querySelector('#page-header');
  const toDoInfoForm = document.querySelector('#todo-info');
  const checkBox =  document.querySelectorAll('.checkbox');
  const infoSymbol = document.querySelectorAll('.info-symbol')
  const toDoInfoFormClosingButton = document.querySelector('#info-closing-button');
  const titleInput = document.querySelector('#info-title-input');
  const notesInput = document.querySelector('#info-notes-input');
  const deadLineInput = document.querySelector('#info-deadline-input');
  const priorityInput = document.querySelector('#info-priority-input');

  const markToDoAsComplete = function () {
    let toDoToCheck = this.nextSibling.textContent;
    if(this.classList.contains('fa-square')) {
      this.classList.remove('fa-square');
      this.classList.add('fa-square-check');
      for(let i = 0; i < toDoList.length; i++) {
        if(toDoList[i].title === toDoToCheck) {
          toDoList[i].complete = true;
          localStorage.removeItem(toDoList[i].title);
          localStorage.setItem(`${toDoList[i].title}`, JSON.stringify(toDoList[i]));
          console.log(toDoList[i])
        }
      }
    } else if (this.classList.contains('fa-square-check')) {
      this.classList.remove('fa-square-check');
      this.classList.add('fa-square');
      for(let i = 0; i < toDoList.length; i++) {
        if(toDoList[i].title === toDoToCheck) {
          toDoList[i].complete = false;
          localStorage.removeItem(toDoList[i].title);
          localStorage.setItem(`${toDoList[i].title}`, JSON.stringify(toDoList[i]));
          console.log(toDoList[i])
        }
      }
    }

    projectInteractions.clearProjectContainerDivBeforeRepopulation();
    autoPopulateProjects();
  }

  const checkToDoInfo = function () {

    const toDoListItemToCheck = this.parentElement.previousSibling.innerText

    for(let i = 0; i < toDoList.length; i++) {
      if(toDoList[i].title === toDoListItemToCheck) {
        generalFormFunction.openForm(toDoInfoForm);
        titleInput.innerHTML = `<p>${toDoList[i].title}</p>`;
        notesInput.innerHTML = `<p>${toDoList[i].notes}</p>`;
        deadLineInput.innerHTML = `<p>${toDoList[i].deadLine}</p>`;
        priorityInput.innerHTML = `<p>${toDoList[i].priority}</p>`; 
      }
    }
  }

  const closeToDoInfoForm = function () {
    generalFormFunction.closeForm(toDoInfoForm, titleInput, notesInput, deadLineInput, priorityInput)
  }

  toDoInfoFormClosingButton.addEventListener('click', closeToDoInfoForm, false)

  return {markToDoAsComplete, checkToDoInfo}
})()

export { toDoInteractions }