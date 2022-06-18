// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"testPages/testing.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* If the current URL includes "index.html", then user has pressed the back
button after completing the quiz, so reload the home page. */
// console.log(window.location.href.includes('index.html'));
// if (window.location.href.includes('index.html')) {
//   window.location.reload('/CPA-Web-App-Project/index.html');
// }
var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var progressText = document.getElementById('progressText');
var showAnswerButton = document.getElementById('show-answer');
var nextQuestionButton = document.getElementById('next-question');
var availableQuestions = [];
var acceptingAnswers = true;
var MAX_QUESTIONS = parseInt(localStorage.getItem('testLength')); // Initialize or fetch the "testScores" object that holds all test score data

var testScores = {}; // Fetch the questions from the "/assets/questions.json" file and store them in "questions"

fetch('../questions.json').then(function (res) {
  return res.json();
}).then(function (loadedQuestions) {
  questions = loadedQuestions;
  startTest();
}).catch(function (err) {
  console.error(err);
});

startTest = function startTest() {
  questionCounter = 0;
  availableQuestions = _toConsumableArray(questions);
  scoreList = [];
  getNewQuestion();
};

doNothing = function doNothing() {
  return;
};

getNewQuestion = function getNewQuestion() {
  // Remove any green/red styling from the previous question's answer
  var answerStylingIncorrect = _toConsumableArray(document.getElementsByClassName('incorrect'));

  answerStylingIncorrect.forEach(function (answerStylingIncorrect) {
    answerStylingIncorrect.classList.remove('incorrect');
  });

  var answerStylingCorrect = _toConsumableArray(document.getElementsByClassName('correct'));

  answerStylingCorrect.forEach(function (answerStylingCorrect) {
    answerStylingCorrect.classList.remove('correct');
  });

  var answerStylingRevealed = _toConsumableArray(document.getElementsByClassName('button-revealed'));

  answerStylingRevealed.forEach(function (answerStylingRevealed) {
    answerStylingRevealed.classList.remove('button-revealed');
  });

  var answerStylingSelected = _toConsumableArray(document.getElementsByClassName('button-selected'));

  answerStylingSelected.forEach(function (answerStylingSelected) {
    answerStylingSelected.classList.remove('button-selected');
  }); // Hide any explanation stylings from the previous question.

  explanationElement = document.getElementById('explanation');
  explanationElement.innerText = ''; // Update the question counter (e.g. 1/3 --> 2/3)

  questionCounter++;
  progressText.innerHTML = "Question:\xA0 ".concat(questionCounter, "/").concat(MAX_QUESTIONS); // Fill in the question

  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question; // Disable the next question button.

  nextQuestionButton.onclick = doNothing;
  nextQuestionButton.classList.toggle('button');
  nextQuestionButton.classList.toggle('button-disabled');
  /* When on the last question, change the "NEXT QUESTION" button to a 
       "VIEW PERFORMANCE" performance button. */

  if (questionCounter === MAX_QUESTIONS) {
    // Change the button's text
    var element = document.getElementById('next-question-text');
    element.innerHTML = 'View Score';
  } // Fill in the answer options


  choices.forEach(function (choice) {
    var number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  }); // // Fill in the explanation
  // explanation.innerText = currentQuestion.explanation;
  // Send question explanation to local storage for later access in the "ShowAnswer"
  // function.

  localStorage.setItem('questionExplanation', currentQuestion.explanation); // Remove the question from the list of available questions

  availableQuestions.splice(questionIndex, 1); // Allow the user to select answers

  acceptingAnswers = true;
};

