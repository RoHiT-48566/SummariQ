document.getElementById("summarize").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  const loader = document.getElementById("loader");
  const summaryType = document.getElementById("summary-type").value;

  // Show loader and clear previous result
  loader.style.display = "block";
  resultDiv.textContent = "";

  // Get API key from storage
  chrome.storage.sync.get(["geminiAPIKey"], async (result) => {
    if (!result.geminiAPIKey) {
      loader.style.display = "none";
      resultDiv.textContent =
        "API key not found. Please set your Gemini API Key in options.";
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_ARTICLE_TEXT" },
        async (res) => {
          if (!res || !res.text) {
            loader.style.display = "none";
            resultDiv.innerText =
              "Could not extract article text from this page.";
            return;
          }

          try {
            const summary = await getGeminiSummary(
              res.text,
              summaryType,
              result.geminiAPIKey
            );
            loader.style.display = "none";
            resultDiv.innerText = summary;
          } catch (error) {
            loader.style.display = "none";
            resultDiv.innerText = `Error: ${
              error.message || "Failed to generate summary."
            }`;
          }
        }
      );
    });
  });
});

document.getElementById("copy-btn").addEventListener("click", () => {
  const summaryText = document.getElementById("result").innerText;

  if (summaryText && summaryText.trim() !== "") {
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        const copyBtn = document.getElementById("copy-btn");
        const originalText = copyBtn.innerText;

        copyBtn.innerText = "Copied!";
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }
});

async function getGeminiSummary(text, summaryType, apiKey) {
  // Truncate very long texts to avoid API limits (typically around 30K tokens)
  const maxLength = 30000;
  const truncatedText =
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  let prompt;
  switch (summaryType) {
    case "brief":
      prompt = `
      You are a world-class summarization AI that writes precise, executive-level overviews.
      Summarize the article below in **exactly 2–3 crisp sentences**, covering only the **core idea and most critical insights**. Avoid any background, examples, or fluff.
      Respond in professional tone, and do not repeat phrases.
      --- ARTICLE START ---
      ${truncatedText}
      --- ARTICLE END ---
      `;
      break;
    case "detailed":
      prompt = `
      You are a senior analyst AI with deep comprehension skills.
      Write a **detailed, structured summary** of the following article. Organize your response in **short paragraphs**, each covering a major theme or section.
      Focus on:
      - The main argument or thesis
      - Supporting points and examples
      - Any conclusions or insights
      Keep your tone informative, neutral, and **avoid listing**. Use fluent, human-like language.
      --- ARTICLE START ---
      ${truncatedText}
      --- ARTICLE END ---
      `;
      break;
    case "bullets":
      prompt = `
      You are a summarizer optimized for technical and business content.
      Summarize the following article into **5 to 9 bullet points**, each starting with a **dash (-)** followed by a **space**, using **Markdown formatting**.
      Rules:
      - Focus only on **major insights or actionable ideas**
      - **No introductory phrases** like "This article talks about..."
      - **No asterisks, numbers, or extra whitespace**
      - Use clear and concise language
      --- ARTICLE START ---
      ${truncatedText}
      --- ARTICLE END ---
      `;
      break;
    default:
      prompt = `
      You are a highly trained summarization engine. Summarize the following article into **2 short paragraphs**.
      Cover:
      - The main point or argument in the first paragraph
      - Supporting ideas, examples, or outcomes in the second
      Avoid intro phrases and be objective.
      --- ARTICLE START ---
      ${truncatedText}
      --- ARTICLE END ---
      `;
      break;
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary available."
    );
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary. Please try again later.");
  }
}
