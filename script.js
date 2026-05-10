'use strict';

const skillGroups = [
  {
    category: 'Number and Place Value',
    skills: [
      { id: 'count-1000', name: 'Count in multiples of 1000', create: () => { const start = rand(1, 8) * 1000; const step = 1000; return qa(`Continue the sequence: ${start}, ${start + step}, ${start + step * 2}, ___`, start + step * 3); } },
      { id: 'digit-value', name: 'Value of a digit', create: () => { const n = rand(1000, 9999); const s = String(n); const i = rand(0, 3); const value = Number(s[i]) * 10 ** (3 - i); return qa(`What is the value of the digit ${s[i]} in ${n}?`, value); } },
      { id: 'order-numbers', name: 'Order numbers', create: () => { const nums = uniqueNumbers(4, 1000, 9999); return qa(`Put these numbers in ascending order: ${nums.join(', ')}`, nums.slice().sort((a,b)=>a-b).join(', ')); } },
      { id: 'round-10-100-1000', name: 'Round to 10, 100 or 1000', create: () => { const n = rand(1000, 9999); const nearest = choice([10, 100, 1000]); return qa(`Round ${n} to the nearest ${nearest}.`, Math.round(n / nearest) * nearest); } },
      { id: 'negative-numbers', name: 'Negative numbers', create: () => { const start = rand(-10, 5); const step = rand(2, 6); return qa(`${start} + ${step} = ?`, start + step); } },
      { id: 'roman-numerals', name: 'Roman numerals to 100', create: () => { const n = rand(1, 100); return qa(`Write ${n} in Roman numerals.`, toRoman(n)); } }
    ]
  },
  {
    category: 'Addition and Subtraction',
    skills: [
      { id: 'add-4-digit', name: 'Add 4-digit numbers', create: () => { const a = rand(1000, 8999); const b = rand(1000, 8999); return qa(`${a} + ${b} = ?`, a + b); } },
      { id: 'subtract-4-digit', name: 'Subtract 4-digit numbers', create: () => { const a = rand(3000, 9999); const b = rand(1000, a - 1); return qa(`${a} − ${b} = ?`, a - b); } },
      { id: 'inverse-add-subtract', name: 'Inverse operations', create: () => { const a = rand(100, 900); const b = rand(100, 900); return qa(`${a} + ___ = ${a + b}`, b); } },
      { id: 'estimate-check', name: 'Estimate answers', create: () => { const a = rand(1000, 9999); const b = rand(1000, 9999); return qa(`Estimate ${a} + ${b} by rounding both numbers to the nearest 100.`, Math.round(a / 100) * 100 + Math.round(b / 100) * 100); } }
    ]
  },
  {
    category: 'Multiplication and Division',
    skills: [
      { id: 'times-tables', name: 'Times tables to 12 × 12', create: () => { const a = rand(2, 12); const b = rand(2, 12); return qa(`${a} × ${b} = ?`, a * b); } },
      { id: 'divide-table-facts', name: 'Division facts', create: () => { const b = rand(2, 12); const ans = rand(2, 12); return qa(`${b * ans} ÷ ${b} = ?`, ans); } },
      { id: 'multiply-three-numbers', name: 'Multiply three numbers', create: () => { const a = rand(2, 6); const b = rand(2, 6); const c = rand(2, 6); return qa(`${a} × ${b} × ${c} = ?`, a * b * c); } },
      { id: 'factor-pairs', name: 'Factor pairs', create: () => { const a = rand(2, 10); const b = rand(2, 10); return qa(`Give one factor pair of ${a * b}.`, `${a} and ${b}`); } },
      { id: 'multiply-by-10-100', name: 'Multiply by 10 or 100', create: () => { const n = rand(2, 99); const m = choice([10, 100]); return qa(`${n} × ${m} = ?`, n * m); } },
      { id: 'division-remainders', name: 'Divide with remainders', create: () => { const d = rand(2, 9); const q = rand(4, 12); const r = rand(1, d - 1); return qa(`${d * q + r} ÷ ${d} = ?`, `${q} r ${r}`); } }
    ]
  },
  {
    category: 'Fractions and Decimals',
    skills: [
      { id: 'equivalent-fractions', name: 'Equivalent fractions', create: () => { const d = rand(3, 10); const n = rand(1, d - 1); const m = rand(2, 5); return qa(`Write an equivalent fraction to ${n}/${d}.`, `${n * m}/${d * m}`); } },
      { id: 'add-same-denominator', name: 'Add fractions with same denominator', create: () => { const d = rand(5, 12); const a = rand(1, d - 2); const b = rand(1, d - a - 1); return qa(`${a}/${d} + ${b}/${d} = ?`, `${a + b}/${d}`); } },
      { id: 'subtract-same-denominator', name: 'Subtract fractions with same denominator', create: () => { const d = rand(5, 12); const a = rand(2, d - 1); const b = rand(1, a - 1); return qa(`${a}/${d} − ${b}/${d} = ?`, `${a - b}/${d}`); } },
      { id: 'tenths-hundredths', name: 'Tenths and hundredths', create: () => { const n = rand(1, 99); return qa(`Write ${n}/100 as a decimal.`, (n / 100).toFixed(2)); } },
      { id: 'divide-by-10-100', name: 'Divide by 10 or 100', create: () => { const n = rand(100, 9900); const d = choice([10, 100]); return qa(`${n} ÷ ${d} = ?`, formatNumber(n / d)); } },
      { id: 'round-decimals', name: 'Round decimals to whole numbers', create: () => { const n = (rand(11, 999) / 10).toFixed(1); return qa(`Round ${n} to the nearest whole number.`, Math.round(Number(n))); } }
    ]
  },
  {
    category: 'Measurement',
    skills: [
      { id: 'convert-length', name: 'Convert lengths', create: () => { const m = rand(1, 9); return qa(`${m} m = ___ cm`, m * 100); } },
      { id: 'convert-money', name: 'Pounds and pence', create: () => { const p = rand(105, 999); return qa(`${p}p = £___`, (p / 100).toFixed(2)); } },
      { id: 'perimeter-rectangle', name: 'Perimeter of rectangles', create: () => { const l = rand(4, 20); const w = rand(3, 15); return qa(`A rectangle is ${l} cm by ${w} cm. What is its perimeter?`, `${2 * (l + w)} cm`); } },
      { id: 'area-rectangle', name: 'Area by counting squares', create: () => { const l = rand(3, 12); const w = rand(3, 12); return qa(`A rectangle is ${l} squares long and ${w} squares wide. What is its area?`, `${l * w} square units`); } },
      { id: 'time-24-hour', name: '24-hour time', create: () => { const hour = rand(13, 23); const minute = choice(['00', '15', '30', '45']); return qa(`Write ${hour}:${minute} in 12-hour time.`, `${hour - 12}:${minute} pm`); } }
    ]
  },
  {
    category: 'Geometry and Statistics',
    skills: [
      { id: 'angles', name: 'Compare angles', create: () => { const angle = rand(20, 160); const type = angle < 90 ? 'acute' : angle === 90 ? 'right angle' : 'obtuse'; return qa(`Is ${angle}° acute, right angle or obtuse?`, type); } },
      { id: 'symmetry', name: 'Lines of symmetry', create: () => { const item = choice([{shape:'square', ans:4}, {shape:'rectangle', ans:2}, {shape:'equilateral triangle', ans:3}, {shape:'regular pentagon', ans:5}]); return qa(`How many lines of symmetry does a ${item.shape} have?`, item.ans); } },
      { id: 'coordinates-first-quadrant', name: 'Coordinates', create: () => { const x = rand(0, 10); const y = rand(0, 10); return qa(`A point is ${x} across and ${y} up. Write its coordinates.`, `(${x}, ${y})`); } },
      { id: 'interpret-chart', name: 'Interpret data', create: () => { const a = rand(10, 40); const b = rand(10, 40); return qa(`Class A scored ${a} points and Class B scored ${b} points. How many points altogether?`, a + b); } },
      { id: 'line-graph-change', name: 'Find the difference', create: () => { const a = rand(5, 30); const b = rand(a + 1, 50); return qa(`A temperature changed from ${a}°C to ${b}°C. What was the increase?`, `${b - a}°C`); } }
    ]
  }
];

