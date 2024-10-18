window.onload = function () {
    // Sélectionnez le formulaire par son ID
    const form = document.getElementById("myForm");

    // Ajoutez un écouteur d'événements pour gérer l'envoi du formulaire
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche l'envoi automatique du formulaire

        // Récupérer les valeurs du formulaire
        const name = document.getElementById("name").value.trim();
        const firstname = document.getElementById("firstname").value.trim();
        const address = document.getElementById("adress").value.trim();
        const email = document.getElementById("email").value.trim();
        const birthday = document.getElementById("birthday").value.trim();

        // Fonction pour afficher le modal d'erreur
        function showModal(message) {
            document.getElementById('errorModalBody').innerText = message;
            const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show();
        }

        // Vérifiez si des champs sont vides
        if (!name || !firstname || !address || !email || !birthday) {
            showModal("Tous les champs sont obligatoires.");
            return; // Arrête la validation
        }

        // Valider le nom
        if (name.length < 5) {
            showModal("Le champ 'Nom' doit comporter au moins 5 caractères.");
            return;
        }

        // Valider le prénom
        if (firstname.length < 5) {
            showModal("Le champ 'Prénom' doit comporter au moins 5 caractères.");
            return;
        }

        // Valider l'adresse
        if (address.length < 5) {
            showModal("Le champ 'Adresse' doit comporter au moins 5 caractères.");
            return;
        }

        // Valider le format de l'email
        if (!validateEmail(email)) {
            showModal("Veuillez entrer une adresse email valide.");
            return;
        }

        // Valider la date de naissance (ne doit pas être dans le futur)
        const birthdayDate = new Date(birthday);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (birthdayTimestamp > nowTimestamp) {
            showModal("La date de naissance ne peut pas être dans le futur.");
            return;
        }

        // Si tout est valide, montrez le modal d'informations
        showInfoModal(name, firstname, birthday, address);
    });

    // Fonction pour valider le format de l'email
    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Fonction pour afficher le modal d'informations utilisateur
    function showInfoModal(name, firstname, birthday, address) {
        // Définir le titre du modal
        const modalTitle = document.getElementById("infoModalLabel");
        modalTitle.innerText = `Bonjour ${name}`; // Met le nom 
        // Définir le message de salutation
        const greetingMessage = `vous êtes né(e) le ${birthday} et vous habitez ${address}.`;
        document.getElementById("greetingMessage").innerText = greetingMessage;

        // Créer l'URL de l'API Static de Google Maps
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=14&size=600x300&markers=color:red%7C${encodedAddress}&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

        // Définir la source de l'image
        document.getElementById("mapImage").src = mapsUrl;

        // Affiche le modal avec les informations
        const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
        infoModal.show();
    }
};