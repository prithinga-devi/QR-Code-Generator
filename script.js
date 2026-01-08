const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrImage = document.getElementById('qrImage');
const qrPlaceholder = document.getElementById('qrPlaceholder');
const loadingSpinner = document.getElementById('loadingSpinner');

let qrCodeInstance = null;

generateBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();

    if (!url) {
        urlInput.focus();
        urlInput.style.borderColor = '#ff4757';
        setTimeout(() => urlInput.style.borderColor = '', 2000);
        return;
    }

    // Show loading
    qrPlaceholder.style.display = 'none';
    qrImage.style.display = 'none';
    loadingSpinner.style.display = 'block';

    try {
        // Clear previous QR code
        if (qrCodeInstance) {
            qrContainer.innerHTML = '<div class="loading" id="loadingSpinner"></div><div class="qr-placeholder" id="qrPlaceholder"><svg title="QR Placeholder" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg><span>Your QR code will appear here</span></div><img id="qrImage" src="" alt="Generated QR Code" style="display: none;">';
            qrCodeInstance = null;
        }

        // Small delay to show loading animation
        await new Promise(resolve => setTimeout(resolve, 300));

        // Create QR code container
        const qrDiv = document.createElement('div');
        qrDiv.style.display = 'flex';
        qrDiv.style.justifyContent = 'center';
        qrDiv.style.alignItems = 'center';
        qrDiv.style.padding = '20px';

        qrContainer.innerHTML = '';
        qrContainer.appendChild(qrDiv);

        // Generate QR code
        qrCodeInstance = new QRCode(qrDiv, {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        qrContainer.classList.add('active');

    } catch (error) {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none';
        qrPlaceholder.style.display = 'flex';
        alert('Failed to generate QR code. Please try again.');
    }
});

// Allow Enter key to submit
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateBtn.click();
    }
});
