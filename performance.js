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

console.log(recentTestScores)

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


// CREATE THE TABLE