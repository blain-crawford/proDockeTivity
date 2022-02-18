import './styles.css';
import { compareAsc, format } from 'date-fns';
import { toDoForm, toDoList } from './forms';


/**
 * activate functionality for toDoForm
 */
toDoForm


/**
 * checks size of window for sideMenu placement/removes tent
 */
const handleSideMenuAndTint = (() => {
  const pageHeader = document.querySelector('#page-header');
  const pageBody = document.querySelector('#page-body');
  const menuDropper = document.querySelector('.menu-dropper')
  const sideMenu = document.querySelector('#side-menu');
  const todoListsDisplay = document.querySelector('#todo-lists');

  const removeTintForLargeScreens = (() => {
    window.addEventListener('resize', () => {
      if(window.innerWidth > 1000 && !pageBody.classList.contains('tint')) {
        sideMenu.classList.remove('show-side-menu');
        todoListsDisplay.classList.remove('tint');
        pageHeader.classList.remove('tint');
      }
    })
  })();

  const showSideMenu = function () {  
    sideMenu.classList.toggle('show-side-menu');
    todoListsDisplay.classList.toggle('tint');
    pageHeader.classList.toggle('tint');
  }

  menuDropper.addEventListener('click', showSideMenu, false);
})();







