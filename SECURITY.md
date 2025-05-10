# Security Policy

## 📦 Project: money-meter

Repositori ini adalah proyek aplikasi pencatatan transaksi yang menggunakan React.js untuk frontend, Spring Boot untuk backend, dan PostgreSQL sebagai basis data. Proyek ini bersifat open-source dan menerima kontribusi dari komunitas.

---

## 📢 Melaporkan Kerentanan

Jika Anda menemukan kerentanan keamanan dalam proyek ini, mohon untuk tidak membuat isu publik. Sebagai gantinya, silakan ikuti langkah-langkah berikut:

1. Kirim email ke **galaxybuilder.oss@gmail.com** dengan subjek: `[SECURITY] Laporan Kerentanan money-meter`.
2. Sertakan informasi berikut dalam email Anda:
   - Deskripsi rinci tentang kerentanan yang ditemukan.
   - Langkah-langkah untuk mereproduksi masalah tersebut.
   - Bukti konsep (jika memungkinkan).
   - Informasi sistem dan lingkungan yang relevan.

Kami berkomitmen untuk menanggapi laporan keamanan dalam waktu **72 jam** dan, jika diperlukan, merilis perbaikan dalam waktu **7 hari kerja**.

---

## 🔐 Praktik Keamanan

Kami menerapkan praktik keamanan berikut dalam pengembangan proyek ini:

- **Validasi Input**: Semua input yang diterima oleh aplikasi divalidasi untuk mencegah eksekusi kode berbahaya.
- **Manajemen Dependensi**: Dependensi pihak ketiga diperiksa secara berkala untuk memastikan tidak ada kerentanan yang diketahui.
- **Isolasi Lingkungan**: Disarankan untuk menjalankan proyek ini dalam lingkungan yang terisolasi untuk mencegah konflik dependensi dan meningkatkan keamanan.
- **Keamanan API**: Endpoint API diamankan menggunakan autentikasi dan otorisasi yang sesuai.

---

## 🧪 Pengujian Keamanan

Kami mendorong kontributor untuk menambahkan pengujian yang mencakup skenario keamanan, termasuk:

- Pengujian terhadap input yang tidak valid atau berbahaya.
- Pengujian terhadap batasan dan batas maksimum/minimum input.
- Pengujian terhadap potensi kondisi balapan atau konflik sumber daya.

---

## 🤝 Kontribusi Aman

Jika Anda ingin berkontribusi pada proyek ini, harap perhatikan hal-hal berikut:

- Jangan menyertakan informasi sensitif dalam kode atau dokumentasi.
- Pastikan semua dependensi baru yang ditambahkan bebas dari kerentanan yang diketahui.
- Ikuti pedoman pengkodean yang telah ditetapkan untuk menjaga konsistensi dan keamanan kode.

---

## 🛠️ Kebijakan Patch Keamanan

Setiap patch yang berkaitan dengan keamanan akan:

- Diberi label `security` dalam sistem pelacakan isu.
- Dirilis sebagai versi patch (misalnya, `v1.0.1`).
- Didokumentasikan secara rinci dalam catatan rilis.

---

## 📅 Audit Keamanan

Audit keamanan dilakukan secara berkala, terutama ketika:

- Menambahkan dependensi baru.
- Melakukan perubahan signifikan pada kode.
- Sebelum merilis versi baru.

---

Kami menghargai partisipasi Anda dalam menjaga keamanan proyek ini. Terima kasih atas kontribusi dan dukungan Anda!

