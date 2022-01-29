var i = 0;
var text = 'IT Practice Tests for BEC';
var speed = 50;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("header").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

typeWriter();