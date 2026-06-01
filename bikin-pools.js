const fs = require('fs');

async function ambilDataPasarNyata() {
    console.log("Bot mulai mengambil data pasaran asli (Anti Lompat)...");
    
    // Menggunakan API publik terpercaya yang selalu update & stabil
    const urlAPI = 'https://content.livetogel.asia/json/last-pools.json';

    try {
        const response = await fetch(urlAPI, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            signal: AbortSignal.timeout(8000) // Batas waktu tunggu server 8 detik
        });
        
        if (!response.ok) throw new Error('Server utama sibuk');
        const data = await response.json();
        
        // Mengambil 4 angka asli keluaran terbaru dari server pasaran resmi
        const sdy = data.sydney ? data.sydney.result.slice(-4) : "0000";
        const sgp = data.singapore ? data.singapore.result.slice(-4) : "0000";
        const hkg = data.hongkong ? data.hongkong.result.slice(-4) : "0000";

        // Format keluaran JavaScript agar lolos pemblokiran CORS di HP kerja Mas Amos
        const isiFile = `tampilkanDataPools({
  "sydney": "${sdy}",
  "singapore": "${sgp}",
  "hongkong": "${hkg}"
});`;

        fs.writeFileSync('pools.json', isiFile);
        console.log(`✅ BERHASIL MENGUNCI ANGKA NYATA -> SDY: ${sdy}, SGP: ${sgp}, HKG: ${hkg}`);

    } catch (error) {
        console.log("Server pasaran utama offline, mempertahankan data lama agar tidak berubah acak...");
        // Jalur pengaman: Jika server pusat sibuk, bot TIDAK AKAN mengacak angka baru,
        // melainkan tetap mempertahankan angka yang sudah ada agar di HP kerja tidak berubah-ubah.
        if (!fs.existsSync('pools.json')) {
            fs.writeFileSync('pools.json', `tampilkanDataPools({"sydney": "4204", "singapore": "4261", "hongkong": "2120"});`);
        }
    }
}

ambilDataPasarNyata();
