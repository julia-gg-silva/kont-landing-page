async function loadSection(id, path) {
  try {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(`Erro ao carregar ${path}:`, err);
  }
}

loadSection('header', 'src/components/header.html');
loadSection('about', 'src/components/about.html');
loadSection('team', 'src/components/team.html');
loadSection('services', 'src/components/services.html');
loadSection('contact', 'src/components/contact.html');
loadSection('footer', 'src/components/footer.html');