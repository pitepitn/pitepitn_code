/*
   =========================================
   APP.JS (v2) - "Питання Є? Питань НемаЄ."
   Ультрамінімалізм. Натхненно bo-en.info.
   =========================================
*/

document.addEventListener("DOMContentLoaded", () => {
    // Ініціалізація звукового рушія
    initAudio();

    // Екран завантаження
    initBootScreen();

    // Навігація
    initNavigation();

    // Інтерактивний центр (?) -> (!)
    initInteractiveCenter();

    // Консоль запитань
    initQAConsole();

    // Гостьова книга
    initGuestbook();

    // Лічильник відвідувачів
    initVisitorCounter();

    // Звук кліку по всьому екрану
    initGlobalClickSound();

    // Слід за курсором (зоряний шлейф)
    initCursorTrail();

    // Мотузка вимикача світла
    initPullChain();

    // Бібліотека музики
    initMusicLibrary();
});

// 1. ВЕБ-АУДІО ДЛЯ СИНТЕЗУ РЕТРО-ЗВУКІВ (Gameboy-style)
let audioCtx = null;

function initAudio() {
    // Звуковий контекст створиться після першого кліку користувача (вимога сучасних браузерів)
    document.addEventListener("click", () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, { once: true });
}

function playSound(type) {
    if (!audioCtx) return;

    // Створюємо осцилятор та гейн-вузол
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "click") {
        // Короткий механічний клік
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);

        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
    } 
    else if (type === "success") {
        // Милий ретро підйом тону
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.08);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.2);
    } 
    else if (type === "resolve") {
        // Заспокійливий глибокий акорд (сінусоїда)
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }
    else if (type === "cancel") {
        // Спад тону
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
    }
    else if (type === "switch_off") {
        // Перший важкий клік перемикача (світло вимикається)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        
        osc.start(now);
        osc.stop(now + 0.05);

        // Другий глухий відзвук металу через 60мс
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(450, now + 0.06);
        osc2.frequency.exponentialRampToValueAtTime(80, now + 0.12);
        gain2.gain.setValueAtTime(0.08, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        
        osc2.start(now + 0.06);
        osc2.stop(now + 0.12);
    }
    else if (type === "switch_on") {
        // Перший дзвінкий клік перемикача (світло вмикається)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1100, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
        
        osc.start(now);
        osc.stop(now + 0.04);

        // Другий дзвінкий відзвук металу через 60мс
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(950, now + 0.06);
        osc2.frequency.exponentialRampToValueAtTime(150, now + 0.11);
        gain2.gain.setValueAtTime(0.1, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.11);
        
        osc2.start(now + 0.06);
        osc2.stop(now + 0.11);

        // Короткий дзвін нитки розжарювання лампи
        const osc3 = audioCtx.createOscillator();
        const gain3 = audioCtx.createGain();
        osc3.connect(gain3);
        gain3.connect(audioCtx.destination);
        
        osc3.type = "sine";
        osc3.frequency.setValueAtTime(1500, now + 0.04);
        osc3.frequency.exponentialRampToValueAtTime(2000, now + 0.18);
        gain3.gain.setValueAtTime(0.04, now + 0.04);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        
        osc3.start(now + 0.04);
        osc3.stop(now + 0.18);
    }
    else if (type === "startup") {
        // Ретро акорд входу (4 тони C-E-G-C з накладанням)
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, idx) => {
            const oscN = audioCtx.createOscillator();
            const gainN = audioCtx.createGain();
            oscN.connect(gainN);
            gainN.connect(audioCtx.destination);
            
            oscN.type = "sine";
            oscN.frequency.setValueAtTime(freq, now + idx * 0.08);
            
            gainN.gain.setValueAtTime(0.001, now + idx * 0.08);
            gainN.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.08 + 0.05);
            gainN.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
            
            oscN.start(now + idx * 0.08);
            oscN.stop(now + idx * 0.08 + 0.4);
        });
    }
}

