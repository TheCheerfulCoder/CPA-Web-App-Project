const ctx = document.getElementById('myChart');


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'],
        datasets: [{
            label: '% Score',
            data: [25, 55, 45, 42, 52, 34, 50],
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


