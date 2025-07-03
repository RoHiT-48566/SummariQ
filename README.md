# 🌟 SummariQ

**SummariQ** is a lightweight yet powerful Chrome Extension that instantly summarizes online articles using Google's **Gemini 1.5 API**. Whether you're reading tech blogs, research papers, or news — SummariQ helps you consume content faster with **Brief**, **Detailed**, or **Bullet Point** summaries.

---

## 🚀 Features

- 🧠 **AI-Powered Summarization** using Gemini 1.5 (via API)
- ✨ **Multiple Summary Modes**:
  - Brief (2–3 sentence executive summary)
  - Detailed (multi-paragraph insights)
  - Bullet Points (5–9 key points)
- 📋 **One-Click Copy** to clipboard
- 🖥️ **Responsive, modern UI**
- 🔐 **Secure API Key Storage** via Chrome sync
- ⚡ **Loader animation** for smoother UX
- 📎 Works on **any readable web page**

---

## 🛠️ Installation

1. **Clone this repository**

   ```bash
   git clone https://github.com/RoHiT-48566/SummariQ.git
   cd SummariQ
   ```

2. **Install the extension in Chrome**
   - Visit `chrome://extensions/`
   - Enable **Developer Mode** (top-right)
   - Click **Load Unpacked**
   - Select the project root folder

---

## 🔑 Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Log in with your Google account
3. Generate an API key
4. Copy and save it securely

---

## 🧪 Usage

1. Navigate to any article or blog you wish to summarize
2. Click the **SummariQ icon** in the Chrome toolbar
3. Choose a summary type:
   - ✅ Brief
   - 📘 Detailed
   - 📌 Bullet Points
4. Click **Summarize**
5. Wait for the AI response and click **Copy** to save it!

---

## 📂 Project Structure

```
SummariQ/
│
├── background.js       # Opens options on first install
├── content.js          # Extracts article text from the page
├── icon.png            # Extension icon
├── manifest.json       # Extension metadata and permissions
├── options.html        # UI to enter and save Gemini API Key
├── options.js          # Logic for saving/loading the key
├── popup.html          # Main popup interface
├── popup.js            # Handles summarization logic and API calls
├── README.md           # Project documentation (this file)
```

---

## ⚙️ How It Works

- **Content Script (`content.js`)**  
  Extracts the main readable content from the current tab using DOM parsing.

- **Popup (`popup.html` & `popup.js`)**  
  Lets users choose the summary type, triggers the Gemini API call, shows loader, and displays formatted output.

- **Options (`options.html` & `options.js`)**  
  Lets users securely save their API key using `chrome.storage.sync`.

- **Background (`background.js`)**  
  Detects first-time install and opens the options page.

---

## 🛡️ Permissions

- `activeTab` & `scripting`: Required for reading the article text
- `storage`: For saving your API key securely
- `<all_urls>`: Allows summarization on any website

---

## 🔐 Privacy

Your API key is securely stored **locally** using Chrome's `storage.sync` and is **never shared** with any third party — it is used **only for direct requests** to Google’s Gemini API.

---

## 🧩 Troubleshooting

| Issue                          | Fix                                                               |
| ------------------------------ | ----------------------------------------------------------------- |
| API key not found              | Set your Gemini API key in the extension options                  |
| Could not extract article text | The page may not have standard readable content (like newsreader) |
| Failed to generate summary     | Check your internet, API key, or Gemini quota                     |

---

## 🙌 Credits

- [Google Gemini API](https://ai.google.dev/)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)

---

## 🤝 Contributing

Pull requests, suggestions, and feedback are welcome!

1. Fork the repo
2. Create a new branch (`git checkout -b feature x`)
3. Commit your changes (`git commit -am 'Add feature x'`)
4. Push to the branch (`git push origin feature-x`)
5. Create a Pull Request

---

💬 Created by Rohit M 👍🏻
