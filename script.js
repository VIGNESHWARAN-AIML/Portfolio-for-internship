"use strict";

/* ================================
   CURRENT YEAR
================================ */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ================================
   MOBILE NAVIGATION
================================ */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


/* ================================
   CONTACT FORM
================================ */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const formStatus = document.getElementById("form-status");


    function setError(input, errorElement, message) {

        input.setAttribute("aria-invalid", "true");
        errorElement.textContent = message;

    }


    function clearError(input, errorElement) {

        input.removeAttribute("aria-invalid");
        errorElement.textContent = "";

    }


    function validateForm() {

        let valid = true;

        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(messageInput, messageError);

        formStatus.textContent = "";


        if (nameInput.value.trim().length < 2) {

            setError(
                nameInput,
                nameError,
                "Please enter your name."
            );

            valid = false;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value.trim())) {

            setError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );

            valid = false;
        }


        if (messageInput.value.trim().length < 10) {

            setError(
                messageInput,
                messageError,
                "Please enter at least 10 characters."
            );

            valid = false;
        }


        return valid;

    }


    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!validateForm()) {

            formStatus.textContent =
                "Please correct the errors above.";

            const firstInvalid =
                contactForm.querySelector(
                    '[aria-invalid="true"]'
                );

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }


        formStatus.textContent =
            "Thank you! Your message has been validated successfully.";

        contactForm.reset();

    });

}