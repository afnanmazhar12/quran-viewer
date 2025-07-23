const baseUrl = "https://api.alquran.cloud/v1/surah/";
const audiourl = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/";
const format = ".mp3";

document.addEventListener('DOMContentLoaded', () => {
    const box1 = document.querySelector(".box");
    const btn = document.querySelector(".but");
    const sb = document.querySelector("#sb");
    const playBtn = document.querySelector("#playBtn");
    const pauseBtn = document.querySelector("#pauseBtn");
    const nextBtn = document.querySelector("#nextBtn");
    const prevBtn = document.querySelector("#prevBtn");
    const slider = document.querySelector("#slider");

    let surahData = null;
    let currentPage = 1;
    const ayahsPerPage = 20;
    let audio = null;

    const fetchSurahData = async () => {
        const surahNumber = sb.value.trim();
        if (!surahNumber) {
            box1.innerText = "Please enter a Surah number.";
            return;
        }

        const url = `${baseUrl}${surahNumber}`;
        const audioSrc = `${audiourl}${surahNumber}${format}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                surahData = await response.json();
                if (audio) {
                    audio.pause(); 
                    audio.src = ''; 
                }
                playAudio(audioSrc);
                currentPage = 1;
                renderPage();
            } else {
                box1.innerText = "Error fetching data. Please try again.";
            }
        } catch (error) {
            box1.innerText = "Error fetching data. Please try again.";
        }
    };

    const playAudio = (src) => {
        audio = new Audio(src);
        audio.play();
        playBtn.disabled = true;
        pauseBtn.disabled = false;

        audio.addEventListener('timeupdate', () => {
            slider.value = (audio.currentTime / audio.duration) * 100;
        });

        audio.addEventListener('ended', () => {
            slider.value = 0;
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        });
    };

    const renderPage = () => {
        if (!surahData) return;

        const { ayahs, englishName, englishNameTranslation } = surahData.data;
        const start = (currentPage - 1) * ayahsPerPage;
        const end = Math.min(start + ayahsPerPage, ayahs.length);

        let content = `<h2>${englishName} (${englishNameTranslation})</h2>`;
        for (let i = start; i < end; i++) {
            content += `<p><strong>${ayahs[i].numberInSurah}:</strong> ${ayahs[i].text}</p>`;
        }

        if (currentPage > 1) {
            prevBtn.disabled = false;
        } else {
            prevBtn.disabled = true;
        }

        if (end < ayahs.length) {
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }

        box1.innerHTML = content;
    };

    window.changePage = (delta) => {
        currentPage += delta;
        renderPage();
    };

    playBtn.addEventListener("click", () => {
        if (audio) {
            audio.play();
            playBtn.disabled = true;
            pauseBtn.disabled = false;
        }
    });

    pauseBtn.addEventListener("click", () => {
        if (audio) {
            audio.pause();
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    });

    slider.addEventListener("input", () => {
        if (audio) {
            audio.currentTime = (slider.value / 100) * audio.duration;
        }
    });

    nextBtn.addEventListener("click", () => {
        if (audio) {
            audio.currentTime += 10; // Skip forward 10 seconds
        }
    });

    prevBtn.addEventListener("click", () => {
        if (audio) {
            audio.currentTime -= 10; // Skip backward 10 seconds
        }
    });

    btn.addEventListener("click", fetchSurahData);

    sb.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            fetchSurahData();
        }
    });

    // Stop audio when the page is unloaded
    window.addEventListener('beforeunload', () => {
        if (audio) {
            audio.pause();
            audio.src = ''; // Clear the source
        }
    });
});