choices.forEach(function (choice) {
  choice.parentElement.addEventListener('click', function (e) {
    // Prevent the user from selecting more than one answer
    if (!acceptingAnswers) return;
    acceptingAnswers = false; // Enable the next question button unless we are on the last question.

    buttonText = document.getElementById('next-question-text').innerHTML;

    if (buttonText === 'View Score') {
      nextQuestionButton.classList.toggle('button');
      nextQuestionButton.classList.toggle('button-disabled');
      var viewMyPerformance = document.getElementById('next-question');

      viewMyPerformance.onclick = function RedirectToPerformance() {
        // history.replaceState({}, '', '/CPA-Web-App-Project/index.html');
        window.location.href = '/CPA-Web-App-Project/dashboard/dashboard.html';
      };
    } else {
      nextQuestionButton.onclick = getNewQuestion;
      nextQuestionButton.classList.toggle('button');
      nextQuestionButton.classList.toggle('button-disabled');
    } // Get the data for the selected answer


    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];
    /* By default, make the user's selection incorrect; however, if the user
           selected the correct answer, make the user's selection correct. */

    var classToApply = 'incorrect';

    if (selectedAnswer == currentQuestion.answer) {
      classToApply = 'correct';
    } // Change the class element in the HTML for the parent element


    if (e.target.tagName == 'P') {
      selectedChoice.parentElement.classList.add(classToApply, 'button-selected');
    } else {
      selectedChoice.classList.add(classToApply, 'button-selected');
    } // Store whether the user got the question right or wrong in local storage


    if (classToApply === 'incorrect') {
      if (localStorage.getItem('missedQuestions') !== null) {
        var missedQuestionsDeserialized = JSON.parse(localStorage.getItem('missedQuestions'));
        missedQuestionsDeserialized.push(currentQuestion.questionID);
        localStorage.setItem('missedQuestions', JSON.stringify(missedQuestionsDeserialized));
      } else {
        localStorage.setItem('missedQuestions', '["' + currentQuestion.questionID.toString() + '"]');
      }
    }
    /* Append the user's results to the "scoreList": "0" if incorrect and "1" 
           if correct */


    if (classToApply === 'correct') {
      scoreList.push(1);
    } else {
      scoreList.push(0);
    } // Store the "scoreList" in local storage object after the test is complete


    if (questionCounter === MAX_QUESTIONS) {
      if (localStorage.getItem('testScores') !== null) {
        /* Append the data from the most recent test into the "testScores" object
                in local storage */
        //   STEP 1: Deserialize the existing testScores object from local storage
        var testScoresDeserialized = JSON.parse(localStorage.getItem('testScores')); //   STEP 2: Determine the current test number

        testScoresKeys = Object.keys(testScoresDeserialized);
        lastKey = testScoresKeys.pop();
        lastTestNumber = lastKey.replace('Test ', '');
        currentTestNumber = parseInt(lastTestNumber) + 1; //   STEP 3: Append the recent test score data to the deserialized object

        testScoresDeserialized['Test ' + currentTestNumber.toString()] = scoreList; //   STEP 4: Re-serialize the object and put it back into local storage

        var testScoresSerialized = JSON.stringify(testScoresDeserialized);
        localStorage.setItem('testScores', testScoresSerialized);
      } else {
        // Add a key value pair to the "testScores" object (e.g. {test 1: [0, 1, 0]})
        testScores['Test 1'] = scoreList; // Add testScores to local storage

        var _testScoresSerialized = JSON.stringify(testScores);

        localStorage.setItem('testScores', _testScoresSerialized);
      }
    } // Do not allow the user to select answers if they have already answered


    acceptingAnswers = false;
  });
});

function showAnswer() {
  // Disable the "SHOW ANSWER" button if the user has not selected an answer.
  if (acceptingAnswers) {
    return;
  } // Add green highlighting to the correct answer.


  correctChoice = document.getElementById('choice' + String(currentQuestion.answer));
  correctChoice.classList.add('correct', 'button-revealed'); // // Make the answer explanation visable.
  // Insert the HTML element

  explanationElement = document.getElementById('explanation');
  explanationElement.innerText = localStorage.getItem('questionExplanation');
  document.getElementById('explanation').style.visibility = 'visible';
}

showAnswerButton.onclick = showAnswer;
var modal = document.getElementById('modal');
var backDrop = document.getElementById('backdrop');
var revealModalButton = document.getElementById('show-answer');

var toggleModal = function toggleModal() {
  if (acceptingAnswers) {
    modal.classList.toggle('visible');
    backDrop.classList.toggle('visible');
  } else {
    return;
  }
};

revealModalButton.addEventListener('click', toggleModal);
backDrop.addEventListener('click', toggleModal);
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54116" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","testPages/testing.js"], null)
//# sourceMappingURL=/CPA-Web-App-Project/testing.8b06f6bd.js.map