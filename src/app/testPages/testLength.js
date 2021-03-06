const goToTesting = (num) => {
  /* Store the number of quesitons selected by the user in local storage; 
    then send the user to the testing page.*/
  localStorage.setItem('testLength', String(num));
  window.location.href = 'testing.html';
};

// Add an event listner for each option the user can select.
document.getElementById('choice1').addEventListener('click', () => {
  goToTesting(5);
});

document.getElementById('choice2').addEventListener('click', () => {
  goToTesting(10);
});

document.getElementById('choice3').addEventListener('click', () => {
  goToTesting(15);
});
