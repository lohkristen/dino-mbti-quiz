
let currentQuestion = 0;
let answerHistory = [];
let scores = {
  E: 0, I: 0,
  S: 0, N: 0,
  T: 0, F: 0,
  J: 0, P: 0
};

// Quiz questions
const questions = [
  {
    text: "you've just discovered a hidden prehistoric valley! what's your first reaction?",
    options: [
      { text: "rush in to explore every corner immediately", trait: "E" },
      { text: "observe from a distance and plan your route carefully", trait: "I" }
    ]
  },
  {
    text: "you spot some unusual footprints in the mud. what catches your attention?",
    options: [
      { text: "the specific size, depth, and number of toes", trait: "S" },
      { text: "wonder what kind of creature made them and where it might be going", trait: "N" }
    ]
  },
  {
    text: "A friendly dinosaur approaches! how do you want to spend time together?",
    options: [
      { text: "find a group of dinosaurs for a valley-wide adventure", trait: "E" },
      { text: "hang out quietly, just the two of you by the river", trait: "I" }
    ]
  },
  {
    text: "your new dino friend seems a bit down. what do you do?",
    options: [
      { text: "try to understand what they're feeling and comfort them", trait: "F" },
      { text: "help them figure out what's causing the problem logically", trait: "T" }
    ]
  },
  {
    text: "you find an ancient dinosaur map. what interests you most?",
    options: [
      { text: "the landmarks and current paths you can use now!", trait: "S" },
      { text: "the mysteries it hints at and legends behind it", trait: "N" }
    ]
  },
  {
    text: "time to build a nest! what's your approach?",
    options: [
      { text: "gather materials first, then decide as you go", trait: "P" },
      { text: "sketch a plan and organize everything before starting", trait: "J" }
    ]
  },
  {
    text: "your group of dinosaurs disagrees about which way to go. how do you help?",
    options: [
      { text: "consider how each choice affects everyone's feelings", trait: "F" },
      { text: "weigh the practical pros and cons of each route", trait: "T" }
  ]
  },
  {
    text: "a sudden rainstorm hits! what's your reaction?",
    options: [
      { text: "adapt and make the best of it, maybe splash around", trait: "P" },
      { text: "you're glad you prepared a shelter earlier ", trait: "J" }
    ]
  },
  {
    text: "you've got free time in the valley. what sounds best?",
    options: [
      { text: "joining whatever the other dinosaurs are up to", trait: "E" },
      { text: "finding a cozy spot to relax on your own", trait: "I" }
    ]
  },
  {
    text: "you're describing the valley to a dinosaur who's never been. you focus on:",
    options: [
      { text: "the actual sights, sounds, and details you experienced", trait: "S" },
      { text: "the overall vibe and what it all means to you", trait: "N" }
    ]
  },
  { 
    text: "the dinosaurs are planning tomorrow's activities. you prefer to:",
    options: [
      { text: "decide now so everyone knows the plan ", trait: "J" },
      { text: "keep options open and see how you feel tomorrow", trait: "P" }
    ]
  },
  {
    text: "as the sun sets, you think about your day. What matters most?",
    options: [
      { text: "whether the choices today felt right in your heart", trait: "F" },
      { text: "Whether your decisions made logical sense ", trait: "T" }
    ]
  },
];

