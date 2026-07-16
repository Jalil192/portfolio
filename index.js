document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const accordionButtons = document.querySelectorAll(".accordion-btn");

    // Mode sombre sauvegardé
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");

        if (toggleDarkMode) {
            toggleDarkMode.querySelector(".dark-toggle-icon").textContent = "☀️";
            toggleDarkMode.querySelector(".dark-toggle-text").textContent = "Clair";
        }
    }

    // Bouton mode sombre
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const isDarkMode = document.body.classList.contains("dark-mode");
            const icon = this.querySelector(".dark-toggle-icon");
            const text = this.querySelector(".dark-toggle-text");

            if (isDarkMode) {
                localStorage.setItem("darkMode", "enabled");
                icon.textContent = "☀️";
                text.textContent = "Clair";
            } else {
                localStorage.setItem("darkMode", "disabled");
                icon.textContent = "🌙";
                text.textContent = "Sombre";
            }
        });
    }

    // Accordéons section About
    accordionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const currentBox = this.closest(".accordion-box");
            const icon = currentBox.querySelector(".accordion-icon");
            const isActive = currentBox.classList.contains("active");

            document.querySelectorAll(".accordion-box").forEach(function (box) {
                box.classList.remove("active");
                box.querySelector(".accordion-icon").textContent = "+";
            });

            if (!isActive) {
                currentBox.classList.add("active");
                icon.textContent = "−";
            }
        });
    });

    // Validation formulaire
    // Validation formulaire + envoi Formspree
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        let isValid = true;

        const nomError = document.getElementById("nomError");
        const prenomError = document.getElementById("prenomError");
        const mailError = document.getElementById("mailError");
        const messageError = document.getElementById("messageError");

        nomError.textContent = "";
        prenomError.textContent = "";
        mailError.textContent = "";
        messageError.textContent = "";

        const nom = document.getElementById("nom").value.trim();
        const prenom = document.getElementById("prenom").value.trim();
        const mail = document.getElementById("mail").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nom === "") {
            nomError.textContent = "Le nom est requis.";
            isValid = false;
        }

        if (prenom === "") {
            prenomError.textContent = "Le prénom est requis.";
            isValid = false;
        }

        if (mail === "") {
            mailError.textContent = "L'email est requis.";
            isValid = false;
        } else if (!emailPattern.test(mail)) {
            mailError.textContent = "Veuillez entrer un email valide.";
            isValid = false;
        }

        if (message === "") {
            messageError.textContent = "Le message est requis.";
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });
}
});
