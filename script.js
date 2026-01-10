function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
  });

  document.getElementById(pageId).classList.remove("hidden");
}

// Start button logic
document.getElementById("start-btn").onclick = () => {
  showPage("quiz-page");
};

// Restart button logic
document.getElementById("restart-btn").onclick = () => {
  showPage("start-page");
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
    text: "i prefer to focus on…",
    options: [
      { text: "real-world details, it's more realistic!", trait: "S" },
      { text: "big ideas, go big or go home", trait: "N" }
    ]
  },
  {
    text: "when making decisions, i would usually…",
    options: [
      { text: "follow logic and rules, rules are meant to be followed", trait: "T" },
      { text: "follow feelings and values, listen to my heart", trait: "F" }
    ]
  },
  {
    text: "i like to have things…",
    options: [
      { text: "planned and organized, got my planner with me always", trait: "J" },
      { text: "flexible and spontaneous, life is not that deep!", trait: "P" }
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
  text: "when someone shares a problem with me...",
  options: [
    { text: "i try to offer practical solutions and advice", trait: "T" },
    { text: "listen and show empathy, i'm here to validate their feelings", trait: "F" }
  ]
},
{
  text: "i feel comfort in knowing...",
  options: [
    { text: "what's real and what works right now, i like that security", trait: "S" },
    { text: "possibilities and what could be, it's endless!", trait: "N" }
  ]
}
];

let currentQuestion = 0;

let scores = {
  E: 0, I: 0,
  S: 0, N: 0,
  T: 0, F: 0,
  J: 0, P: 0
};

const dinoMap = {
  INT: { name: "velociraptor: strategic mastermind 🧠", image: "Velociraptor.png", desc: "you're a strategic thinker who approaches problems with precision and intelligence. like the velociraptor, you're known for your sharp mind and ability to see patterns others miss. you prefer working independently or in small groups, and you're not afraid to challenge conventional thinking. your analytical nature makes you excellent at solving complex problems, though you might sometimes get lost in your own thoughts." },
  ENT: { name: "deinonychus: bold innovator 💡", image: "Deinonychus.png", desc: "bold and clever, you're a natural leader who thrives on intellectual challenges. like the deinonychus, you're quick on your feet and enjoy engaging others in debate and strategy. you have a talent for seeing possibilities and aren't afraid to take charge when needed. your energy and innovative thinking inspire those around you, though your directness can sometimes catch people off guard." },
  INF: { name: "pteranodon: thoughtful dreamer ✨", image: "Pteranodon.png", desc: "thoughtful and introspective, you soar above the chaos with a unique perspective on life. like the pteranodon, you value depth over breadth and often need time alone to recharge. you're driven by your values and have a rich inner world full of ideas and dreams. your empathy and insight make you a trusted confidant, and you're often thinking about how to make the world a better place." },
  ENF: { name: "quetzalcoatlus: inspiring optimist 🌈", image: "Quetzalcoatlus.png", desc: "charismatic and enthusiastic, you're the largest flyer in the room—impossible to ignore and full of inspiration. like the quetzalcoatlus, you have a gift for connecting with others and bringing people together around shared ideals. your warmth and creativity light up any space, and you're passionate about helping others reach their potential. you see possibilities everywhere and love exploring new ideas with friends." },
  ISJ: { name: "ankylosaurus: reliable guardian 🏰", image: "Ankylosaurus.png", desc: "steady and reliable, you're the armor-plated defender people can count on. like the ankylosaurus, you value tradition, responsibility, and taking care of the details others overlook. you're protective of those you care about and take your commitments seriously. your practical approach and strong memory make you an anchor in any group, though you prefer operating behind the scenes rather than in the spotlight." },
  ESJ: { name: "triceratops: steadfast leader 👑", image: "Triceratops.png", desc: "strong and dependable, you're a pillar of your community who takes charge when things need organizing. like the triceratops, you're not easily intimidated and will stand your ground to protect what matters. you value order, loyalty, and getting things done right. your practical leadership and dedication to helping others make you someone people naturally turn to, and you take pride in creating stability for those around you." },
  ISP: { name: "dilophosaurus: creative free-spirit 🦋", image: "Dilophosaurus.png", desc: "independent and adaptable, you're full of surprises beneath a quiet exterior. like the dilophosaurus, you're resourceful and prefer to observe before acting. you live in the moment and have a talent for hands-on problem-solving. whether you're creating something beautiful or fixing something broken, you value your freedom and like to do things your own way without too much fuss." },
  ESP: { name: "t-rex: adventurous showstopper ⚡", image: "Trex.png", desc: "bold and energetic, you're the life of the party who lives for excitement and action. like the t-rex, you have a commanding presence and aren't afraid to go after what you want. you're spontaneous, practical, and excellent at reading the room. your enthusiasm is contagious, and you have a gift for making even ordinary moments feel like an adventure. you prefer doing to planning and thrive when you're in the thick of things." }
};


function loadQuestion() {
  const q = questions[currentQuestion];

  // Update question text
  document.getElementById("question-text").textContent = q.text;

  // Clear previous buttons
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // Add buttons for each answer
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;

    btn.onclick = () => {
      selectAnswer(option.trait);
    };

    answersDiv.appendChild(btn);
  });

  // Update progress
  document.getElementById("progress").textContent =
    `${currentQuestion + 1} / ${questions.length}`;
}

function selectAnswer(trait) {
  // Increase score for selected trait
  scores[trait]++;

  // Move to next question
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    // Quiz finished, show result
    showResult();
  }
}

document.getElementById("start-btn").onclick = () => {
  currentQuestion = 0;          // reset in case of restart
  loadQuestion();               // show first question
  showPage("quiz-page");        // switch page
};

function getDinoGroup() {
  const IE = scores.E >= scores.I ? "E" : "I";
  const SN = scores.S >= scores.N ? "S" : "N";
  const TF = scores.T >= scores.F ? "T" : "F";
  const JP = scores.J >= scores.P ? "J" : "P";

  // Map introvert/extravert + personality type to 8 dinos
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

  showPage("result-page");
}


