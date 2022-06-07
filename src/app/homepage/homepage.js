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

switch (totalQuestionsAnswered) {
  case 20:
    emailQuestionsReminder.display(
      'Congradulations on completing 20 questions!🥳 Please send questions to itpracticetests@gmail.com',
    );
    break;
  case 40:
    emailQuestionsReminder.display(
      'Congradulations on completing 40 questions!🥳 Please send questions to itpracticetests@gmail.com',
    );
    break;
  case 80:
    emailQuestionsReminder.display(
      'Congradulations on completing 80 questions!🥳 Please send questions to itpracticetests@gmail.com',
    );
    break;
  default:
    break;
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

  history.pushState(null, null, '/CPA-Web-App-Project/index.html');
});
