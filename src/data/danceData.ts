export interface Lesson {
  title: string;
  video: string;
  description: string;
  points?: string[];
  ordered?: boolean;
}

export interface DanceStyle {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  image: string;
  accentColor: string;
  learnersCount?: string;
  guru?: string;
  editorialTag?: string;
  duration?: string;
  category: "classical" | "folk";
  comingSoon?: boolean;
  lessons: Lesson[];
}

export const danceStyles: DanceStyle[] = [
  {
    slug: "odissi",
    name: "Odissi",
    category: "classical",
    region: "Odisha (East India)",
    tagline: "Fluid movements and sculpturesque poses from Odisha.",
    image: "/images/oddisi.png",
    accentColor: "#B42318",
    learnersCount: "12K learners",
    guru: "Guru Kelucharan Mohapatra Tradition",
    editorialTag: "ODISHA · EAST INDIA",
    duration: "24 min",
    lessons: [
      {
        title: "Introduction",
        video: "https://www.youtube.com/embed/L7L5Ibc3Y88",
        description:
          "Odissi is not just a dance form; it's a graceful blend of devotion, sculpture, and storytelling. Rooted in the temples of Odisha, every posture speaks volumes.",
        points: [
          "Originated over 2000 years ago in temples",
          "Recognized for its elegance and emotional depth",
        ],
      },
      {
        title: "History",
        video: "https://www.youtube.com/embed/2kZpY_GwIbI",
        description:
          "The rich legacy of Odissi can be traced back to the Natya Shastra. Temple carvings and ancient scriptures document its evolution.",
        points: [
          "Performed by Maharis (female temple dancers)",
          "Was revived post-independence by dedicated gurus",
        ],
      },
      {
        title: "Features",
        video: "https://www.youtube.com/embed/jXFD4kg30uA",
        description:
          "Odissi is visually distinct for its fluid torso movement, rhythmic footwork, and divine expressions.",
        points: [
          "Signature Tribhanga pose (three bends of the body)",
          "Graceful hand gestures and symbolic expressions",
        ],
      },
      {
        title: "Core Lessons",
        video: "https://www.youtube.com/embed/0oDT-6Clj0w",
        description:
          "Start with the fundamental building blocks before moving to expressive sequences.",
        points: [
          "Namaskar and Chowka (salutation and square stance)",
          "Tribhanga and Bhangis (postures)",
        ],
        ordered: true,
      },
      {
        title: "Teaching Structure",
        video: "https://www.youtube.com/embed/bKUR9wA-kRk",
        description:
          "A typical Odissi training session begins with basic movements and progresses into storytelling through expression.",
        points: [
          "Drills for Chowka and Tribhanga",
          "Mudras (hand gestures) and Abhinaya (expression)",
        ],
      },
      {
        title: "Practice & Tips",
        video: "https://www.youtube.com/embed/SC7jX5K1t6I",
        description:
          "Consistency is the secret. Practice regularly and review your recordings to refine every movement.",
        points: [
          "Daily 30-minute focused practice",
          "Record yourself and analyze posture",
          "Warm-up before and cool-down after every session",
        ],
      },
      {
        title: "Lesson 1: Namaskar & Chowka",
        video: "https://www.youtube.com/embed/9TnkYk9P2g0",
        description:
          "Begin with the Namaskar – the traditional salutation, followed by mastering Chowka – the powerful square stance.",
      },
      {
        title: "Lesson 2: Tribhanga & Bhangis",
        video: "https://www.youtube.com/embed/CtfS7DFvVsg",
        description:
          "The Tribhanga is the essence of Odissi's sculptural form. Learn to flow through curves and classical lines.",
      },
      {
        title: "Lesson 3: Mudras & Hasta",
        video: "https://www.youtube.com/embed/HBlyRjIrfgM",
        description:
          "Learn 20+ single and combined hand gestures (mudras) and how they communicate meaning in every performance.",
      },
      {
        title: "Lesson 4: Abhinaya & Expression",
        video: "https://www.youtube.com/embed/gpFTKbWscso",
        description:
          "Explore the art of emotional storytelling. Practice subtle expressions to connect deeply with the audience.",
      },
      {
        title: "Lesson 5: Odissi Repertoire",
        video: "https://www.youtube.com/embed/lMHsA_Vt6VM",
        description:
          "Understand the structure of a full Odissi performance.",
        points: [
          "Mangalacharan: Invoking the divine",
          "Pallavi: Pure dance and rhythm",
          "Abhinaya: Expressive storytelling",
          "Moksha: Spiritual liberation",
        ],
        ordered: true,
      },
    ],
  },
  {
    slug: "bharatanatyam",
    name: "Bharatanatyam",
    category: "classical",
    region: "Tamil Nadu (South India)",
    tagline:
      "Graceful hand gestures and storytelling from Tamil Nadu.",
    image: "/images/bharatanatyam.png",
    accentColor: "#B42318",
    learnersCount: "15K learners",
    guru: "Kalakshetra & Rukmini Devi Lineage",
    editorialTag: "TAMIL NADU · SOUTH INDIA",
    duration: "28 min",
    lessons: [
      {
        title: "Introduction",
        video: "https://www.youtube.com/embed/hsfg1FLnPsE",
        description:
          "Bharatanatyam is a sacred art form from Tamil Nadu, celebrated for its intricate movements and profound expressions.",
        points: [
          "Rooted in temple traditions",
          "Revived by artists like Rukmini Devi",
          "Combines rhythm, expression, and storytelling",
        ],
      },
      {
        title: "History",
        video: "https://www.youtube.com/embed/YYYYYYY",
        description:
          "Emerging from Devadasi rituals, Bharatanatyam has evolved into a structured stage art backed by classical literature and rigorous practice.",
      },
      {
        title: "Features",
        video: "https://www.youtube.com/embed/ZZZZZZZ",
        description: "Key characteristics of Bharatanatyam:",
        points: [
          "Firm postures and expressive eyes",
          "Geometric precision and graceful bends",
          "Structured Margam format: Alarippu to Tillana",
        ],
      },
      {
        title: "Core Lessons",
        video: "https://www.youtube.com/embed/AAAAAAA",
        description: "Fundamental skills to master:",
        points: [
          "Basic Adavus (step patterns)",
          "Mudras for storytelling",
          "Facial expressions and eye movements",
          "Tala and rhythm alignment",
        ],
        ordered: true,
      },
      {
        title: "Teaching Structure",
        video: "https://www.youtube.com/embed/BBBBBBB",
        description: "How a typical training session is structured:",
        points: [
          "Step-by-step Adavu breakdown",
          "Dedicated Mudra practice sessions",
          "Repertoire training (Alarippu to Tillana)",
        ],
      },
      {
        title: "Practice & Tips",
        video: "https://www.youtube.com/embed/CCCCCCC",
        description: "Tips for effective practice:",
        points: [
          "Consistency matters more than duration",
          "Mirror practice boosts alignment",
          "Focus on expression, not just speed",
        ],
      },
      {
        title: "Lesson 1: Alarippu",
        video: "https://www.youtube.com/embed/DDDDDDD",
        description:
          "Invocatory piece that opens the performance with rhythm and energy.",
      },
      {
        title: "Lesson 2: Jatiswaram",
        video: "https://www.youtube.com/embed/EEEEEEE",
        description:
          "Combines dance and musical notes, showcasing pure rhythm and form.",
      },
      {
        title: "Lesson 3: Varnam",
        video: "https://www.youtube.com/embed/FFFFFFF",
        description:
          "Most elaborate piece merging rhythm and expressive storytelling.",
      },
      {
        title: "Lesson 4: Padam",
        video: "https://www.youtube.com/embed/GGGGGGG",
        description:
          "Interprets poetry through nuanced Abhinaya (expression).",
      },
      {
        title: "Lesson 5: Tillana",
        video: "https://www.youtube.com/embed/HHHHHHH",
        description:
          "Energetic finale that celebrates the joy of dance.",
      },
    ],
  },
  {
    slug: "kathak",
    name: "Kathak",
    category: "classical",
    region: "North India",
    tagline: "Spins and intricate footwork from North India.",
    image: "/images/kathak.png",
    accentColor: "#B42318",
    learnersCount: "10K learners",
    guru: "Lucknow & Jaipur Gharana Tradition",
    editorialTag: "NORTH INDIA",
    duration: "20 min",
    lessons: [
      {
        title: "Introduction",
        video: "https://www.youtube.com/embed/GIh2obii5hs",
        description:
          "Kathak is a classical dance form of North India known for its swift spins and rhythmic footwork, originally performed by traveling storytellers.",
        points: [
          "Blends storytelling with movement",
          "Has Hindu and Mughal influences",
          "Known for fast pirouettes (chakkars)",
        ],
      },
      {
        title: "History",
        video: "https://www.youtube.com/embed/YYYYYYY",
        description:
          "Kathak evolved from ancient temples to royal courts, where it was refined with elegance and drama.",
        points: [
          "Origin in Vedic recitals and devotional performances",
          "Flourished in Mughal courts with Persian aesthetics",
          "Revived in modern India by gharanas (schools)",
        ],
      },
      {
        title: "Features",
        video: "https://www.youtube.com/embed/ZZZZZZZ",
        description: "Distinctive elements of Kathak:",
        points: [
          "Tatkar: Basic footwork patterns",
          "Chakkars: Signature spinning movements",
          "Abhinaya: Facial storytelling and expressions",
          "Layakari: Complex rhythmic variations",
        ],
      },
      {
        title: "Core Lessons",
        video: "https://www.youtube.com/embed/AAAAAAA",
        description: "Essential skills to learn:",
        points: [
          "Foundational steps: Tatkar, Keechad",
          "Rhythmic structures: Kayda, Gat",
          "Advanced expressions: Toda, Tihai",
        ],
        ordered: true,
      },
      {
        title: "Teaching Structure",
        video: "https://www.youtube.com/embed/BBBBBBB",
        description: "Training methodology:",
        points: [
          "Warm-up through Tatkar drills",
          "Footwork synchronization with bols (syllables)",
          "Daily expression training in front of mirrors",
        ],
      },
      {
        title: "Practice & Tips",
        video: "https://www.youtube.com/embed/CCCCCCC",
        description: "Guidance for learners:",
        points: [
          "Practice spins slowly, then increase speed",
          "Use tabla app or metronome for rhythm",
          "Focus more on posture than speed",
        ],
      },
      {
        title: "Lesson 1: Tatkar & Keechad",
        video: "https://www.youtube.com/embed/DDDDDDD",
        description:
          "Learn basic Tatkar (foot beats) and Keechad, essential for balance and rhythm control.",
      },
      {
        title: "Lesson 2: Kayda & Gat",
        video: "https://www.youtube.com/embed/EEEEEEE",
        description:
          "Understand Kayda (rule-based composition) and Gat (story enactment through movement).",
      },
      {
        title: "Lesson 3: Toda & Tihai",
        video: "https://www.youtube.com/embed/FFFFFFF",
        description:
          "Toda is a short rhythmic phrase; Tihai repeats it thrice to land perfectly on the beat.",
      },
      {
        title: "Lesson 4: Chakradhara & Parans",
        video: "https://www.youtube.com/embed/GGGGGGG",
        description:
          "Chakradhara explores chakkars (spins); Parans are rhythm-rich syllable combos from pakhawaj traditions.",
      },
      {
        title: "Lesson 5: Layakari & Paran",
        video: "https://www.youtube.com/embed/HHHHHHH",
        description:
          "Layakari is playing with time. Learn how to vary tempo and rhythm using Paran patterns.",
      },
    ],
  },
  {
    slug: "kuchipudi",
    name: "Kuchipudi",
    category: "classical",
    region: "Andhra Pradesh (South India)",
    tagline:
      "Fast rhythms and dramatic storytelling from Andhra Pradesh.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    learnersCount: "8K learners",
    guru: "Vempati Chinna Satyam Lineage",
    editorialTag: "ANDHRA PRADESH · SOUTH INDIA",
    duration: "22 min",
    lessons: [
      {
        title: "Introduction",
        video: "https://www.youtube.com/embed/xkDz72Lzwzg",
        description:
          "Kuchipudi is a classical dance from Andhra Pradesh known for its dramatic storytelling, dynamic movements, and unique tradition of dancing on a brass plate.",
        points: [
          "Blends Natya (drama) and Nritya (expression)",
          "Often features male and female roles together",
          "Traditionally performed by the Bhagavata Mela community",
        ],
      },
      {
        title: "History",
        video: "https://www.youtube.com/embed/YYYYYYY",
        description:
          "Originated in temple rituals, Kuchipudi transitioned into stage performance over centuries while retaining its devotional roots.",
        points: [
          "Created by Siddhendra Yogi in the 14th century",
          "Popularized as a dance-drama format",
          "Modernized and taught in institutions today",
        ],
      },
      {
        title: "Features",
        video: "https://www.youtube.com/embed/ZZZZZZZ",
        description: "Distinctive characteristics:",
        points: [
          "Expressive storytelling with eye and hand movements",
          "Tarangam: dancing on a brass plate with a pot on the head",
          "Jathis and Adavus for rhythmic training",
        ],
      },
      {
        title: "Core Lessons",
        video: "https://www.youtube.com/embed/AAAAAAA",
        description: "Building blocks of Kuchipudi:",
        points: [
          "Foundations of Kaki Talam (invocation rhythms)",
          "Step combinations with Adavus",
          "Syllable-rich Jathis",
          "Shabdam & Tarangam practices",
        ],
        ordered: true,
      },
      {
        title: "Teaching Structure",
        video: "https://www.youtube.com/embed/BBBBBBB",
        description: "How lessons are structured:",
        points: [
          "Start each session with rhythmic clapping (Talam)",
          "Focus on balance and posture for Tarangam",
          "Express emotion in Padam and Shabdam",
          "Weekly performance review drills",
        ],
      },
      {
        title: "Practice & Tips",
        video: "https://www.youtube.com/embed/CCCCCCC",
        description: "Enhance your practice:",
        points: [
          "Practice on different surfaces to improve balance",
          "Record Shabdam and refine expressions",
          "Maintain stamina with short Tarangam drills",
          "Observe gurus and live performances often",
        ],
      },
      {
        title: "Lesson 1: Kaki Talam",
        video: "https://www.youtube.com/embed/DDDDDDD",
        description:
          "Kaki Talam sets the rhythmic and spiritual tone for every performance. It is the first discipline taught in traditional classes.",
      },
      {
        title: "Lesson 2: Adavus",
        video: "https://www.youtube.com/embed/EEEEEEE",
        description:
          "Adavus are basic steps that combine rhythm, posture, and balance — the foundation of every routine.",
      },
      {
        title: "Lesson 3: Jathis",
        video: "https://www.youtube.com/embed/FFFFFFF",
        description:
          "Jathis are combinations of steps with syllables that teach control, timing, and coordination.",
      },
      {
        title: "Lesson 4: Tarangam",
        video: "https://www.youtube.com/embed/GGGGGGG",
        description:
          "Tarangam showcases balance, rhythm, and dramatic flair as dancers perform on a brass plate with coordinated steps.",
      },
      {
        title: "Lesson 5: Moksham",
        video: "https://www.youtube.com/embed/HHHHHHH",
        description:
          "Moksham is the graceful conclusion of the recital symbolizing spiritual liberation and devotion.",
      },
    ],
  },
  {
    slug: "kathakali",
    name: "Kathakali",
    region: "Kerala (South India)",
    tagline: "Elaborate makeup, storytelling, and martial arts elements.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    editorialTag: "KERALA · SOUTH INDIA",
    category: "classical",
    comingSoon: true,
    lessons: [],
  },
  {
    slug: "manipuri",
    name: "Manipuri",
    region: "Manipur (Northeast India)",
    tagline: "Graceful movements celebrating divine love.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    editorialTag: "MANIPUR · NORTHEAST INDIA",
    category: "classical",
    comingSoon: true,
    lessons: [],
  },
  {
    slug: "mohiniyattam",
    name: "Mohiniyattam",
    region: "Kerala (South India)",
    tagline: "The dance of the enchantress with flowing grace.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    editorialTag: "KERALA · SOUTH INDIA",
    category: "classical",
    comingSoon: true,
    lessons: [],
  },
  {
    slug: "sattriya",
    name: "Sattriya",
    region: "Assam (Northeast India)",
    tagline: "Devotional dance from the monasteries of Assam.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    editorialTag: "ASSAM · NORTHEAST INDIA",
    category: "classical",
    comingSoon: true,
    lessons: [],
  },
  {
    slug: "garba",
    name: "Garba",
    region: "Gujarat (West India)",
    tagline: "Vibrant circles and rhythmic claps of devotion.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    editorialTag: "GUJARAT · WEST INDIA",
    category: "folk",
    comingSoon: true,
    lessons: [],
  },
  {
    slug: "bhangra",
    name: "Bhangra",
    region: "Punjab (North India)",
    tagline: "High-energy harvest celebration.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    editorialTag: "PUNJAB · NORTH INDIA",
    category: "folk",
    comingSoon: true,
    lessons: [],
  },
  {
    slug: "chhau",
    name: "Chhau",
    region: "Jharkhand (East India)",
    tagline: "Martial arts meets masked storytelling.",
    image: "/images/kuchipudi.jpg",
    accentColor: "#B42318",
    editorialTag: "JHARKHAND · EAST INDIA",
    category: "folk",
    comingSoon: true,
    lessons: [],
  }
];

export function getDanceBySlug(slug: string): DanceStyle | undefined {
  return danceStyles.find((d) => d.slug === slug);
}
