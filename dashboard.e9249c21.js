parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"XlwB":[function(require,module,exports) {
function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=e(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){l=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(l)throw s}}}}function e(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}for(var r=document.getElementById("myChart"),o=function(t){localStorage.setItem("studyQuestionID",t),window.location.href="/CPA-Web-App-Project/dashboard/viewMissedQuestion.html"},i=JSON.parse(localStorage.getItem("testScores")),s=Object.keys(i),a=s.slice(-10),l=[],u=Object.keys(i).length-1;u>=0;u--){var c=i[s[u]],d=c.filter(function(t){return 0!==t}),f=Math.round(d.length/c.length*100);l.unshift(f)}var m=new Chart(r,{type:"line",data:{labels:a,datasets:[{label:"%",data:l.slice(-10),backgroundColor:["rgb(00, 00, 00)"],borderColor:["#10ff10"],borderWidth:1}]},options:{responsive:!0,plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,max:100[{afterDataLimits:function(t){t.max+=1}}]}}}});fetch("../questions.json").then(function(t){return t.json()}).then(function(t){loadedQuestions=t,displayMissedQuestions()}).catch(function(t){console.error(t)}),displayMissedQuestions=function(){var e,n={},r=t(JSON.parse(localStorage.getItem("missedQuestions")));try{for(r.s();!(e=r.n()).done;){var i=e.value;n[i]=n[i]?n[i]+1:1}}catch(u){r.e(u)}finally{r.f()}var s=Object.entries(n);s.sort(function(t,e){return e[1]-t[1]}),list=document.querySelector(".list");for(var a=0,l=s;a<l.length;a++)missedQuestion=l[a],questionID=missedQuestion[0],timesMissed=missedQuestion[1],questionPreview=loadedQuestions[Number(questionID)].question.substring(0,40).trim()+"...",list.innerHTML+='\n            <div class="button parent" id="'.concat(questionID,'">\n                <div class="child left-child">').concat(questionPreview,'</div> \n                <div class="child">').concat(timesMissed,"</div> \n            </div>\n        ");list.addEventListener("click",function(t){selectedQuestionID=t.target.closest(".button").id,o(selectedQuestionID)})};
},{}]},{},["XlwB"], null)
//# sourceMappingURL=/CPA-Web-App-Project/dashboard.e9249c21.js.map