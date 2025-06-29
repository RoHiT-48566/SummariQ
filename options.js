document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["geminiAPIKey"], ({ geminiAPIKey }) => {
    if (geminiAPIKey) document.getElementById("api-key").value = geminiAPIKey;
  });
  document.getElementById("save-button").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value.trim();
    if (apiKey) {
      chrome.storage.sync.set({ geminiAPIKey: apiKey }, () => {
        document.getElementById("success-message").style.display = "block";
        setTimeout(() => window.close(), 1000);
      });
    } else {
      alert("Please enter a valid API Key.");
    }
  });
});
