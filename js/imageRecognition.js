
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
function recognizeImage(imageBlob) {
  // Here you would typically send the imageBlob to your chosen image recognition API
  // For this example, we'll use a placeholder function
  console.log('Sending image for recognition...');
  
  // Simulating API call with setTimeout
  setTimeout(() => {
    const mockResult = {
      name: 'Golden Retriever',
      confidence: 0.95,
      category: 'Dog',
      details: 'The Golden Retriever is a large-sized breed of dog bred as gun dogs to retrieve shot waterfowl such as ducks and upland game birds during hunting and shooting parties, and were named retriever because of their ability to retrieve shot game undamaged.'
    };
    displayRecognitionResult(mockResult);
  }, 2000);
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
