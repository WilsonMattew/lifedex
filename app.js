const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resultDiv = document.getElementById('result');
const snapButton = document.getElementById('snap');

// Set up video stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((error) => {
        console.error('Error accessing webcam: ', error);
        resultDiv.innerHTML = `<p>Unable to access the camera: ${error.message}</p>`;
    });

// Snap photo and send to mock API
snapButton.addEventListener('click', () => {
    if (video.srcObject) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg');

            // Mock API endpoint
            fetch('https://api.mocki.io/v1/ce5f60e2', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                resultDiv.innerHTML = `<h2>Identification Result:</h2><p>${data.result}</p>`;
            })
            .catch((error) => {
                console.error('Error:', error);
                resultDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
            });
        });
    } else {
        resultDiv.innerHTML = '<p>No video stream available.</p>';
    }
});
