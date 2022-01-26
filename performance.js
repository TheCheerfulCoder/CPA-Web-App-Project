const ctx = document.getElementById('myChart');



/* CREATE THE LINE CHART */
// Get the object from local storage
let testScoresDeserialized = JSON.parse(localStorage.getItem("testScores"));
// Get the keys from the object
testScoresKeys = Object.keys(testScoresDeserialized);
// Get the last 6 keys
let recentTests = testScoresKeys.slice(-6);

const recentTestScores = [];

for (var i = 0; i < 6; i++) {
    const singleTestData = testScoresDeserialized[recentTests[i]];
    const numberCorrect = singleTestData.filter(function(x) {
        return x !== 0;
    }); 
    let testScore = Math.round(100 * (numberCorrect.length / singleTestData.length))
    recentTestScores.push(testScore)
}

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: recentTests,
        datasets: [{
            label: '% Score',
            data: recentTestScores,
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

    // Update the DOM to present the data (First row for now)
    let tableRef = document.getElementById("missed-questions-table");

    let newRow = tableRef.insertRow(-1);

    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode(loadedQuestions[Number(missedQuestionsArray[0][0])].question.substring(0, 20) + '...'); 
    newCell.appendChild(newText);

    let newCell1 = newRow.insertCell(0);
    let newText1 = document.createTextNode(missedQuestionsArray[0][1]);
    newCell1.appendChild(newText1);

    let newCell2 = newRow.insertCell(0);
    let newText2 = document.createTextNode(missedQuestionsArray[0][0]);
    newCell2.appendChild(newText2);



}


/* Build a JavaScript Object for the table's data: I think key-value pairs
should work well with this. The key will be the Question ID and the value 
will be an array that contains the number of times the object was missed and 
the first ten or so letters with ellipsis. 

STEP 1: Get a count for each Question ID in the "missedQuestions" variable;
store this in a key value pair with the Question ID as the key and the count
as the value.*/












