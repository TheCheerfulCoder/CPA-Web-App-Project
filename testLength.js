const goToTesting = (num) => {
    localStorage.setItem("testLength", String(num));
    window.location.href="testing.html";
}

document.getElementById("choice1").addEventListener("click", () => {
    goToTesting(1);
});

document.getElementById("choice2").addEventListener("click", () => {
    goToTesting(2);
});

document.getElementById("choice3").addEventListener("click", () => {
    goToTesting(3);
});

// TODO: Change the testing.js file to query local storage in order to get the
// number of questions.
console.log(parseInt(localStorage.getItem("testLength")));