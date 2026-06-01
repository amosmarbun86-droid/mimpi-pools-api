const fs = require('fs');

async function ambilDataPasarNyata() {
    console.log("Bot mulai berburu angka pasar nyata...");
    try {
        // Mengambil data dari API publik yang mengagregasikan live result
        const response = await fetch('https://raw.githubusercontent.com/pt-api/pool/main/live.json');
        if (!response.ok) throw new Error('Gagal koneksi ke server pusat data');
        
        const dataPasaran = await response.json();
        
        // Ekstrak 4 angka belakang dari masing-masing pasaran
        const sdy = dataPasaran.sydney ? dataPasaran.sydney.slice(-4) : "----";
        const sgp = dataPasaran.singapore ? dataPasaran.singapore.slice(-4) : "----";
        const hkg = dataPasaran.hongkong ? dataPasaran.hongkong.slice(-4) : "----";

        // Bungkus data ke dalam format fungsi JAVASCRIPT agar lolos CORS Android
        const isiFileBukuMimpi = `tampilkanDataPools({
  "sydney": "${sdy}",
  "singapore": "${sgp}",
  "hongkong": "${hkg}"
});`;

        // Tulis hasilnya ke file pools.json
        fs.writeFileSync('pools.json', isiFileBukuMimpi);
        console.log(`Berhasil memperbarui angka nyata! SDY: ${sdy}, SGP: ${sgp}, HKG: ${hkg}`);

    } catch (error) {
        console.error("Eror saat bot mengambil data:", error.message);
        process.exit(1);
    }
}

ambilDataPasarNyata();
