const lessons = [
  {
    title: "Introduction",
    video: "https://www.youtube.com/embed/L7L5Ibc3Y88",
    desc: `
      <p><strong>Odissi</strong> is not just a dance form; it's a graceful blend of devotion, sculpture, and storytelling. Rooted in the temples of Odisha, every posture speaks volumes.</p>
      <ul>
        <li>Originated over 2000 years ago in temples</li>
        <li>Recognized for its elegance and emotional depth</li>
      </ul>
    `
  },
  {
    title: "History",
    video: "https://www.youtube.com/embed/2kZpY_GwIbI",
    desc: `
      <p>The rich legacy of Odissi can be traced back to the Natya Shastra. Temple carvings and ancient scriptures document its evolution.</p>
      <ul>
        <li>Performed by Maharis (female temple dancers)</li>
        <li>Was revived post-independence by dedicated gurus</li>
      </ul>
    `
  },
  {
    title: "Features",
    video: "https://www.youtube.com/embed/jXFD4kg30uA",
    desc: `
      <p>Odissi is visually distinct for its fluid torso movement, rhythmic footwork, and divine expressions.</p>
      <ul>
        <li>Signature Tribhanga pose (three bends of the body)</li>
        <li>Graceful hand gestures and symbolic expressions</li>
      </ul>
    `
  },
  {
    title: "Core Lessons",
    video: "https://www.youtube.com/embed/0oDT-6Clj0w",
    desc: `
      <p>Start with the fundamental building blocks before moving to expressive sequences.</p>
      <ol>
        <li>Namaskar and Chowka (salutation and square stance)</li>
        <li>Tribhanga and Bhangis (postures)</li>
      </ol>
    `
  },
  {
    title: "Teaching Structure",
    video: "https://www.youtube.com/embed/bKUR9wA-kRk",
    desc: `
      <p>A typical Odissi training session begins with basic movements and progresses into storytelling through expression.</p>
      <ul>
        <li>Drills for Chowka and Tribhanga</li>
        <li>Mudras (hand gestures) and Abhinaya (expression)</li>
      </ul>
    `
  },
  {
    title: "Practice & Tips",
    video: "https://www.youtube.com/embed/SC7jX5K1t6I",
    desc: `
      <p>Consistency is the secret. Practice regularly and review your recordings to refine every movement.</p>
      <ul>
        <li>Daily 30-minute focused practice</li>
        <li>Record yourself and analyze posture</li>
        <li>Warm-up before and cool-down after every session</li>
      </ul>
    `
  },
  {
    title: "Lesson 1: Namaskar & Chowka",
    video: "https://www.youtube.com/embed/9TnkYk9P2g0",
    desc: `
      <p>Begin with the Namaskar – the traditional salutation, followed by mastering Chowka – the powerful square stance.</p>
    `
  },
  {
    title: "Lesson 2: Tribhanga & Bhangis",
    video: "https://www.youtube.com/embed/CtfS7DFvVsg",
    desc: `
      <p>The Tribhanga is the essence of Odissi's sculptural form. Learn to flow through curves and classical lines.</p>
    `
  },
  {
    title: "Lesson 3: Mudras & Hasta",
    video: "https://www.youtube.com/embed/HBlyRjIrfgM",
    desc: `
      <p>Learn 20+ single and combined hand gestures (mudras) and how they communicate meaning in every performance.</p>
    `
  },
  {
    title: "Lesson 4: Abhinaya & Expression",
    video: "https://www.youtube.com/embed/gpFTKbWscso",
    desc: `
      <p>Explore the art of emotional storytelling. Practice subtle expressions to connect deeply with the audience.</p>
    `
  },
  {
    title: "Lesson 5: Odissi Repertoire",
    video: "https://www.youtube.com/embed/lMHsA_Vt6VM",
    desc: `
      <p>Understand the structure of a full Odissi performance.</p>
      <ol>
        <li><strong>Mangalacharan:</strong> Invoking the divine</li>
        <li><strong>Pallavi:</strong> Pure dance and rhythm</li>
        <li><strong>Abhinaya:</strong> Expressive storytelling</li>
        <li><strong>Moksha:</strong> Spiritual liberation</li>
      </ol>
    `
  }
];

const menuBtnsContainer = document.getElementById('lessonMenu');
const contentEl = document.getElementById('lessonContent');

// Generate lesson menu buttons dynamically
lessons.forEach((lesson, idx) => {
  const btn = document.createElement('button');
  btn.textContent = lesson.title;
  if (idx === 0) btn.classList.add('selected');
  btn.addEventListener('click', () => {
    document.querySelectorAll('#lessonMenu button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    loadLesson(idx);
  });
  menuBtnsContainer.appendChild(btn);
});

// Load lesson content
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

// Initial load
loadLesson(0);
