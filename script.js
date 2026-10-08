// ===== PENGATURAN YANG BOLEH KAMU GANTI =====
const MY_NAME = "Mayana Shaqifa Riskina";   // <-- ganti dengan namamu

// Isi surat di halaman penutup (satu baris = satu paragraf, pakai <br> untuk baris baru)
const CLOSING_PARAGRAPHS = [
  "Terima kasih sudah menjadi bagian dari cerita kecil dalam hidupku.",
  "Mungkin website ini sederhana.<br>Mungkin isinya hanya foto-foto kecil dan beberapa kalimat.",
  "Tapi di balik setiap foto ada sebuah kenangan.<br>Di balik setiap kalimat ada sesuatu yang ingin aku sampaikan.",
  "Aku tidak tahu akan sejauh apa cerita kita berjalan.",
  "Tapi selama masih ada halaman yang bisa ditulis,<br>aku ingin terus menulis cerita itu bersamamu.",
  "Terima kasih sudah hadir.<br>Terima kasih sudah bertahan.<br>Terima kasih sudah menjadi kamu.",
  "Dan kalau suatu hari nanti kita melihat kembali scrapbook ini,<br>semoga kita bisa tersenyum dan berkata...",
  "<em>'Kita pernah sebahagia ini.'</em>"
];

// Data halaman scrapbook: judul + quotes (foto otomatis: images/pageN-1.jpg, -2, -3)
const PAGES = [
  ["First Date", "Saat itu kita masih canggung-canggungnya ya,dan kalau kamu ingat aku hampir nangis di pundakmu wkwk kenangan yang indah karena kamu telah menjadi First Date-ku & First Experience-ku."],
  ["This is the second date.", "Ini kita ketika sedang di batu di bumiaji kalau nggak salah, wkwk", "Aku senang bisa menghabiskan waktu bersamamu, walaupun hanya sebentar."],
  ["This is the third date.", "Lagi-lagi masih di bumiaji tapi itu posisi aku lagi gundul wkwk dan ketika itu juga kita mulai udah ngga cangung lagi."],
  ["This is the fourth date.", "Ketika itu kamu lagi nginep dirumah temenmu dan kita main ke Turen, wkwk pertama kalinya kita main di deket rumahku."],
  ["Arthava Graduation.", "Ini adalah waktu dimana kita wisuda kelulusan,Moment terakhir kita di Athava."],
  ["A date in Kayutangan", "Kita double date dan nonton di mall Dinoyo dan kita bingung mau kemana lagi ujung-ujungnya kita ke Kayutangan."],
  ["dating on arthava's anniversary", "Waktu dimana ada acara bersama dan kita diam-diam ngga saling sapa wkwk."],
  ["Going on a date while resolving issues", "Waktu kita ke caffe lagi dan klarifikasi masalah sebelumnya lucunya lagi kita curi-curi pandang dan malah na fokus sama apa yang mau di bahas."],
  ["Spicy noodle dates", "Kamu nunggu lama di tempat yang ingin kita tuju, wkwk kalau di ingat juga kasihan karena kamu nunggu di depan sendiri gara-gara aku."],
  ["Sunday date", "Ya ini tempat menjadi tempat yang sering kita datangi karena tengah-tengah dari jarak yang kita tempuh."],
  ["Second Kayutangan date", "Kalau ngga salah kamu cari waktu buat alasan ke ortumu dan waktu itu kamu sama temen-temen habis acara langsug kita kencan di situ juga wkwk."],
  ["A date at Dinoyo Mall", "Kita lagi nonton film di mall Dinoyo dan moment paling apes beli nasgor seharga 15k yang kureng hadehhh."],
  ["Another Sunday date.", "Ya Subday lagi yang kita datengin wkwk, itu moment epic sih bagi aku karena waktu itu aku dikasih hadiah sama My princesss."],
  ["A Sunday date and eating duck at a restaurant.", "Sunday lagi, tapi kali ini berbeda karena aku yang ngasih hadiah ke kamu dan ketika malem kita keluarbareng cari makan sehabis kamu nganterin temenmu ke Lawang."],
  ["PlayStation date", "Kita main PlayStation bersama dan kita bingung mau main apa terus kita nonton netflix sepulang dari situ kita mampir dulu cari makan dan berputar-putar di suhat mencari jalan pulang."],
  ["Unlock date", "Tanpa aba apa-apa kita langsung ndadak dan bingung satu sama lain hampir ngga jadi tapi tetap kejadian lucu ya KANGEN."],
];
const DOODLES = ["♡", "✿", "🌸", "♡", "✿"]; // dekorasi kecil, bergantian
const TOTAL = PAGES.length;
let current = 0; // halaman aktif (0 = Page 01)

