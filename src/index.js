'strict';
import './styles.css';
import { toDoForm, toDoList, projectForm } from './forms';
import { projectInteractions } from './projects.js';
import { timelineInteractions } from './timeline.js';

/**
 * seeing if local storage is available
 */
const storageAvailable = function (type) {
  let storage;
  try {
    storage = window[type];
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (
        e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      )(storage && storage.length !== 0)
    );
  }
};

/**
 * checks size of window for sideMenu placement/removes tent
 */
const handleSideMenuAndTint = (() => {
  const pageHeader = document.querySelector('#page-header');
  const pageBody = document.querySelector('#page-body');
  const menuDropper = document.querySelector('.menu-dropper');
  const sideMenu = document.querySelector('#side-menu');
  const todoListsDisplay = document.querySelector('#todo-lists');

  const removeTintForLargeScreens = (() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1000 && !pageBody.classList.contains('tint')) {
        sideMenu.classList.remove('show-side-menu');
        todoListsDisplay.classList.remove('tint');
        pageHeader.classList.remove('tint');
      }
    });
  })();

  /**
   * when screen size is too small, this adds functionality to show it
   */
  const showSideMenu = function () {
    sideMenu.classList.toggle('show-side-menu');
    todoListsDisplay.classList.toggle('tint');
    
  };

  menuDropper.addEventListener('click', showSideMenu, false);
})();

/**
 * starts the document with locally stored toDo's in ALL category present
 */
const autoPopulateThingsToDo = () => {
  toDoForm.rePopulateArray(toDoList, localStorage);
  toDoForm.addToDoListItemToThingsToDo(toDoList);
};
autoPopulateThingsToDo();

/**
 * Starts the document with locally stored projects populated
 * and linked to proper toDo list
 */
const autoPopulateProjects = () => {
  if (!localStorage.getItem('projectsArray')) {
    return;
  } else {
    projectInteractions.fillProjectsArray();
    for (let i = 0; i < projectInteractions.projectsArray.length; i++) {
      let projectToCreate = projectInteractions.projectsArray[i];
      projectForm.createProjectOrganizerDiv(projectToCreate.title);
    }
    projectInteractions.createProjectOrganizers();
  }
};
autoPopulateProjects();

export { storageAvailable, autoPopulateThingsToDo, autoPopulateProjects };
