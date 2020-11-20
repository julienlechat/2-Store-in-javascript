// PAGE PRETE
function ready(fn) {
    if (document.readyState !=  "loading"){fn()}
    else
    {document.addEventListener("DOMContentLoaded", fn)}
}
// NOUVELLE PAGE
function newPage(title) {
    document.title = "Orinoco - " + title
    mainDiv.innerHTML = ''
}
// ALERTE
function alertSpoil(title, desc, color) {
    divAlert = addNewElement(0, 'div', mainDiv, '', 'alert ' + color + ' alert-dismissible fade show mx-5', '', '', '', '', ' ' + desc, [['role','alert']], 2)
    divTitle = addNewElement(0, 'strong', divAlert, '', '', '', '', '', '', title + '', '', 2)
    buttonAlert = addNewElement(0, 'button', divAlert, '', 'btn-close', '', 'button', '', '', '', [['data-dismiss','alert'],['aria-dismiss','Close']], 1)
}
// AJOUTER UN ELEMENT DOM
function addNewElement(val, elementName, to, id, className, style, type, src, alt, content, attribut, append) {
    if (val === 0){newElement = document.createElement(elementName)}else if(val === 1){newElement = document.getElementById(elementName)}else{newElement = document.getElementsByClassName(elementName)}
    if (id !== "") newElement.id = id
    if (className !== "") newElement.className = className
    if (style !== "") newElement.style = style
    if (type !== "") newElement.type = type
    if (src !== "") newElement.src = src
    if (alt !== "") newElement.alt = alt
    if (content !== "") newElement.innerHTML = content
    if (attribut !== "") for (let i = 0; i < attribut.length; i++) newElement.setAttribute(attribut[i][0],attribut[i][1])
    if (append === 1) to.appendChild(newElement);
    if (append === 2) to.prepend(newElement);
    return newElement
}
// CHARGEMENT DU PANIER
function loadPanier() {
    if (localStorage.getItem("panier") !== null) {
        panier = JSON.parse(localStorage.getItem("panier"))
        showPanierValue(panier)
    } else {panier = []}
    return panier
}
// AJOUTE/RETIRE UN PRODUIT & GROUPE LES PRODUITS EXISTANT
function checkPanier(action, id, color, panier, idPanier) {
    // RECHERCHE DANS LE TABLEAU PANIER
    function check() {
        for (let i = 0; i < panier.length; i++) {
            if (panier[i][0] === id && panier[i][1] === color) {
                if (action === 0) { 
                    panier[i][2] += 1
                    return 1
                } else if (action === 1 && panier[i][2] > 1) {
                    panier[i][2] -= 1
                    price = panier[i][3][5]*panier[i][2]
                    panier[i][3][7].innerHTML = 'x' + panier[i][2]
                    panier[i][3][6].innerHTML = price.toFixed(2).replace( ".", "," ) + '€'
                    return 2
                }
            }
        }
        return 0
    }
    var checkMulti = check()
    if (checkMulti === 0) {
        if (action === 0) panier.push([id, color, 1])
        if (action === 1) panier.splice(panier.indexOf(panier[idPanier]), 1)
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    showPanierValue(panier)
    return panier
}
// CHANGE L'ELEMENT PANIER DANS LE DOM
function showPanierValue(panier) {
    if (panier.length > 0){
        panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', '<strong>Panier <span class="badge bg-secondary">' + panier.length +'</span></strong>', '', 0)
    }else{
        panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', 'Panier', '', 0)}
}
// BOUTON DELETE ELEMENT DU PANIER
function deleteFunction(id) {
    id = parseInt(id, 10)
    let priceTot = 0
    if (panier[id][2] === 1) {
        panier[id][3][0].remove()
        if (id+1 === panier.length && id>0) panier[id-1][3][8].remove()
    } 
    panier = checkPanier(1, panier[id][0], panier[id][1], panier, id)
    for (f=0;f<panier.length;f++){
        priceTot += panier[f][3][5]*panier[f][2]
        panier[f][3][0].id = f
    }
    pricetotaldiv.innerHTML = priceTot.toFixed(2).replace( ".", "," ) + '€' 
}
// COMMANDE DU PRODUIT
function checkSubmit() {
    var forms = document.querySelectorAll('.needs-validation')
    form = Array.prototype.slice.call(forms)

    function checkInput() {
        for (let i=0; i < form[0].length-1; i++) {
            // Check chaque input du formulaire
            form[0][i].addEventListener('input', function () {
                // Controle la longueur
                if (invalid[i].length === 4 && (this.value.length < invalid[i][0] || this.value.length > invalid[i][1])) {
                    if (this.className.includes('is-valid')) this.classList.remove('is-valid')
                    if (!this.className.includes('is-invalid')) this.classList.add('is-invalid')
                    return invalid[i].innerHTML = invalid[i][3]
                } else if (invalid[i].length === 3 && this.value.length !== invalid[i][0]) {
                    if (this.className.includes('is-valid')) this.classList.remove('is-valid')
                    if (!this.className.includes('is-invalid')) this.classList.add('is-invalid')
                    return invalid[i].innerHTML = invalid[i][3]
                }
                // Controle les caractères spéciaux
                if (!this.value.match(regex[i])) {
                    if (this.className.includes('is-valid')) this.classList.remove('is-valid')
                    if (!this.className.includes('is-invalid')) this.classList.add('is-invalid')
                    return invalid[i].innerHTML = 'Il ne doit pas contenir de caractères spéciaux.'
                }
                // Valide
                if (this.className.includes('is-invalid')) this.classList.remove('is-invalid')
                if (!this.className.includes('is-valid')) this.classList.add('is-valid')
                }, false)}
    }

    // Text invalide -> Nom | Prénom | Email | Adresse | Code Postal | Ville
    invalid = []
    invalid.push([3, 20, nomInvalide, 'Votre nom doit composer entre 3 et 20 caractères.'])
    invalid.push([3, 20, prenomInvalide, 'Votre prénom doit composer entre 3 et 20 caractères.'])
    invalid.push([6, 45, mailInvalide, 'Votre email doit composer entre 6 et 45 caractères.'])
    invalid.push([8, 45, adressInvalide, 'Votre adresse doit composer entre 8 et 45 caractères.'])
    invalid.push([5, postalInvalide, 'Votre code postal doit composer 5 caractères.'])
    invalid.push([3, 35, villeInvalide, 'Votre ville doit composer entre 3 et 35 caractères.'])

    // Regex -> Nom | Prénom | Email | Adresse | Code Postal | Ville
    regex = []
    regex.push(/^\b([a-zA-Z-ÀÉÈàïîéè]{3,20}|([a-zA-Z-ÀÉÈàïîéè]+[\s][a-zA-Z-ÀÉÈàïîéè]+|[a-zA-Z-ÀÉÈàïîéè]+[\s][a-zA-Z-ÀÉÈàïîéè]+[\s][a-zA-Z-ÀÉÈàïîéè]+))\b$/gm)
    regex.push(/^\b([a-zA-Z-ÀÉÈàïîéè]{3,20}|[a-zA-Z-ÀÉÈàïîéè]+[\s][a-zA-Z-ÀÉÈàïîéè]+)\b$/gm)
    regex.push(/^[\w-\.]+@([\w-]+\.)+[\w-]+$/gm)
    regex.push(/^[\d]{1,4}\s[A-z]+\s[A-z]+(\s[A-z]+|\s[A-z]+\s[A-z]+)?$/gm)
    regex.push(/^[0-9]{5}$/gm)
    regex.push(/^\b([a-zA-Z-ÀÉÈàïîéè]{3,35}|([a-zA-Z-ÀÉÈàïîéè]+[\s][a-zA-Z-ÀÉÈàïîéè]+|[a-zA-Z-ÀÉÈàïîéè]+[\s][a-zA-Z-ÀÉÈàïîéè]+[\s][a-zA-Z-ÀÉÈàïîéè]+))\b$/gm)

    checkInput()

    form[0].addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        var checkvalid = 0
        for (let f=0; f < form[0].length-1; f++) {if (form[0][f].className.includes('is-valid')) { checkvalid += 1}}

        if (checkvalid === 6) {
            if (panier.length === 0) return alertSpoil('Erreur:', 'Votre panier est vide !', 'alert-danger')
            // Creation du JSON et du tableau produits
            data = [form[0][0].value, form[0][1].value, form[0][2].value, form[0][3].value, form[0][4].value, form[0][5].value]
            products = []
            for (let it=0;it < panier.length; it++) {products.push(panier[it][0])}

            // Envoie req POST avec les infos
            postREQ(data, products)
                .then(function (res){confirm(res)})
                .catch(function (er){er})
        } else {
            alertSpoil('Erreur:', 'Les champs ne sont pas rempli correctement.', 'alert-danger')
        }
    }, false)
}
function confirm(res) {
    localStorage.setItem("confirmation", JSON.stringify(res));
    window.location.href = "confirmation.html";
}