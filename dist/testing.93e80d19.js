parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"lgjU":[function(require,module,exports) {
function e(e){return s(e)||o(e)||n(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function s(e){if(Array.isArray(e))return r(e)}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var i=document.getElementById("question"),c=Array.from(document.getElementsByClassName("choice-text")),a=document.getElementById("progressText"),l=document.getElementById("show-answer"),u=document.getElementById("next-question"),m=[],d=!0,g=parseInt(localStorage.getItem("testLength")),f={};function y(){d||(correctChoice=document.getElementById("choice"+String(currentQuestion.answer)),correctChoice.classList.add("correct","button-revealed"),explanationElement=document.getElementById("explanation"),explanationElement.innerText=localStorage.getItem("questionExplanation"),document.getElementById("explanation").style.visibility="visible")}fetch("../questions.json").then(function(e){return e.json()}).then(function(e){questions=e,startTest()}).catch(function(e){console.error(e)}),startTest=function(){questionCounter=0,m=e(questions),scoreList=[],getNewQuestion()},doNothing=function(){},getNewQuestion=function(){e(document.getElementsByClassName("incorrect")).forEach(function(e){e.classList.remove("incorrect")}),e(document.getElementsByClassName("correct")).forEach(function(e){e.classList.remove("correct")}),e(document.getElementsByClassName("button-revealed")).forEach(function(e){e.classList.remove("button-revealed")}),e(document.getElementsByClassName("button-selected")).forEach(function(e){e.classList.remove("button-selected")}),explanationElement=document.getElementById("explanation"),explanationElement.innerText="",questionCounter++,a.innerHTML="Question:  ".concat(questionCounter,"/").concat(g);var t=Math.floor(Math.random()*m.length);(currentQuestion=m[t],i.innerText=currentQuestion.question,u.onclick=doNothing,u.classList.toggle("button"),u.classList.toggle("button-disabled"),questionCounter===g)&&(document.getElementById("next-question-text").innerHTML="View Score");c.forEach(function(e){var t=e.dataset.number;e.innerText=currentQuestion["choice"+t]}),localStorage.setItem("questionExplanation",currentQuestion.explanation),m.splice(t,1),d=!0},c.forEach(function(e){e.parentElement.addEventListener("click",function(e){if(d){if(d=!1,buttonText=document.getElementById("next-question-text").innerHTML,"View Score"===buttonText)u.classList.toggle("button"),u.classList.toggle("button-disabled"),document.getElementById("next-question").onclick=function(){history.replaceState(null,"","/CPA-Web-App-Project/index.html"),window.location.href="/CPA-Web-App-Project/dashboard/dashboard.html"};else u.onclick=getNewQuestion,u.classList.toggle("button"),u.classList.toggle("button-disabled");console.dir(e.target.tagName);var t=e.target,n="incorrect";if(t.dataset.number==currentQuestion.answer&&(n="correct"),"P"==e.target.tagName?t.parentElement.classList.add(n,"button-selected"):t.classList.add(n,"button-selected"),"incorrect"===n)if(null!==localStorage.getItem("missedQuestions")){var o=JSON.parse(localStorage.getItem("missedQuestions"));o.push(currentQuestion.questionID),localStorage.setItem("missedQuestions",JSON.stringify(o))}else localStorage.setItem("missedQuestions",'["'+currentQuestion.questionID.toString()+'"]');if("correct"===n?scoreList.push(1):scoreList.push(0),questionCounter===g)if(null!==localStorage.getItem("testScores")){var s=JSON.parse(localStorage.getItem("testScores"));testScoresKeys=Object.keys(s),lastKey=testScoresKeys.pop(),lastTestNumber=lastKey.replace("Test ",""),currentTestNumber=parseInt(lastTestNumber)+1,s["Test "+currentTestNumber.toString()]=scoreList;var r=JSON.stringify(s);localStorage.setItem("testScores",r)}else{f["Test 1"]=scoreList;var i=JSON.stringify(f);localStorage.setItem("testScores",i)}d=!1}})}),l.onclick=y;var b=document.getElementById("modal"),p=document.getElementById("backdrop"),h=document.getElementById("show-answer"),E=function(){d&&(b.classList.toggle("visible"),p.classList.toggle("visible"))};h.addEventListener("click",E),p.addEventListener("click",E);
},{}]},{},["lgjU"], null)
//# sourceMappingURL=/CPA-Web-App-Project/testing.93e80d19.js.map