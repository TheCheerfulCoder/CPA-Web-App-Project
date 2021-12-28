const showAnswerButton = document.getElementById('show-answer');


/*"SHOW ANSWER" BUTTON FUNCTIONALITY*/
// Create a function to show the answer when the "SHOW ANSWER" button is clicked
function showAnswer () {
    document.getElementById('explanation').style.visibility = "visible";
};

// When the "SHOW ANSWER" is clicked, show the answer.
showAnswerButton.onclick = showAnswer

