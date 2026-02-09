async function loadSection(id, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Erro ao carregar componente: ${path}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        if (id === 'header') {
            setupMobileMenu();
        }
        
        if (id === 'video') {
            handleVideoAutoplay();
        }
    } catch (error) {
        console.error(`Erro na seção [${id}]:`, error);
    }
}

function handleVideoAutoplay() {
    const video = document.querySelector('#video video');
    if (video) {
        video.muted = true;
        const promise = video.play();
        if (promise !== undefined) {
            promise.catch(() => {
                const playOnInteraction = () => {
                    video.play();
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                };
                document.addEventListener('touchstart', playOnInteraction, { passive: true });
                document.addEventListener('click', playOnInteraction);
            });
        }
    }
}

async function initializeApp() {
    await Promise.all([
        loadSection('header', 'src/components/header.html'),
        loadSection('video', 'src/components/video.html'),
        loadSection('about', 'src/components/about.html'),
        loadSection('team', 'src/components/team.html'),
        loadSection('services', 'src/components/services.html'),
        loadSection('contact', 'src/components/contact.html'),
        loadSection('footer', 'src/components/footer.html')
    ]);

    setupScrollReveal();
    initGlow();
    setupContactForm();

    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const offset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }, 500);
        }
    }
}

document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
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
    if (!glow) return;
    let mX = -1000, mY = -1000, bX = -1000, bY = -1000;
    window.addEventListener('mousemove', (e) => {
        mX = e.clientX;
        mY = e.clientY;
    });
    function loop() {
        bX += (mX - bX) * 0.08;
        bY += (mY - bY) * 0.08;
        glow.style.transform = `translate3d(${bX}px, ${bY}px, 0)`;
        requestAnimationFrame(loop);
    }
    loop();
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return; 
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const btn = document.getElementById('btn-submit');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        const templateParams = {
            name: document.getElementById('from_name').value,
            email: document.getElementById('user_email').value,
            phone: document.getElementById('user_phone').value,
            message: document.getElementById('user_message').value,
            time: new Date().toLocaleString('pt-BR')
        };

        emailjs.send('service_3pmhe5r', 'template_o250d9m', templateParams)
            .then(function() {
                alert('Mensagem enviada! Entraremos em contato em breve.');
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, function(error) {
                alert('FALHA AO ENVIAR: ' + JSON.stringify(error));
                btn.innerText = originalText;
                btn.disabled = false;
            });
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !sidebar) return;

    function toggleMenu() {
        sidebar.classList.toggle('translate-x-full');
        overlay.classList.toggle('opacity-0');
        overlay.classList.toggle('pointer-events-none');
        document.body.style.overflow = sidebar.classList.contains('translate-x-full') ? '' : 'hidden';
    }

    btn.onclick = toggleMenu;
    if (closeBtn) closeBtn.onclick = toggleMenu;
    if (overlay) overlay.onclick = toggleMenu;
    links.forEach(link => link.onclick = toggleMenu);
}

initializeApp();