(function () {
  "use strict";

  const bank = window.LMAP_QUESTION_BANK;
  if (!bank) {
    document.body.innerHTML =
      "<p class='wrap page'>Practice question bank could not be loaded.</p>";
    return;
  }

  const els = {
    setup: document.getElementById("practice-setup"),
    bankSummary: document.getElementById("bank-summary"),
    chapter: document.getElementById("practice-chapter"),
    availability: document.getElementById("chapter-availability"),
    count: document.getElementById("question-count"),
    formulaOnly: document.getElementById("formula-only"),
    start: document.getElementById("start-practice"),
    session: document.getElementById("practice-session"),
    results: document.getElementById("practice-results"),
    sessionLabel: document.getElementById("session-label"),
    progressLabel: document.getElementById("progress-label"),
    progressBar: document.getElementById("progress-bar"),
    scorePill: document.getElementById("score-pill"),
    source: document.getElementById("question-source"),
    question: document.getElementById("question-text"),
    answerArea: document.getElementById("answer-area"),
    feedback: document.getElementById("answer-feedback"),
    submit: document.getElementById("submit-answer"),
    next: document.getElementById("next-question"),
    quit: document.getElementById("quit-practice"),
    newSession: document.getElementById("new-session"),
    resultScore: document.getElementById("result-score"),
    resultPercent: document.getElementById("result-percent"),
    resultsTitle: document.getElementById("results-title"),
    resultsSummary: document.getElementById("results-summary"),
  };

  const state = {
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    chapterName: "",
  };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function chapterMeta(id) {
    return bank.chapters.find((c) => c.id === id);
  }

  function poolForChapter(id, formulaOnly) {
    let pool = bank.questions[id] || [];
    if (formulaOnly) {
      pool = pool.filter((q) => (q.tags || []).includes("formula"));
    }
    return pool;
  }

  function updateAvailability() {
    const id = els.chapter.value;
    const formulaOnly = els.formulaOnly.checked;
    const pool = poolForChapter(id, formulaOnly);
    const n = pool.length;
    els.count.max = Math.max(1, n);
    if (Number(els.count.value) > n) els.count.value = String(Math.min(10, n) || 1);
    const label = chapterMeta(id)?.name || id;
    if (formulaOnly && id !== "1") {
      els.availability.textContent =
        "Formula filter applies to Chapter 1 only — switch to Chapter 1 or turn the filter off.";
      els.start.disabled = true;
      return;
    }
    els.start.disabled = n === 0;
    els.availability.textContent = `${n} question${n === 1 ? "" : "s"} available in ${label}${
      formulaOnly ? " (formula only)" : ""
    }.`;
  }

  function renderSetup() {
    els.bankSummary.innerHTML = bank.chapters
      .map((c) => {
        const n = (bank.questions[c.id] || []).length;
        const formulas = (bank.questions[c.id] || []).filter((q) =>
          (q.tags || []).includes("formula")
        ).length;
        return `<div class="bank-chip"><strong>${c.id}</strong><span>${n} MCQs${
          formulas ? ` · ${formulas} formula` : ""
        }</span></div>`;
      })
      .join("");

    els.chapter.innerHTML = bank.chapters
      .map((c) => `<option value="${c.id}">${c.name}</option>`)
      .join("");

    els.formulaOnly.addEventListener("change", () => {
      if (els.formulaOnly.checked) els.chapter.value = "1";
      updateAvailability();
    });
    els.chapter.addEventListener("change", updateAvailability);
    updateAvailability();
  }

  function show(el) {
    el.hidden = false;
  }
  function hide(el) {
    el.hidden = true;
  }

  function startSession() {
    const id = els.chapter.value;
    const formulaOnly = els.formulaOnly.checked;
    const pool = poolForChapter(id, formulaOnly);
    let n = Math.max(1, Math.min(Number(els.count.value) || 10, pool.length));
    state.questions = shuffle(pool).slice(0, n);
    state.index = 0;
    state.score = 0;
    state.answered = false;
    state.chapterName = chapterMeta(id)?.name || id;

    hide(els.setup);
    hide(els.results);
    show(els.session);
    els.sessionLabel.textContent = state.chapterName;
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.questions[state.index];
    const total = state.questions.length;
    state.answered = false;

    els.progressLabel.textContent = `Question ${state.index + 1} of ${total}`;
    els.progressBar.style.width = `${((state.index) / total) * 100}%`;
    els.scorePill.textContent = `Score: ${state.score}`;
    els.source.textContent = q.source ? `Source: ${q.source}` : "";
    els.question.textContent = q.stem;

    els.answerArea.innerHTML = q.options
      .map(
        (opt, i) => `
      <label class="mcq-option">
        <input type="radio" name="mcq" value="${i}" />
        <span>${opt}</span>
      </label>`
      )
      .join("");

    hide(els.feedback);
    els.feedback.className = "answer-feedback";
    show(els.submit);
    hide(els.next);
  }

  function submitAnswer() {
    if (state.answered) return;
    const selected = els.answerArea.querySelector('input[name="mcq"]:checked');
    if (!selected) {
      els.feedback.hidden = false;
      els.feedback.className = "answer-feedback warn";
      els.feedback.textContent = "Select an option before submitting.";
      return;
    }

    const q = state.questions[state.index];
    const choice = Number(selected.value);
    const correct = choice === q.correct;
    state.answered = true;
    if (correct) state.score += 1;

    els.answerArea.querySelectorAll(".mcq-option").forEach((label, i) => {
      label.classList.add("locked");
      if (i === q.correct) label.classList.add("is-correct");
      if (i === choice && !correct) label.classList.add("is-wrong");
      const input = label.querySelector("input");
      if (input) input.disabled = true;
    });

    els.feedback.hidden = false;
    els.feedback.className = `answer-feedback ${correct ? "ok" : "bad"}`;
    els.feedback.innerHTML = `<strong>${correct ? "Correct" : "Incorrect"}.</strong> ${
      q.explanation || ""
    }`;

    els.scorePill.textContent = `Score: ${state.score}`;
    hide(els.submit);
    show(els.next);
    if (state.index === state.questions.length - 1) {
      els.next.textContent = "See results";
    } else {
      els.next.textContent = "Next question";
    }
  }

  function nextQuestion() {
    if (state.index >= state.questions.length - 1) {
      finishSession();
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function finishSession() {
    const total = state.questions.length;
    const pct = total ? Math.round((state.score / total) * 100) : 0;
    hide(els.session);
    show(els.results);
    els.resultsTitle.textContent = "Session complete";
    els.resultsSummary.textContent = `${state.chapterName} · ${total} question${
      total === 1 ? "" : "s"
    }`;
    els.resultScore.textContent = `${state.score}/${total}`;
    els.resultPercent.textContent = `${pct}%`;
    els.progressBar.style.width = "100%";
  }

  function endEarly() {
    if (!state.questions.length) return;
    finishSession();
  }

  function resetToSetup() {
    hide(els.session);
    hide(els.results);
    show(els.setup);
    updateAvailability();
  }

  els.start.addEventListener("click", startSession);
  els.submit.addEventListener("click", submitAnswer);
  els.next.addEventListener("click", nextQuestion);
  els.quit.addEventListener("click", endEarly);
  els.newSession.addEventListener("click", resetToSetup);

  renderSetup();
})();