const dinoMap = {
  INT: { name: "velociraptor: strategic mastermind 🧠", 
    image: "Velociraptor.png", 
    desc: "you're a strategic thinker who approaches problems with precision and intelligence. like the velociraptor, you're known for your sharp mind and ability to see patterns others miss. you prefer working independently or in small groups, and you're not afraid to challenge conventional thinking. your analytical nature makes you excellent at solving complex problems, though you might sometimes get lost in your own thoughts.",
    best1: { name: "utahraptor", img: "Utahraptor.match.png" },
    best2: { name: "stegosaurus", img: "Stegosaurus.match.png" },
    worst: { name: "t-rex", img: "Trex.match.png" }
  },
  ENT: { name: "utahraptor: bold innovator 💡", 
    image: "Utahraptor.png", 
    desc: "bold and clever, you're a natural leader who thrives on intellectual challenges. like the utahraptor, you're quick on your feet and enjoy engaging others in debate and strategy. you have a talent for seeing possibilities and aren't afraid to take charge when needed. your energy and innovative thinking inspire those around you, though your directness can sometimes catch people off guard." ,
    best1: { name: "velociraptor", img: "Velociraptor.match.png" },
    best2: { name: "pteranodon", img: "Pteranodon.match.png" },
    worst: { name: "ankylosaurus", img: "Ankylosaurus.match.png" }
  },
  INF: { name: "pteranodon: thoughtful dreamer ✨", 
    image: "Pteranodon.png", 
    desc: "thoughtful and introspective, you soar above the chaos with a unique perspective on life. like the pteranodon, you value depth over breadth and often need time alone to recharge. you're driven by your values and have a rich inner world full of ideas and dreams. your empathy and insight make you a trusted confidant, and you're often thinking about how to make the world a better place." ,
    best1: { name: "stegosaurus", img: "Stegosaurus.match.png" },
    best2: { name: "utahraptor", img: "Utahraptor.match.png" },
    worst: { name: "t-rex", img: "Trex.match.png" }
  },
  ENF: { name: "stegosaurus: inspiring optimist 🌈", 
    image: "Stegosaurus.png",
    desc: "charismatic and enthusiastic, you're the gentle giant of the room, impossible to ignore and full of inspiration. like the stegosaurus, you have a gift for connecting with others and bringing people together around shared ideals. your warmth and creativity light up any space, and you're passionate about helping others reach their potential. you see possibilities everywhere and love exploring new ideas with friends.",
    best1: { name: "pteranodon", img: "Pteranodon.match.png" },
    best2: { name: "velociraptor", img: "Velociraptor.match.png" },
    worst: { name: "ankylosaurus", img: "Ankylosaurus.match.png" }
    },
  ISJ: { name: "ankylosaurus: reliable guardian 🏰", 
    image: "Ankylosaurus.png", 
    desc: "steady and reliable, you're the armor-plated defender people can count on. like the ankylosaurus, you value tradition, responsibility, and taking care of the details others overlook. you're protective of those you care about and take your commitments seriously. your practical approach and strong memory make you an anchor in any group, though you prefer operating behind the scenes rather than in the spotlight.",
    best1: { name: "triceratops", img: "Triceratops.match.png" },
    best2: { name: "dilophosaurus", img: "Dilophosaurus.match.png" },
    worst: { name: "utahraptor", img: "Utahraptor.match.png" }
  },
  ESJ: { name: "triceratops: steadfast leader 👑", 
    image: "Triceratops.png", 
    desc: "strong and dependable, you're a pillar of your community who takes charge when things need organizing. like the triceratops, you're not easily intimidated and will stand your ground to protect what matters. you value order, loyalty, and getting things done right. your practical leadership and dedication to helping others make you someone people naturally turn to, and you take pride in creating stability for those around you.",
    best1: { name: "ankylosaurus", img: "Ankylosaurus.match.png" },
    best2: { name: "t-rex", img: "Trex.match.png" },
    worst: { name: "pteranodon", img: "Pteranodon.match.png" }
  },
  ISP: { name: "dilophosaurus: creative free-spirit 🦋", 
    image: "Dilophosaurus.png", 
    desc: "independent and adaptable, you're full of surprises beneath a quiet exterior. like the dilophosaurus, you're resourceful and prefer to observe before acting. you live in the moment and have a talent for hands-on problem-solving. whether you're creating something beautiful or fixing something broken, you value your freedom and like to do things your own way without too much fuss.",
    best1: { name: "t-rex", img: "Trex.match.png" },
    best2: { name: "ankylosaurus", img: "Ankylosaurus.match.png" },
    worst: { name: "stegosaurus", img: "Stegosaurus.match.png" }
  },
  ESP: { name: "t-rex: adventurous showstopper ⚡", 
    image: "Trex.png", 
    desc: "bold and energetic, you're the life of the party who lives for excitement and action. like the t-rex, you have a commanding presence and aren't afraid to go after what you want. you're spontaneous, practical, and excellent at reading the room. your enthusiasm is contagious, and you have a gift for making even ordinary moments feel like an adventure. you prefer doing to planning and thrive when you're in the thick of things.",
    best1: { name: "dilophosaurus", img: "Dilophosaurus.match.png" },
    best2: { name: "triceratops", img: "Triceratops.match.png" },
    worst: { name: "velociraptor", img: "Velociraptor.match.png" }
  }
};

/* core functions */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
  });
  const target = document.getElementById(pageId);
  if (target) target.classList.remove("hidden");
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.text;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.onclick = () => selectAnswer(option.trait);
    answersDiv.appendChild(btn);
  });

  document.getElementById("progress").textContent = `${currentQuestion + 1} / ${questions.length}`;
}

function selectAnswer(trait) {
  // Save the trait to history before adding to score
  answerHistory.push(trait);
  
  scores[trait]++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (currentQuestion > 0) {
    // 1. Get the last trait picked
    const lastTrait = answerHistory.pop();
    // 2. Subtract it from the scores
    scores[lastTrait]--;
    // 3. Move the question index back
    currentQuestion--;
    // 4. Reload the page
    loadQuestion();
  }
}

// Attach the function to the button inside your DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", () => {
  // ... your other button logic ...
  
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.onclick = goBack;
  }
});

function getDinoGroup() {
  const IE = scores.E >= scores.I ? "E" : "I";
  const SN = scores.S >= scores.N ? "S" : "N";
  const TF = scores.T >= scores.F ? "T" : "F";
  const JP = scores.J >= scores.P ? "J" : "P";

  if (SN === "N" && TF === "T") return IE + "NT";
  if (SN === "N" && TF === "F") return IE + "NF";
  if (SN === "S" && JP === "J") return IE + "SJ";
  return IE + "SP";
}

function showResult() {
  const group = getDinoGroup();
  const dino = dinoMap[group];

  document.getElementById("dino-name").textContent = dino.name;
  document.getElementById("dino-desc").textContent = dino.desc;
  document.getElementById("dino-img").src = "images/" + dino.image;

  // Compatibility section based on your sketch
  document.getElementById("best-img-1").src = "images/" + dino.best1.img;
  document.getElementById("best-name-1").textContent = dino.best1.name;
  document.getElementById("best-img-2").src = "images/" + dino.best2.img;
  document.getElementById("best-name-2").textContent = dino.best2.name;
  document.getElementById("worst-img").src = "images/" + dino.worst.img;
  document.getElementById("worst-name").textContent = dino.worst.name;

  showPage("result-page");
}

// 3. INITIALIZATION (Wait for the HTML to load)
document.addEventListener("DOMContentLoaded", () => {
  // --- Start Button Logic ---
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.onclick = () => {
      currentQuestion = 0;
      answerHistory = []; // Reset history for a new game
      for (let trait in scores) { scores[trait] = 0; }
      loadQuestion();
      showPage("quiz-page");
    };
  }

  // --- Restart Button Logic ---
  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.onclick = () => {
      showPage("start-page");
    };
  }

  // --- Back Button Logic ---
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.onclick = goBack;
  }
});