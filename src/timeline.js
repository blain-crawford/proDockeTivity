import { addToDoListItemToThingsToDo, toDoList, toDoForm, clearThingsToDoBeforeRepopulation } from "./forms";
import { isThisMonth, isThisWeek, format, parseISO } from "date-fns";
const timelineInteractions = (() => {
  const currentProject = document.querySelector('#current-project')
  const allTimeLine = document.querySelector('#all');
  const weekTimeLine = document.querySelector('#week');
  const monthTimeLine = document.querySelector('#month');
  const mostImportantTimeLine = document.querySelector('#most-important');
  const completedTimeLine = document.querySelector('#completed');

  const chooseAllTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    toDoForm.addToDoListItemToThingsToDo(toDoList);
  };

  const chooseWeekTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation()
    for(let i = 0; i < toDoList.length; i++) {
      if(isThisWeek(parseISO(toDoList[i].deadLine))) {
        toDoForm.createToDOListItemDiv(toDoList[i]);
      }
    }
  };

  const chooseMonthTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation()
    for(let i = 0; i < toDoList.length; i++) {
      if(isThisMonth(parseISO(toDoList[i].deadLine))) {
        toDoForm.createToDOListItemDiv(toDoList[i]);
      }
    }
  };

  const chooseMostImportantTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation()
    for(let i = 0; i < toDoList.length; i++) {
      if(toDoList[i].priority === 'high') {
        toDoForm.createToDOListItemDiv(toDoList[i]);
      }
    }
  };

  const chooseCompletedTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
    clearThingsToDoBeforeRepopulation()
    for(let i = 0; i < toDoList.length; i++) {
      if(toDoList[i].complete) {
        toDoForm.createToDOListItemDiv(toDoList[i]);
      }
    }
  };

  allTimeLine.addEventListener('click', chooseAllTimeLine, false);
  weekTimeLine.addEventListener('click', chooseWeekTimeLine, false);
  monthTimeLine.addEventListener('click', chooseMonthTimeLine, false);
  mostImportantTimeLine.addEventListener('click', chooseMostImportantTimeLine, false);
  completedTimeLine.addEventListener('click', chooseCompletedTimeLine, false);
})();