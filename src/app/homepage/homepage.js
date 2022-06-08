/* If the candidate has completed 30 to 60 questions and they have not already
received a reminder, remind them to submit a question. */
const testScores = window.localStorage.getItem('testScores');
const matches = testScores.match(/\[.+?\]/g);
const rawString = matches.join();
const totalQuestionsAnswered =
  rawString.match(/0/g).length + rawString.match(/1/g).length;

class Reminder {
  display(msg) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-text').innerHTML = msg;
    const backDrop = document.getElementById('backdrop');
    modal.classList.toggle('visible');
    backDrop.classList.toggle('visible');
    backDrop.addEventListener('click', () => {
      modal.classList.toggle('visible');
      backDrop.classList.toggle('visible');
    });
  }
}

const emailQuestionsReminder = new Reminder();

if (totalQuestionsAnswered <= 60 && totalQuestionsAnswered >= 30) {
  if (localStorage.getItem('sendQuestionReminder') !== 'sent') {
    emailQuestionsReminder.display(
      `Congrats on completing ${totalQuestionsAnswered} questions!🥳 
      When studying a subject, it often helps to teach others. You can submit a
      question by clicking the "Help Out" button.`,
    );
    localStorage.setItem('sendQuestionReminder', 'sent');
  }
}

/* Update the card to display contribution options when the user clickes on the
"Help Out" button. */
document.getElementById('help-out').addEventListener('click', () => {
  const cardContainer = document.querySelector('.container');
  cardContainer.innerHTML = `
    <div id="home" class="flex-center flex-column" id="card">
      <h1 id="header">${'Three Ways to Help Out'}</h1>
      <a href="/CPA-Web-App-Project/homepage/submitQuestion.html" class="button"
        >${'Send a Question'}</a>
      <a href="" class="button"
        >${'Contribute Via GitHub'}</a>
      <a href="" class="button"
        >${'Donate'}</a>
  </div>
  `;
});
