const skills = [
  // Place value
  skill("Place value", "pv-digit-value", "Recognise place value in 4-digit numbers", "Identify the value of a digit.", () => {
    const n = rand(1000, 9999); const s = String(n); const i = rand(0, 3); const value = Number(s[i]) * 10 ** (3 - i);
    return qa(`What is the value of ${s[i]} in ${n}?`, value);
  }),
  skill("Place value", "pv-order", "Order and compare 4-digit numbers", "Put numbers in order.", () => {
    const nums = uniqueNumbers(4, 1000, 9999); const dir = choice(["ascending", "descending"]);
    return qa(`Put these numbers in ${dir} order: ${nums.join(", ")}`, nums.slice().sort((a,b)=>dir === "ascending" ? a-b : b-a).join(", "));
  }),
  skill("Place value", "pv-round", "Round to nearest 10, 100 or 1000", "Round whole numbers.", () => {
    const n = rand(1000, 9999); const nearest = choice([10, 100, 1000]);
    return qa(`Round ${n} to the nearest ${nearest}.`, Math.round(n / nearest) * nearest);
  }),
  skill("Place value", "pv-1000", "Find 1000 more or less", "Add or subtract 1000.", () => {
    const n = rand(1000, 8999); const change = choice([-1000, 1000]);
    return qa(`What is 1000 ${change > 0 ? "more" : "less"} than ${n}?`, n + change);
  }),
  skill("Place value", "pv-negative", "Count through zero", "Use negative numbers.", () => {
    const start = rand(2, 8); const step = rand(1, 3);
    return qa(`Complete the sequence: ${start}, ${start-step}, ${start-2*step}, ${start-3*step}, __`, start - 4 * step);
  }),
  skill("Place value", "pv-roman", "Roman numerals to 100", "Convert Roman numerals.", () => {
    const n = rand(1, 100);
    return Math.random() < 0.5 ? qa(`Write ${n} in Roman numerals.`, toRoman(n)) : qa(`Write ${toRoman(n)} as a number.`, n);
  }),

  // Addition and subtraction
  skill("Addition and subtraction", "as-add", "Written addition", "Add numbers up to 4 digits.", () => {
    const a = rand(1000, 9999), b = rand(1000, 9999); return qa(`${a} + ${b} = ?`, a + b);
  }),
  skill("Addition and subtraction", "as-sub", "Written subtraction", "Subtract numbers up to 4 digits.", () => {
    const a = rand(2000, 9999), b = rand(1000, a - 1); return qa(`${a} − ${b} = ?`, a - b);
  }),
  skill("Addition and subtraction", "as-estimate", "Estimate answers", "Round first, then estimate.", () => {
    const a = rand(1000, 9999), b = rand(1000, 9999); return qa(`Estimate ${a} + ${b} by rounding both numbers to the nearest 1000.`, Math.round(a/1000)*1000 + Math.round(b/1000)*1000);
  }),
  skill("Addition and subtraction", "as-missing", "Missing number problems", "Find the missing part.", () => {
    const a = rand(200, 900), b = rand(100, 900); return qa(`${a} + __ = ${a + b}`, b);
  }),

  // Multiplication and division
  skill("Multiplication and division", "md-tables", "Times tables to 12 × 12", "Recall multiplication facts.", () => {
    const a = rand(2, 12), b = rand(2, 12); return qa(`${a} × ${b} = ?`, a * b);
  }),
  skill("Multiplication and division", "md-division-facts", "Division facts", "Use known times tables.", () => {
    const a = rand(2, 12), b = rand(2, 12); return qa(`${a*b} ÷ ${a} = ?`, b);
  }),
  skill("Multiplication and division", "md-factor-pairs", "Factor pairs", "Find factor pairs.", () => {
    const n = choice([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 48, 60]); return qa(`List the factor pairs of ${n}.`, factorPairs(n).join(", "));
  }),
  skill("Multiplication and division", "md-2by1", "Multiply 2-digit by 1-digit", "Short multiplication.", () => {
    const a = rand(12, 99), b = rand(2, 9); return qa(`${a} × ${b} = ?`, a * b);
  }),
  skill("Multiplication and division", "md-3by1", "Multiply 3-digit by 1-digit", "Short multiplication.", () => {
    const a = rand(100, 999), b = rand(2, 9); return qa(`${a} × ${b} = ?`, a * b);
  }),
  skill("Multiplication and division", "md-remainder", "Division with remainders", "Divide with a remainder.", () => {
    const d = rand(2, 9), q = rand(4, 12), r = rand(1, d - 1); return qa(`${d*q+r} ÷ ${d} = ?`, `${q} r ${r}`);
  }),
  skill("Multiplication and division", "md-zero-one", "Multiply and divide by 0 and 1", "Apply ×0, ×1 and ÷1.", () => {
    const n = rand(2, 999); const type = choice(["x0", "x1", "d1"]);
    if (type === "x0") return qa(`${n} × 0 = ?`, 0); if (type === "x1") return qa(`${n} × 1 = ?`, n); return qa(`${n} ÷ 1 = ?`, n);
  }),

  // Fractions and decimals
  skill("Fractions and decimals", "fr-equivalent", "Equivalent fractions", "Find an equivalent fraction.", () => {
    const den = choice([2,3,4,5,6,8,10]); const num = rand(1, den - 1); const m = choice([2,3,4,5]); return qa(`${num}/${den} = ?/${den*m}`, num*m);
  }),
  skill("Fractions and decimals", "fr-add", "Add fractions with same denominator", "Add proper fractions.", () => {
    const den = rand(5, 12); const a = rand(1, den - 2); const b = rand(1, den - a - 1); return qa(`${a}/${den} + ${b}/${den} = ?`, `${a+b}/${den}`);
  }),
  skill("Fractions and decimals", "fr-sub", "Subtract fractions with same denominator", "Subtract proper fractions.", () => {
    const den = rand(5, 12); const a = rand(2, den - 1); const b = rand(1, a - 1); return qa(`${a}/${den} − ${b}/${den} = ?`, `${a-b}/${den}`);
  }),
  skill("Fractions and decimals", "fr-hundredths", "Count in hundredths", "Complete decimal sequences.", () => {
    const start = rand(1, 80); const step = choice([1,2,5,10]); return qa(`Complete: ${(start/100).toFixed(2)}, ${((start+step)/100).toFixed(2)}, ${((start+2*step)/100).toFixed(2)}, __`, ((start+3*step)/100).toFixed(2));
  }),
  skill("Fractions and decimals", "fr-dec-equivalent", "Decimal equivalents", "Know common fraction/decimal facts.", () => {
    const x = choice([{f:"1/2",d:"0.5"},{f:"1/4",d:"0.25"},{f:"3/4",d:"0.75"},{f:"1/10",d:"0.1"},{f:"1/100",d:"0.01"}]); return Math.random() < 0.5 ? qa(`Write ${x.f} as a decimal.`, x.d) : qa(`Write ${x.d} as a fraction.`, x.f);
  }),
  skill("Fractions and decimals", "fr-compare-dec", "Compare decimals", "Compare two decimal numbers.", () => {
    const a = (rand(1,99)/100).toFixed(2); let b = (rand(1,99)/100).toFixed(2); while (a === b) b = (rand(1,99)/100).toFixed(2); return qa(`Which is greater: ${a} or ${b}?`, Number(a) > Number(b) ? a : b);
  }),
  skill("Fractions and decimals", "fr-round-dec", "Round decimals", "Round to nearest whole number.", () => {
    const n = (rand(10, 999)/10).toFixed(1); return qa(`Round ${n} to the nearest whole number.`, Math.round(Number(n)));
  }),
  skill("Fractions and decimals", "fr-div10", "Divide by 10 or 100", "Use place value with decimals.", () => {
    const n = rand(10, 9000); const d = choice([10, 100]); return qa(`${n} ÷ ${d} = ?`, formatDecimal(n / d));
  }),

  // Measurement
  skill("Measurement", "me-convert", "Convert metric units", "Convert length, mass and capacity.", () => choice(metricConversions())),
  skill("Measurement", "me-perimeter", "Perimeter of rectangles", "Find perimeter.", () => {
    const l = rand(3, 20), w = rand(2, 15); return qa(`A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter?`, `${2*(l+w)} cm`);
  }),
  skill("Measurement", "me-area", "Area by counting squares", "Find area of rectangles.", () => {
    const l = rand(2, 10), w = rand(2, 8); return qa(`A rectangle covers ${l} rows of ${w} squares. What is its area?`, `${l*w} square units`);
  }),
  skill("Measurement", "me-time", "12-hour and 24-hour time", "Convert time formats.", () => {
    const h = rand(0, 23), m = choice([0,5,10,15,20,25,30,35,40,45,50,55]); const t24 = `${pad(h)}:${pad(m)}`; const suffix = h >= 12 ? "pm" : "am"; const h12 = h % 12 === 0 ? 12 : h % 12; const t12 = `${h12}:${pad(m)} ${suffix}`; return Math.random() < 0.5 ? qa(`Write ${t24} in 12-hour time.`, t12) : qa(`Write ${t12} in 24-hour time.`, t24);
  }),
  skill("Measurement", "me-elapsed", "Problems with time", "Calculate finish times.", () => {
    const startH = rand(7, 14), startM = choice([0,5,10,15,20,25,30,35,40,45,50]); const add = choice([25,30,35,40,45,50,60,75,90]); const end = startH*60 + startM + add; return qa(`A lesson starts at ${pad(startH)}:${pad(startM)} and lasts ${add} minutes. What time does it finish?`, `${pad(Math.floor(end/60))}:${pad(end%60)}`);
  }),
  skill("Measurement", "me-money", "Money problems", "Add and subtract pounds and pence.", () => {
    const a = rand(120, 999), b = rand(50, 600); return qa(`A book costs £${money(a)} and a pen costs £${money(b)}. What is the total cost?`, `£${money(a+b)}`);
  }),

  // Geometry
  skill("Geometry", "ge-triangles", "Classify triangles", "Use triangle properties.", () => choice([
    qa("A triangle has 3 equal sides. What type is it?", "Equilateral"), qa("A triangle has 2 equal sides. What type is it?", "Isosceles"), qa("A triangle has no equal sides. What type is it?", "Scalene"), qa("A triangle has one right angle. What type is it?", "Right-angled triangle")
  ])),
  skill("Geometry", "ge-quads", "Classify quadrilaterals", "Use properties of 4-sided shapes.", () => choice([
    qa("A quadrilateral has 2 pairs of parallel sides and 4 right angles. What is it?", "Rectangle"), qa("A quadrilateral has 4 equal sides and 4 right angles. What is it?", "Square"), qa("A quadrilateral has exactly one pair of parallel sides. What is it?", "Trapezium"), qa("A quadrilateral has two pairs of parallel sides. What is it?", "Parallelogram")
  ])),
  skill("Geometry", "ge-angles", "Compare and order angles", "Know acute, right and obtuse.", () => choice([
    qa("Is 35° acute, right or obtuse?", "Acute"), qa("Is 90° acute, right or obtuse?", "Right"), qa("Is 128° acute, right or obtuse?", "Obtuse"), qa("Which is larger: 75° or 105°?", "105°")
  ])),
  skill("Geometry", "ge-symmetry", "Symmetry", "Reflect across a mirror line.", () => choice([
    qa("A point is 3 squares left of a vertical mirror line. Where is its reflection?", "3 squares right of the mirror line"), qa("A point is 2 squares above a horizontal mirror line. Where is its reflection?", "2 squares below the mirror line")
  ])),
  skill("Geometry", "ge-coordinates", "Coordinates", "Use coordinates in the first quadrant.", () => {
    const x = rand(0, 6), y = rand(0, 6); return qa(`A point is ${x} across and ${y} up. What are its coordinates?`, `(${x}, ${y})`);
  }),
  skill("Geometry", "ge-translation", "Translations", "Describe movement on a grid.", () => {
    const x = rand(0, 4), y = rand(0, 4), dx = rand(1, 4), dy = rand(1, 4); return qa(`A point moves from (${x}, ${y}) to (${x+dx}, ${y+dy}). Describe the translation.`, `${dx} right and ${dy} up`);
  }),

  // Statistics
  skill("Statistics", "st-bars", "Interpret bar charts", "Answer questions about data.", () => {
    const a = rand(8, 30), b = rand(8, 30); return qa(`A bar chart shows ${a} apples and ${b} bananas sold. How many fruit were sold altogether?`, a + b);
  }),
  skill("Statistics", "st-difference", "Compare data", "Find differences in data.", () => {
    const a = rand(8, 30), b = rand(8, 30); return qa(`A chart shows ${a} children chose football and ${b} chose tennis. What is the difference?`, Math.abs(a - b));
  }),
  skill("Statistics", "st-time-graphs", "Interpret time graphs", "Read changes over time.", () => {
    const start = rand(5, 20), increase = rand(3, 15); return qa(`A plant was ${start} cm tall on Monday and ${start + increase} cm tall on Friday. How much did it grow?`, `${increase} cm`);
  })
];

