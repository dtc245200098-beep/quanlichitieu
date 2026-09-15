// 1. Hàm gửi câu hỏi tự do cho AI
async function askAI() {
  const userInput = document.getElementById("ai-input");
  const aiOutput = document.getElementById("ai-output");
  
  if (!userInput || !userInput.value.trim()) {
    alert("Vui lòng nhập câu hỏi!");
    return;
  }

  const promptText = userInput.value;
  aiOutput.innerText = "🤖 AI đang suy nghĩ, vui lòng đợi giây lát...";

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/ai/chat?prompt=${encodeURIComponent(promptText)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    aiOutput.innerText = data.reply || "Không nhận được phản hồi từ AI.";
  } catch (error) {
    console.error("Lỗi:", error);
    aiOutput.innerText = "❌ Lỗi kết nối tới Server/AI!";
  }
}

// 2. Hàm phân tích chi tiêu bằng AI
async function analyzeExpenses() {
  const aiOutput = document.getElementById("ai-output");
  aiOutput.innerText = "📊 AI đang phân tích dữ liệu chi tiêu...";

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/ai/analyze`, {
      method: 'GET'
    });

    const data = await response.json();
    aiOutput.innerText = data.analysis || data.reply || "Phân tích xong!";
  } catch (error) {
    console.error("Lỗi:", error);
    aiOutput.innerText = "❌ Không thể phân tích chi tiêu!";
  }
}