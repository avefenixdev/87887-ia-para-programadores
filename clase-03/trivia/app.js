/*
  Trivia JS - Vanilla JS
  - 5 preguntas
  - 4 opciones
  - 10 puntos por correcta
  - muestra una pregunta a la vez
  - feedback visual y transición automática
  - responsive, accessible controls
*/

/* QUESTIONS: editable array */
const QUESTIONS = [
  {
    q: "¿Cuál es el resultado de 'typeof NaN' en JavaScript?",
    options: ["'number'", "'NaN'", "'undefined'", "'object'"],
    answer: 0
  },
  {
    q: "¿Qué método añade un elemento al final de un array?",
    options: ["unshift()", "push()", "pop()", "shift()"],
    answer: 1
  },
  {
    q: "¿Cuál es la forma correcta de crear una promesa?",
    options: ["new Promise((res,rej)=>{})", "Promise.create()", "Promise.new()", "createPromise()"],
    answer: 0
  },
  {
    q: "¿Qué palabra clave declara una variable con alcance de bloque y permite reasignación?",
    options: ["var", "const", "let", "static"],
    answer: 2
  },
  {
    q: "¿Cuál de estas no es una forma de iterar sobre los elementos de un array?",
    options: ["forEach()", "map()", "filter()", "assign()"],
    answer: 3
  }
];

/* Constants */
const POINTS_PER = 10;
const AUTO_ADVANCE_MS = 900; // delay to show feedback then go next
const MAX_SCORE = QUESTIONS.length * POINTS_PER;

/* State */
let state = {
  index: 0,
  score: 0,
  locked: false
};

/* DOM */
const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const skipBtn = document.getElementById('skip-btn');
const qIndexEl = document.getElementById('q-index');
const scoreEl = document.getElementById('score');
const liveScoreEl = document.getElementById('live-score');
const questionText = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');
const hintEl = document.getElementById('hint');
const resultTitle = document.getElementById('result-title');
const resultScore = document.getElementById('result-score');
const resultMsg = document.getElementById('result-msg');

/* Utilities */
function showPanel(panelToShow){
  // hide all then show selected for accessibility
  [intro, quiz, result].forEach(p => {
    const is = p === panelToShow;
    p.classList.toggle('visible', is);
    p.classList.toggle('hidden', !is);
    p.setAttribute('aria-hidden', (!is).toString());
  });
}

/* Render a question */
function renderQuestion(){
  const qObj = QUESTIONS[state.index];
  qIndexEl.textContent = `Pregunta ${state.index+1} / ${QUESTIONS.length}`;
  questionText.textContent = qObj.q;
  optionsEl.innerHTML = '';
  hintEl.textContent = '';
  // Fill options, create keyboard-accessible buttons
  qObj.options.forEach((optText, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.type = 'button';
    btn.setAttribute('data-i', i);
    btn.setAttribute('role', 'option');
    btn.setAttribute('aria-selected', 'false');
    btn.innerHTML = `
      <div style="display:flex;align-items:center;">
        <span class="opt-letter">${String.fromCharCode(65+i)}</span>
        <span class="opt-text">${optText}</span>
      </div>
    `;
    // click handler
    btn.addEventListener('click', onAnswer);
    // keyboard: Enter/Space
    btn.addEventListener('keyup', (e) => {
      if(e.key === 'Enter' || e.key === ' ') onAnswer.call(btn, e);
    });
    optionsEl.appendChild(btn);
  });

  // Focus first option for keyboard users
  const firstBtn = optionsEl.querySelector('button.option');
  if(firstBtn) firstBtn.focus();

  // Update progress and live score
  updateProgress();
  updateScoreDisplay();
}

/* Update progress bar */
function updateProgress(){
  const pct = (state.index / QUESTIONS.length) * 100;
  progressEl.style.width = `${pct}%`;
}

/* Update score displays */
function updateScoreDisplay(){
  scoreEl.textContent = state.score;
  liveScoreEl.textContent = state.score;
}

