const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrPlaceholder = document.getElementById('qrPlaceholder');
const loadingSpinner = document.getElementById('loadingSpinner');

let qrCodeInstance = null;

generateBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();

    if (!url) {
        urlInput.focus();
        urlInput.style.borderColor = '#ff4757';
        setTimeout(() => urlInput.style.borderColor = '', 2000);
        return;
    }

    // Show loading
    qrPlaceholder.style.display = 'none';
    loadingSpinner.style.display = 'block';

    // Small delay to show loading animation
    setTimeout(() => {
        try {
            // Clear previous QR code
            if (qrCodeInstance) {
                qrContainer.innerHTML = '';
                qrCodeInstance = null;
            }

            // Create QR code container
            const qrDiv = document.createElement('div');
            qrDiv.id = 'qrcode';
            qrDiv.style.display = 'flex';
            qrDiv.style.justifyContent = 'center';
            qrDiv.style.alignItems = 'center';
            qrDiv.style.padding = '20px';
            qrDiv.style.background = 'white';
            qrDiv.style.borderRadius = '12px';

            qrContainer.innerHTML = '';
            qrContainer.appendChild(qrDiv);

            // Check if QRCode library is loaded
            if (typeof QRCode === 'undefined') {
                throw new Error('QRCode library not loaded');
            }

            // Generate QR code
            qrCodeInstance = new QRCode(qrDiv, {
                text: url,
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            loadingSpinner.style.display = 'none';
            qrContainer.classList.add('active');

        } catch (error) {
            console.error('Error generating QR code:', error);
            loadingSpinner.style.display = 'none';
            qrPlaceholder.style.display = 'flex';

            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.style.color = '#ff4757';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.marginTop = '10px';
            errorMsg.textContent = 'Error: ' + error.message;
            qrContainer.appendChild(errorMsg);
        }
    }, 300);
});

// Allow Enter key to submit
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateBtn.click();
    }
});

// Check if library loaded on page load
window.addEventListener('load', () => {
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library failed to load');
    } else {
        console.log('QRCode library loaded successfully');
    }
});
