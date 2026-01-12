
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
    text: "at a party, i usually…",
    options: [
      { text: "talk to many people! i love making new friends", trait: "E" },
      { text: "stick to a few close friends, it makes me feel safer", trait: "I" }
    ]
  },
  {
    text: "if i could build the perfect nest, it would be...",
    options: [
      { text: "sturdy, made of local twigs, and placed in a tried-and-tested location", trait: "S" },
      { text: "a revolutionary design in a place no dinosaur has ever lived before", trait: "N" }
    ]
  },
  {
    text: "when approaching a problem, i...",
    options: [
      { text: "dive in and figure it out as i go", trait: "P" },
      { text: "make a plan first, i'll slowly execute it step by step", trait: "J" }
    ]
  },
  {
    text: "on a typical weekend, i'll rather...",
    options: [
      { text: "have plans with friends or be out doing something fun!", trait: "E" },
      { text: "recharge at home with some alone me time", trait: "I" }
    ]
  },
  {
    text: "i found a mysterious, glowing footprint on the ground, i would...",
    options: [
      { text: "measure the depth and size to identify exactly what made it", trait: "S" },
      { text: "imagine what kind of magical, unknown beast might be at the end of the trail", trait: "N" }
    ]
  },
  {
    text: "when someone shares a problem with me...",
    options: [
      { text: "i try to offer practical solutions and advice", trait: "T" },
      { text: "listen and show empathy, i'm here to validate their feelings", trait: "F" }
    ]
  },
  {
    text: "when learning something new, i like to learn...",
    options: [
      { text: "what's real and what works right now, i like that security", trait: "S" },
      { text: "the possibilities and what could be, it's endless!", trait: "N" }
  ]
  },
  {
    text: "when giving feedback, i am usually...",
    options: [
      { text: "more honest and direct, honesty is the best policy", trait: "T" },
      { text: "more kind and considerate, i choose my words wisely", trait: "F" }
    ]
  },
  {
    text: "my workspace is usually...",
    options: [
      { text: "neat and tidy, i love marie kondo", trait: "J" },
      { text: "it's messy but i have everything i need!", trait: "P" }
    ]
  },
  { 
    text: "during conflict, i tend to…",
    options: [
      { text: "stay calm and focus on the facts", trait: "T" },
      { text: "listen to my emotions and feelings", trait: "F" }
    ]
  },
  {
    text: "when it comes to deadlines, i...",
    options: [
      { text: "deadlines? i've finished it 2 days ago!", trait: "J" },
      { text: "i usually be chasing deadlines..", trait: "P" }
    ]
  },
  {
    text: "a giant meteor shower is lighting up the sky! what do you do?",
    options: [
      { text: "run to the nearest watering hole to discuss it with the herd!", trait: "E" },
      { text: "find a quiet, secluded cave to watch the lights in peace", trait: "I" }
    ]
  }
];

const dinoMap = {
  INT: { name: "velociraptor: strategic mastermind 🧠", 
    image: "Velociraptor.png", 
    desc: "you're a strategic thinker who approaches problems with precision and intelligence. like the velociraptor, you're known for your sharp mind and ability to see patterns others miss. you prefer working independently or in small groups, and you're not afraid to challenge conventional thinking. your analytical nature makes you excellent at solving complex problems, though you might sometimes get lost in your own thoughts.",
    best1: { name: "deinonychus", img: "Deinonychus.match.png" },
    best2: { name: "quetzalcoatlus", img: "Quetzalcoatlus.match.png" },
    worst: { name: "t-rex", img: "Trex.match.png" }
  },
  ENT: { name: "deinonychus: bold innovator 💡", 
    image: "Deinonychus.png", 
    desc: "bold and clever, you're a natural leader who thrives on intellectual challenges. like the deinonychus, you're quick on your feet and enjoy engaging others in debate and strategy. you have a talent for seeing possibilities and aren't afraid to take charge when needed. your energy and innovative thinking inspire those around you, though your directness can sometimes catch people off guard." ,
    best1: { name: "velociraptor", img: "Velociraptor.match.png" },
    best2: { name: "pteranodon", img: "Pteranodon.match.png" },
    worst: { name: "ankylosaurus", img: "Ankylosaurus.match.png" }
  },
  INF: { name: "pteranodon: thoughtful dreamer ✨", 
    image: "Pteranodon.png", 
    desc: "thoughtful and introspective, you soar above the chaos with a unique perspective on life. like the pteranodon, you value depth over breadth and often need time alone to recharge. you're driven by your values and have a rich inner world full of ideas and dreams. your empathy and insight make you a trusted confidant, and you're often thinking about how to make the world a better place." ,
    best1: { name: "quetzalcoatlus", img: "Quetzalcoatlus.match.png" },
    best2: { name: "deinonychus", img: "Deinonychus.match.png" },
    worst: { name: "t-rex", img: "Trex.match.png" }
  },
  ENF: { name: "quetzalcoatlus: inspiring optimist 🌈", 
    image: "Quetzalcoatlus.png",
    desc: "charismatic and enthusiastic, you're the largest flyer in the room—impossible to ignore and full of inspiration. like the quetzalcoatlus, you have a gift for connecting with others and bringing people together around shared ideals. your warmth and creativity light up any space, and you're passionate about helping others reach their potential. you see possibilities everywhere and love exploring new ideas with friends.",
    best1: { name: "pteranodon", img: "Pteranodon.match.png" },
    best2: { name: "velociraptor", img: "Velociraptor.match.png" },
    worst: { name: "ankylosaurus", img: "Ankylosaurus.match.png" }
    },
  ISJ: { name: "ankylosaurus: reliable guardian 🏰", 
    image: "Ankylosaurus.png", 
    desc: "steady and reliable, you're the armor-plated defender people can count on. like the ankylosaurus, you value tradition, responsibility, and taking care of the details others overlook. you're protective of those you care about and take your commitments seriously. your practical approach and strong memory make you an anchor in any group, though you prefer operating behind the scenes rather than in the spotlight.",
    best1: { name: "triceratops", img: "Triceratops.match.png" },
    best2: { name: "dilophosaurus", img: "Dilophosaurus.match.png" },
    worst: { name: "deinonychus", img: "Deinonychus.match.png" }
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
    worst: { name: "quetzalcoatlus", img: "Quetzalcoatlus.match.png" }
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