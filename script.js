const skills = [
  // PLACE VALUE
  { category: "Place value", id: "pv-digit-value", name: "Recognise place value in 4-digit numbers", description: "Identify the value of a digit in a four-digit number.", create() { const number = rand(1000,9999); const digits = String(number).split(""); const index = rand(0,3); const digit = Number(digits[index]); const value = digit * Math.pow(10, 3-index); return qa(`What is the value of ${digit} in ${number}?`, value); }},
  { category: "Place value", id: "pv-order-compare", name: "Order and compare 4-digit numbers", description: "Order and compare numbers beyond 1000.", create() { const nums = uniqueNumbers(3,1000,9999); const dir = choice(["ascending", "descending"]); const answer = [...nums].sort((a,b)=>dir==="ascending"?a-b:b-a).join(", "); return qa(`Put these numbers in ${dir} order: ${nums.join(", ")}`, answer); }},
  { category: "Place value", id: "pv-rounding", name: "Round to nearest 10, 100 or 1000", description: "Round any number to the nearest 10, 100 or 1000.", create() { const number = rand(1000,9999); const nearest = choice([10,100,1000]); return qa(`Round ${number} to the nearest ${nearest}.`, Math.round(number/nearest)*nearest); }},
  { category: "Place value", id: "pv-1000-more-less", name: "Find 1000 more or less", description: "Find 1000 more or less than a given number.", create() { const number = rand(1000,8999); const change = choice([-1000,1000]); return qa(`What is ${Math.abs(change)} ${change>0?"more":"less"} than ${number}?`, number+change); }},
  { category: "Place value", id: "pv-through-zero", name: "Count backwards through zero", description: "Count backwards through zero to include negative numbers.", create() { const start = rand(1,6); const step = choice([1,2,3]); const seq = [start, start-step, start-2*step, start-3*step]; return qa(`Complete the sequence: ${seq.join(", ")}, __`, start-4*step); }},
  { category: "Place value", id: "pv-roman", name: "Roman numerals to 100", description: "Convert between Roman numerals and numbers.", create() { const n = rand(1,100); if (Math.random()<0.5) return qa(`Write ${n} in Roman numerals.`, toRoman(n)); return qa(`Write ${toRoman(n)} as a number.`, n); }},
  { category: "Place value", id: "pv-negative-context", name: "Negative numbers in context", description: "Use negative numbers in context.", create() { const temp = rand(-8,3); const change = rand(2,10); return qa(`The temperature is ${temp}°C. It rises by ${change}°C. What is it now?`, `${temp+change}°C`); }},

  // ADDITION AND SUBTRACTION
  { category: "Addition and subtraction", id: "as-add-4digit", name: "Written addition of 4-digit numbers", description: "Add numbers with up to 4 digits.", create() { const a=rand(1000,9999), b=rand(1000,9999); return qa(`${a} + ${b} = ?`, a+b); }},
  { category: "Addition and subtraction", id: "as-sub-4digit", name: "Written subtraction of 4-digit numbers", description: "Subtract numbers with up to 4 digits.", create() { const a=rand(2000,9999), b=rand(1000,a-1); return qa(`${a} − ${b} = ?`, a-b); }},
  { category: "Addition and subtraction", id: "as-estimate", name: "Estimate and check answers", description: "Estimate answers and use inverse operations.", create() { const a=rand(1000,9999), b=rand(1000,9999); const estimate = Math.round(a/1000)*1000 + Math.round(b/1000)*1000; return qa(`Estimate ${a} + ${b} by rounding each number to the nearest 1000.`, estimate); }},

  // MULTIPLICATION AND DIVISION
  { category: "Multiplication and division", id: "md-tables", name: "Recall times tables to 12×12", description: "Recall multiplication and division facts.", create() { const a=rand(2,12), b=rand(2,12); return qa(`${a} × ${b} = ?`, a*b); }},
  { category: "Multiplication and division", id: "md-factor-pairs", name: "Recognise factor pairs", description: "Find all factor pairs of a number.", create() { const n = choice([12,16,18,20,24,28,30,32,36,40,42,48,50,60]); return qa(`List the factor pairs of ${n}.`, factorPairs(n).join(", ")); }},
  { category: "Multiplication and division", id: "md-2by1", name: "Multiply 2-digit by 1-digit", description: "Multiply using a formal written method.", create() { const a=rand(12,99), b=rand(2,9); return qa(`${a} × ${b} = ?`, a*b); }},
  { category: "Multiplication and division", id: "md-3by1", name: "Multiply 3-digit by 1-digit", description: "Multiply using a formal written method.", create() { const a=rand(100,999), b=rand(2,9); return qa(`${a} × ${b} = ?`, a*b); }},
  { category: "Multiplication and division", id: "md-div-remainder", name: "Divide 2-digit by 1-digit (with remainder)", description: "Divide and express the remainder.", create() { const d=rand(2,9), q=rand(4,12), r=rand(1,d-1), n=d*q+r; return qa(`${n} ÷ ${d} = ?`, `${q} r ${r}`); }},
  { category: "Multiplication and division", id: "md-zero-one", name: "Multiply and divide by 0 and 1", description: "Apply effects of ×0, ×1 and ÷1.", create() { const n=rand(2,999); const type=choice(["times0","times1","div1"]); if(type==="times0") return qa(`${n} × 0 = ?`, 0); if(type==="times1") return qa(`${n} × 1 = ?`, n); return qa(`${n} ÷ 1 = ?`, n); }},

  // FRACTIONS AND DECIMALS
  { category: "Fractions", id: "fr-equivalent", name: "Recognise equivalent fractions", description: "Find equivalent fractions.", create() { const den=choice([2,3,4,5,6,8,10]); const num=rand(1,den-1); const mult=choice([2,3,4,5]); return qa(`${num}/${den} = ?/${den*mult}`, num*mult); }},
  { category: "Fractions", id: "fr-add-same-den", name: "Add fractions with same denominator", description: "Add fractions with the same denominator.", create() { const den=rand(5,12); const a=rand(1,den-2); const b=rand(1,den-a-1); return qa(`${a}/${den} + ${b}/${den} = ?`, `${a+b}/${den}`); }},
  { category: "Fractions", id: "fr-sub-same-den", name: "Subtract fractions with same denominator", description: "Subtract fractions with the same denominator.", create() { const den=rand(5,12); const a=rand(2,den-1); const b=rand(1,a-1); return qa(`${a}/${den} − ${b}/${den} = ?`, `${a-b}/${den}`); }},
  { category: "Fractions", id: "fr-hundredths", name: "Count in hundredths", description: "Count up and down in hundredths.", create() { const start=rand(1,90); const step=choice([1,2,5,10]); const vals=[start,start+step,start+2*step].map(x=>(x/100).toFixed(2)); return qa(`Complete the sequence: ${vals.join(", ")}, __`, ((start+3*step)/100).toFixed(2)); }},
  { category: "Fractions", id: "fr-decimal-equivalents", name: "Recognise decimal equivalents", description: "Know decimal equivalents of key fractions.", create() { const item=choice([{f:"1/2",d:"0.5"},{f:"1/4",d:"0.25"},{f:"3/4",d:"0.75"},{f:"1/10",d:"0.1"},{f:"1/100",d:"0.01"}]); return Math.random()<0.5 ? qa(`Write ${item.f} as a decimal.`, item.d) : qa(`Write ${item.d} as a fraction.`, item.f); }},
  { category: "Fractions", id: "fr-compare-decimals", name: "Compare decimals", description: "Compare numbers with 2 decimal places.", create() { const a=(rand(1,99)/100).toFixed(2); let b=(rand(1,99)/100).toFixed(2); while(a===b) b=(rand(1,99)/100).toFixed(2); return qa(`Which is greater: ${a} or ${b}?`, Number(a)>Number(b)?a:b); }},
  { category: "Fractions", id: "fr-round-decimals", name: "Round decimals to whole number", description: "Round decimals to the nearest whole number.", create() { const n=(rand(10,999)/10).toFixed(1); return qa(`Round ${n} to the nearest whole number.`, Math.round(Number(n))); }},
  { category: "Fractions", id: "fr-divide-10-100", name: "Divide by 10 or 100", description: "Find the effect of dividing by 10 and 100.", create() { const n=rand(10,9000); const d=choice([10,100]); return qa(`${n} ÷ ${d} = ?`, formatDecimal(n/d)); }},

  // MEASUREMENT
  { category: "Measurement", id: "me-metric", name: "Convert between metric units", description: "Convert km/m, m/cm, kg/g and l/ml.", create() { const item=choice(metricConversions()); return qa(item.q, item.a); }},
  { category: "Measurement", id: "me-perimeter", name: "Calculate perimeter of rectangles", description: "Calculate the perimeter of rectangles.", create() { const l=rand(3,20), w=rand(2,15); return qa(`A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter?`, `${2*(l+w)} cm`); }},
  { category: "Measurement", id: "me-area-squares", name: "Find area by counting squares", description: "Find the area of shapes by counting squares.", create() { const l=rand(2,10), w=rand(2,8); return qa(`A rectangle covers ${l} rows of ${w} squares. What is its area?`, `${l*w} square units`); }},
  { category: "Measurement", id: "me-12-24-time", name: "Convert 12-hour and 24-hour time", description: "Convert between 12-hour and 24-hour time.", create() { const hour=rand(0,23), min=choice([0,5,10,15,20,25,30,35,40,45,50,55]); const t24=`${pad(hour)}:${pad(min)}`; const suffix=hour>=12?"pm":"am"; const h12=hour%12===0?12:hour%12; const t12=`${h12}:${pad(min)} ${suffix}`; return Math.random()<0.5 ? qa(`Write ${t24} in 12-hour time.`, t12) : qa(`Write ${t12} in 24-hour time.`, t24); }},
  { category: "Measurement", id: "me-time-problems", name: "Solve problems with time", description: "Solve problems with hours and minutes.", create() { const startHour=rand(7,14), startMin=choice([0,5,10,15,20,25,30,35,40,45,50]); const add=choice([25,30,35,40,45,50,60,75,90,105]); const start=startHour*60+startMin; const end=start+add; return qa(`A lesson starts at ${pad(startHour)}:${pad(startMin)} and lasts ${add} minutes. What time does it finish?`, `${pad(Math.floor(end/60))}:${pad(end%60)}`); }},

  // GEOMETRY
  { category: "Geometry", id: "ge-triangles", name: "Compare and classify triangles", description: "Classify triangles based on properties.", create() { const item=choice([{q:"A triangle has 3 equal sides. What type is it?",a:"Equilateral"},{q:"A triangle has 2 equal sides. What type is it?",a:"Isosceles"},{q:"A triangle has no equal sides. What type is it?",a:"Scalene"},{q:"A triangle has one right angle. What type is it?",a:"Right-angled triangle"}]); return qa(item.q,item.a); }},
  { category: "Geometry", id: "ge-quadrilaterals", name: "Compare and classify quadrilaterals", description: "Classify quadrilaterals based on properties.", create() { const item=choice([{q:"A quadrilateral has 4 equal sides and 4 right angles. What is it?",a:"Square"},{q:"A quadrilateral has 2 pairs of parallel sides and 4 right angles. What is it?",a:"Rectangle"},{q:"A quadrilateral has exactly one pair of parallel sides. What is it?",a:"Trapezium"},{q:"A quadrilateral has 2 pairs of parallel sides. What is it?",a:"Parallelogram"}]); return qa(item.q,item.a); }},
  { category: "Geometry", id: "ge-angle-types", name: "Identify acute and obtuse angles", description: "Identify acute, right and obtuse angles.", create() { const angle=choice([25,40,65,90,110,135,170]); const ans=angle<90?"acute":angle===90?"right angle":"obtuse"; return qa(`Is ${angle}° acute, right or obtuse?`, ans); }},
  { category: "Geometry", id: "ge-order-angles", name: "Order angles by size", description: "Compare and order angles by size.", create() { const angles=uniqueNumbers(4,10,170).map(x=>Math.round(x/5)*5); return qa(`Order these angles from smallest to largest: ${angles.map(a=>a+"°").join(", ")}`, [...angles].sort((a,b)=>a-b).map(a=>a+"°").join(", ")); }},
  { category: "Geometry", id: "ge-symmetry-lines", name: "Identify lines of symmetry", description: "Identify lines of symmetry in 2-D shapes.", create() { const item=choice([{shape:"square", lines:4},{shape:"rectangle", lines:2},{shape:"equilateral triangle", lines:3},{shape:"regular pentagon", lines:5},{shape:"circle", lines:"infinitely many"}]); return qa(`How many lines of symmetry does a ${item.shape} have?`, item.lines); }},
  { category: "Geometry", id: "ge-complete-symmetry", name: "Complete symmetric figures", description: "Complete symmetric figures.", create() { const item=choice([{q:"A point is 3 squares left of a vertical mirror line. Where is its reflection?",a:"3 squares right of the mirror line"},{q:"A point is 2 squares above a horizontal mirror line. Where is its reflection?",a:"2 squares below the mirror line"},{q:"A shape touches the mirror line. Where should its reflection touch?",a:"The same point on the mirror line"}]); return qa(item.q,item.a); }},
  { category: "Geometry", id: "ge-coordinates", name: "Describe positions using coordinates", description: "Describe positions as coordinates.", create() { const x=rand(0,6), y=rand(0,6); return qa(`A point is ${x} along the x-axis and ${y} up the y-axis. What are its coordinates?`, `(${x}, ${y})`); }},
  { category: "Geometry", id: "ge-plot-points", name: "Plot points from coordinates", description: "Plot specified points on a grid.", create() { const x=rand(0,6), y=rand(0,6); return qa(`Which point should be plotted ${x} across and ${y} up?`, `(${x}, ${y})`); }},
  { category: "Geometry", id: "ge-translations", name: "Describe translations", description: "Describe movements as translations.", create() { const x1=rand(0,5), y1=rand(0,5), dx=rand(1,4), dy=rand(1,4); return qa(`A point moves from (${x1}, ${y1}) to (${x1+dx}, ${y1+dy}). Describe the translation.`, `${dx} right and ${dy} up`); }},

  // STATISTICS
  { category: "Statistics", id: "st-bar-pictograms", name: "Interpret bar charts and pictograms", description: "Interpret data using bar charts.", create() { const a=rand(8,30), b=rand(8,30); return qa(`A bar chart shows ${a} apples and ${b} bananas sold. How many more of the greater fruit were sold?`, Math.abs(a-b)); }},
  { category: "Statistics", id: "st-time-graphs", name: "Interpret time graphs", description: "Interpret continuous data using time graphs.", create() { const start=rand(5,20), increase=rand(3,15); return qa(`A graph shows a plant was ${start} cm tall on Monday and ${start+increase} cm tall on Friday. How much did it grow?`, `${increase} cm`); }}
];

