
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded.');

    const form = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const timerInfo = document.getElementById('timer-info'); // The DIV to display time
    const formElements = form.querySelectorAll('input, textarea');

    if (!form || !confirmationMessage || !timerInfo || formElements.length === 0) {
        console.error('ERROR: Required form elements missing!');
        return;
    }


    timerInfo.style.display = 'none';
    confirmationMessage.style.display = 'none';
    console.log('Initial state: Messages hidden.');

    let startTime = null;
    let timerRunning = false;
    let formFocusedOnce = false;

    const startTimer = (event) => {
        console.log(`Focus: ${event.target.id}`);
        if (!formFocusedOnce) {
            startTime = Date.now();
            timerRunning = true;
            formFocusedOnce = true;
            console.log(`Timer started: ${startTime}`);
            timerInfo.textContent = ''; 
            timerInfo.style.display = 'none'; 
        } else {
             console.log('Focus, timer already started.');
        }
    };

    formElements.forEach(element => {
        element.addEventListener('focus', startTimer);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Submit triggered.');

        if (!form.checkValidity()) {
            console.warn('Form invalid.');
            form.reportValidity();
            timerInfo.style.display = 'none'; 
            return;
        }

        console.log('Form valid.');
        let timeTaken = 0;

        console.log(`State check: timerRunning=${timerRunning}, startTime=${startTime}`);
        if (timerRunning && startTime) {
            const endTime = Date.now();
            timeTaken = ((endTime - startTime) / 1000).toFixed(2);
            const message = `Form filled in ${timeTaken} seconds.`;
            console.log(`Calculation: ${message}`);

            timerInfo.textContent = message;
            timerInfo.style.display = 'block'; 
            console.log(`UI Update: Set #timer-info text and display='${timerInfo.style.display}'`);

             setTimeout(() => { 
                const computedStyle = window.getComputedStyle(timerInfo);
                console.log(`Computed display style for #timer-info: ${computedStyle.display}`);
             }, 0);

        } else {
            const warningMessage = `Time tracking requires focusing on a form field first.`;
            timerInfo.textContent = warningMessage;
            timerInfo.style.display = 'block'; // Show warning
            console.warn(`Timer did not run. Displaying warning.`);
        }

        confirmationMessage.style.display = 'block';
        console.log('UI Update: Confirmation displayed.');

        setTimeout(() => {
            confirmationMessage.style.display = 'none';
             console.log('UI Update: Confirmation hidden.');
        }, 5000);

        form.reset(); 

        startTime = null;
        timerRunning = false;
        formFocusedOnce = false;
        console.log('State Reset.');
    });

    form.addEventListener('reset', () => {
        console.log('Reset event.');
        confirmationMessage.style.display = 'none';
        timerInfo.textContent = '';
        timerInfo.style.display = 'none'; 
        
        startTime = null;
        timerRunning = false;
        formFocusedOnce = false;
        console.log('State Reset on reset event.');
    });

     console.log('Listeners active.');
});