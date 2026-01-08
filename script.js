const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrImage = document.getElementById('qrImage');
const qrPlaceholder = document.getElementById('qrPlaceholder');
const loadingSpinner = document.getElementById('loadingSpinner');

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
        const response = await fetch('http://localhost:3001/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) throw new Error('Failed to generate');

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        qrImage.src = imageUrl;
        qrImage.onload = () => {
            loadingSpinner.style.display = 'none';
            qrImage.style.display = 'block';
            qrContainer.classList.add('active');
        };

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
