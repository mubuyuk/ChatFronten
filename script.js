const messageDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");


async function loadMessages() {
  try {
    
    const response = await fetch("https://cloud24chat.azurewebsites.net/api/messages");
    const messages = await response.json();

    messageDiv.innerHTML = "";
    
    messages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${msg.text}`
      messageDiv.appendChild(messageElement);
    });

  } catch (error) {
    console.log(error);
  }
}

async function sendMessage() {
  const text = messageInput.value.trim();

  if(!text){
    alert("Please enter a message haiwan");
    return;
  }

  try {

    await fetch("https://cloud24chat.azurewebsites.net/api/message", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({text})
  });

  messageInput.value = "";
  loadMessages();

  } catch (error) {
    console.log(error);
  }


}
sendButton.addEventListener("click", sendMessage);
loadMessages();