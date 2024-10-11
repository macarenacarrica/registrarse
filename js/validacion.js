document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = {
        nombre: document.getElementById('nombre'),
        apellido: document.getElementById('apellido'),
        email: document.getElementById('email'),
        password1: document.getElementById('password1'),
        password2: document.getElementById('password2'),
        terminos: document.getElementById('terminos')
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputs.email.value && !emailRegex.test(inputs.email.value)) {
            inputs.email.setCustomValidity('El email debe tener un formato válido.');
        } else {
            inputs.email.setCustomValidity('');
        }
    };

    const validatePasswords = () => {
        if (inputs.password1.value.length < 6) {
            inputs.password1.setCustomValidity('La contraseña debe tener al menos 6 caracteres.');
        } else {
            inputs.password1.setCustomValidity('');
        }

        if (inputs.password2.value !== inputs.password1.value) {
            inputs.password2.setCustomValidity('Las contraseñas no coinciden.');
        } else {
            inputs.password2.setCustomValidity('');
        }
    };

    const validateTerms = () => {
        const errorMessage = document.getElementById('error-terminos');
        if (!inputs.terminos.checked) {
            inputs.terminos.setCustomValidity('Debes aceptar los términos del servicio.');
            errorMessage.textContent = 'Debes aceptar los términos del servicio.';
            errorMessage.style.display = 'inline'; // Muestra el mensaje de error
        } else {
            inputs.terminos.setCustomValidity('');
            errorMessage.textContent = ''; // Limpia el mensaje de error
            errorMessage.style.display = 'none'; // Oculta el mensaje
        }
    };
    
    const validateAll = () => {
        let isValid = true;

        // Valida todos los campos
        Object.values(inputs).forEach(input => {
            input.checkValidity(); // Actualiza la validez de cada campo
            input.classList.toggle('is-invalid', !input.checkValidity());
            input.classList.toggle('is-valid', input.checkValidity());
            if (!input.checkValidity()) {
                isValid = false;
            }
        });

        return isValid;
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Valida todos los campos
        validateEmail();
        validatePasswords();
        validateTerms();

        const valid = validateAll();

        if (valid) {
            alert('Formulario enviado con éxito.');
            form.submit(); 
        } else {
            alert('Por favor, completa todos los campos requeridos.');
        }
    });

    Object.values(inputs).forEach(input => {
        input.addEventListener('input', () => {
            input.classList.toggle('is-invalid', !input.checkValidity());
            input.classList.toggle('is-valid', input.checkValidity());
            if (input === inputs.email) validateEmail();
            if (input === inputs.password1 || input === inputs.password2) validatePasswords();
            if (input === inputs.terminos) validateTerms();
        });
    });
});
