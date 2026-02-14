document.addEventListener("DOMContentLoaded", function() {

    // ===================================
    // BOTÃO DE ENTRADA + MÚSICA
    // ===================================

    const botaoEntrar = document.getElementById("entrar");
    const musica = document.getElementById("musica");
    const telaInicial = document.getElementById("tela-inicial");
    const conteudo = document.getElementById("conteudo");

    if (botaoEntrar && musica) {
        botaoEntrar.addEventListener("click", function() {
            musica.volume = 0.15;
            musica.play().catch(() => {});
            telaInicial.style.display = "none";
            conteudo.style.display = "block";
        });
    }

    // ===================================
    // VARIÁVEIS PRINCIPAIS (DOM)
    // ===================================

    const tempoTotalEl = document.getElementById('tempo-total');
    const mainContentEl = document.getElementById('main-content');
    const progressoTextoEl = document.getElementById('progresso-texto');
    const barraInternaEl = document.getElementById('barra-interna');
    const mensagemPrincipalEl = document.getElementById('mensagem-principal');
    const contadorTituloEl = document.getElementById('contador-titulo');

    const dataInicio = new Date(2025, 11, 11);

    // ===================================
    // 1. Lógica do Carrossel
    // ===================================

    let slideIndex = 1;

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    window.plusSlides = plusSlides;

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        if (slides.length === 0) return;

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";
    }

    function autoSlide() {
        let slides = document.getElementsByClassName("slide");
        if (slides.length === 0) return;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;

        slides[slideIndex - 1].style.display = "block";

        setTimeout(autoSlide, 5000);
    }

    showSlides(slideIndex);
    autoSlide();

    // ===================================
    // 2. Contador + Aniversário
    // ===================================

    function formatarTempo(valor, unidade) {
        return `${valor} ${unidade}${valor !== 1 ? 's' : ''}`;
    }

    function atualizarContadorEDinamica() {

        if (!tempoTotalEl) return;

        const hoje = new Date();

        const diferencaMs = hoje - dataInicio;
        const segundosTotal = Math.floor(diferencaMs / 1000);
        const diasTotal = Math.floor(segundosTotal / (60 * 60 * 24));

        const segundos = segundosTotal % 60;
        const minutos = Math.floor(segundosTotal / 60) % 60;
        const horas = Math.floor(segundosTotal / 3600) % 24;

        const anos = Math.floor(diasTotal / 365.25);
        let diasRestantes = diasTotal - Math.floor(anos * 365.25);
        const meses = Math.floor(diasRestantes / 30.44);
        diasRestantes = diasRestantes - Math.floor(meses * 30.44);

        tempoTotalEl.textContent =
            `${formatarTempo(anos, 'ano')}, ` +
            `${formatarTempo(meses, 'mê')}, ` +
            `${formatarTempo(diasRestantes, 'dia')}, ` +
            `${formatarTempo(horas, 'hora')}, ` +
            `${formatarTempo(minutos, 'minuto')} e ` +
            `${formatarTempo(segundos, 'segundo')}`;

        // Próximo aniversário (11/12)
        let proximoAniv = new Date(hoje.getFullYear(), 11, 11);
        if (hoje > proximoAniv) {
            proximoAniv.setFullYear(hoje.getFullYear() + 1);
        }

        const msRestantes = proximoAniv - hoje;
        const diasParaAniv = Math.ceil(msRestantes / (1000 * 60 * 60 * 24));

        const anivAnterior = new Date(proximoAniv.getFullYear() - 1, 11, 11);
        const totalMsCiclo = proximoAniv - anivAnterior;
        const msPassados = hoje - anivAnterior;

        const progresso = (msPassados / totalMsCiclo) * 100;
        barraInternaEl.style.width =
            `${Math.min(100, Math.max(0, progresso)).toFixed(2)}%`;

        const eAniversarioHoje =
            hoje.getDate() === 11 && hoje.getMonth() === 11;

        mainContentEl.className = '';

        if (eAniversarioHoje) {
            progressoTextoEl.textContent =
                "❤️ HOJE É NOSSO ANIVERSÁRIO DE NAMORO! ❤️";
            mainContentEl.classList.add('theme-aniversario');
        } else {
            progressoTextoEl.textContent =
                `❤️ Faltam ${diasParaAniv} dias para o nosso aniversário (11/12)!`;

            if (anos >= 1) {
                mainContentEl.classList.add('theme-claro');
            } else {
                mainContentEl.classList.add('dark-mode');
            }
        }

        contadorTituloEl.textContent = "Nós nos amamos há:";
        mensagemPrincipalEl.textContent =
            "Nossa união é a maior prova do nosso amor. Que venham muitos anos de felicidade!";
    }

    atualizarContadorEDinamica();
    setInterval(atualizarContadorEDinamica, 1000);

    // ===================================
    // 3. Corações Subindo
    // ===================================

    function criarCoracao() {
        const container = document.querySelector(".coracoes");
        if (!container) return;

        const coracao = document.createElement("div");
        coracao.classList.add("coracao");

        const coracoes = ["❤️", "💖", "💕", "💘", "💗"];
        coracao.innerHTML =
            coracoes[Math.floor(Math.random() * coracoes.length)];

        coracao.style.left = Math.random() * 100 + "vw";
        coracao.style.fontSize = Math.random() * 20 + 15 + "px";
        coracao.style.animationDuration =
            Math.random() * 3 + 4 + "s";

        container.appendChild(coracao);

        setTimeout(() => {
            coracao.remove();
        }, 7000);
    }

    setInterval(criarCoracao, 400);

    // ===================================
    // 4. Explosão de Coração
    // ===================================

    const explosao = document.getElementById("coracao-explosao");

    function explodirCoracao() {
        if (!explosao) return;

        explosao.classList.remove("explodir");
        void explosao.offsetWidth;
        explosao.classList.add("explodir");

        setTimeout(explodirCoracao, 5000);
    }

    setTimeout(explodirCoracao, 5000);

});