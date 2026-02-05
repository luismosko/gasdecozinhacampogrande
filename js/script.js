// ============================================
// GÁS CAMPO GRANDE - JAVASCRIPT PRINCIPAL
// ============================================

// Configurações
const CONFIG = {
    whatsappNumber: '5567991310665',
    whatsappMessage: 'Olá! Gostaria de pedir gás de cozinha.'
};

// ============================================
// MENU MOBILE
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Atualiza ícone do menu
            const icon = menuToggle.textContent;
            menuToggle.textContent = icon === '☰' ? '✕' : '☰';
        });
        
        // Fecha menu ao clicar em um link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }
}

// ============================================
// WHATSAPP
// ============================================
function initWhatsApp() {
    // Formata a mensagem para WhatsApp
    function formatWhatsAppMessage(customMessage = null) {
        const message = customMessage || CONFIG.whatsappMessage;
        return encodeURIComponent(message);
    }
    
    // Abre WhatsApp
    function openWhatsApp(customMessage = null) {
        const message = formatWhatsAppMessage(customMessage);
        const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
        window.open(url, '_blank');
    }
    
    // Adiciona evento aos botões de WhatsApp
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const customMessage = button.getAttribute('data-message');
            openWhatsApp(customMessage);
        });
    });
    
    // Botão flutuante
    const floatButton = document.querySelector('.whatsapp-float');
    if (floatButton) {
        floatButton.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora # sozinho
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// ANIMAÇÃO DE SCROLL
// ============================================
function initScrollAnimation() {
    const elements = document.querySelectorAll('.produto-card, .diferencial-item, .step, .bairro-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// HEADER STICKY COM SOMBRA
// ============================================
function initStickyHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// ============================================
// BUSCA DE BAIRRO
// ============================================
function initBairroSearch() {
    const searchInput = document.getElementById('bairro-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const bairroLinks = document.querySelectorAll('.bairro-link');
            
            bairroLinks.forEach(link => {
                const bairroName = link.textContent.toLowerCase();
                
                if (bairroName.includes(searchTerm)) {
                    link.style.display = 'block';
                } else {
                    link.style.display = 'none';
                }
            });
        });
    }
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta dados do formulário
            const nome = form.querySelector('[name="nome"]').value;
            const telefone = form.querySelector('[name="telefone"]').value;
            const bairro = form.querySelector('[name="bairro"]').value;
            const mensagem = form.querySelector('[name="mensagem"]').value;
            
            // Monta mensagem para WhatsApp
            const whatsappMessage = `*Novo Pedido de Gás*\n\nNome: ${nome}\nTelefone: ${telefone}\nBairro: ${bairro}\nMensagem: ${mensagem}`;
            
            // Abre WhatsApp
            const message = encodeURIComponent(whatsappMessage);
            const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
            window.open(url, '_blank');
            
            // Limpa formulário
            form.reset();
            
            // Mensagem de sucesso
            alert('Redirecionando para o WhatsApp...');
        });
    }
}

// ============================================
// DETECTA LOCALIZAÇÃO (OPCIONAL)
// ============================================
function detectUserLocation() {
    if ('geolocation' in navigator) {
        // Apenas salva no localStorage para uso futuro
        navigator.geolocation.getCurrentPosition(
            position => {
                localStorage.setItem('userLat', position.coords.latitude);
                localStorage.setItem('userLng', position.coords.longitude);
            },
            error => {
                console.log('Localização não disponível');
            }
        );
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initWhatsApp();
    initSmoothScroll();
    initScrollAnimation();
    initStickyHeader();
    initBairroSearch();
    initContactForm();
    detectUserLocation();
    
    console.log('✅ Gás Campo Grande - Site carregado com sucesso!');
});

// ============================================
// UTILITÁRIOS
// ============================================

// Mascara de telefone
function maskPhone(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = value;
}

// Aplica máscara se existir campo de telefone
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
        maskPhone(this);
    });
});