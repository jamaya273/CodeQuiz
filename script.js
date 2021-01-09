var cont = document.getElementById("container");
var quizCont = document.getElementById("quizContainer");
var quizReslt = document.getElementById("quizResult");
var timeEl = document.querySelector("#timer");

var counter = document.querySelector("#counter");
var startButton = document.querySelector("#start-button");
var count = localStorage.getItem("count");
var secondsLeft = 101;

var arrScores = (localStorage.getItem("highScore"));

counter.textContent = count;

var quiz = [
  {
    question: 'Which of the following is correct about features of JavaScript?',
    answer: {
      a: 'a. JavaScript is a lightweight, interpreted programming language.',
      b: 'b. JavaScript is designed for creating network-centric applications.',
      c: 'c. JavaScript is complementary to and integrated with Java.',
      d: 'd. All of the above',
    },
    correctAnswer: 'd',
  },

  {
    question: 'Which is the correct way to write a JavaScript array?',
    answer: {
      a: 'a. var txt = new Array(1:"tim",2:"kim",3:"jim")',
      b: 'b. var txt = new Array:1=("tim")2=("kim")3=("jim")',
      c: 'c. var txt = new Array("tim","kim","jim")',
      d: 'd. new Array="tim","kim","jim"',
    },
    correctAnswer: 'c',
  },


  {
    question: 'What is mean by "this" keyword in JavaScript?',
    answer: {
      a: 'a. It refers current object',
      b: 'b. It refers previous object',
      c: 'c. It is variable which contains value',
      d: 'd. None of the above',
    },
    correctAnswer: 'a',
  },

  {
    question: 'Using _______ statement is how you test for a specific condition',
    answer: {
      a: 'a. Select',
      b: 'b. If',
      c: 'c. Switch',
      d: 'd. For',
    },
    correctAnswer: 'b',
  },


  {
    question: 'Which of the following is not a valid JavaScript variable name?',
    answer: {
      a: 'a. 2names',
      b: 'b. _first_and_last_names',
      c: 'c. FirstAndLast',
      d: 'd. None of the above',
    },
    correctAnswer: 'a',
  },

  {
    question: 'Which of the following type of variable is visible everywhere in your JavaScript code?',
    answer: {
      a: 'a. global variable',
      b: 'b. local variable',
      c: 'c. Both of the above',
      d: 'd. None of the above',
    },
    correctAnswer: 'a',
  },

]



startButton.addEventListener("click", function () {


  quizReslt.innerHTML = "";

  showQuestion(0);

  var timerInterval = setInterval(function () {
    secondsLeft -= 1;
    timeEl.textContent = "Time: " + (secondsLeft - 1);
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      allDone();
      timeEl.textContent = "Time: " + secondsLeft;
    };
  }, 1000);



  count++;
  counter.textContent = count;

  localStorage.setItem("count", count);



  function showQuestion(i) {
    cont.innerHTML = "";
    quizCont.innerHTML = "";

    if (i == 6 && secondsLeft > 0) {
      clearInterval(timerInterval);
      allDone();
      
      return;
    };

    var h3q = document.createElement("H3");
    var text3 = document.createTextNode(quiz[i].question);
    h3q.appendChild(text3);
    quizCont.appendChild(h3q);

    var btn1 = document.createElement("BUTTON");
    btn1.innerHTML = quiz[i].answer.a;
    quizCont.appendChild(btn1).setAttribute("class", "answer-button");
    btn1.addEventListener("click", function () {
      if (quiz[i - 1].correctAnswer === 'a') {
        showQuestion(i);
        sendMessage(1);
      }
      else {
        secondsLeft -= 10;
        sendMessage(0);
      };
    })

    var btn2 = document.createElement("BUTTON");
    btn2.innerHTML = quiz[i].answer.b;
    quizCont.appendChild(btn2).setAttribute("class", "answer-button");
    btn2.addEventListener("click", function () {
      if (quiz[i - 1].correctAnswer === 'b') {
        showQuestion(i);
        sendMessage(1);
      }
      else {
        secondsLeft -= 10;
        sendMessage(0);
      };
    })

    var btn3 = document.createElement("BUTTON");
    btn3.innerHTML = quiz[i].answer.c;
    quizCont.appendChild(btn3).setAttribute("class", "answer-button");
    btn3.addEventListener("click", function () {
      if (quiz[i - 1].correctAnswer === 'c') {
        showQuestion(i);
        sendMessage(1);
      }
      else {
        secondsLeft -= 10;
        sendMessage(0);
      };
    })

    var btn4 = document.createElement("BUTTON");
    btn4.innerHTML = quiz[i].answer.d;
    quizCont.appendChild(btn4).setAttribute("class", "answer-button");
    btn4.addEventListener("click", function () {
      if (quiz[i - 1].correctAnswer === 'd') {
        showQuestion(i);
        sendMessage(1);
      }
      else {
        secondsLeft -= 10;
        sendMessage(0);
      };
    })

    i++;


  }

  function sendMessage(e) {
    var Hr = document.createElement("hr");
    var Pr = document.createElement("P");
    if (e === 1) {
      var text4 = document.createTextNode("Correct");
    }
    else {
      var text4 = document.createTextNode("Wrong");
    };

    quizReslt.appendChild(Hr);

    Pr.appendChild(text4);
    quizReslt.appendChild(Pr);

    setTimeout(function () {
      quizReslt.innerHTML = "";
    }, 500);
  }


  function allDone() {
    quizCont.innerHTML = "";
    var h3q = document.createElement("H3");
    var text3 = document.createTextNode("All Done");
    h3q.appendChild(text3);
    quizCont.appendChild(h3q);

    var Pa = document.createElement("P");
    var text5 = document.createTextNode("Your Final Score is " + secondsLeft);
    Pa.appendChild(text5);
    quizCont.appendChild(Pa);

    var Pa = document.createElement("P");
    var text5 = document.createTextNode("Enter your initials");
    Pa.appendChild(text5);
    quizCont.appendChild(Pa);

    var inpuntIni = document.createElement("INPUT");
    inpuntIni.setAttribute("type", "text");
    inpuntIni.setAttribute("id", "idInitials");
    inpuntIni.setAttribute("value", "");
    quizCont.appendChild(inpuntIni);
    
    
    var arrScores = JSON.parse(localStorage.getItem('highScore')) || [];
    var btnSubmit = document.createElement("BUTTON");
    btnSubmit.innerHTML = "Submit";
    quizCont.appendChild(btnSubmit).setAttribute("class", "submit-button");
    btnSubmit.addEventListener("click", function () {
      quizScore = {
        initials: initialsValue=document.getElementById("idInitials").value,
        score: secondsLeft
      };
      arrScores.push(quizScore); 
      localStorage.setItem("highScore", JSON.stringify(arrScores));
      showScores();

    })

    
  }


  function showScores() {
    quizCont.innerHTML = "";
    var h3q = document.createElement("H3");
    var text3 = document.createTextNode("High Scores");
    h3q.appendChild(text3);
    quizCont.appendChild(h3q);


    
    var listScores = document.createElement("LI");
    var item = document.createTextNode("Something")
    listScores.appendChild(item);
    quizCont.appendChild(listScores);
    
    
    
    var btnGoBack = document.createElement("BUTTON");
    btnGoBack.innerHTML = "Go Back";
    quizCont.appendChild(btnGoBack).setAttribute("class", "goback-button");
    btnGoBack.addEventListener("click", function () {
      
      
    })

  } 

});