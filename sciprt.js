
/* =========================================
   1. NAVIGASI HALAMAN
========================================= */

function pindahHalaman(namaHalaman) {
    const halaman = document.querySelectorAll(".page");
    const halamanTujuan = document.getElementById(namaHalaman);

    if (!halamanTujuan) {
        console.error("Halaman tidak ditemukan:", namaHalaman);
        return;
    }

    halaman.forEach(page => {
        page.classList.remove("active");
    });

    halamanTujuan.classList.add("active");

    const tombolNavigasi = document.querySelectorAll(".nav-link");

    tombolNavigasi.forEach(tombol => {
        tombol.classList.remove("active");

        const aksi = tombol.getAttribute("onclick");

        if (aksi && aksi.includes("'" + namaHalaman + "'")) {
            tombol.classList.add("active");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   2. PENGATURAN MATA UANG
========================================= */

const localeMataUang = {
    IDR: "id-ID",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    JPY: "ja-JP",
    KRW: "ko-KR",
    SGD: "en-SG",
    AUD: "en-AU",
    CAD: "en-CA",
    CHF: "de-CH",
    CNY: "zh-CN"
};


// Mengambil mata uang yang dipilih
function ambilMataUang() {
    const pilihan = document.getElementById("mataUang");

    return pilihan ? pilihan.value : "IDR";
}


// Mengambil mode tampilan angka
function ambilModePembulatan() {
    const pilihan = document.querySelector(
        'input[name="modePembulatan"]:checked'
    );

    return pilihan ? pilihan.value : "presisi";
}


// Mengambil jenis pembulatan
function ambilJenisPembulatan() {
    const pilihan = document.querySelector(
        'input[name="jenisPembulatan"]:checked'
    );

    return pilihan ? pilihan.value : "satuan";
}


/* =========================================
   3. FORMAT ANGKA DAN MATA UANG
========================================= */

function formatMataUang(angka, mataUang = ambilMataUang()) {

    if (!Number.isFinite(angka)) {
        return "-";
    }

    const mode = ambilModePembulatan();

    let nilai = angka;
    let digitDesimal = 2;

    // MODE PEMBULATAN
    if (mode === "bulat") {

        const jenis = ambilJenisPembulatan();

        if (jenis === "ribuan") {

            // Pembulatan ke ribuan terdekat
            nilai = Math.round(angka / 1000) * 1000;

        } else if (jenis === "satuan") {

            // Pembulatan ke satuan terdekat
            nilai = Math.round(angka);

        }

        digitDesimal = 0;
    }

    const locale = localeMataUang[mataUang] || "id-ID";

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: mataUang,
        minimumFractionDigits: digitDesimal,
        maximumFractionDigits: digitDesimal
    }).format(nilai);
}


// Menjaga kompatibilitas dengan fungsi format lama
function formatRupiah(angka) {
    return formatMataUang(angka);
}


/* =========================================
   4. UPDATE LABEL MATA UANG
========================================= */

function updateLabelMataUang() {

    const mataUang = ambilMataUang();
    const label = document.getElementById("labelPinjaman");

    if (label) {
        label.textContent = `Pokok Pinjaman (${mataUang})`;
    }
}


/* =========================================
   5. UPDATE PILIHAN PEMBULATAN
========================================= */

function updateOpsiPembulatan() {

    const opsi = document.getElementById("opsiPembulatan");
    const mode = ambilModePembulatan();

    if (opsi) {
        opsi.hidden = mode !== "bulat";
    }
}


/* =========================================
   6. VALIDASI INPUT
========================================= */

function validasiInput(P, bunga, n) {

    const pinjaman = document.getElementById("pinjaman");
    const inputBunga = document.getElementById("bunga");
    const periode = document.getElementById("periode");

    if (
        !pinjaman.value.trim() ||
        !inputBunga.value.trim() ||
        !periode.value.trim()
    ) {
        alert("Semua kolom harus diisi.");
        return false;
    }

    if (
        !Number.isFinite(P) ||
        !Number.isFinite(bunga) ||
        !Number.isFinite(n)
    ) {
        alert("Masukkan angka yang valid.");
        return false;
    }

    if (P <= 0) {
        alert("Pokok pinjaman harus lebih dari nol.");
        return false;
    }

    if (bunga < 0 || bunga > 100000) {
        alert("Suku bunga harus berada antara 0 hingga 100000%.");
        return false;
    }

    if (n <= 0 || !Number.isInteger(n) || n > 1200) {
        alert("Jumlah periode harus berupa bilangan bulat antara 1 hingga 1200.");
        return false;
    }

    return true;
}


/* =========================================
   7. RUMUS CICILAN ANUITAS
========================================= */

function hitungCicilan(P, i, n) {

    // Jika bunga 0%
    if (i === 0) {
        return P / n;
    }

    // Rumus anuitas dengan perhitungan numerik stabil
    const penyebut = -Math.expm1(
        -n * Math.log1p(i)
    );

    return (P * i) / penyebut;
}

/* =====================================
   DRAGON ENCOUNTER SYSTEM
===================================== */

function munculkanNaga() {

    const dragons = [
    {
        name: "Night Dragon",
        file: "night.jpg",
        chance: 10,
        description: "A mysterious dragon from the darkness."
    },
    {
        name: "Light Dragon",
        file: "Light.jpg",
        chance: 10,
        description: "A beautiful dragon filled with light."
    },
    {
        name: "Fire Dragon",
        file: "Fire.jpg",
        chance: 20,
        description: "A fierce dragon with blazing energy."
    },
    {
        name: "Blu Dragon",
        file: "Blu.jpg",
        chance: 10,
        description: "A playful dragon from the blue skies."
    },
    {
        name: "Red Dragon",
        file: "Red.jpg",
        chance: 10,
        description: "A bold dragon with a fiery spirit."
    },
    {
        name: "Duo Dragon",
        file: "Duo.jpg",
        chance: 20,
        description: "A rare dragon with a special charm."
    },
    {
        name: "Gemoy Dragon",
        file: "gemoy.jpg",
        chance: 20,
        description: "A cute dragon that brings joy!"
    }
];


    // Mengundi naga berdasarkan persentase
    const random = Math.random() * 100;

    let batas = 0;
    let nagaTerpilih = dragons[dragons.length - 1];

    for (const naga of dragons) {

        batas += naga.chance;

        if (random < batas) {
            nagaTerpilih = naga;
            break;
        }
    }


    // Mengambil elemen HTML
    const encounter = document.getElementById("dragonEncounter");
    const gambar = document.getElementById("dragonImage");

    const judul = document.getElementById("dragonTitle");
    const deskripsi = document.getElementById("dragonDescription");
    const peluang = document.getElementById("dragonChance");


    // Memasang informasi naga
    gambar.src = nagaTerpilih.file;
    gambar.alt = nagaTerpilih.name;

    judul.textContent = nagaTerpilih.name;
    deskripsi.textContent = nagaTerpilih.description;

    peluang.textContent =
        `Encounter Chance: ${nagaTerpilih.chance}%`;


    // Memainkan ulang animasi setiap perhitungan
    encounter.classList.remove("show");

    void encounter.offsetWidth;

    encounter.classList.add("show");
}

/* =========================================
   8. PROSES PERHITUNGAN ANUITAS
========================================= */

function hitungAnuitas() {

    // Mengambil input
    const P = Number(
        document.getElementById("pinjaman").value
    );

    const bunga = Number(
        document.getElementById("bunga").value
    );

    const n = Number(
        document.getElementById("periode").value
    );


    // Validasi
    if (!validasiInput(P, bunga, n)) {
        return;
    }


    // Mengubah persentase menjadi desimal
    const i = bunga / 100;


    // Menghitung cicilan tetap
    const A = hitungCicilan(P, i, n);


    if (!Number.isFinite(A)) {
        alert("Perhitungan gagal. Periksa kembali data yang dimasukkan.");
        return;
    }


    // Mengambil mata uang
    const mataUang = ambilMataUang();


    /* =====================================
       9. MEMBUAT TABEL ANGSURAN
    ===================================== */

    let saldo = P;
    let tabel = "";

    let totalPembayaran = 0;
    let totalBunga = 0;


    for (let periode = 1; periode <= n; periode++) {

        // Saldo awal periode
        const saldoAwal = saldo;

        // Bunga periode berjalan
        const bungaPeriode = saldoAwal * i;

        // Angsuran pokok
        let angsuranPokok = A - bungaPeriode;

        // Cicilan periode berjalan
        let cicilanPeriode = A;

        // Saldo akhir
        let saldoAkhir = saldoAwal - angsuranPokok;


        // Penyesuaian pembayaran periode terakhir
        if (periode === n) {

            angsuranPokok = saldoAwal;

            cicilanPeriode = bungaPeriode + angsuranPokok;

            saldoAkhir = 0;
        }


        // Menghindari saldo negatif
        saldoAkhir = Math.max(0, saldoAkhir);


        // Menghitung total pembayaran
        totalPembayaran += cicilanPeriode;

        totalBunga += bungaPeriode;


        // Membuat baris tabel
        tabel += `
            <tr>
                <td>${periode}</td>

                <td>${formatMataUang(saldoAwal, mataUang)}</td>

                <td>${formatMataUang(bungaPeriode, mataUang)}</td>

                <td>${formatMataUang(cicilanPeriode, mataUang)}</td>

                <td>${formatMataUang(angsuranPokok, mataUang)}</td>

                <td>${formatMataUang(saldoAkhir, mataUang)}</td>
            </tr>
        `;


        // Memperbarui saldo
        saldo = saldoAkhir;
    }


    /* =====================================
       10. MENAMPILKAN HASIL
    ===================================== */

    // Cicilan per bulan
    document.getElementById("cicilan").textContent =
        formatMataUang(A, mataUang);


    // Total pembayaran
    document.getElementById("totalPembayaran").textContent =
        formatMataUang(totalPembayaran, mataUang);


    // Total bunga
    document.getElementById("totalBunga").textContent =
        formatMataUang(totalBunga, mataUang);


    // Tabel angsuran
    document.getElementById("tabelAngsuran").innerHTML =
        tabel;


    // Menampilkan hasil
    document.getElementById("hasil").style.display = "block";


  // Memunculkan naga secara acak
munculkanNaga();


    // Mengarahkan tampilan ke hasil
    document.getElementById("hasil").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================
   11. EVENT LISTENER
========================================= */

// Ketika mata uang diganti
const pilihanMataUang = document.getElementById("mataUang");

if (pilihanMataUang) {
    pilihanMataUang.addEventListener("change", function() {
        updateLabelMataUang();
    });
}


// Ketika mode presisi atau pembulatan diganti
const pilihanMode = document.querySelectorAll(
    'input[name="modePembulatan"]'
);

pilihanMode.forEach(pilihan => {
    pilihan.addEventListener("change", function() {
        updateOpsiPembulatan();
    });
});


// Inisialisasi awal
updateLabelMataUang();
updateOpsiPembulatan();
