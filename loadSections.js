async function loadSection(id, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Erro ao carregar componente: ${path}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Erro na seção [${id}]:`, error);
    }
}

async function initializeApp() {
    await Promise.all([
        loadSection('header', 'src/components/header.html'),
        loadSection('about', 'src/components/about.html'),
        loadSection('team', 'src/components/team.html'),
        loadSection('services', 'src/components/services.html'),
        loadSection('contact', 'src/components/contact.html'),
        loadSection('footer', 'src/components/footer.html')
    ]);
    setupScrollReveal();
    initGlow();

    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');

    if (anchor) {
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            const offset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            window.history.pushState(null, null, targetId);
        }
    }
});

function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initGlow() {
    const glow = document.getElementById('mouse-glow');
    if (!glow) {
        console.error("Não achei o mouse-glow");
        return;
    }

    let mX = -1000, mY = -1000, bX = -1000, bY = -1000;
    
    window.addEventListener('mousemove', (e) => {
        mX = e.clientX;
        mY = e.clientY;
    });

    function loop() {
        bX += (mX - bX) * 0.08;
        bY += (mY - bY) * 0.08;
        // O transform move a div sem criar espaço no layout
        glow.style.transform = `translate3d(${bX}px, ${bY}px, 0)`;
        requestAnimationFrame(loop);
    }
    loop();
}
initializeApp();