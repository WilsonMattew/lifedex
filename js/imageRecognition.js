// Function to handle image upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      recognizeImage(e.target.result);
    }
    reader.readAsDataURL(file);
  }
}

// Function to send image to Gemini AI API
async function recognizeImage(imageDataUrl) {
  const apiKey = 'AIzaSyAwhbybAwJlsAgAyZppD93cgQ_07ROKj5o';
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent';

  const requestBody = {
    contents: [
      {
        parts: [
          { text: "Analyze this image and provide a detailed description of what you see. Include the main subject, any notable features, and potential categories it might fall under." },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: imageDataUrl.split(',')[1]
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 1024,
    }
  };

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const result = processGeminiResponse(data);
    displayRecognitionResult(result);
  } catch (error) {
    console.error('Error during image recognition:', error);
    displayRecognitionResult({
      name: 'Error',
      confidence: 0,
      category: 'Error',
      details: `An error occurred during image recognition: ${error.message}`
    });
  }
}

// Function to process Gemini API response
function processGeminiResponse(data) {
  const text = data.candidates[0].content.parts[0].text;
  
  // Extract key information from the text
  const name = text.split('.')[0].trim();
  const category = text.match(/category: (.+?)[.,]/i)?.[1] || 'Unknown';
  const confidence = 0.9; // Gemini doesn't provide a confidence score, so we use a placeholder

  return {
    name,
    confidence,
    category,
    details: text
  };
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
