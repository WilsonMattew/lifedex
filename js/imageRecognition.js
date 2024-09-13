
// Function to handle image upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.onload = function() {
        // Resize image if needed
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300; // Set desired width
        canvas.height = canvas.width * img.height / img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob(function(blob) {
          // Send blob to image recognition API
          recognizeImage(blob);
        }, 'image/jpeg', 0.8);
      }
    }
    reader.readAsDataURL(file);
  }
}

// Function to send image to recognition API
async function recognizeImage(imageBlob) {
  const apiKey = 'AIzaSyBhoxew_lxyIHDWUlV4JDJcLAhdu7Housg';
  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  // Convert blob to base64
  const base64Image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(imageBlob);
  });

  const requestBody = {
    requests: [
      {
        image: {
          content: base64Image
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 5
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const result = data.responses[0].labelAnnotations[0];

    displayRecognitionResult({
      name: result.description,
      confidence: result.score,
      category: 'Object',
      details: 'Additional details would go here.'
    });
  } catch (error) {
    console.error('Error during image recognition:', error);
    displayRecognitionResult({
      name: 'Error',
      confidence: 0,
      category: 'Error',
      details: 'An error occurred during image recognition.'
    });
  }
}
// Function to display recognition result
function displayRecognitionResult(result) {
  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = `
    <h3>${result.name}</h3>
    <p>Confidence: ${(result.confidence * 100).toFixed(2)}%</p>
    <p>Category: ${result.category}</p>
    <p>${result.details}</p>
  `;
  document.getElementById('app').appendChild(resultDiv);
}

// Make sure to expose the handleImageUpload function globally
window.handleImageUpload = handleImageUpload;
