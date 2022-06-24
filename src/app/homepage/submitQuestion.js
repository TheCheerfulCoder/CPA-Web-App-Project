const thankYouModal = document.getElementById('modal');
const backDrop = document.getElementById('backdrop');

question = '';
choiceOne = '';
choiceTwo = '';
choiceThree = '';
choiceFour = '';
answer = '';
explanation = '';

updateQuestion = () => {
  question = document.getElementById('question').value;
};
updateChoiceOne = () => {
  choiceOne = document.getElementById('choiceOne').value;
};
updateChoiceTwo = () => {
  choiceTwo = document.getElementById('choiceTwo').value;
};
updateChoiceThree = () => {
  choiceThree = document.getElementById('choiceThree').value;
};
updateChoiceFour = () => {
  choiceFour = document.getElementById('choiceFour').value;
};
updateAnswer = () => {
  answer = document.getElementById('answer').value;
};
updateExplanation = () => {
  explanation = document.getElementById('explanation').value;
};

window.addEventListener('beforeunload', function (e) {
  if (
    question !== '' ||
    choiceOne !== '' ||
    choiceTwo !== '' ||
    choiceThree !== '' ||
    choiceFour !== '' ||
    answer !== '' ||
    explanation !== ''
  ) {
    e.preventDefault();
    e.returnValue = '';
  }
});

function sendQuestion(params) {
  const tempParams = {
    question: document.getElementById('question').value,
    choiceOne: document.getElementById('choiceOne').value,
    choiceTwo: document.getElementById('choiceTwo').value,
    choiceThree: document.getElementById('choiceThree').value,
    choiceFour: document.getElementById('choiceFour').value,
    answer: document.getElementById('answer').value,
    explanation: document.getElementById('explanation').value,
  };

  emailjs
    .send('service_7i1gahp', 'template_uloxhxu', tempParams)
    .then(function (res) {
      modal.classList.toggle('visible');
      backDrop.classList.toggle('visible');
      console.log('success', res.status);
    });

  question = '';
  choiceOne = '';
  choiceTwo = '';
  choiceThree = '';
  choiceFour = '';
  answer = '';
  explanation = '';
}

document.getElementById('sendQuestion').addEventListener('click', sendQuestion);
