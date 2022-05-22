const ctx = document.getElementById('myChart');

const viewMissedQuestion = (questionID) => {
    localStorage.setItem('studyQuestionID', questionID);
    window.location.href='viewMissedMcq.html';
}

// Get key names of the most recent six tests.
let testDataDeserialized = JSON.parse(localStorage.getItem("testScores"));
let testDataKeys = Object.keys(testDataDeserialized);
let recentTests = testDataKeys.slice(-6);

// Get the test scores for the most recent six tests.
var recentTestScores = [];
for (var i = Object.keys(testDataDeserialized).length - 1; i >= 0; i--) {
    const singleTestData = testDataDeserialized[testDataKeys[i]];

    const numberCorrect = singleTestData.filter(data => data !== 0);
    let testScore = Math.round(
        100 * (numberCorrect.length / singleTestData.length)
    );
    
    recentTestScores.unshift(testScore);
}

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: recentTests,
        datasets: [{
            label: '% Score',
            data: recentTestScores.slice(-6),
            backgroundColor: [
                'rgb(00, 80, 00)', 
            ],
            borderColor: [
                'rgb(00, 80, 00)',
            ],
            borderWidth: 1,
            
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true

            }
        }
    }
});


// Fetch the data from questions.json
fetch("questions.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        loadedQuestions = data;
        displayMissedQuestions();
    });

displayMissedQuestions = () => {
    // Get the array of missed questions from local storage
    let missedQuestions = JSON.parse(localStorage.getItem('missedQuestions'));
    
    // Create an object that contains all the missed questions and their frequency
    // Example: {00001: 3, 00003: 5, 00002: 6}
    const missedQuestionsObject = {};
    for (const num of missedQuestions) {
        missedQuestionsObject[num] = missedQuestionsObject[num] ? missedQuestionsObject[num] + 1 : 1;
    }

    // Turn the "missedQuestionsObject" into a multidemensional array
    // Example: [['00002', 6], ['00003', 5], ['00001', 3]]
    const missedQuestionsArray = Object.entries(missedQuestionsObject)

    /* NOTE: The following step may not be necessary. I just don't know if the
             Object.entries() method above sorts in descending order. */

    // Sort the multidemensional array in descending order based on frequency
    missedQuestionsArray.sort(function (a, b) {
        return b[1] - a[1];
    });
    
    // Get a reference to the table
    let tableRef = document.getElementById("missed-questions-table");

    // Fill out the "Missed Questions" table
    for (row = 0; row < missedQuestionsArray.length; row++) {
        // Insert a new row at the bottom of the table
        let newRow = tableRef.insertRow(-1);
        newRow.id = missedQuestionsArray[row][0];
        document.getElementById(
            missedQuestionsArray[row][0]
            ).addEventListener(
                'click', viewMissedQuestion.bind(
                    null,missedQuestionsArray[row][0]
                    )
                );

        // Insert the value into the "Question" column's cell
        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode(loadedQuestions[Number(missedQuestionsArray[row][0])].question.substring(0, 20) + '...'); 
        newCell.appendChild(newText);

        // Insert the value into the "Number of Ties Missed" column's cell
        let newCell1 = newRow.insertCell(0);
        let newText1 = document.createTextNode(missedQuestionsArray[row][1]);
        newCell1.appendChild(newText1);

        // Insert the value into the "Question ID" column's cell
        let newCell2 = newRow.insertCell(0);
        let newText2 = document.createTextNode(missedQuestionsArray[row][0]);
        newCell2.appendChild(newText2);
    }

};





