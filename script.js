 const API_KEY = "YOUR_API_KEY_HERE"; // 🔴 PUT YOUR API KEY HERE

async function callAPI(prompt) {
  document.getElementById("output").innerHTML = "⏳ Thinking...";

  try {
    const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log(data);

    if (!data.candidates) {
      return "Error: " + JSON.stringify(data);
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    return "Error: " + error.message;
  }
}

function addToHistory(text) {
  const historyDiv = document.getElementById("history");

  const item = document.createElement("div");
  item.innerText = "• " + text.substring(0, 40) + "...";
  item.style.cursor = "pointer";

  item.onclick = () => {
    document.getElementById("output").innerText = text;
  };

  historyDiv.prepend(item);
}

/* FEATURES */

async function summarize() {
  const input = document.getElementById("inputText").value;

  const prompt = `Summarize:\n${input}`;

  const result = await callAPI(prompt);
  document.getElementById("output").innerText = result;

  if (!result.startsWith("Error")) addToHistory(result);
}

async function questions() {
  const input = document.getElementById("inputText").value;

  const prompt = `Generate questions:\n${input}`;

  const result = await callAPI(prompt);
  document.getElementById("output").innerText = result;

  if (!result.startsWith("Error")) addToHistory(result);
}

async function explain() {
  const input = document.getElementById("inputText").value;

  const prompt = `Explain simply:\n${input}`;

  const result = await callAPI(prompt);
  document.getElementById("output").innerText = result;

  if (!result.startsWith("Error")) addToHistory(result);
}

async function checklist() {
  const input = document.getElementById("inputText").value;

  const prompt = `Create checklist:\n${input}`;

  const result = await callAPI(prompt);
  document.getElementById("output").innerText = result;

  if (!result.startsWith("Error")) addToHistory(result);
}

async function chat() {
  const notes = document.getElementById("inputText").value;
  const question = document.getElementById("chatInput").value;

  const prompt = `
Notes:
${notes}

Question:
${question}
`;

  const result = await callAPI(prompt);
  document.getElementById("output").innerText = result;

  if (!result.startsWith("Error")) addToHistory(result);
}

/* COPY */

function copyText() {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}

/* FILE UPLOAD */

function uploadFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("inputText").value = e.target.result;
  };

  reader.readAsText(file);
}

/* PDF */

function downloadPDF() {
  const element = document.getElementById("output");
  html2pdf().from(element).save("revision.pdf");
}