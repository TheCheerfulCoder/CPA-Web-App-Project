function sendQuestion(params) {
  const tempParams = {
    question: document.getElementById('question').value,
    choiceOne: document.getElementById('choiceOne').value,
    choiceTwo: document.getElementById('choiceTwo').value,
    choiceThree: document.getElementById('choiceThree').value,
    choiceFour: document.getElementById('choiceFour').value,
    answer: document.getElementById('answer').value,
    explanation: document.getElementById('explanation').value
  };

  emailjs.send('service_7i1gahp', 'template_uloxhxu', tempParams)
  .then(function(res){  
    console.log('success', res.status);
  })
}

document.getElementById('sendQuestion').addEventListener('click', sendQuestion);