let selectedSkillIds = new Set();
let currentQuestions = [];

document.addEventListener('DOMContentLoaded', init);

function init() {
  renderSkillButtons();
  selectAllSkills();

  byId('selectAllBtn').addEventListener('click', selectAllSkills);
  byId('clearAllBtn').addEventListener('click', clearAllSkills);
  byId('generateBtn').addEventListener('click', generateQuestions);
  byId('showAnswersBtn').addEventListener('click', () => setAllAnswers(true));
  byId('hideAnswersBtn').addEventListener('click', () => setAllAnswers(false));
  byId('printBtn').addEventListener('click', () => window.print());
}

function renderSkillButtons() {
  const container = byId('skillGroups');
  container.innerHTML = skillGroups.map(group => `
    <section class="category-card">
      <h3>${escapeHtml(group.category)}</h3>
      <div class="skill-list">
        ${group.skills.map(skill => `
          <button type="button" class="skill-toggle" data-skill-id="${escapeHtml(skill.id)}">
            ${escapeHtml(skill.name)}
          </button>
        `).join('')}
      </div>
    </section>
  `).join('');

  container.querySelectorAll('.skill-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.skillId;
      if (selectedSkillIds.has(id)) selectedSkillIds.delete(id);
      else selectedSkillIds.add(id);
      updateSkillButtonStates();
    });
  });
}

