import {
  addToDoListItemToThingsToDo,
  toDoList,
  toDoForm,
  clearThingsToDoBeforeRepopulation,
} from './forms';
import { isThisMonth, isThisWeek, format, parseISO } from 'date-fns';
const timelineInteractions = (() => {
  //DOM creation
  const currentProject = document.querySelector('#current-project');
  const timeLineDivs = document.querySelectorAll('.timeline-div');
  const allTimeLine = document.querySelector('#all');
  const weekTimeLine = document.querySelector('#week');
  const monthTimeLine = document.querySelector('#month');
  const mostImportantTimeLine = document.querySelector('#most-important');
  const completedTimeLine = document.querySelector('#completed');
  const projectContainer = document.querySelector('#projects');

  const showSelectedTimeLine = function (timeLine) {
    timeLineDivs.forEach((div) => {
      div.classList.remove('current-list-view');
    });

    projectContainer.childNodes.forEach((project) => {
      project.classList.remove('current-list-view');
    });

    timeLine.classList.add('current-list-view');
  };
  const chooseAllTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    toDoForm.addToDoListItemToThingsToDo(toDoList);
    showSelectedTimeLine(allTimeLine);
  };

  const chooseWeekTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation();
    for (let i = 0; i < toDoList.length; i++) {
      if (isThisWeek(parseISO(toDoList[i].deadLine))) {
        toDoForm.createToDoListItemDiv(toDoList[i]);
      }
    }
    showSelectedTimeLine(weekTimeLine);
  };

  const chooseMonthTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation();
    for (let i = 0; i < toDoList.length; i++) {
      if (isThisMonth(parseISO(toDoList[i].deadLine))) {
        toDoForm.createToDoListItemDiv(toDoList[i]);
      }
    }
    showSelectedTimeLine(monthTimeLine);
  };

  const chooseMostImportantTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation();
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].priority === 'high') {
        toDoForm.createToDoListItemDiv(toDoList[i]);
      }
    }
    showSelectedTimeLine(mostImportantTimeLine);
  };

  const chooseCompletedTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation();
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].complete) {
        toDoForm.createToDoListItemDiv(toDoList[i]);
      }
    }
    showSelectedTimeLine(completedTimeLine);
  };

  allTimeLine.addEventListener(
    'click',
    chooseAllTimeLine.bind(allTimeLine),
    false
  );
  
  // Add all event listeners
  weekTimeLine.addEventListener('click', chooseWeekTimeLine, false);
  monthTimeLine.addEventListener('click', chooseMonthTimeLine, false);
  mostImportantTimeLine.addEventListener('click', chooseMostImportantTimeLine, false);
  completedTimeLine.addEventListener('click', chooseCompletedTimeLine, false);
})();
