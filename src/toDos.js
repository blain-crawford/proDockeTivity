import { toDoForm, toDoList, addToDoListItemToThingsToDo, projectForm, clearThingsToDoBeforeRepopulation, generalFormFunction } from './forms.js';
import { storageAvailable, autoPopulateThingsToDo, autoPopulateProjects } from './index.js';
import { projectInteractions, Project } from './projects.js';

const toDoInteractions = (() => {
  // General page DOM selection
  const pageBody = document.querySelector('#page-body');
  const pageHeader = document.querySelector('#page-header');

  // ToDo Div DOM selection
  const checkBox =  document.querySelectorAll('.checkbox');
  const editSymbol = document.querySelector('#edit-symbol')
  const infoSymbol = document.querySelectorAll('.info-symbol')

  // Info-form DOM selection
  const toDoInfoForm = document.querySelector('#todo-info');
  const toDoInfoFormClosingButton = document.querySelector('#info-closing-button');
  const titleDiv = document.querySelector('#info-title-input');
  const notesDiv = document.querySelector('#info-notes-input');
  const deadLineDiv = document.querySelector('#info-deadline-input');
  const priorityDiv = document.querySelector('#info-priority-input');
  
  //Edit-form DOM selection
  const toDoEditForm = document.querySelector('todo-form');
  const toDoEditFormLabel = document.querySelector('.task-label');
  const titleInput = document.querySelector('#title-input');
  const notesInput = document.querySelector('#notes-input');
  const deadLineInput = document.querySelector('#deadline-input');
  const priorityInput = document.querySelector('#priority-input');
  const addButton = document.querySelector('#add');

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
        }
      }
    }

    projectInteractions.clearProjectContainerDivBeforeRepopulation();
    autoPopulateProjects();
  }

  const editToDoItem = function () {
    const toDoToEdit = toDoEditFormLabel.firstChild.innerText
    for (let i = 0; i < toDoList.length; i++) {
      if(toDoList[i].title === toDoToEdit) {
        toDoList[i].title = titleInput.value;
        toDoList[i].notes = notesInput.value;
        toDoList[i].deadLine = deadLineInput.value;
        toDoList[i].priority = priorityInput.value;
        for(let j = 0; j < localStorage.length; j++) {
          if(localStorage[toDoToEdit]) {
            localStorage.removeItem(toDoToEdit)
            localStorage.setItem(`${toDoList[i].title}`, JSON.stringify(toDoList[i]));
            
          }
        }
      }
    }
    //re-render App
    toDoForm.closeToDoForm()
    projectInteractions.clearProjectContainerDivBeforeRepopulation();
    projectInteractions.addprojectsArrayToLocalStorage();
    autoPopulateProjects();

    //Change ToDoForm back to normal
    toDoEditFormLabel.innerHTML = '<h2>Enter Task</h2>';
    addButton.innerText = 'Add'
    addButton.removeEventListener('click', editToDoItem, false);
    addButton.addEventListener('click', toDoForm.createToDoItem, false)
  }

  const openEditToDoForm = function () {
    toDoForm.openToDoForm()
    const toDoListItemToCheck = this.parentElement.previousSibling.innerText
    toDoEditFormLabel.innerHTML = `<h2>${toDoListItemToCheck}</h2>`

    for(let i = 0; i < toDoList.length; i++) {
      if(toDoList[i].title === toDoListItemToCheck) {
        titleInput.value = toDoList[i].title;
        notesInput.value = toDoList[i].notes;
        deadLineInput.value = toDoList[i].deadLine;
        priorityInput.value = toDoList[i].priority; 
      }
    }
    addButton.innerText = 'Edit';
    addButton.removeEventListener('click', toDoForm.createToDoItem, false);
    addButton.addEventListener('click', editToDoItem, false);
  }

  const checkToDoInfo = function () {

    const toDoListItemToCheck = this.parentElement.previousSibling.innerText

    for(let i = 0; i < toDoList.length; i++) {
      if(toDoList[i].title === toDoListItemToCheck) {
        generalFormFunction.openForm(toDoInfoForm);
        titleDiv.innerHTML = `<p>${toDoList[i].title}</p>`;
        notesDiv.innerHTML = `<p>${toDoList[i].notes}</p>`;
        deadLineDiv.innerHTML = `<p>${toDoList[i].deadLine}</p>`;
        priorityDiv.innerHTML = `<p>${toDoList[i].priority}</p>`; 
      }
    }
  }

  const closeToDoInfoForm = function () {
    generalFormFunction.closeForm(toDoInfoForm, titleDiv, notesDiv, deadLineDiv, priorityDiv)
  }

  const deleteToDo = function () {
    const toDoListItemToDelete = this.parentElement.previousSibling.innerText
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].title === toDoListItemToDelete) {
        toDoList.splice(i, 1)
        for(let j = 0; j < localStorage.length; j++) {
          localStorage.removeItem(toDoListItemToDelete)
        }
      }
    }
    // re-render App
    projectInteractions.clearProjectContainerDivBeforeRepopulation();
    projectInteractions.addprojectsArrayToLocalStorage();
    autoPopulateThingsToDo();
    autoPopulateProjects();
  }



  toDoInfoFormClosingButton.addEventListener('click', closeToDoInfoForm, false)

  return {markToDoAsComplete, checkToDoInfo, openEditToDoForm, deleteToDo}
})()

export { toDoInteractions }