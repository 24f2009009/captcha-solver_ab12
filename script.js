document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('captcha');
    const ctx = canvas.getContext('2d');
    const input = document.getElementById('captcha-input');
    const checkBtn = document.getElementById('check-btn');
    const reloadBtn = document.getElementById('reload-btn');
    const solveBtn = document.getElementById('solve-btn');
    const statusDiv = document.getElementById('status');

    let captchaText = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateCaptcha() {
        captchaText = '';
        for (let i = 0; i < 6; i++) {
            captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        drawCaptcha();
        statusDiv.textContent = '';
        input.value = '';
    }

    function drawCaptcha() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Add some noise
        for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        // Draw text with some distortion
        for (let i = 0; i < captchaText.length; i++) {
            const char = captchaText[i];
            const x = 25 + i * 25;
            const y = canvas.height / 2 + (Math.random() - 0.5) * 10;
            const angle = (Math.random() - 0.5) * 0.4; // radians
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillText(char, 0, 0);
            ctx.restore();
        }
    }

    function checkCaptcha() {
        if (input.value.toLowerCase() === captchaText.toLowerCase()) {
            statusDiv.textContent = 'Correct!';
            statusDiv.style.color = 'green';
        } else {
            statusDiv.textContent = 'Incorrect, please try again.';
            statusDiv.style.color = 'red';
        }
    }

    function solveCaptcha() {
        input.value = captchaText;
    }

    checkBtn.addEventListener('click', checkCaptcha);
    reloadBtn.addEventListener('click', generateCaptcha);
    solveBtn.addEventListener('click', solveCaptcha);

    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkCaptcha();
        }
    });

    generateCaptcha();
});