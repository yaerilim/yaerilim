const cute = ["💖", "🌸", "✨", "🎀", "💕", "🍓", "⭐", "🩷", "🧁"];
const pick = () => cute[Math.floor(Math.random() * cute.length)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// gently floating hearts in the background
const floaties = document.getElementById("floaties");
function spawnFloaty() {
  const el = document.createElement("span");
  el.className = "floaty";
  el.textContent = pick();
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = 16 + Math.random() * 26 + "px";
  el.style.animationDuration = 7 + Math.random() * 7 + "s";
  el.style.setProperty("--spin", (Math.random() * 120 - 60) + "deg");
  el.addEventListener("animationend", () => el.remove());
  floaties.appendChild(el);
}
if (!reduced) {
  for (let i = 0; i < 6; i++) setTimeout(spawnFloaty, i * 500);
  setInterval(spawnFloaty, 900);
}

// sparkle burst wherever you click / tap
function burst(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "burst";
    el.textContent = pick();
    el.style.left = x - 12 + "px";
    el.style.top = y - 12 + "px";
    const angle = (Math.PI * 2 * i) / count;
    const dist = 60 + Math.random() * 70;
    el.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    el.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    el.addEventListener("animationend", () => el.remove());
    document.body.appendChild(el);
  }
}
document.addEventListener("pointerdown", (e) => burst(e.clientX, e.clientY, 8));

// the button: a big heart shower + a rotating cute message
const btn = document.getElementById("sparkle");
const messages = ["yay! ♡", "again! ✨", "so cute 🎀", "hehe 🌸", "click me ♡"];
let n = 0;
btn.addEventListener("click", () => {
  const r = btn.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 16);
  if (!reduced) for (let i = 0; i < 12; i++) setTimeout(spawnFloaty, i * 60);
  btn.textContent = messages[n++ % messages.length];
});
