parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"dAxF":[function(require,module,exports) {
function e(e){return r(e)||o(e)||n(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function r(e){if(Array.isArray(e))return s(e)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var c=document.getElementById("question"),i=Array.from(document.getElementsByClassName("choice-text")),a=document.getElementById("progressText"),l=document.getElementById("show-answer"),u=document.getElementById("next-question"),m=[],d=!0,g=1,f={};function y(){d||(correctChoice=document.getElementById("choice"+String(currentQuestion.answer)),correctChoice.classList.add("correct","button-revealed"),explanationElement=document.getElementById("explanation"),explanationElement.innerText=localStorage.getItem("questionExplanation"),document.getElementById("explanation").style.visibility="visible")}fetch("questions.json").then(function(e){return e.json()}).then(function(e){questions=e,startTest()}).catch(function(e){console.error(e)}),startTest=function(){questionCounter=0,m=e(questions),scoreList=[],getNewQuestion()},doNothing=function(){},getNewQuestion=function(){e(document.getElementsByClassName("incorrect")).forEach(function(e){e.classList.remove("incorrect")}),e(document.getElementsByClassName("correct")).forEach(function(e){e.classList.remove("correct")}),e(document.getElementsByClassName("button-revealed")).forEach(function(e){e.classList.remove("button-revealed")}),e(document.getElementsByClassName("button-selected")).forEach(function(e){e.classList.remove("button-selected")}),explanationElement=document.getElementById("explanation"),explanationElement.innerText="";var t=localStorage.getItem("studyQuestionID"),n=parseInt(t,10);(currentQuestion=m[n],c.innerText=currentQuestion.question,questionCounter===g)&&(document.getElementById("next-question-text").innerHTML="View Score");i.forEach(function(e){var t=e.dataset.number;e.innerText=currentQuestion["choice"+t]}),localStorage.setItem("questionExplanation",currentQuestion.explanation),m.splice(n,1),d=!0,document.getElementById("next-question").onclick=function(){window.location.href="/dashboard/dashboard.html"}},i.forEach(function(e){e.parentElement.addEventListener("click",function(e){if(d){if(d=!1,buttonText=document.getElementById("next-question-text").innerHTML,console.log(buttonText),"Back To Performance"===buttonText)document.getElementById("next-question").onclick=function(){window.location.href="/dashboard/dashboard.html"};else document.getElementById("next-question").onclick=function(){window.location.href="/dashboard/dashboard.html"};console.dir(e.target.tagName);var t=e.target,n="incorrect";if(t.dataset.number==currentQuestion.answer&&(n="correct"),"P"==e.target.tagName?t.parentElement.classList.add(n,"button-selected"):t.classList.add(n,"button-selected"),"incorrect"===n)if(null!==localStorage.getItem("missedQuestions")){var o=JSON.parse(localStorage.getItem("missedQuestions"));o.push(currentQuestion.questionID),localStorage.setItem("missedQuestions",JSON.stringify(o))}else localStorage.setItem("missedQuestions",'["'+currentQuestion.questionID.toString()+'"]');if("correct"===n?scoreList.push(1):scoreList.push(0),questionCounter===g)if(null!==localStorage.getItem("testScores")){var r=JSON.parse(localStorage.getItem("testScores"));testScoresKeys=Object.keys(r),lastKey=testScoresKeys.pop(),lastTestNumber=lastKey.replace("Test ",""),currentTestNumber=parseInt(lastTestNumber)+1,r["Test "+currentTestNumber.toString()]=scoreList;var s=JSON.stringify(r);localStorage.setItem("testScores",s)}else{f["Test 1"]=scoreList;var c=JSON.stringify(f);localStorage.setItem("testScores",c)}d=!1}})});var h=document.getElementById("next-question");h.onclick=function(){window.location.href="/dashboard/dashboard.html"},l.onclick=y;var E=document.getElementById("modal"),b=document.getElementById("backdrop"),I=document.getElementById("show-answer"),p=function(){d&&(E.classList.toggle("visible"),b.classList.toggle("visible"))};I.addEventListener("click",p),b.addEventListener("click",p);
},{}]},{},["dAxF"], null)
//# sourceMappingURL=/CPA-Web-App-Project/viewMissedQuestion.6ae40513.js.map