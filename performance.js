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

/* CREATE THE TABLE */
// Get the array of missed questions from local storage
let missedQuestions = JSON.parse(localStorage.getItem('missedQuestions'));

// Fetch the data from questions.json
fetch("questions.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        loadedQuestions = data;
    });

/* Build a JavaScript Object for the table's data: I think key-value pairs
should work well with this. The key will be the Question ID and the value 
will be an array that contains the number of times the object was missed and 
the first ten or so letters with ellipsis. 

STEP 1: Get a count for each Question ID in the "missedQuestions" variable;
store this in a key value pair with the Question ID as the key and the count
as the value.

STEP 2: Append the starting text of the question to the data structure from
above.*/

// Update the DOM to present the data: 