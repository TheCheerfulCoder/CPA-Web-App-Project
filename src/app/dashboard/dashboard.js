const ctx = document.getElementById('myChart');

const viewMissedQuestion = (questionID) => {
  localStorage.setItem('studyQuestionID', questionID);
  window.location.href = '/dashboard/viewMissedQuestion.html';
};

// Get key names of the most recent six tests.
let testDataDeserialized = JSON.parse(localStorage.getItem('testScores'));
let testDataKeys = Object.keys(testDataDeserialized);
let recentTests = testDataKeys.slice(-10);

// Get the test scores for the most recent six tests.
var recentTestScores = [];
for (var i = Object.keys(testDataDeserialized).length - 1; i >= 0; i--) {
  const singleTestData = testDataDeserialized[testDataKeys[i]];

  const numberCorrect = singleTestData.filter((data) => data !== 0);
  let testScore = Math.round(
    100 * (numberCorrect.length / singleTestData.length)
  );

  recentTestScores.unshift(testScore);
}

const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: recentTests,
    datasets: [
      {
        label: '%',
        data: recentTestScores.slice(-10),
        backgroundColor: ['rgb(00, 00, 00)'],
        borderColor: ['#10ff10'],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: (100)[
          {
            afterDataLimits: function (axis) {
              axis.max += 1;
            },
          }
        ],
      },
    },
  },
});

// Fetch the data from /assets/questions.json
fetch('../questions.json')
  .then(function (resp) {
    return resp.json();
  })

  .then(function (data) {
    loadedQuestions = data;
    displayMissedQuestions();
  })

  .catch((err) => {
    console.error(err);
  });

displayMissedQuestions = () => {
  /* Create a table of buttons that show a preivew of the every missed 
    question (i.e, How many times does it...) and the number of times that 
    question was missed. When the user clicks on each button, it should take 
    them to the viewMissedQuestion.js page to study the missed question. */

  // Get the array of missed questions from local storage
  let missedQuestions = JSON.parse(localStorage.getItem('missedQuestions'));

  // Create an object that contains all the missed questions and their
  // frequency. Example: {00001: 3, 00003: 5, 00002: 6}
  const missedQuestionsObject = {};
  for (const num of missedQuestions) {
    missedQuestionsObject[num] = missedQuestionsObject[num]
      ? missedQuestionsObject[num] + 1
      : 1;
  }

  // Turn the "missedQuestionsObject" into a multidemensional array.
  // Example: [['00002', 6], ['00003', 5], ['00001', 3]].
  const missedQuestionsArray = Object.entries(missedQuestionsObject);

  // Sort the multidemensional array in descending order based on frequency.
  missedQuestionsArray.sort(function (a, b) {
    return b[1] - a[1];
  });

  // Render all the buttons on the screen.
  list = document.querySelector('.list');
  for (missedQuestion of missedQuestionsArray) {
    questionID = missedQuestion[0];
    timesMissed = missedQuestion[1];
    questionPreview =
      loadedQuestions[Number(questionID)].question.substring(0, 40).trim() +
      '...';

    list.innerHTML += `
            <div class="button parent" id="${questionID}">
                <div class="child">${questionPreview}</div> 
                <div class="child">${timesMissed}</div> 
            </div>
        `;
  }

  // Make each button send the user to the testing page when clicked.
  list.addEventListener('click', (event) => {
    selectedQuestionID = event.target.closest('.button').id;
    viewMissedQuestion(selectedQuestionID);
  });
};