// ===== Ambil elemen =====
const $ = (id) => document.getElementById(id);
const screens = { landing: $("landing"), book: $("book"), closing: $("closing") };

// Fungsi menampilkan satu layar (landing / book / closing)
function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo(0, 0);
}

// Fungsi menampilkan halaman scrapbook (direction: "next" atau "prev")
function renderPage(direction) {
  const [title, quote] = PAGES[current];
  const n = current + 1;
  const num = String(n).padStart(2, "0");

  let photos = "";

  const jumlahFoto =
    n === 3 ? 1 :
    n === 4 || n === 5 ? 2 :
    n === 8 || n === 9 ? 2 :
    3;

  for (let i = 1; i <= jumlahFoto; i++) {
    photos += `<div class="photo">
      <img src="images/page${n}-${i}.png"
           alt="Foto ${i} halaman ${n}"
           onerror="this.removeAttribute('src')">
    </div>`;
  }

  // kode berikutnya...

  const pageEl = $("page");
  pageEl.innerHTML = `
    <div class="page-no">PAGE ${num}</div>
    <h2>${title}</h2>
    <div class="photos">${photos}</div>
    <p class="quote">"${quote}"</p>
    <div class="doodle">${DOODLES[current % DOODLES.length]}</div>`;
  // Jalankan ulang animasi perpindahan halaman
  pageEl.className = "page";
  void pageEl.offsetWidth;
  pageEl.classList.add(direction === "prev" ? "in-prev" : "in-next");

  $("counter").textContent = `Page ${num} / ${TOTAL}`;
  $("prevBtn").style.visibility = current === 0 ? "hidden" : "visible";
  $("nextBtn").textContent = current === TOTAL - 1 ? "Continue ♡" : "Next →";
}

// Fungsi pindah halaman
function nextPage() {
  if (current === TOTAL - 1) { showScreen("closing"); return; } // halaman terakhir -> penutup
  current++;
  renderPage("next");
}
function prevPage() {
  if (current === 0) return;
  current--;
  renderPage("prev");
}

// ===== Halaman penutup =====
$("closingText").innerHTML =
  CLOSING_PARAGRAPHS.map((p) => `<p>${p}</p>`).join("") +
  `<p class="sign">With love,<br>${MY_NAME}<br>♡</p>`;

// ===== Tombol-tombol =====
$("openBtn").addEventListener("click", () => { current = 0; renderPage("next"); showScreen("book"); });
$("nextBtn").addEventListener("click", nextPage);
$("prevBtn").addEventListener("click", prevPage);
$("homeBtn").addEventListener("click", () => showScreen("landing"));
$("againBtn").addEventListener("click", () => { current = 0; renderPage("next"); showScreen("book"); });

// Navigasi pakai keyboard (laptop)
document.addEventListener("keydown", (e) => {
  if (!screens.book.classList.contains("active")) return;
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage();
});

// ===== Musik (tidak autoplay; mulai saat tombol ditekan) =====
const music = $("music");
const musicBtn = $("musicBtn");
function toggleMusic() {
  if (music.paused) {
    music.play().then(() => { musicBtn.classList.add("on"); musicBtn.textContent = "♪ Music on"; })
      .catch(() => alert("File musik belum ditemukan: music/nadif-sound.mp3"));
  } else {
    music.pause();
    musicBtn.classList.remove("on");
    musicBtn.textContent = "♪ Music";
  }
}
musicBtn.addEventListener("click", toggleMusic);
