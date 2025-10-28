// Part 1 (Variables: let vs var vs const)
// console.log("Js loaded");
// var school = "GIC";
// let year = 2025;
// const maxScore = 100;

// //Part 1
// school = "ITC";
// year = 2030;
// maxScore = 90; // This will cause an error because maxScore is a constant


console.log(a);  // This show error because a is undefined
var a = 10;

try {
    console.log(b); //b is undefined but there error message will displayed in catch block
    let b = 20;
} catch (e) {
    console.log("b error: ", e.message); //This show error that 'b error: Cannot access 'b' before initialization
}

// Part 2 (Conditionals)
function letterGrade(score) {
  //return "A" (>=90), "B" (80–89), "C" (70–79), "D" (60–69), otherwise "F"
  if(score >= 90){
    return 'A';
  }else if( score >= 80){
    return 'B';
  }else if( score >= 70){
    return 'C';
  }else if(score >= 60){
    return 'D';
  }else{
    return 'F';
  }
}
console.log("Grade(92) =", letterGrade(92)); // expect "A"

function mood(emoji) {
  // switch on ":)", ":(", ":|" → return "happy", "sad", "neutral"; default → "unknown"
  switch (emoji) {
    case ":)":
        return "happy";
    case ":(":
        return "sad";
    case ":|":
        return "neutral";
    default:
        return "unknown";
  }
}
console.log("Emoji ", mood(":)"))

//Part 3 (Loop)
// for

let sumFor = 0; // TODO
for(let i = 1; i<=5; i++){
    sumFor += i;
}
console.log(`Sum 1 to 5 by using for Loop: ${sumFor}`);

// while

let sumWhile = 0; // TODO
let w = 0;
while(w <= 5){
    sumWhile += w;
    w++;
}
console.log(`Sum 1 to 5 by using While Loop: ${sumWhile}`);

// for...of

const nums = [1,2,3,4,5];
let sumOf = 0; // TODO
for(let x of nums){
    sumOf += x;
}
console.log(`Sum 1 to 5 by using for of Loop: ${sumOf}`);


//Part 4 (Arrays)
const scores = [88, 95, 62];
scores.push(74);
console.log(`Add 74 to the end: ${scores} `);

scores.shift();
console.log(`Remove the first element: ${scores} `);

var high = Math.max(...scores);
console.log(`The high score is: ${high}`);

var filter = scores.filter(scores => scores >= 60);
console.log(`Stretch: filter to keep only passing scores (>= 60). ${filter}`);

//Part 5 (Functions)
// a) function declaration

function square1(n) { 
    return n * n;
}

// b) function expression

const square2 = function(n) { 
    return n * n;
}

// c) arrow function

const square3 = (n) => {
    return n * n;
}

console.log(square1(4), square2(4), square3(4)); // 16 16 16

//Part 6 (Objects)
const student = { name: "Dana", score: 84 };
Boolean(student.score >= 60);

function describeStudent(s) {
  return `${s.name} scored ${s.score} (${Boolean(s.score >= 60) ? "pass" : "fail"})`;
}
console.log(describeStudent(student));

// Part 7 (DOM: selection & updating)
const output = document.getElementById("output");
const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("list");
const stats = document.getElementById("stats");

output.textContent = "Ready to practice DOM!";

//Part 8: (DOM: Events, creating elements, rendering (Mini App))
const state = { students: [], showOnlyPassing: false }; // { name: string, score: number }

// Helpers:
function computeAverage(arr) {
  // return 0 if empty, else average of arr[i].score
  if (arr.length === 0) {
    return 0;
  }
  const totalScore = arr.reduce((sum, student) => sum + student.score, 0);
  return (totalScore / arr.length).toFixed(2);
}

// Bonus: "Show only pass" toggle
const showOnlyPassContainer = document.createElement('div');
const showOnlyPassToggle = document.createElement("input");
showOnlyPassToggle.type = "checkbox";
showOnlyPassToggle.id = "showOnlyPass";
const showOnlyPassLabel = document.createElement("label");
showOnlyPassLabel.textContent = "Show only passing";
showOnlyPassLabel.htmlFor = "showOnlyPass";
showOnlyPassContainer.append(showOnlyPassToggle, showOnlyPassLabel);
stats.after(showOnlyPassContainer);

showOnlyPassToggle.addEventListener("change", (e) => {
  state.showOnlyPassing = e.target.checked;
  render();
});

function render() {
  // Bonus: Sort by score (desc)
  state.students.sort((a, b) => b.score - a.score);

  // Bonus: Filter for passing students
  const studentsToDisplay = state.showOnlyPassing
    ? state.students.filter(s => s.score >= 60)
    : state.students;

  // 1) list.innerHTML = ""
  list.innerHTML = "";

  // 2) For each student create <li> "Name — score"
  //    - class: pass if score>=60 else fail
  //    - add a small remove button to delete by index
  studentsToDisplay.forEach(student => {
    const li = document.createElement("li");
    li.textContent = `${student.name} — ${student.score}`;
    li.className = student.score >= 60 ? "pass" : "fail";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "1rem";
    removeBtn.addEventListener("click", () => {
      const index = state.students.findIndex(s => s === student);
      if (index > -1) {
        state.students.splice(index, 1);
      }
      render();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  // 3) Update stats: "Count: X | Avg: Y | Pass: P | Fail: F"
  const studentCount = state.students.length;
  const averageScore = computeAverage(state.students);
  const averageGrade = letterGrade(averageScore); // Bonus
  const passingCount = state.students.filter(s => s.score >= 60).length;
  const failingCount = studentCount - passingCount;
  stats.textContent = `Count: ${studentCount} | Avg: ${averageScore} (${averageGrade}) | Pass: ${passingCount} | Fail: ${failingCount}`;
}

// Add student:
addBtn.addEventListener("click", () => {
  // read inputs
  const name = nameInput.value.trim();
  const scoreText = scoreInput.value.trim();
  const score = Number(scoreText);

  // validate: name not empty, score 0–100 number
  if (name === "" || scoreText === "") {
    alert("Name and score cannot be empty.");
    return;
  }
  if (isNaN(score) || score < 0 || score > 100) {
    alert("Score must be a number between 0 and 100.");
    return;
  }

  // push into state.students, clear inputs, render()
  state.students.push({ name, score });
  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();
  render();
});

// Clear all:
clearBtn.addEventListener("click", () => {
  // set students to [], render()
  state.students = [];
  render();
});

// Call render() once at the end.
render();