/* Handle answer selection */
function onAnswer(e){
  if(state.locked) return;
  state.locked = true;
  const btn = (this instanceof Element) ? this : e.currentTarget;
  const chosen = Number(btn.getAttribute('data-i'));
  const qObj = QUESTIONS[state.index];

  // Mark selected
  btn.setAttribute('aria-selected','true');

  const correctIndex = qObj.answer;

  // Visual feedback
  // Mark correct and chosen
  const optionButtons = Array.from(optionsEl.querySelectorAll('.option'));
  optionButtons.forEach((b) => {
    const idx = Number(b.getAttribute('data-i'));
    b.classList.add('disabled');
    if(idx === correctIndex){
      b.classList.add('correct');
      b.setAttribute('aria-label', b.innerText + ' – correcta');
    } else if(idx === chosen){
      b.classList.add('incorrect');
      b.setAttribute('aria-label', b.innerText + ' – incorrecta');
    } else {
      b.style.opacity = '0.9';
    }
    // prevent further clicks
    b.disabled = true;
  });

  // Update score & hint
  if(chosen === correctIndex){
    state.score += POINTS_PER;
    hintEl.textContent = '¡Correcto! +10';
  } else {
    hintEl.textContent = 'Incorrecto';
  }
  updateScoreDisplay();

  // animate progress to include this question as completed
  const completedPct = ((state.index+1) / QUESTIONS.length) * 100;
  progressEl.style.width = `${completedPct}%`;

  // after delay, go next or show result
  setTimeout(() => {
    state.index++;
    if(state.index >= QUESTIONS.length){
      showResult();
    } else {
      state.locked = false;
      renderQuestion();
    }
  }, AUTO_ADVANCE_MS);
}

/* Skip button - allows skipping question without points */
function onSkip(){
  if(state.locked) return;
  state.locked = true;
  // show which is correct briefly
  const qObj = QUESTIONS[state.index];
  const optionButtons = Array.from(optionsEl.querySelectorAll('.option'));
  optionButtons.forEach((b) => {
    const idx = Number(b.getAttribute('data-i'));
    if(idx === qObj.answer){
      b.classList.add('correct');
    } else {
      b.style.opacity = '0.85';
    }
    b.disabled = true;
  });
  hintEl.textContent = 'Saltada';
  // update progress visual
  const completedPct = ((state.index+1) / QUESTIONS.length) * 100;
  progressEl.style.width = `${completedPct}%`;

  setTimeout(() => {
    state.index++;
    if(state.index >= QUESTIONS.length){
      showResult();
    } else {
      state.locked = false;
      renderQuestion();
    }
  }, AUTO_ADVANCE_MS);
}

/* Show final results */
function showResult(){
  // animate panel switch
  showPanel(result);
  resultScore.textContent = `${state.score} / ${MAX_SCORE}`;
  // message depending on score
  const pct = (state.score / MAX_SCORE) * 100;
  if(pct === 100){
    resultTitle.textContent = '¡Maestro JS!';
    resultMsg.textContent = 'Puntaje perfecto. ¡Brillante!';
  } else if(pct >= 70){
    resultTitle.textContent = '¡Gran trabajo!';
    resultMsg.textContent = 'Tienes buen dominio de JavaScript.';
  } else if(pct >= 40){
    resultTitle.textContent = 'Buen intento';
    resultMsg.textContent = 'Sigue practicando para mejorar.';
  } else {
    resultTitle.textContent = '¡A practicar!';
    resultMsg.textContent = 'Revisa los fundamentos y vuelve a intentarlo.';
  }
}

/* Start / Retry */
function startGame(){
  state.index = 0;
  state.score = 0;
  state.locked = false;
  updateScoreDisplay();
  progressEl.style.width = '0%';
  showPanel(quiz);
  // small delay to allow panel CSS to animate in then render
  requestAnimationFrame(() => renderQuestion());
}
function retryGame(){
  startGame();
}

/* Event listeners */
startBtn.addEventListener('click', startGame);
retryBtn.addEventListener('click', retryGame);
skipBtn.addEventListener('click', onSkip);

/* Keyboard shortcuts for accessibility (1-4 keys) */
document.addEventListener('keydown', (e) => {
  // if not in quiz, ignore
  if(intro.getAttribute('aria-hidden') === 'false' || result.getAttribute('aria-hidden') === 'false') return;
  if(e.key >= '1' && e.key <= '4'){
    const idx = Number(e.key) - 1;
    const btn = optionsEl.querySelector(`button[data-i="${idx}"]`);
    if(btn) btn.click();
  }
});

/* Initial state */
showPanel(intro);
updateScoreDisplay();