function selectAllSkills() {
  selectedSkillIds = new Set(allSkills().map(skill => skill.id));
  updateSkillButtonStates();
}

function clearAllSkills() {
  selectedSkillIds.clear();
  updateSkillButtonStates();
}

function updateSkillButtonStates() {
  document.querySelectorAll('.skill-toggle').forEach(button => {
    button.classList.toggle('selected', selectedSkillIds.has(button.dataset.skillId));
  });
  const count = selectedSkillIds.size;
  byId('selectionCount').textContent = `${count} selected`;
}

function generateQuestions() {
  const chosen = allSkills().filter(skill => selectedSkillIds.has(skill.id));
  if (chosen.length === 0) {
    byId('questions').innerHTML = '<div class="error-message">Please select at least one skill first.</div>';
    return;
  }

  currentQuestions = Array.from({ length: 8 }, (_, index) => makeQuestion(index, chosen));
  renderQuestions();
}

function makeQuestion(index, chosenSkills) {
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
  const container = byId('questions');
  container.innerHTML = currentQuestions.map((item, index) => `
    <article class="question-card">
      <div>
        <div class="question-number">${item.number}</div>
        <div class="question-skill">${escapeHtml(item.skillName)}</div>
        <div class="question-text">${escapeHtml(item.question)}</div>
        <div class="answer ${item.visible ? 'visible' : ''}">Answer: ${escapeHtml(String(item.answer))}</div>
      </div>
      <div class="card-controls">
        <button type="button" class="primary reveal-one" data-index="${index}">${item.visible ? 'Hide' : 'Reveal'} Answer</button>
        <button type="button" class="secondary new-one" data-index="${index}">New Question</button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.reveal-one').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      currentQuestions[index].visible = !currentQuestions[index].visible;
      renderQuestions();
    });
  });

  container.querySelectorAll('.new-one').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      const chosen = allSkills().filter(skill => selectedSkillIds.has(skill.id));
      currentQuestions[index] = makeQuestion(index, chosen);
      renderQuestions();
    });
  });
}

function setAllAnswers(visible) {
  currentQuestions.forEach(question => question.visible = visible);
  if (currentQuestions.length > 0) renderQuestions();
}

function allSkills() {
  return skillGroups.flatMap(group => group.skills);
}

function qa(question, answer) {
  return { question, answer: String(answer) };
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(array) {
  return array[rand(0, array.length - 1)];
}

function uniqueNumbers(count, min, max) {
  const numbers = new Set();
  while (numbers.size < count) numbers.add(rand(min, max));
  return [...numbers];
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function toRoman(num) {
  const map = [
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
  ];
  let result = '';
  for (const [roman, value] of map) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function byId(id) {
  return document.getElementById(id);
}
