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
    setupMobileMenu();

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

        emailjs.send('service_ry08y5v', 'template_82pkbeh', templateParams)
            .then(function() {
                alert('Menssagem enviada! Entraremos em contato em breve.');
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
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !sidebar) return;

    function toggleMenu() {
        sidebar.classList.toggle('translate-x-full');
        overlay.classList.toggle('opacity-0');
        overlay.classList.toggle('pointer-events-none');
        // Trava o scroll do body quando menu abre
        document.body.style.overflow = sidebar.classList.contains('translate-x-full') ? '' : 'hidden';
    }

    btn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fecha a sidebar ao clicar em um link
    links.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}
initializeApp();