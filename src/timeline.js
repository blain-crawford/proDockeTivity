const timelineInteractions = (() => {
  const currentProject = document.querySelector('#current-project')
  const timeLineButtons = document.querySelectorAll('.timeline-div')

  const chooseTimeLine = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
  }

  timeLineButtons.forEach(button => {
    button.addEventListener('click', chooseTimeLine, false)
  })

})();