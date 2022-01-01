const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');


const showAnswerButton = document.getElementById('show-answer');
const nextQuestionButton = document.getElementById('next-question');

let availableQuestions = [];

const MAX_QUESTIONS = 3;

// Initialize or fetch the "testScores" object that holds all test score data
let testScores = {};

// Fetch the questions from the "questions.json" file and store them in "questions"
fetch("questions.json")
    .then( res => {
        return res.json();
    })

    .then(loadedQuestions => {
        questions = loadedQuestions;
        startTest();
    })

    .catch( err => {
        console.error(err);
    });
;

startTest = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    scoreList = [];
    getNewQuestion();
};
 

getNewQuestion = () => {
    // Remove any green/red styling from the previous question's answer
    const answerStylingIncorrect = [...document.getElementsByClassName('incorrect')]
    
    answerStylingIncorrect.forEach(answerStylingIncorrect => {
        answerStylingIncorrect.classList.remove('incorrect')
    })
    
    const answerStylingCorrect = [...document.getElementsByClassName('correct')]
    
    answerStylingCorrect.forEach(answerStylingCorrect => {
        answerStylingCorrect.classList.remove('correct')
    })

    // Hide any explanation stylings from the previous question.
    document.getElementById('explanation').style.visibility = "hidden";

    // Update the question counter (e.g. 1/3 --> 2/3)
    questionCounter++;
    progressText.innerHTML = `Question:\u00A0 ${questionCounter}/${MAX_QUESTIONS}`

    /* When on the last question, change the "NEXT QUESTION" button to a 
       "VIEW PERFORMANCE" performance button. */
    if (questionCounter === MAX_QUESTIONS) {
        // Change the button's text
        var element = document.getElementById("next-question-text");
        element.innerHTML = "VIEW MY PERFORMANCE";

        // Change the button's action
        const viewMyPerformance = document.getElementById("next-question")
        viewMyPerformance.onclick = function RedirectToPerformance() {
            window.location.href="performance.html";
        }
    }

    // Fill in the question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // Fill in the answer options
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })

    // Fill in the explanation
    explanation.innerText = currentQuestion.explanation

    // Remove the question from the list of available questions
    availableQuestions.splice(questionIndex, 1);

    // Allow the user to select answers
    acceptingAnswers = true;
};



choices.forEach( choice => {
    choice.addEventListener("click", e => {
        // Prevent the user from selecting more than one answer
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        // Get the data for the selected answer
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        /* By default, make the user's selection incorrect; however, if the user
           selected the correct answer, make the user's selection correct. */
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }

        // Change the class element in the HTML for the parent element
        selectedChoice.parentElement.classList.add(classToApply)

        // Store whether the user got the question right or wrong in local storage
        if (localStorage.getItem(currentQuestion.questionID) !== null) {
            let questionHistory = localStorage.getItem(currentQuestion.questionID)
            updatedQuestionHistory = questionHistory + ", " + classToApply
            localStorage.setItem(currentQuestion.questionID, updatedQuestionHistory)
        } else {
            localStorage.setItem(currentQuestion.questionID, classToApply)
        }

        /* Append the user's results to the "scoreList": "0" if incorrect and "1" 
           if correct */
        if (classToApply === 'correct') {
            scoreList.push(1)
        } else {
            scoreList.push(0)
        }

        // Store the "scoreList" in local storage object after the test is complete
        if (questionCounter === MAX_QUESTIONS) {
            if (localStorage.getItem('testScores') !== null) {
                /* Append the data from the most recent test into the "testScores" object
                in local storage */
                //   STEP 1: Deserialize the existing testScores object from local storage
                let testScoresDeserialized = JSON.parse(localStorage.getItem("testScores"));

                //   STEP 2: Determine the current test number 
                testScoresKeys = Object.keys(testScoresDeserialized);

                lastKey = testScoresKeys.pop();
                
                lastTestNumber = lastKey.replace('Test ', '');

                currentTestNumber = parseInt(lastTestNumber) + 1;

                //   STEP 3: Append the recent test score data to the deserialized object
                testScoresDeserialized['Test ' + currentTestNumber.toString()] = scoreList;
                
                //   STEP 4: Re-serialize the object and put it back into local storage
                let testScoresSerialized = JSON.stringify(testScoresDeserialized);
                localStorage.setItem("testScores", testScoresSerialized);

            } else {
                // Add a key value pair to the "testScores" object (e.g. {test 1: [0, 1, 0]})
                testScores['Test 1'] = scoreList;

                // Add testScores to local storage
                let testScoresSerialized = JSON.stringify(testScores);
                localStorage.setItem('testScores', testScoresSerialized);
            }
        }
        // Do not allow the user to select answers if they have already answered
        acceptingAnswers = false;
    })
})


/* -------------------- "NEXT QUESTION" BUTTON FUNCTIONALITY -------------------- */
nextQuestionButton.onclick = getNewQuestion

/* -------------------- "SHOW ANSWER" BUTTON FUNCTIONALITY -------------------- */
// Create a function to show the answer when the "SHOW ANSWER" button is clicked
function showAnswer () {
    // Make the explanation visable
    document.getElementById('explanation').style.visibility = "visible";

    // Add green highlighting to the correct answer
    correctChoice = document.getElementById('choice' + String(currentQuestion.answer))
    correctChoice.classList.add('correct')
};

// When the "SHOW ANSWER" is clicked, show the answer.
showAnswerButton.onclick = showAnswer
