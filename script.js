/* NEWS ROTATION */
const news = [
  "✦ Admissions Open 2026–27 ✦",
  "✦ International Curriculum ✦",
  "✦ Elite Faculty & Infrastructure ✦",
  "✦ Legacy of Excellence ✦"
];

let i = 0;
const newsBox = document.getElementById("newsText");

setInterval(() => {
  i = (i + 1) % news.length;
  newsBox.innerText = news[i];
}, 3500);
