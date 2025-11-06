const quickAction = document.querySelectorAll(".quick-action");

quickAction.forEach((action) => {
  action.addEventListener('click', () => {
    quickAction.forEach((action) =>  {
      action.classList.remove('active');
    });
    action.classList.add('active');
  })
})
