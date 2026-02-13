// Vérifie si l'utilisateur est déjà connecté
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('burgerKingLoggedIn');
    const isLoginPage = document.body.classList.contains('login-page');
    
    if (isLoggedIn && isLoginPage) {
        // L'utilisateur est conecté mais sur la page de login, rediriger vers l'accueil
        window.location.href = 'index.html';
    } else if (!isLoggedIn && !isLoginPage) {
        // L'utilisateur n'est pas conecté et essaie d'accéder à la page principale
        window.location.href = 'login.html';
    }
}

// Exécute la vérification au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    
    // Si on est sur la page de login, initialiser le formulaire
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Gère la soumission du formulaire de connexion
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const formError = document.getElementById('formError');
    
    // Réinitialiser les messages d'erreur
    formError.textContent = '';
    clearFieldErrors();
    
    // Validation basique
    if (!validateEmail(email)) {
        showFieldError('email', 'Veuillez entrer une adresse email valide');
        return;
    }
    
    if (password.length < 6) {
        showFieldError('password', 'Le mot de passe doit contenir au moins 6 caractères');
        return;
    }
    
    // Simulation d'une requête serveur (À remplacer par une vraie authentification)
    // Pour cette démo, n'importe quel email/mot de passe valide fonctionne
    simulateLogin(email, password);
}

// Valide le format de l'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Affiche une erreur pour un champ spécifique
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = field.parentElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

// Efface tous les messages d'erreur
function clearFieldErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
}

// Simule la connexion utilisateur
function simulateLogin(email, password) {
    const submitBtn = document.querySelector('.login-btn-submit');
    const originalText = submitBtn.textContent;
    
    // Désactiver le bouton pendant le traitement
    submitBtn.disabled = true;
    submitBtn.textContent = 'Connexion en cours...';
    
    // Simuler un délai réseau de 1.5 secondes
    setTimeout(() => {
        try {
            // Vérification simple (À remplacer par une vraie API)
            if (email && password) {
                // L'authentification réussit
                localStorage.setItem('burgerKingLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('loginTime', new Date().toISOString());
                
                // Animation de succès
                submitBtn.textContent = '✓ Connecté!';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Rediriger vers la page d'accueil après 1 seconde
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        } catch (error) {
            // Gestion des erreurs
            document.getElementById('formError').textContent = 
                'Une erreur est survenue. Veuillez réessayer.';
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }, 1500);
}

// Fonction de déconnexion (à appeler depuis la page principale)
window.logout = function() {
    localStorage.removeItem('burgerKingLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTime');
    window.location.href = 'login.html';
};
