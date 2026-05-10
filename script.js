const skills = [
  {
    id: "place-value",
    name: "Place value in 4-digit numbers",
    description: "Identify the value of a digit.",
    create() {
      const number = rand(1000, 9999);
      const digits = String(number).split("");
      const index = rand(0, 3);
      const digit = digits[index];
      const value = Number(digit) * Math.pow(10, 3 - index);

      return {
        question: `What is the value of ${digit} in ${number}?`,
        answer: value.toString()
      };
    }
  },
  {
    id: "rounding",
    name: "Round to nearest 10, 100 or 1000",
    description: "Round a 4-digit number.",
    create() {
      const number = rand(1000, 9999);
      const choices = [10, 100, 1000];
      const nearest = choice(choices);
      const answer = Math.round(number / nearest) * nearest;

      return {
        question: `Round ${number} to the nearest ${nearest}.`,
        answer: answer.toString()
      };
    }
  },
  {
    id: "addition",
    name: "Written addition",
    description: "Add numbers up to 4 digits.",
    create() {
      const a = rand(1000, 9999);
      const b = rand(1000, 9999);

      return {
        question: `${a} + ${b} = ?`,
        answer: (a + b).toString()
      };
    }
  },
  {
    id: "subtraction",
    name: "Written subtraction",
    description: "Subtract numbers up to 4 digits.",
    create() {
      const a = rand(2000, 9999);
      const b = rand(1000, a - 1);

      return {
        question: `${a} − ${b} = ?`,
        answer: (a - b).toString()
      };
    }
  },
  {
    id: "times-tables",
    name: "Times tables to 12 × 12",
    description: "Recall multiplication facts.",
    create() {
      const a = rand(2, 12);
      const b = rand(2, 12);

      return {
        question: `${a} × ${b} = ?`,
        answer: (a * b).toString()
      };
    }
  },
  {
    id: "division-remainder",
    name: "Division with remainders",
    description: "Divide a 2-digit number by 1 digit.",
    create() {
      const divisor = rand(2, 9);
      const quotient = rand(4, 12);
      const remainder = rand(1, divisor - 1);
      const dividend = divisor * quotient + remainder;

      return {
        question: `${dividend} ÷ ${divisor} = ?`,
        answer: `${quotient} r ${remainder}`
      };
    }
  },
  {
    id: "fraction-addition",
    name: "Add fractions with same denominator",
    description: "Add proper fractions.",
    create() {
      const denominator = rand(5, 12);
      const a = rand(1, denominator - 2);
      const b = rand(1, denominator - a - 1);

      return {
        question: `${a}/${denominator} + ${b}/${denominator} = ?`,
        answer: `${a + b}/${denominator}`
      };
    }
  },
  {
    id: "decimal-compare",
    name: "Compare decimals",
    description: "Compare numbers with two decimal places.",
    create() {
      const a = (rand(1, 99) / 100).toFixed(2);
      let b = (rand(1, 99) / 100).toFixed(2);

      while (b === a) {
        b = (rand(1, 99) / 100).toFixed(2);
      }

      const answer = Number(a) > Number(b) ? a : b;

      return {
        question: `Which is greater: ${a} or ${b}?`,
        answer
      };
    }
  }
];

let currentQuestions = [];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(array) {
  return array[rand(0, array.length - 1)];
}

function renderSkills() {
  const container = document.getElementById("skills");

  container.innerHTML = skills.map(skill => `
    <label class="skill">
      <input type="checkbox" value="${skill.id}" checked />
      <span>
        <strong>${skill.name}</strong>
        <small>${skill.description}</small>
      </span>
    </label>
  `).join("");
}

function selectedSkills() {
  const selectedIds = [...document.querySelectorAll("#skills input:checked")]
    .map(input => input.value);

  return skills.filter(skill => selectedIds.includes(skill.id));
}

function generateSet() {
  const chosen = selectedSkills();
  const container = document.getElementById("questions");

  if (chosen.length === 0) {
    container.innerHTML = `<div class="panel empty">Please select at least one skill.</div>`;
    return;
  }

  currentQuestions = Array.from({ length: 8 }, (_, index) => createQuestion(index, chosen));
  renderQuestions();
}

function createQuestion(index, chosenSkills = selectedSkills()) {
  const skill = choice(chosenSkills);
  const item = skill.create();

  return {
    number: index + 1,
    skillId: skill.id,
    skillName: skill.name,
    question: item.question,
    answer: item.answer,
    visible: false
  };
}

function renderQuestions() {
  const container = document.getElementById("questions");

  container.innerHTML = currentQuestions.map((item, index) => `
    <article class="question-card">
      <div>
        <div class="question-number">${item.number}</div>
        <div class="skill-label">${item.skillName}</div>
        <div class="question-text">${item.question}</div>
        <div class="answer ${item.visible ? "visible" : ""}">Answer: ${item.answer}</div>
      </div>
      <div class="card-buttons">
        <button onclick="toggleAnswer(${index})">${item.visible ? "Hide" : "Reveal"} Answer</button>
        <button class="secondary" onclick="refreshQuestion(${index})">New Question</button>
      </div>
    </article>
  `).join("");
}

function toggleAnswer(index) {
  currentQuestions[index].visible = !currentQuestions[index].visible;
  renderQuestions();
}

function refreshQuestion(index) {
  currentQuestions[index] = createQuestion(index);
  renderQuestions();
}

function showAllAnswers() {
  currentQuestions.forEach(item => item.visible = true);
  renderQuestions();
}

function hideAllAnswers() {
  currentQuestions.forEach(item => item.visible = false);
  renderQuestions();
}

function printQuestions() {
  window.print();
}

document.getElementById("generateBtn").addEventListener("click", generateSet);
document.getElementById("revealAllBtn").addEventListener("click", showAllAnswers);
document.getElementById("hideAllBtn").addEventListener("click", hideAllAnswers);
document.getElementById("printBtn").addEventListener("click", printQuestions);

renderSkills();