// 2. ІНТЕРАКТИВНИЙ ЦЕНТР
function initInteractiveCenter() {
    const logo = document.getElementById("interactive-logo");
    const stateText = document.getElementById("state-text");
    if (!logo || !stateText) return;

    // Стан: false = питання є (?), true = питань немає (!)
    let isResolved = false;

    const toggleState = () => {
        isResolved = !isResolved;

        if (isResolved) {
            logo.classList.add("resolved");
            logo.textContent = "!";
            stateText.textContent = "питань немає.";
            playSound("resolve");
        } else {
            logo.classList.remove("resolved");
            logo.textContent = "?";
            stateText.textContent = "питання є?";
            playSound("cancel");
        }
    };

    logo.addEventListener("click", toggleState);
    stateText.addEventListener("click", toggleState);
}

// 3. НАВІГАЦІЯ (ТАБИ)
function initNavigation() {
    const links = document.querySelectorAll(".minimal-nav a");
    const sections = document.querySelectorAll(".content-section");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            playSound("click");

            const targetId = link.getAttribute("data-section");

            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.add("active");
                } else {
                    sec.classList.remove("active");
                }
            });

            // Автофокус консолі
            if (targetId === "qa-section") {
                setTimeout(() => {
                    const qaInput = document.getElementById("qa-input");
                    if (qaInput) qaInput.focus();
                }, 50);
            }
        });
    });
}

// 4. КОНСОЛЬ ЗАПИТАНЬ (ЗЕН-ВЕРСІЯ)
function initQAConsole() {
    const qaInput = document.getElementById("qa-input");
    const qaHistory = document.getElementById("qa-history");
    if (!qaInput || !qaHistory) return;

    const replies = [
        "питань немає. все вирішено.",
        "питання є? вже ні.",
        "помилка 404: питання втратило актуальність.",
        "запит оброблено. результат: питань немає.",
        "всесвіт каже: немає питань — немає проблем.",
        "питання зафіксовано. анулюємо... успішно.",
        "краще жити без питань.",
        "запитайте пізніше або ніколи.",
        "протокол дзен активовано. питань немає.",
        "відхилено штучним спокоєм."
    ];

    qaInput.addEventListener("keydown", (e) => {
        // Звук друку клавіш (механічний клік)
        if (e.key.length === 1 || e.key === "Backspace") {
            playSound("click");
        }

        if (e.key === "Enter") {
            const question = qaInput.value.trim().toLowerCase();
            if (!question) return;

            appendLine(`> ${question}`, "user");
            qaInput.value = "";
            qaInput.disabled = true;

            // Ретро-затримка комп'ютера
            setTimeout(() => {
                const answer = replies[Math.floor(Math.random() * replies.length)];
                appendLine(answer, "system");
                playSound("success");
                qaInput.disabled = false;
                qaInput.focus();
            }, 400);
        }
    });

    function appendLine(text, className) {
        const row = document.createElement("div");
        row.className = `zen-row ${className}`;
        row.textContent = text;
        qaHistory.appendChild(row);
        qaHistory.scrollTop = qaHistory.scrollHeight;
    }
}

