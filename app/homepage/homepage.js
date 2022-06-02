const testScores = window.localStorage.getItem('testScores');
const matches = testScores.match(/\[.+?\]/g);
const rawString = matches.join();
const totalQuestionsAnswered =
  rawString.match(/0/g).length + rawString.match(/1/g).length;

console.log(totalQuestionsAnswered);

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
      'Congradulations on completing 20 questions!🥳 Please send questions to itpracticetests@gmail.com'
    );
    break;
  case 40:
    emailQuestionsReminder.display(
      'Congradulations on completing 40 questions!🥳 Please send questions to itpracticetests@gmail.com'
    );
    break;
  case 80:
    emailQuestionsReminder.display(
      'Congradulations on completing 80 questions!🥳 Please send questions to itpracticetests@gmail.com'
    );
}
