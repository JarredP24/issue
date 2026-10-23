
const nextButton = document.getElementById("nextButton");
const intro = document.getElementById("intro");
const reveal = document.getElementById("reveal");
const phrase = document.getElementById("phrase");
const letter = document.getElementById("letter");
const message = document.getElementById("message");
const signoff = document.getElementById("signoff");
const signature = document.getElementById("signature");
const music = document.getElementById("bgMusic");

let clickStep = 0;
let animationStarted = false;

const labels = [
  "oops, one more",
  "oops, one more i apologize.",
  "oops, last one"
];

const apology = `I'm really sorry that I've been feeling overstimulated and overwhelmed with my workload lately.

Sometimes, when everything starts piling up, I get worked up easily. I can become frustrated, overthink things, and struggle to process what I'm feeling. There are times when my emotions get the better of me, and I don't communicate as calmly or clearly as I should. I know that this can affect the way I talk to you and make you feel, and I'm genuinely sorry for that.

I don't want my stress or frustration to become something you have to bear, especially when you deserve patience, understanding, and kindness from me. Being overwhelmed might explain why I react the way I do sometimes, but it doesn't excuse hurting you or making you feel like your feelings aren't being heard.

I'm still learning how to handle myself better when I get worked up. I want to learn to pause, understand what I'm feeling, and communicate with you instead of letting my emotions speak for me. I want to be someone who can listen to you even when I'm struggling, rather than someone who lets a difficult day affect the way I treat you.`;

// Randomly move the button within the visible screen
function teleportButton() {
  const margin = 15;

  const maxX = Math.max(
    margin,
    window.innerWidth - nextButton.offsetWidth - margin
  );

  const maxY = Math.max(
    margin,
    window.innerHeight - nextButton.offsetHeight - margin
  );

  const x = margin + Math.random() * (maxX - margin);
  const y = margin + Math.random() * (maxY - margin);

  nextButton.style.left = `${x}px`;
  nextButton.style.top = `${y}px`;
  nextButton.style.transform = "none";
}

nextButton.addEventListener("click", () => {
  if (animationStarted) return;

  clickStep++;

  if (clickStep < 4) {
    nextButton.textContent =
      clickStep === 1 ? labels[0] :
      clickStep === 2 ? labels[1] :
      labels[2];

    teleportButton();
    return;
  }

  // The next click reveals the message
  animationStarted = true;
nextButton.hidden = true;
intro.hidden = true;
reveal.hidden = false;

// Start music on the final click
music.volume = 0.4;
music.play().catch(error => {
  console.log("Music could not start:", error);
});

startTypewriterSequence();
});

const sleep = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

async function typeText(element, text, speed) {
  for (const character of text) {
    element.textContent += character;
    await sleep(speed);
  }
}

async function eraseText(element, speed) {
  while (element.textContent.length > 0) {
    element.textContent = element.textContent.slice(0, -1);
    await sleep(speed);
  }
}

async function startTypewriterSequence() {
  const phrases = [
    "i wrote this",
    "really for you",
    "i hope my message",
    "really gets to you",
    "i love you, maye"
  ];

  for (const text of phrases) {
    await typeText(phrase, text, 90);
    await sleep(800);
    await eraseText(phrase, 40);
    await sleep(250);
  }

  phrase.hidden = true;
  letter.hidden = false;

  await typeText(message, apology, 25);

  signoff.hidden = false;
  await sleep(400);

  signature.hidden = false;
}

// Optional background music
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "Pause music";
    } catch {
      musicButton.textContent = "Music unavailable";
    }
  } else {
    music.pause();
    musicButton.textContent = "Play music";
  }
});
