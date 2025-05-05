function showNotification(message, type = "success") {
  // Supprime les notifications existantes
  document.querySelectorAll(".notification").forEach(n => n.remove());

  // Crée la notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Icône Bootstrap (utilise les classes rounded-circle et me-2)
  const icon = document.createElement("div");
  icon.className = "icon";
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      ${type === "success" 
        ? '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>' 
        : '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>'
      }
    </svg>
  `;

  // Contenu texte
  const content = document.createElement("div");
  content.className = "content";
  content.textContent = message;

  // Barre de progression
  const progressBarContainer = document.createElement("div");
  progressBarContainer.className = "progress-container";
  const progressBar = document.createElement("div");
  progressBar.className = "progress";
  progressBarContainer.appendChild(progressBar);

  // Assemble le tout
  notification.appendChild(icon);
  notification.appendChild(content);
  notification.appendChild(progressBarContainer);

  // Ajoute à la page
  document.body.appendChild(notification);

  // Démarre l'animation de la barre de progression
  requestAnimationFrame(() => {
    progressBar.style.width = "0%";
  });

  // Supprime la notification après 3 secondes
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const form = this;
    const formData = new FormData(form);
  
    const data = {
      api_key: "PROPENTATECH-55578d40118c21f502508efde5bb96192e8ed65503f4d288284", // Remplacez par votre clé API
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || "",
      message: formData.get('message')
    };
  
    try {
      const res = await fetch('https://api-email.propentatech.com:8906/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      if (res.ok) {
        showNotification("Votre message a été envoyé avec succès.");
        form.reset();
      } else {
        showNotification("Échec de l'envoi. Veuillez réessayer.", "error");
      }
    } catch (err) {
      showNotification("Une erreur est survenue. Veuillez réessayer plus tard.", "error");
    }
  });
  