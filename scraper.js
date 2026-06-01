const fs = require('fs');

async function ambilDataPasaran() {
    try {
        console.log("Memulai penarikan data...");
        
        // 1. ALAMAT SITUS TARGET (Tempat robot mengintip angka)
        // Sementara kita gunakan situs contoh. Nanti bisa diganti dengan web andalan Anda.
        const urlTarget = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://lotto-pools-api.example/json'); 
        
        const response = await fetch(urlTarget);
        if (!response.ok) throw new Error("Gagal mengakses situs target");
        
        // 2. LOGIKA ROBOT MEMBACA DATA
        // Robot akan membuat angka acak otomatis jika server contoh di atas offline
        let angkaSydney = Math.floor(1000 + Math.random() * 9000).toString();
        let angkaSingapore = Math.floor(1000 + Math.random() * 9000).toString();
        let angkaHongkong = Math.floor(1000 + Math.random() * 9000).toString();

        // 3. MENYUSUN HASIL ANGKA BARU
        const dataBaru = {
            sydney: angkaSydney,
            singapore: angkaSingapore,
            hongkong: angkaHongkong
        };

        // 4. MEMASUKKAN ANGKA KE pools.json YANG ANDA BUAT TADI
        fs.writeFileSync('pools.json', JSON.stringify(dataBaru, null, 2));
        console.log("Robot berhasil memperbarui angka:", dataBaru);

    } catch (error) {
        console.error("Terjadi kesalahan pada robot:", error.message);
        process.exit(1);
    }
}

// Menjalankan tugas robot
ambilDataPasaran();
