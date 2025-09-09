// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
        hamburger.children[0].style.transform = 'rotate(45deg) translateY(8px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.children[0].style.transform = 'none';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect
const parallaxBg = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
    if (parallaxBg) {
        const scrolled = window.pageYOffset;
        const rect = parallaxBg.parentElement.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            parallaxBg.style.transform = `translateY(${yPos}px)`;
        }
    }
});

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale');

function revealOnScroll() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on load

// Menu category filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item, .decorative-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter items
        menuItems.forEach(item => {
            if (category === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else if (item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Show/hide sections
        const flavorSection = document.getElementById('flavors-section');
        const decorativeSection = document.querySelector('.decorative-section');
        
        if (category === 'flavors') {
            flavorSection.style.display = 'block';
            decorativeSection.style.display = 'none';
        } else if (category === 'decorative') {
            flavorSection.style.display = 'none';
            decorativeSection.style.display = 'block';
        } else {
            flavorSection.style.display = 'block';
            decorativeSection.style.display = 'block';
        }
    });
});

// Order button WhatsApp link
const orderButton = document.querySelector('.order-button');
if (orderButton) {
    orderButton.addEventListener('click', () => {
        const message = 'Olá! Gostaria de fazer um pedido de pudim.';
        const whatsappUrl = `https://wa.me/15513925611?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Form validation and animation
const form = document.querySelector('#contact-form');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Handle form submission with loading state
if (form) {
    form.addEventListener('submit', (e) => {
        const button = form.querySelector('.submit-button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<span>Enviando...</span><div class="button-bg"></div>';
        button.disabled = true;
        
        // Form will submit normally to FormSubmit
        // Note: FormSubmit will handle the actual email sending
    });
}

// Smooth number counter animation for features
const featureNumbers = document.querySelectorAll('.feature-number');
const animateNumbers = () => {
    featureNumbers.forEach(number => {
        const rect = number.getBoundingClientRect();
        if (rect.top < window.innerHeight && !number.classList.contains('animated')) {
            number.classList.add('animated');
            const finalNumber = parseInt(number.textContent);
            let currentNumber = 0;
            
            const increment = setInterval(() => {
                currentNumber++;
                number.textContent = currentNumber.toString().padStart(2, '0');
                
                if (currentNumber >= finalNumber) {
                    clearInterval(increment);
                }
            }, 50);
        }
    });
};

window.addEventListener('scroll', animateNumbers);
animateNumbers();

// Hero text animation on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-logo, .hero-subtitle, .cta-button, .hero-image');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, index * 100);
    });
});

// Magnetic button effect
const magneticButtons = document.querySelectorAll('.cta-button, .submit-button');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Smooth fade-in for images as they load
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
});

// Interactive scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrollProgress + '%';
});

// Language selector functionality
const langButtons = document.querySelectorAll('.lang-btn');
const translations = {
    pt: {
        nav: {
            home: 'Início',
            about: 'Sobre',
            gallery: 'Galeria',
            contact: 'Contato'
        },
        hero: {
            subtitle: 'Pudins Artesanais Feitos com Amor'
        },
        about: {
            title1: 'Perfeição',
            title2: 'Artesanal',
            text: 'Cada pudim conta uma história de tradição, paciência e paixão. Nossas sobremesas são cuidadosamente elaboradas usando receitas tradicionais e os melhores ingredientes.',
            feature1: 'Ingredientes Premium',
            feature1desc: 'Selecionados com cuidado',
            feature2: 'Receita Tradicional',
            feature2desc: 'Aperfeiçoada através de gerações',
            feature3: 'Feito Diariamente',
            feature3desc: 'Sempre no ponto perfeito'
        },
        menu: {
            title1: 'Nosso',
            title2: 'Menu',
            all: 'Todos',
            flavors: 'Sabores',
            decorative: 'Decorativos',
            subtitle1: 'Sabores Artesanais',
            subtitle2: 'Pudins Decorativos',
            decorativeIntro: 'Perfeitos para tornar seus eventos ainda mais especiais',
            note: 'Tamanhos disponíveis: Individual (150g) • Médio (600g) • Grande (1.2kg)',
            items: {
                tradicional: {
                    name: 'Tradicional',
                    desc: 'Receita original da casa com calda de caramelo perfeita'
                },
                brigadeiro: {
                    name: 'Brigadeiro',
                    desc: 'Cobertura de chocolate e granulado artesanal'
                },
                cafe: {
                    name: 'Café',
                    desc: 'Infusão de café especial com toque de chocolate'
                },
                romeuJulieta: {
                    name: 'Romeu e Julieta',
                    desc: 'Queijo cremoso com calda de goiabada artesanal'
                },
                frutasVermelhas: {
                    name: 'Frutas Vermelhas',
                    desc: 'Coberto com mix de berries frescos e calda especial'
                },
                cocada: {
                    name: 'Cocada',
                    desc: 'Coco ralado fresco com toque caramelizado'
                }
            },
            decorativeItems: {
                corporativo: {
                    name: 'Eventos Corporativos',
                    desc: 'Mini pudins em potes decorados com flores e colheres douradas',
                    tag: 'Corporativo • Brindes'
                },
                sweet15: {
                    name: 'Festa de 15 Anos',
                    desc: 'Lembrancinhas elegantes com detalhes em roxo e dourado',
                    tag: 'Debutantes • Formaturas'
                },
                tematicas: {
                    name: 'Edições Temáticas',
                    desc: 'Pudins decorados para Páscoa com embalagens especiais',
                    tag: 'Páscoa • Datas Comemorativas'
                },
                festas: {
                    name: 'Festas Temáticas',
                    desc: 'Decorações personalizadas com tema de abelhinhas e girassóis',
                    tag: 'Aniversários Infantis • Chá de Bebê'
                }
            }
        },
        contact: {
            title1: 'Entre em',
            title2: 'Contato',
            info: 'Contato',
            formName: 'Seu Nome',
            formEmail: 'Seu E-mail',
            formMessage: 'Sua Mensagem',
            submit: 'Enviar Mensagem'
        },
        orderBtn: 'Fazer Pedido via WhatsApp',
        scroll: 'Role para explorar'
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            gallery: 'Gallery',
            contact: 'Contact'
        },
        hero: {
            subtitle: 'Artisanal Puddings Made with Love'
        },
        about: {
            title1: 'Artisanal',
            title2: 'Perfection',
            text: 'Every pudding tells a story of tradition, patience, and passion. Our desserts are carefully crafted using time-honored recipes and the finest ingredients.',
            feature1: 'Premium Ingredients',
            feature1desc: 'Carefully selected',
            feature2: 'Traditional Recipe',
            feature2desc: 'Perfected through generations',
            feature3: 'Made Fresh Daily',
            feature3desc: 'Always at peak flavor'
        },
        menu: {
            title1: 'Our',
            title2: 'Menu',
            all: 'All',
            flavors: 'Flavors',
            decorative: 'Decorative',
            subtitle1: 'Artisanal Flavors',
            subtitle2: 'Decorative Puddings',
            decorativeIntro: 'Perfect to make your events even more special',
            note: 'Available sizes: Individual (150g) • Medium (600g) • Large (1.2kg)',
            items: {
                tradicional: {
                    name: 'Traditional',
                    desc: 'Our signature recipe with perfect caramel sauce'
                },
                brigadeiro: {
                    name: 'Brigadeiro',
                    desc: 'Chocolate topping with artisanal sprinkles'
                },
                cafe: {
                    name: 'Coffee',
                    desc: 'Special coffee infusion with a touch of chocolate'
                },
                romeuJulieta: {
                    name: 'Romeo & Juliet',
                    desc: 'Creamy cheese with artisanal guava sauce'
                },
                frutasVermelhas: {
                    name: 'Red Berries',
                    desc: 'Topped with fresh berry mix and special sauce'
                },
                cocada: {
                    name: 'Coconut',
                    desc: 'Fresh grated coconut with caramelized touch'
                }
            },
            decorativeItems: {
                corporativo: {
                    name: 'Corporate Events',
                    desc: 'Mini puddings in decorated jars with flowers and golden spoons',
                    tag: 'Corporate • Gifts'
                },
                sweet15: {
                    name: 'Sweet 15 Party',
                    desc: 'Elegant favors with purple and gold details',
                    tag: 'Quinceañeras • Graduations'
                },
                tematicas: {
                    name: 'Themed Editions',
                    desc: 'Easter-decorated puddings with special packaging',
                    tag: 'Easter • Special Dates'
                },
                festas: {
                    name: 'Themed Parties',
                    desc: 'Personalized decorations with bee and sunflower theme',
                    tag: 'Kids Birthdays • Baby Shower'
                }
            }
        },
        contact: {
            title1: 'Get in',
            title2: 'Touch',
            info: 'Contact',
            formName: 'Your Name',
            formEmail: 'Your Email',
            formMessage: 'Your Message',
            submit: 'Send Message'
        },
        orderBtn: 'Order via WhatsApp',
        scroll: 'Scroll to explore'
    }
};

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const lang = btn.dataset.lang;
        updateLanguage(lang);
    });
});

function updateLanguage(lang) {
    const t = translations[lang];
    
    // Update navigation
    document.querySelector('[href="#home"]').textContent = t.nav.home;
    document.querySelector('[href="#about"]').textContent = t.nav.about;
    document.querySelector('[href="#gallery"]').textContent = t.nav.gallery;
    document.querySelector('[href="#contact"]').textContent = t.nav.contact;
    
    // Update hero section
    document.querySelector('.hero-subtitle').textContent = t.hero.subtitle;
    document.querySelector('.scroll-indicator span').textContent = t.scroll;
    
    // Update about section
    const aboutTitle = document.querySelector('#about .section-title');
    aboutTitle.children[0].textContent = t.about.title1;
    aboutTitle.children[1].textContent = t.about.title2;
    document.querySelector('.about-text').textContent = t.about.text;
    
    // Update features
    const features = document.querySelectorAll('.feature-item h3');
    const featureDescs = document.querySelectorAll('.feature-item p');
    features[0].textContent = t.about.feature1;
    featureDescs[0].textContent = t.about.feature1desc;
    features[1].textContent = t.about.feature2;
    featureDescs[1].textContent = t.about.feature2desc;
    features[2].textContent = t.about.feature3;
    featureDescs[2].textContent = t.about.feature3desc;
    
    // Update menu section
    const menuTitle = document.querySelector('#gallery .section-title');
    menuTitle.children[0].textContent = t.menu.title1;
    menuTitle.children[1].textContent = t.menu.title2;
    
    // Update category buttons
    document.querySelector('[data-category="all"]').textContent = t.menu.all;
    document.querySelector('[data-category="flavors"]').textContent = t.menu.flavors;
    document.querySelector('[data-category="decorative"]').textContent = t.menu.decorative;
    
    // Update menu subtitles
    document.querySelectorAll('.menu-subtitle')[0].textContent = t.menu.subtitle1;
    document.querySelectorAll('.menu-subtitle')[1].textContent = t.menu.subtitle2;
    
    // Update decorative intro
    document.querySelector('.decorative-intro').textContent = t.menu.decorativeIntro;
    
    // Update menu note
    document.querySelector('.menu-note').textContent = t.menu.note;
    
    // Update contact section
    const contactTitle = document.querySelector('#contact .section-title');
    contactTitle.children[0].textContent = t.contact.title1;
    contactTitle.children[1].textContent = t.contact.title2;
    
    // Update contact info
    document.querySelector('.info-item h3').textContent = t.contact.info;
    
    // Update form placeholders
    document.querySelector('input[name="name"]').placeholder = t.contact.formName;
    document.querySelector('input[name="email"]').placeholder = t.contact.formEmail;
    document.querySelector('textarea[name="message"]').placeholder = t.contact.formMessage;
    document.querySelector('.submit-button span').textContent = t.contact.submit;
    
    // Update menu item names and descriptions
    const menuItems = document.querySelectorAll('.menu-item');
    const menuItemData = [
        t.menu.items.tradicional,
        t.menu.items.brigadeiro,
        t.menu.items.cafe,
        t.menu.items.romeuJulieta,
        t.menu.items.frutasVermelhas,
        t.menu.items.cocada
    ];
    
    menuItems.forEach((item, index) => {
        if (menuItemData[index]) {
            const h4 = item.querySelector('.menu-content h4');
            const desc = item.querySelector('.menu-description');
            if (h4) h4.textContent = menuItemData[index].name;
            if (desc) desc.textContent = menuItemData[index].desc;
        }
    });
    
    // Update decorative item names, descriptions, and tags
    const decorativeItems = document.querySelectorAll('.decorative-card');
    const decorativeData = [
        t.menu.decorativeItems.corporativo,
        t.menu.decorativeItems.sweet15,
        t.menu.decorativeItems.tematicas,
        t.menu.decorativeItems.festas
    ];
    
    decorativeItems.forEach((item, index) => {
        if (decorativeData[index]) {
            const h4 = item.querySelector('.decorative-content h4');
            const desc = item.querySelector('.decorative-description');
            const tag = item.querySelector('.decorative-tag');
            if (h4) h4.textContent = decorativeData[index].name;
            if (desc) desc.textContent = decorativeData[index].desc;
            if (tag) tag.textContent = decorativeData[index].tag;
        }
    });
    
    // Update order button
    document.querySelector('.order-button span').textContent = t.orderBtn;
}

// Add page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});