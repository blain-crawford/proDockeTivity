const projectInteractions = (() => {
  const currentProject = document.querySelector('#current-project');
  const projects = document.querySelectorAll('.project-name');
  const timeLineButtons = document.querySelectorAll('.timeline-div');

  const chooseProject = function () {
    currentProject.innerText = '';
    currentProject.innerText = this.innerText;
  }
  
  projects.forEach(project => {
    project.addEventListener('click', chooseProject, false);
  });

})();