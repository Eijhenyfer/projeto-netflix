// Obtém o elemento HTML para manipular o atributo data-theme
const htmlElement = document.documentElement;
// Obtém o botão de toggle
const themeToggle = document.getElementById('theme-toggle');
// Obtém o ícone do botão
const themeIcon = document.querySelector('.theme-icon');

// Função para atualizar o ícone baseado no tema atual
function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌞' : '🌙';
}

// Função para aplicar o tema
function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    // Salva a preferência no localStorage
    localStorage.setItem('theme', theme);
}

// Função para obter o tema salvo ou usar a preferência do sistema
function getInitialTheme() {
    // Verifica se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Se não há tema salvo, detecta a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// Inicializa o tema ao carregar a página
function initializeTheme() {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
}

// Event listener para o botão de toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

function savePerfilAtivo(event) {
    const profileLink = event.currentTarget;
    const figure = profileLink.querySelector('figure');
    if (!figure) return;

    const img = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');
    if (img && caption) {
        localStorage.setItem('perfilAtivoNome', caption.textContent.trim());
        localStorage.setItem('perfilAtivoImagem', img.src);
    }
}

function initializeActiveProfileStorage() {
    const profileLinks = document.querySelectorAll('.profile');
    profileLinks.forEach(link => {
        link.addEventListener('click', savePerfilAtivo);
    });
}

// Monitora mudanças na preferência do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Só aplica a mudança do sistema se o usuário não salvou preferência
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Inicializa o tema e o salvamento de perfil quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeActiveProfileStorage();
});

// Se o script estiver carregado após o DOM estar pronto
if (document.readyState !== 'loading') {
    initializeTheme();
    initializeActiveProfileStorage();
}
