document.getElementById("askBtn").addEventListener("click", async () => {
  const question = document.getElementById("question").value;

  if (!question.trim()) {
    alert("Enter a DSA question!");
    return;
  }

  document.getElementById("responseBox").innerHTML = "⏳ Thinking...";

  // Send request to backend
  const res = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  const data = await res.json();

  document.getElementById("responseBox").innerHTML =
    `<pre>${data.answer}</pre>`;
});