// 5. ГОСТЬОВА КНИГА
function initGuestbook() {
    const form = document.getElementById("guestbook-form");
    const postsContainer = document.getElementById("guestbook-posts");
    if (!form || !postsContainer) return;

    let posts = [];
    try {
        posts = JSON.parse(localStorage.getItem("retro_guestbook_posts") || "[]");
    } catch (err) {
        console.warn("Попередження: доступ до localStorage заблоковано.", err);
    }

    if (posts.length === 0) {
        posts = [
            {
                name: "webmaster",
                date: "21.06.2000",
                message: "вітаємо у новому спокійному просторі сайту."
            },
            {
                name: "zen_wanderer",
                date: "20.06.2000",
                message: "натиснув на знак питання по центру... звук неймовірний. питань і справді немає."
            }
        ];
        try {
            localStorage.setItem("retro_guestbook_posts", JSON.stringify(posts));
        } catch (err) {
            console.warn("Попередження: не вдалося зберегти дані в localStorage.", err);
        }
    }

    renderPosts();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        playSound("click");

        const nameInput = document.getElementById("gb-name");
        const msgInput = document.getElementById("gb-message");

        const name = nameInput.value.trim().toLowerCase() || "анонім";
        const message = msgInput.value.trim().toLowerCase();

        if (!message) return;

        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth()+1).toString().padStart(2, "0")}.${now.getFullYear()}`;

        posts.unshift({ name, date: dateStr, message });
        try {
            localStorage.setItem("retro_guestbook_posts", JSON.stringify(posts));
        } catch (err) {
            console.warn("Попередження: не вдалося оновити localStorage.", err);
        }
        
        renderPosts();

        nameInput.value = "";
        msgInput.value = "";

        setTimeout(() => {
            playSound("success");
        }, 100);
    });

    function renderPosts() {
        postsContainer.innerHTML = "";
        posts.forEach(post => {
            const pDiv = document.createElement("div");
            pDiv.className = "minimal-post";

            const metaDiv = document.createElement("div");
            metaDiv.className = "post-meta";
            metaDiv.textContent = `від: ${post.name} // дата: ${post.date}`;

            const textDiv = document.createElement("div");
            textDiv.className = "post-text";
            textDiv.textContent = post.message;

            pDiv.appendChild(metaDiv);
            pDiv.appendChild(textDiv);
            postsContainer.appendChild(pDiv);
        });
    }
}

// 6. ЛІЧИЛЬНИК ВІДВІДУВАЧІВ (Ультрамінімальний текстовий формат)
function initVisitorCounter() {
    const counterText = document.getElementById("counter-text");
    if (!counterText) return;

    let count = 1337;
    let hasVisited = false;

    try {
        count = parseInt(localStorage.getItem("retro_visitor_count") || "1337");
        hasVisited = sessionStorage.getItem("retro_visited") === "true";
    } catch (err) {
        console.warn("Попередження: доступ до сховища сесії заблоковано.", err);
    }

    if (!hasVisited) {
        count += 1;
        try {
            localStorage.setItem("retro_visitor_count", count.toString());
            sessionStorage.setItem("retro_visited", "true");
        } catch (err) {
            console.warn("Попередження: не вдалося зберегти лічильник відвідувачів.", err);
        }
    }

    const formatted = count.toString().padStart(6, "0");
    counterText.textContent = `v.${formatted}`;
}

// 7. ЗВУК КЛІКУ ПО ВСЬОМУ ЕКРАНУ
function initGlobalClickSound() {
    document.addEventListener("mousedown", (e) => {
        // Запобігаємо подвійному відтворенню звуків на інтерактивних елементах
        if (e.target.closest('#interactive-logo') || 
            e.target.closest('#state-text') || 
            e.target.closest('.minimal-nav a') ||
            e.target.closest('.minimal-btn')) {
            return;
        }
        playSound("click");
    });
}

// 8. СЛІД ЗА КУРСОРОМ МИШІ (Зоряний шлейф)
function initCursorTrail() {
    let lastX = 0;
    let lastY = 0;
    const symbols = ["*", "+", "o", "x", "°", "•", "?", "!"];

    document.addEventListener("mousemove", (e) => {
        const distance = Math.hypot(e.pageX - lastX, e.pageY - lastY);
        // Додаємо нову частинку тільки при русі миші більше ніж на 15 пікселів
        if (distance > 15) {
            lastX = e.pageX;
            lastY = e.pageY;
            createTrailNode(e.pageX, e.pageY);
        }
    });

    function createTrailNode(x, y) {
        const span = document.createElement("span");
        span.className = "cursor-trail";
        
        // Рандомний символ
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;

        // Випадковий розліт по осях X та Y
        const dx = (Math.random() - 0.5) * 20;
        const dy = (Math.random() * 15) + 5;
        span.style.setProperty("--dx", `${dx}px`);
        span.style.setProperty("--dy", `${dy}px`);

        document.body.appendChild(span);

        // Видалення через 600мс
        setTimeout(() => {
            span.remove();
        }, 600);
    }
}