let currentQuestions = [];

function qa(question, answer) { return { question, answer: String(answer) }; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function choice(array) { return array[rand(0, array.length - 1)]; }
function uniqueNumbers(count, min, max) { const out = new Set(); while(out.size < count) out.add(rand(min,max)); return [...out]; }
function pad(n) { return String(n).padStart(2,"0"); }
function formatDecimal(n) { return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2))); }

function toRoman(num) {
  const map = [[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let result = "";
  for (const [value, symbol] of map) while (num >= value) { result += symbol; num -= value; }
  return result;
}

function factorPairs(n) {
  const pairs = [];
  for (let i=1; i<=Math.sqrt(n); i++) if (n%i===0) pairs.push(`${i} × ${n/i}`);
  return pairs;
}

function metricConversions() {
  const m = rand(1,9), cm = rand(1,9), kg = rand(1,9), l = rand(1,9), km = rand(1,5);
  return [
    { q: `${km} km = ? m`, a: `${km*1000} m` },
    { q: `${m} m = ? cm`, a: `${m*100} cm` },
    { q: `${kg} kg = ? g`, a: `${kg*1000} g` },
    { q: `${l} l = ? ml`, a: `${l*1000} ml` },
    { q: `${cm*100} cm = ? m`, a: `${cm} m` }
  ];
}

function renderSkills() {
  const container = document.getElementById("skills");
  const categories = [...new Set(skills.map(skill => skill.category))];

  container.innerHTML = categories.map(category => `
    <div class="category-group">
      <h3>${category}</h3>
      <div class="category-skills">
        ${skills.filter(skill => skill.category === category).map(skill => `
          <button type="button" class="skill-toggle selected" data-skill-id="${skill.id}" aria-pressed="true">
            <span class="tick" aria-hidden="true"></span>
            <span>
              <strong>${skill.name}</strong>
              <small>${skill.description}</small>
            </span>
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".skill-toggle").forEach(button => {
    button.addEventListener("click", () => toggleSkillButton(button));
  });

  updateSelectedCount();
}

function toggleSkillButton(button) {
  const isSelected = button.classList.toggle("selected");
  button.setAttribute("aria-pressed", String(isSelected));
  updateSelectedCount();
}

function updateSelectedCount() {
  const existing = document.getElementById("selectedCount");
  const selected = document.querySelectorAll(".skill-toggle.selected").length;
  const total = skills.length;

  if (existing) {
    existing.textContent = `${selected} of ${total} skills selected`;
    return;
  }

  const skillsContainer = document.getElementById("skills");
  const count = document.createElement("div");
  count.id = "selectedCount";
  count.className = "selected-count";
  count.textContent = `${selected} of ${total} skills selected`;
  skillsContainer.before(count);
}

function selectedSkills() {
  const selectedIds = [...document.querySelectorAll(".skill-toggle.selected")].map(button => button.dataset.skillId);
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
  return { number: index + 1, skillId: skill.id, skillName: skill.name, question: item.question, answer: item.answer, visible: false };
}

function renderQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = currentQuestions.map((item, index) => `
    <article class="question-card">
      <div>
        <div class="question-number">${item.number}</div>
        <div class="skill-label">${item.skillName}</div>
        <div class="question-text">${item.question}</div>
        <div class="answer ${item.visible ? "visible" : ""}" id="answer-${index}">Answer: ${item.answer}</div>
      </div>
      <div class="card-buttons">
        <button onclick="toggleAnswer(${index})">${item.visible ? "Hide" : "Reveal"} Answer</button>
        <button class="secondary" onclick="refreshQuestion(${index})">New Question</button>
      </div>
    </article>
  `).join("");
}

function toggleAnswer(index) { currentQuestions[index].visible = !currentQuestions[index].visible; renderQuestions(); }
function refreshQuestion(index) { currentQuestions[index] = createQuestion(index); renderQuestions(); }
function showAllAnswers() { currentQuestions.forEach(item => item.visible = true); renderQuestions(); }
function hideAllAnswers() { currentQuestions.forEach(item => item.visible = false); renderQuestions(); }
function selectAllSkills() {
  document.querySelectorAll(".skill-toggle").forEach(button => {
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
  });
  updateSelectedCount();
}

function deselectAllSkills() {
  document.querySelectorAll(".skill-toggle").forEach(button => {
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
  });
  updateSelectedCount();
}

function bindButtons() {
  const generateBtn = document.getElementById("generateBtn");
  const revealAllBtn = document.getElementById("revealAllBtn");
  const hideAllBtn = document.getElementById("hideAllBtn");
  const printBtn = document.getElementById("printBtn");
  const selectAllBtn = document.getElementById("selectAllBtn");
  const deselectAllBtn = document.getElementById("deselectAllBtn");

  if (generateBtn) generateBtn.addEventListener("click", generateSet);
  if (revealAllBtn) revealAllBtn.addEventListener("click", showAllAnswers);
  if (hideAllBtn) hideAllBtn.addEventListener("click", hideAllAnswers);
  if (printBtn) printBtn.addEventListener("click", () => window.print());
  if (selectAllBtn) selectAllBtn.addEventListener("click", selectAllSkills);
  if (deselectAllBtn) deselectAllBtn.addEventListener("click", deselectAllSkills);
}

window.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  bindButtons();
});
