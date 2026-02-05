# KONT - Interface Web de Alta Performance

Este projeto consiste em uma interface web moderna, desenvolvida com foco em otimização de performance, componentização dinâmica e experiência do usuário (UX). A aplicação utiliza uma arquitetura baseada em JavaScript assíncrono para o carregamento de módulos e entrega de conteúdo.

## Especificações Técnicas

* **Frontend:** HTML5, CSS3 e Tailwind CSS para estilização utilitária.
* **Engine de Renderização:** JavaScript Vanilla (ES6+) com sistema de injeção de componentes via Fetch API.
* **Integrações:** EmailJS para processamento de formulários via Client-side.
* **Infraestrutura:** Hospedagem via Hostinger com pipeline de integração contínua (CI) através de GitHub Webhooks.

## Diferenciais de Implementação

### Carregamento Dinâmico de Componentes
O projeto adota uma abordagem de "Single Skeleton Page", onde o arquivo principal gerencia a montagem do DOM através de funções assíncronas. Isso permite uma manutenção modularizada, onde cada seção do site (Header, Footer, About, etc.) reside em seu próprio arquivo HTML dentro do diretório de componentes.

### Otimização de Mídia e Background Video
Foi implementada uma solução robusta para o gerenciamento de vídeos em alta resolução no background, resolvendo limitações comuns em dispositivos móveis:
* **Gestão de Buffer:** Otimização do peso dos arquivos para garantir carregamento fluido em conexões móveis.
* **Fallback de Renderização:** Utilização de atributos `poster` e `preload="metadata"` para evitar latência visual.
* **Garantia de Autoplay:** Script de manipulação de promessas de vídeo para contornar bloqueios de economia de energia em navegadores móveis (iOS/Android).

### User Experience (UX)
* **Smooth Scroll:** Navegação com cálculo de offset dinâmico para compensar cabeçalhos fixos.
* **Scroll Reveal:** Utilização de `IntersectionObserver` para gatilhos de animação baseados na visibilidade do elemento.
* **Interactive Glow:** Sistema de rastro visual via manipulação de coordenadas de mouse para maior engajamento visual.

## Estrutura do Repositório

```text
├── src/
│   ├── assets/
│   │   ├── video/      # Mídias otimizadas (MP4/WebM)
│   │   └── image/      # Assets visuais e imagens de fallback (posters)
│   └── components/     # Fragmentos HTML independentes
|   ├── css/            # Estilizações globais e variáveis de design
├── index.html          # Ponto de entrada e estrutura de injeção
├── loadSections.js     # Lógica de carregamento e inicialização de scripts
```

## Configuração e Instalação

### Instalação Local
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/julia-gg-silva/kont-landing-page.git](https://github.com/julia-gg-silva/kont-landing-page.git)
    ```

2.  **Acesse o diretório:**
    ```bash
    cd kont-landing-page
    ```

3.  **Execute via servidor local:**
    * **Com VS Code:** Botão direito no `index.html` > **Open with Live Server**.
