window.addEventListener("DOMContentLoaded", () => {
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    },
    (decodedText) => {
      console.log("QR Code détecté :", decodedText);
      html5QrCode.stop();
      window.location.href = `ticket.html?code=${decodedText}`;
    },
    (errorMessage) => {
      // Erreurs silencieuses
    }
  ).catch((err) => {
    alert("Erreur caméra : " + err);
  });
});

function submitCode() {
  const code = document.getElementById("manualCode").value;
  if (!code) {
    alert("Veuillez entrer un code.");
    return;
  }
  window.location.href = `ticket.html?code=${code}`;
}
