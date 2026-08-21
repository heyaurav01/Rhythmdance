const lessons = [
  {
    title: "Introduction",
    video: "https://www.youtube.com/embed/XXXXXXX",
    desc: `
      <p><strong>Kuchipudi</strong> is a classical dance from Andhra Pradesh known for its dramatic storytelling, dynamic movements, and unique tradition of dancing on a brass plate.</p>
      <ul>
        <li>Blends Natya (drama) and Nritya (expression)</li>
        <li>Often features male and female roles together</li>
        <li>Traditionally performed by the Bhagavata Mela community</li>
      </ul>
    `
  },
  {
    title: "History",
    video: "https://www.youtube.com/embed/YYYYYYY",
    desc: `
      <p>Originated in temple rituals, Kuchipudi transitioned into stage performance over centuries while retaining its devotional roots.</p>
      <ul>
        <li>Created by Siddhendra Yogi in the 14th century</li>
        <li>Popularized as a dance-drama format</li>
        <li>Modernized and taught in institutions today</li>
      </ul>
    `
  },
  {
    title: "Features",
    video: "https://www.youtube.com/embed/ZZZZZZZ",
    desc: `
      <ul>
        <li>Expressive storytelling with eye and hand movements</li>
        <li>Tarangam: dancing on a brass plate with a pot on the head</li>
        <li>Jathis and Adavus for rhythmic training</li>
      </ul>
    `
  },
  {
    title: "Core Lessons",
    video: "https://www.youtube.com/embed/AAAAAAA",
    desc: `
      <ol>
        <li>Foundations of Kaki Talam (invocation rhythms)</li>
        <li>Step combinations with Adavus</li>
        <li>Syllable-rich Jathis</li>
        <li>Shabdam & Tarangam practices</li>
      </ol>
    `
  },
  {
    title: "Teaching Structure",
    video: "https://www.youtube.com/embed/BBBBBBB",
    desc: `
      <ul>
        <li>Start each session with rhythmic clapping (Talam)</li>
        <li>Focus on balance and posture for Tarangam</li>
        <li>Express emotion in Padam and Shabdam</li>
        <li>Weekly performance review drills</li>
      </ul>
    `
  },
  {
    title: "Practice & Tips",
    video: "https://www.youtube.com/embed/CCCCCCC",
    desc: `
      <ul>
        <li>Practice on different surfaces to improve balance</li>
        <li>Record Shabdam and refine expressions</li>
        <li>Maintain stamina with short Tarangam drills</li>
        <li>Observe gurus and live performances often</li>
      </ul>
    `
  },
  {
    title: "Lesson 1: Kaki Talam",
    video: "https://www.youtube.com/embed/DDDDDDD",
    desc: `<p>Kaki Talam sets the rhythmic and spiritual tone for every performance. It is the first discipline taught in traditional classes.</p>`
  },
  {
    title: "Lesson 2: Adavus",
    video: "https://www.youtube.com/embed/EEEEEEE",
    desc: `<p>Adavus are basic steps that combine rhythm, posture, and balance — the foundation of every routine.</p>`
  },
  {
    title: "Lesson 3: Jathis",
    video: "https://www.youtube.com/embed/FFFFFFF",
    desc: `<p>Jathis are combinations of steps with syllables that teach control, timing, and coordination.</p>`
  },
  {
    title: "Lesson 4: Tarangam",
    video: "https://www.youtube.com/embed/GGGGGGG",
    desc: `<p>Tarangam showcases balance, rhythm, and dramatic flair as dancers perform on a brass plate with coordinated steps.</p>`
  },
  {
    title: "Lesson 5: Moksham",
    video: "https://www.youtube.com/embed/HHHHHHH",
    desc: `<p>Moksham is the graceful conclusion of the recital symbolizing spiritual liberation and devotion.</p>`
  }
];

// DOM references
const menu = document.getElementById('lessonMenu');
const content = document.getElementById('lessonContent');

// Load sidebar dynamically
lessons.forEach((lesson, index) => {
  const btn = document.createElement('button');
  btn.textContent = lesson.title;
  if (index === 0) btn.classList.add('selected');
  btn.addEventListener('click', () => {
    document.querySelectorAll('#lessonMenu button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    loadLesson(index);
  });
  menu.appendChild(btn);
});

// Inject content
function loadLesson(i) {
  const l = lessons[i];
  content.innerHTML = `
    <h2>${l.title}</h2>
    <div class="lesson-video-area">
      <iframe src="${l.video}" allowfullscreen></iframe>
    </div>
    ${l.desc}
  `;
}

// Auto-load first lesson
loadLesson(0);
