// ========================================
// GÁS CAMPO GRANDE - JAVASCRIPT PRINCIPAL
// ========================================

// === MENU MOBILE ===
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// === SCROLL SUAVE ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// === WHATSAPP LINK ===
function abrirWhatsApp(mensagem) {
    const telefone = '5567991310665'; // (67) 99131-0665
    const mensagemPadrao = mensagem || 'Olá! Gostaria de pedir gás de cozinha.';
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagemPadrao)}`;
    window.open(url, '_blank');
}

// Adicionar evento aos botões do WhatsApp
document.addEventListener('DOMContentLoaded', () => {
    const botoesWhatsApp = document.querySelectorAll('.btn-whatsapp');
    
    botoesWhatsApp.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            const produto = botao.getAttribute('data-produto') || '';
            const mensagem = produto ? 
                `Olá! Gostaria de pedir ${produto}.` : 
                'Olá! Gostaria de pedir gás de cozinha.';
            abrirWhatsApp(mensagem);
        });
    });
});

// === ANIMAÇÃO AO SCROLL ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos com animação
const animatedElements = document.querySelectorAll('.produto-card, .vantagem-item, .bairro-link');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// === BUSCA DE BAIRRO ===
const buscaBairro = document.getElementById('busca-bairro');
if (buscaBairro) {
    buscaBairro.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const bairros = document.querySelectorAll('.bairro-link');
        
        bairros.forEach(bairro => {
            const texto = bairro.textContent.toLowerCase();
            if (texto.includes(termo)) {
                bairro.style.display = 'block';
            } else {
                bairro.style.display = 'none';
            }
        });
    });
}

// === SCROLL TO TOP ===
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--cor-primaria, #FF6B00);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// === FORMULÁRIO DE CONTATO ===
const formContato = document.getElementById('form-contato');
if (formContato) {
    formContato.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const bairro = document.getElementById('bairro').value;
        const mensagem = document.getElementById('mensagem').value;
        
        const textoWhatsApp = `Olá! Meu nome é ${nome}.\nTelefone: ${telefone}\nBairro: ${bairro}\nMensagem: ${mensagem}`;
        
        abrirWhatsApp(textoWhatsApp);
    });
}

// === MÁSCARA DE TELEFONE ===
const inputTelefone = document.getElementById('telefone');
if (inputTelefone) {
    inputTelefone.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length > 11) {
            valor = valor.slice(0, 11);
        }
        
        if (valor.length > 6) {
            valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else if (valor.length > 0) {
            valor = valor.replace(/(\d{0,2})/, '($1');
        }
        
        e.target.value = valor;
    });
}

console.log('Gás Campo Grande - Site carregado com sucesso!');