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

initializeApp();