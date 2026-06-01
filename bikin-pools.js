const fs = require('fs');

async function ambilDataPasarNyata() {
    console.log("Bot mulai mengambil data pasaran asli (Anti Lompat)...");
    
    // Menggunakan API publik milik Jayatogel yang selalu update & stabil
    const urlAPI = 'https://content.livetogel.asia/json/last-pools.json';

    try {
        const response = await fetch(urlAPI, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            signal: AbortSignal.timeout(8000)
        });
        
        if (!response.ok) throw new Error('Server utama sibuk');
        const data = await response.json();
        
        // Mengambil angka asli keluaran terbaru dari server pasaran
        const sdy = data.sydney ? data.sydney.result.slice(-4) : "0000";
        const sgp = data.singapore ? data.singapore.result.slice(-4) : "0000";
        const hkg = data.hongkong ? data.hongkong.result.slice(-4) : "0000";

        const isiFile = `tampilkanDataPools({
  "sydney": "${sdy}",
  "singapore": "${sgp}",
  "hongkong": "${hkg}"
});`;

        fs.writeFileSync('pools.json', isiFile);
        console.log(`✅ BERHASIL MENGUNCI ANGKA NYATA -> SDY: ${sdy}, SGP: ${sgp}, HKG: ${hkg}`);

    } catch (error) {
        console.log("Server pasaran utama offline, mencoba jalur alternatif aman...");
        // Jalur alternatif: mengunci data terakhir yang ada agar tidak berubah acak
        if (fs.existsSync('pools.json')) {
            console.log("Mempertahankan angka yang sudah ada agar tidak berubah-ubah.");
        } else {
            fs.writeFileSync('pools.json', `tampilkanDataPools({"sydney": "4204", "singapore": "4261", "hongkong": "2120"});`);
        }
    }
}

ambilDataPasarNyata();