// 9. МОТУЗКА-ВИМИКАЧ (LIGHT SWITCH STRING WITH DRAG & BOUNCE PHYSICS)
function initPullChain() {
    const handle = document.getElementById("chain-handle");
    const line = document.getElementById("chain-line");
    if (!handle || !line) return;

    // Фізичні змінні
    const startX = 15; // Точка закріплення у SVG
    const startY = 0;
    const restX = 15; // Початковий стан спокою ручки
    const restY = 150; 
    
    let x = restX;
    let y = restY;
    let vx = 0;
    let vy = 0;
    
    const k = 0.15; // Жорсткість пружини
    const damping = 0.82; // Загасання швидкості (опір повітря)
    
    let isDragging = false;
    let dragYOffset = 0;
    let dragXOffset = 0;
    
    let triggered = false; // Чи спрацював перемикач при даному натягу
    let isDarkMode = false;

    // Оновлення шляху мотузки (з плавним вигином за допомогою кривої Безьє)
    function updateRope() {
        const midX = (startX + x) / 2;
        const midY = y / 2;
        line.setAttribute("d", `M ${startX} ${startY} Q ${midX} ${midY} ${x} ${y}`);
        handle.setAttribute("transform", `translate(${x}, ${y})`);
    }

    // Головний цикл фізики
    function animate() {
        if (!isDragging) {
            // Розрахунок сили пружини (повернення в restX, restY)
            const fx = -k * (x - restX);
            const fy = -k * (y - restY);
            
            // Прискорення
            vx = (vx + fx) * damping;
            vy = (vy + fy) * damping;
            
            // Нова координата
            x += vx;
            y += vy;
            
            // Якщо амплітуда коливань стала мікроскопічною, зупиняємо рух
            if (Math.abs(x - restX) < 0.05 && Math.abs(y - restY) < 0.05 && Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) {
                x = restX;
                y = restY;
                vx = 0;
                vy = 0;
            }
        }
        
        updateRope();
        requestAnimationFrame(animate);
    }

    // Початок перетягування
    function onStart(clientX, clientY) {
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        
        isDragging = true;
        
        const rect = handle.getBoundingClientRect();
        
        dragXOffset = clientX - (rect.left + rect.width / 2);
        dragYOffset = clientY - rect.top;
        
        handle.style.cursor = "grabbing";
    }

    // Процес перетягування
    function onMove(clientX, clientY) {
        if (!isDragging) return;

        const svgRect = document.getElementById("chain-svg").getBoundingClientRect();
        
        let targetX = clientX - svgRect.left - dragXOffset;
        let targetY = clientY - svgRect.top - dragYOffset;

        // Обмежуємо хід ручки
        x = Math.max(restX - 60, Math.min(restX + 60, targetX));
        y = Math.max(restY - 20, Math.min(restY + 110, targetY));

        // Логіка спрацьовування вимикача (тільки при максимальному натягу)
        const pullThreshold = restY + 105; // Максимальний натяг (при ліміті 110)
        
        if (y >= pullThreshold && !triggered) {
            triggered = true;
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.body.classList.add("dark-mode");
                playSound("switch_off"); // Звук вимкнення світла
            } else {
                document.body.classList.remove("dark-mode");
                playSound("switch_on"); // Звук увімкнення світла
            }
        } else if (y < pullThreshold - 25) {
            // Щоб скинути тригер, треба відпустити мотузку трохи вище
            triggered = false;
        }
    }

    // Завершення перетягування
    function onEnd() {
        if (!isDragging) return;
        isDragging = false;
        handle.style.cursor = "";
    }

    // Слухачі миші
    handle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        onStart(e.clientX, e.clientY);
    });

    document.addEventListener("mousemove", (e) => {
        onMove(e.clientX, e.clientY);
    });

    document.addEventListener("mouseup", onEnd);

    // Слухачі тач-екранів (мобільні пристрої)
    handle.addEventListener("touchstart", (e) => {
        if (e.touches.length > 0) {
            onStart(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    document.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            onMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    document.addEventListener("touchend", onEnd);

    // Запуск анімації
    animate();
}

// 10. ЕКРАН ЗАВАНТАЖЕННЯ (BOOT SEQUENCE)
function initBootScreen() {
    const bootScreen = document.getElementById("boot-screen");
    const bootBtn = document.getElementById("boot-btn");
    const bootStatus = document.getElementById("boot-status");
    const bootProgressContainer = document.getElementById("boot-progress-container");
    const bootBar = document.getElementById("boot-bar");
    const bootPercentage = document.getElementById("boot-percentage");

    if (!bootScreen || !bootBtn) return;

    // Стан завантаження
    let progress = 0;
    const barWidth = 20; // Кількість символів у прогрес-барі [████................]

    const statusTexts = [
        "підключення модему...",
        "авторизація користувача...",
        "завантаження інтерфейсу...",
        "налаштування звукових хвиль...",
        "анулювання зайвих питань...",
        "систему успішно запущено."
    ];

    bootBtn.addEventListener("click", () => {
        // У цьому кліку ініціалізуємо аудіо-контекст, щоб обійти політику autoplay браузерів
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } else if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        // Приховуємо кнопку, показуємо прогрес
        bootBtn.style.display = "none";
        bootProgressContainer.style.display = "block";
        
        // Починаємо інтервал завантаження
        const interval = setInterval(() => {
            progress += 5; // Збільшуємо на 5% щоразу
            
            if (progress > 100) {
                progress = 100;
            }

            // Оновлюємо статус текст залежно від відсотка
            const textIdx = Math.min(
                statusTexts.length - 1,
                Math.floor((progress / 100) * statusTexts.length)
            );
            bootStatus.textContent = statusTexts[textIdx];

            // Оновлюємо візуальний прогрес-бар
            const filledChars = Math.floor((progress / 100) * barWidth);
            const emptyChars = barWidth - filledChars;
            const barText = "[" + "█".repeat(filledChars) + ".".repeat(emptyChars) + "]";
            bootBar.textContent = barText;
            bootPercentage.textContent = `${progress}%`;

            // Граємо тихенький механічний клік під час завантаження
            if (progress < 100) {
                playSound("click");
            }

            // Коли завантаження завершилось (100%)
            if (progress === 100) {
                clearInterval(interval);
                
                // Граємо красиву завантажувальну мелодію
                setTimeout(() => {
                    playSound("startup");
                    
                    // Запускаємо CRT схлопування екрану
                    bootScreen.classList.add("fade-out");
                    
                    // Видаляємо елемент з DOM після завершення анімації (600мс)
                    setTimeout(() => {
                        bootScreen.remove();
                    }, 600);
                }, 200);
            }
        }, 80);
    });
}

// 11. РЕТРО БІБЛІОТЕКА МУЗИКИ
function initMusicLibrary() {
    const form = document.getElementById("music-form");
    const listContainer = document.getElementById("music-list");
    if (!form || !listContainer) return;

    let library = [];

    // Зчитуємо дані з localStorage із захистом
    try {
        library = JSON.parse(localStorage.getItem("retro_music_library_v3") || "[]");
    } catch (err) {
        console.warn("Попередження: доступ до localStorage заблоковано.", err);
    }

    // Дефолтні релізи користувача зі Spotify
    if (library.length === 0) {
        library = [
            {
                title: "чисте небо над головою",
                status: "вийшов: 23.01.2026",
                format: "mp3",
                desc: "офіційний сингл проекту 'питання є? питань немає.'. доступний для прослуховування на spotify. тривалість: 3 хв 34 сек.",
                link: "https://open.spotify.com/album/57b2fOOKfLDoph2Bv1SCcH?si=X1TR5bylTkeHZ3yYm16siw"
            },
            {
                title: "вчорашній день",
                status: "вийшов: 08.07.2024",
                format: "mp3",
                desc: "реліз 2024 року. експериментальний трек про плинність часу. доступний на spotify. тривалість: 3 хв 26 сек.",
                link: "https://open.spotify.com/album/3Mcqv5aXKN6cM1Sz7MmT6w?si=2KBS02cZTyaO9SZtvjMsGA"
            }
        ];
        try {
            localStorage.setItem("retro_music_library_v3", JSON.stringify(library));
        } catch (err) {
            console.warn("Попередження: не вдалося зберегти бібліотеку в localStorage.", err);
        }
    }

    // Функція рендеру іконки залежно від формату
    function getMediaIcon(format) {
        const f = format.toLowerCase().trim();
        if (f.includes("cassette") || f.includes("касет") || f.includes("касеті")) {
            return "[o__o]"; // іконка компакт-касети
        }
        if (f.includes("vinyl") || f.includes("вініл") || f.includes("пластинк")) {
            return "(@)"; // іконка вінілу
        }
        if (f.includes("cd") || f.includes("диск")) {
            return "(O)"; // іконка CD
        }
        return "[mp3]"; // дефолтна іконка цифрового формату
    }

    function renderLibrary() {
        listContainer.innerHTML = "";
        library.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "music-item";

            const titleRow = document.createElement("div");
            titleRow.className = "music-title-row";

            const iconSpan = document.createElement("span");
            iconSpan.className = "music-media-icon";
            iconSpan.textContent = getMediaIcon(item.format);

            const titleSpan = document.createElement("span");
            titleSpan.textContent = item.title.toLowerCase();

            titleRow.appendChild(iconSpan);
            titleRow.appendChild(titleSpan);

            const metaDiv = document.createElement("div");
            metaDiv.className = "music-item-meta";
            metaDiv.textContent = `формат: ${item.format.toLowerCase()} // статус: ${item.status.toLowerCase()}`;

            const descDiv = document.createElement("div");
            descDiv.className = "music-item-desc";
            descDiv.textContent = item.desc.toLowerCase();

            itemDiv.appendChild(titleRow);
            itemDiv.appendChild(metaDiv);
            itemDiv.appendChild(descDiv);

            if (item.link) {
                const linkDiv = document.createElement("div");
                linkDiv.className = "music-item-link";
                linkDiv.style.marginTop = "8px";
                linkDiv.style.fontSize = "11px";
                
                const a = document.createElement("a");
                a.href = item.link;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.textContent = "[слухати на spotify]";
                linkDiv.appendChild(a);
                itemDiv.appendChild(linkDiv);
            }

            listContainer.appendChild(itemDiv);
        });
    }

    renderLibrary();

    // Обробник додавання нового релізу
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        playSound("click");

        const titleInput = document.getElementById("music-title");
        const statusInput = document.getElementById("music-status");
        const formatInput = document.getElementById("music-format");
        const linkInput = document.getElementById("music-link");
        const descInput = document.getElementById("music-desc");

        const newRelease = {
            title: titleInput.value.trim().toLowerCase(),
            status: statusInput.value.trim().toLowerCase(),
            format: formatInput.value.trim().toLowerCase(),
            link: linkInput ? linkInput.value.trim() : "",
            desc: descInput.value.trim().toLowerCase()
        };

        library.unshift(newRelease); // додаємо на початок

        try {
            localStorage.setItem("retro_music_library_v3", JSON.stringify(library));
        } catch (err) {
            console.warn("Попередження: не вдалося зберегти реліз.", err);
        }

        renderLibrary();

        // Очищаємо поля форми
        titleInput.value = "";
        statusInput.value = "";
        formatInput.value = "";
        if (linkInput) linkInput.value = "";
        descInput.value = "";

        setTimeout(() => {
            playSound("success");
        }, 100);
    });
}
