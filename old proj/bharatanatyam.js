const lessons = [
  {
    title: "Introduction",
    video: "https://www.youtube.com/embed/XXXXXXX",
    desc: `
      <p><strong>Bharatanatyam</strong> is a sacred art form from Tamil Nadu, celebrated for its intricate movements and profound expressions.</p>
      <ul>
        <li>Rooted in temple traditions</li>
        <li>Revived by artists like Rukmini Devi</li>
        <li>Combines rhythm, expression, and storytelling</li>
      </ul>
    `
  },
  {
    title: "History",
    video: "https://www.youtube.com/embed/YYYYYYY",
    desc: `
      <p>Emerging from Devadasi rituals, Bharatanatyam has evolved into a structured stage art backed by classical literature and rigorous practice.</p>
    `
  },
  {
    title: "Features",
    video: "https://www.youtube.com/embed/ZZZZZZZ",
    desc: `
      <ul>
        <li>Firm postures and expressive eyes</li>
        <li>Geometric precision and graceful bends</li>
        <li>Structured Margam format: Alarippu to Tillana</li>
      </ul>
    `
  },
  {
    title: "Core Lessons",
    video: "https://www.youtube.com/embed/AAAAAAA",
    desc: `
      <ol>
        <li>Basic Adavus (step patterns)</li>
        <li>Mudras for storytelling</li>
        <li>Facial expressions and eye movements</li>
        <li>Tala and rhythm alignment</li>
      </ol>
    `
  },
  {
    title: "Teaching Structure",
    video: "https://www.youtube.com/embed/BBBBBBB",
    desc: `
      <ul>
        <li>Step-by-step Adavu breakdown</li>
        <li>Dedicated Mudra practice sessions</li>
        <li>Repertoire training (Alarippu to Tillana)</li>
      </ul>
    `
  },
  {
    title: "Practice & Tips",
    video: "https://www.youtube.com/embed/CCCCCCC",
    desc: `
      <ul>
        <li>Consistency matters more than duration</li>
        <li>Mirror practice boosts alignment</li>
        <li>Focus on expression, not just speed</li>
      </ul>
    `
  },
  {
    title: "Lesson 1: Alarippu",
    video: "https://www.youtube.com/embed/DDDDDDD",
    desc: `<p>Invocatory piece that opens the performance with rhythm and energy.</p>`
  },
  {
    title: "Lesson 2: Jatiswaram",
    video: "https://www.youtube.com/embed/EEEEEEE",
    desc: `<p>Combines dance and musical notes, showcasing pure rhythm and form.</p>`
  },
  {
    title: "Lesson 3: Varnam",
    video: "https://www.youtube.com/embed/FFFFFFF",
    desc: `<p>Most elaborate piece merging rhythm and expressive storytelling.</p>`
  },
  {
    title: "Lesson 4: Padam",
    video: "https://www.youtube.com/embed/GGGGGGG",
    desc: `<p>Interprets poetry through nuanced Abhinaya (expression).</p>`
  },
  {
    title: "Lesson 5: Tillana",
    video: "https://www.youtube.com/embed/HHHHHHH",
    desc: `<p>Energetic finale that celebrates the joy of dance.</p>`
  }
];

// DOM hooks
const menuEl = document.getElementById('lessonMenu');
const contentEl = document.getElementById('lessonContent');

// Create buttons dynamically
lessons.forEach((lesson, idx) => {
  const btn = document.createElement('button');
  btn.textContent = lesson.title;
  if (idx === 0) btn.classList.add('selected');
  btn.addEventListener('click', () => {
    document.querySelectorAll('#lessonMenu button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    loadLesson(idx);
  });
  menuEl.appendChild(btn);
});

function loadLesson(i) {
  const L = lessons[i];
  contentEl.innerHTML = `
    <h2>${L.title}</h2>
    <div class="lesson-video-area">
      <iframe src="${L.video}" frameborder="0" allowfullscreen></iframe>
    </div>
    ${L.desc}
  `;
}

loadLesson(0);
