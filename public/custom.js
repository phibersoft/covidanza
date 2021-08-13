(() => {
    // 1 Saat sayfa açık kalırsa cachemizi temizliyor.
    setInterval(() => {
        window.localStorage.clear();
    }, 60 * 1000);

    // Sayfa kapatılırsa da cachemizi temizliyoruz.
    window.onbeforeunload = (e) => {
        window.localStorage.clear();
    }
})();