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
        alert("Votre message a été envoyé avec succès.");
        form.reset();
      } else {
        alert("Échec de l'envoi. Veuillez réessayer.");
      }
    } catch (err) {
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  });