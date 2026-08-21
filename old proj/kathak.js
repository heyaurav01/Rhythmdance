const lessons = [
  {
    title: "Introduction",
    video: "https://www.youtube.com/embed/XXXXXXX",
    desc: `
      <p><strong>Kathak</strong> is a classical dance form of North India known for its swift spins and rhythmic footwork, originally performed by traveling storytellers.</p>
      <ul>
        <li>Blends storytelling with movement</li>
        <li>Has Hindu and Mughal influences</li>
        <li>Known for fast pirouettes (chakkars)</li>
      </ul>
    `
  },
  {
    title: "History",
    video: "https://www.youtube.com/embed/YYYYYYY",
    desc: `
      <p>Kathak evolved from ancient temples to royal courts, where it was refined with elegance and drama.</p>
      <ul>
        <li>Origin in Vedic recitals and devotional performances</li>
        <li>Flourished in Mughal courts with Persian aesthetics</li>
        <li>Revived in modern India by gharanas (schools)</li>
      </ul>
    `
  },
  {
    title: "Features",
    video: "https://www.youtube.com/embed/ZZZZZZZ",
    desc: `
      <ul>
        <li><strong>Tatkar:</strong> Basic footwork patterns</li>
        <li><strong>Chakkars:</strong> Signature spinning movements</li>
        <li><strong>Abhinaya:</strong> Facial storytelling and expressions</li>
        <li><strong>Layakari:</strong> Complex rhythmic variations</li>
      </ul>
    `
  },
  {
    title: "Core Lessons",
    video: "https://www.youtube.com/embed/AAAAAAA",
    desc: `
      <ol>
        <li>Foundational steps: Tatkar, Keechad</li>
        <li>Rhythmic structures: Kayda, Gat</li>
        <li>Advanced expressions: Toda, Tihai</li>
      </ol>
    `
  },
  {
    title: "Teaching Structure",
    video: "https://www.youtube.com/embed/BBBBBBB",
    desc: `
      <ul>
        <li>Warm-up through Tatkar drills</li>
        <li>Footwork synchronization with bols (syllables)</li>
        <li>Daily expression training in front of mirrors</li>
      </ul>
    `
  },
  {
    title: "Practice & Tips",
    video: "https://www.youtube.com/embed/CCCCCCC",
    desc: `
      <ul>
        <li>Practice spins slowly, then increase speed</li>
        <li>Use tabla app or metronome for rhythm</li>
        <li>Focus more on posture than speed</li>
      </ul>
    `
  },
  {
    title: "Lesson 1: Tatkar & Keechad",
    video: "https://www.youtube.com/embed/DDDDDDD",
    desc: `<p>Learn basic Tatkar (foot beats) and Keechad, essential for balance and rhythm control.</p>`
  },
  {
    title: "Lesson 2: Kayda & Gat",
    video: "https://www.youtube.com/embed/EEEEEEE",
    desc: `<p>Understand Kayda (rule-based composition) and Gat (story enactment through movement).</p>`
  },
  {
    title: "Lesson 3: Toda & Tihai",
    video: "https://www.youtube.com/embed/FFFFFFF",
    desc: `<p>Toda is a short rhythmic phrase; Tihai repeats it thrice to land perfectly on the beat.</p>`
  },
  {
    title: "Lesson 4: Chakradhara & Parans",
    video: "https://www.youtube.com/embed/GGGGGGG",
    desc: `<p>Chakradhara explores chakkars (spins); Parans are rhythm-rich syllable combos from pakhawaj traditions.</p>`
  },
  {
    title: "Lesson 5: Layakari & Paran",
    video: "https://www.youtube.com/embed/HHHHHHH",
    desc: `<p>Layakari is playing with time. Learn how to vary tempo and rhythm using Paran patterns.</p>`
  }
];

// DOM hooks
const menu = document.getElementById('lessonMenu');
const content = document.getElementById('lessonContent');

// Build menu dynamically
lessons.forEach((lesson, i) => {
  const btn = document.createElement('button');
  btn.textContent = lesson.title;
  if (i === 0) btn.classList.add('selected');
  btn.addEventListener('click', () => {
    document.querySelectorAll('#lessonMenu button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    loadLesson(i);
  });
  menu.appendChild(btn);
});

// Load lesson content
function loadLesson(index) {
  const l = lessons[index];
  content.innerHTML = `
    <h2>${l.title}</h2>
    <div class="lesson-video-area">
      <iframe src="${l.video}" allowfullscreen></iframe>
    </div>
    ${l.desc}
  `;
}

// Initial load
loadLesson(0);
