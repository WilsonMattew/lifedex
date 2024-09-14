// We need to add these script tags to the HTML file:
// <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
// <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet"></script>

let model;

// Load the MobileNet model
async function loadModel() {
  model = await mobilenet.load();
  console.log('MobileNet model loaded');
}

// Call loadModel when the page loads
loadModel();

// Function to handle image upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.onload = function() {
        recognizeImage(img);
      }
      img.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
}

// Function to recognize the image
async function recognizeImage(imgElement) {
  if (!model) {
    console.log('Model not loaded yet, please wait and try again.');
    return;
  }

  try {
    const predictions = await model.classify(imgElement);
    displayRecognitionResult(predictions[0]);
  } catch (error) {
    console.error('Error during image recognition:', error);
    displayRecognitionResult({
      className: 'Error',
      probability: 0,
      details: `An error occurred during image recognition: ${error.message}`
    });
  }
}

// Function to display recognition result
function displayRecognitionResult(result) {
  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = `
    <h3>${result.className}</h3>
    <p>Confidence: ${(result.probability * 100).toFixed(2)}%</p>
    <p>Category: Image Classification</p>
    <p>Top prediction from MobileNet model</p>
  `;
  document.getElementById('app').appendChild(resultDiv);
}

// Make sure to expose the handleImageUpload function globally
window.handleImageUpload = handleImageUpload;