let currentQuestions = [];
let selectedSkillIds = new Set(skills.map(s => s.id));

document.addEventListener("DOMContentLoaded", initialiseApp);

function initialiseApp() {
  renderSkills();
  updateSelectedCount();

  document.getElementById("skills").addEventListener("click", handleSkillClick);
  document.getElementById("selectAllBtn").addEventListener("click", selectAllSkills);
  document.getElementById("clearAllBtn").addEventListener("click", clearAllSkills);
  document.getElementById("generateBtn").addEventListener("click", generateSet);
  document.getElementById("revealAllBtn").addEventListener("click", showAllAnswers);
  document.getElementById("hideAllBtn").addEventListener("click", hideAllAnswers);
  document.getElementById("printBtn").addEventListener("click", () => window.print());
  document.getElementById("questions").addEventListener("click", handleQuestionButtonClick);
}

function renderSkills() {
  const container = document.getElementById("skills");
  const categories = [...new Set(skills.map(s => s.category))];
  container.innerHTML = categories.map(category => `
    <section class="category-group">
      <h3>${category}</h3>
      <div class="category-skills">
        ${skills.filter(s => s.category === category).map(s => `
          <button type="button" class="skill-toggle ${selectedSkillIds.has(s.id) ? "selected" : ""}" data-id="${s.id}" aria-pressed="${selectedSkillIds.has(s.id)}">
            <span class="tick" aria-hidden="true"></span>
            <span><strong>${s.name}</strong><small>${s.description}</small></span>
          </button>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function handleSkillClick(event) {
  const button = event.target.closest(".skill-toggle");
  if (!button) return;
  const id = button.dataset.id;
  if (selectedSkillIds.has(id)) selectedSkillIds.delete(id); else selectedSkillIds.add(id);
  button.classList.toggle("selected", selectedSkillIds.has(id));
  button.setAttribute("aria-pressed", String(selectedSkillIds.has(id)));
  updateSelectedCount();
}

function selectAllSkills() {
  selectedSkillIds = new Set(skills.map(s => s.id));
  renderSkills();
  updateSelectedCount();
}

function clearAllSkills() {
  selectedSkillIds.clear();
  renderSkills();
  updateSelectedCount();
}

function updateSelectedCount() {
  document.getElementById("selectedCount").textContent = `${selectedSkillIds.size} of ${skills.length} skills selected`;
}

function selectedSkills() {
  return skills.filter(s => selectedSkillIds.has(s.id));
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

function createQuestion(index, chosen = selectedSkills()) {
  const selectedSkill = choice(chosen);
  const item = selectedSkill.create();
  return { number: index + 1, skillName: selectedSkill.name, question: item.question, answer: item.answer, visible: false };
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
        <button type="button" data-action="toggle-answer" data-index="${index}">${item.visible ? "Hide" : "Reveal"} Answer</button>
        <button type="button" class="secondary" data-action="new-question" data-index="${index}">New Question</button>
      </div>
    </article>
  `).join("");
}

function handleQuestionButtonClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const index = Number(button.dataset.index);
  if (button.dataset.action === "toggle-answer") {
    currentQuestions[index].visible = !currentQuestions[index].visible;
  }
  if (button.dataset.action === "new-question") {
    currentQuestions[index] = createQuestion(index);
  }
  renderQuestions();
}

function showAllAnswers() {
  currentQuestions.forEach(q => q.visible = true);
  if (currentQuestions.length) renderQuestions();
}

function hideAllAnswers() {
  currentQuestions.forEach(q => q.visible = false);
  if (currentQuestions.length) renderQuestions();
}

function skill(category, id, name, description, create) { return { category, id, name, description, create }; }
function qa(question, answer) { return { question, answer: String(answer) }; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function choice(array) { return array[rand(0, array.length - 1)]; }
function uniqueNumbers(count, min, max) { const set = new Set(); while (set.size < count) set.add(rand(min, max)); return [...set]; }
function pad(n) { return String(n).padStart(2, "0"); }
function formatDecimal(n) { return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2))); }
function money(pence) { return (pence / 100).toFixed(2); }
function factorPairs(n) { const pairs = []; for (let i = 1; i <= Math.sqrt(n); i++) if (n % i === 0) pairs.push(`${i} × ${n/i}`); return pairs; }
function metricConversions() {
  const m = rand(1, 9), kg = rand(1, 9), l = rand(1, 9), km = rand(1, 5), cm = rand(1, 9);
  return [qa(`${km} km = ? m`, `${km*1000} m`), qa(`${m} m = ? cm`, `${m*100} cm`), qa(`${kg} kg = ? g`, `${kg*1000} g`), qa(`${l} l = ? ml`, `${l*1000} ml`), qa(`${cm*100} cm = ? m`, `${cm} m`)];
}
function toRoman(num) {
  const map = [[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let out = "";
  for (const [value, symbol] of map) while (num >= value) { out += symbol; num -= value; }
  return out;
}
