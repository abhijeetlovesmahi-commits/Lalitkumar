/* ===== GEM BUTTON GLOW ===== */
const gems = document.querySelectorAll(".gem");

gems.forEach(gem => {
  gem.addEventListener("mouseenter", () => {
    gem.style.boxShadow =
      "0 0 20px gold, 0 0 40px rgba(255,215,0,0.6)";
  });

  gem.addEventListener("mouseleave", () => {
    gem.style.boxShadow =
      "0 10px 25px rgba(0,0,0,0.7)";
  });
});

/* ===== NEWS AUTO ROTATION ===== */
const newsTexts = [
  "✦ Admissions Open 2026–27 ✦",
  "✦ International Curriculum ✦",
  "✦ Elite Faculty & Infrastructure ✦",
  "✦ Legacy of Excellence ✦"
];

let newsIndex = 0;
const newsBar = document.querySelector(".news marquee");

setInterval(() => {
  newsIndex = (newsIndex + 1) % newsTexts.length;
  newsBar.innerText = newsTexts[newsIndex];
}, 3000);

/* ===== MOBILE MENU (future ready) ===== */
function toggleMenu(){
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}
