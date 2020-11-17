const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
mainDiv = document.getElementById("main")

//EXECUTION CODE -> LOAD PANIER | CHARGES LES ARTICLES DANS L'INDEX | BUTTON INDEX | BUTTON PANIER
ready(function() {
    panier = loadPanier()
    loadArticles()
});

//CHARGE PAGE DES ARTICLES ( INDEX )
function loadArticles() {
    articlesREQ()
        .then(function (res){openArticles(res)})
        .catch(function (er){er})
}
// OUVRE PAGE D'UN ARTICLE
function loadArticle(id) {
    articleREQ(id)
        .then(function (res){openArticle(res)})
        .catch(function (er){er})
}

// AFFICHAGE DES ARTICLES
function openArticles(articles) {
    newPage('Accueil')
    addNewElement(0, 'h1', mainDiv, '', "display-4 mt-5 mb-5 text-center", '', '', '', '', "Nos articles", '', 1)
    articlesDIV = addNewElement(0, 'div', mainDiv, "articles", "row", '', '', '', '', '', '', 1)
    // ARTICLE A L'UNITE
    for (let i = 0; i < articles.length; i++) {
        price = articles[i].price /100
        boxDIV = addNewElement(0, 'div', articlesDIV, "", "col-lg-4 col-md-6", '', '','', '','', '', 1)
        articleDIV = addNewElement(0, 'div', boxDIV, articles[i]._id, "card mt-1 mb-4 shadow-sm anim-zoom", '', '', '', '', '', [['onclick','loadArticle(this.id)']], 1)
        addNewElement(0, 'div', articleDIV, "", "card-header font-weight-bold", '', '', '', '', articles[i].name, '', 1)
        addNewElement(0, 'img', articleDIV, "", "card-img-top", '', '', articles[i].imageUrl, articles[i].description, articles[i].name, '', 1)
        articleBODY = addNewElement(0, 'div', articleDIV, "", "card-body", '', '', '', '', '', '', 1)
        addNewElement(0, 'span', articleBODY, "", "badge bg-secondary", '', '', '', '', price.toFixed(2).replace(".", ",") + "€", '', 1)
        addNewElement(0, 'p', articleBODY, "", "card-text", '', '', '', '',articles[i].description, '', 1)
    }
}

// CHARGE LA PAGE D'UN ARTICLE
function openArticle(article) {
    newPage(article.name)
    price = article.price /100
    //BOUTON RETOUR
    returnButton = addNewElement(0, 'button', mainDiv, '', 'btn btn-outline-secondary', '', 'button', '', '', 'Retour', [['onclick','loadArticles()']], 1)
    // DETAILS DU PRODUIT
    articleMainDiv = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '', '', 1)
    addNewElement(0, 'img', articleMainDiv, '', 'card-img-top', '', '', article.imageUrl, article.description, '', '', 1)
    articleMainDiv2 = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '', '', 1)
    cardHeaderDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-header', '', '', '', '', '', '', 1)
    addNewElement(0, 'h4', cardHeaderDiv, '', 'my-0 font-weight-normal text-center', '', '', '', '', article.name, '', 1)
    cardBodyDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-body', '', '', '', '', '', '', 1)
    addNewElement(0, 'p', cardBodyDiv, '', 'card-text', '', '', '', '', article.description, '', 1)
    priceDiv = addNewElement(0, 'h5', cardBodyDiv, '', 'card-title', '', '', '', '', 'Prix: ', '', 1)
    addNewElement(0, 'span', priceDiv, '', 'badge bg-success', '', '', '', '', price.toFixed(2).replace( ".", "," ) + "€", '', 1)
    addNewElement(0, 'strong', cardBodyDiv, '', '', '', '', '', '', 'Couleur :', '', 1)
    dropDownDiv = addNewElement(0, 'div', cardBodyDiv, '', 'ml-2 mt-2 dropdown', '', '', '', '', '', '', 1)
    dropButton = addNewElement(0, 'button', dropDownDiv, 'dropdownMenuButton', 'btn btn-secondary dropdown-toggle', '', 'button', '', '', 'Couleur', [['data-toggle','dropdown'],['aria-haspopup', 'true'],['aria-expanded', 'false']], 1)
    downMenuDiv = addNewElement(0, 'div', dropDownDiv, '', 'dropdown-menu', '', '', '', '', '', [['aria-labelledby', 'dropdownMenuButton']], 1)
    // COULEUR DU PRODUIT
    for (let i = 0; i < article.colors.length; i++) {
        color = addNewElement(0, 'a', downMenuDiv, '', 'dropdown-item', '', '', '', '', article.colors[i], '', 1)
        if (i === 0) dropButton.innerHTML = article.colors[i]
        color.addEventListener('click', function() {dropButton.innerHTML = article.colors[i]}, false);
    }
    // AJOUTER AUX PANIER
    addPanierDiv = addNewElement(0, 'button', cardBodyDiv, '', 'btn btn-lg btn-block btn-primary mx-auto mt-2', 'max-width: 300px;', '', '', '', 'Ajouter au panier', '', 1)
    addPanierDiv.addEventListener('click', function() {panier = checkPanier(0, article._id, dropButton.innerHTML, panier, '')}, false);
}

// CHARGER LA PAGE PANIER
function openPanier(){
    newPage('Panier')
    var pricetot = 0
    var infosProduct = []
    cardDIV = addNewElement(0, 'div', mainDiv, '', 'card mt-5', '', '', '', '', '', '', 1)
    cardHeaderDIV = addNewElement(0, 'div', cardDIV, '', 'card-header bg-dark text-light align-middle', '', '', '', '', '', '', 1)
    addNewElement(0, 'i', cardHeaderDIV, '', 'fa fa-shopping-cart', '', '', '', '', '', '', 1)
    addNewElement(0, 'span', cardHeaderDIV, '', 'ml-2', '', '', '', '', 'Mon panier', '', 1)
    cardBodyDIV = addNewElement(0, 'div', cardDIV, '', 'card-body', '', '', '', '', '', '', 1)
    cardFooterDIV = addNewElement(0, 'div', cardDIV, '', 'card-footer px-5', '', '', '', '', '', '', 1)
    pricesDIV = addNewElement(0, 'div', cardFooterDIV, '', 'mt-3 text-right', '', '', '', '', 'Prix total: ', '', 1)

    // PRODUIT DANS LE PANIER
    for (let i = 0; i < panier.length; i++) {
        productDIV = addNewElement(0, 'div', cardBodyDIV, i, 'row', '', '', '', '', '', '', 1)
        productPART1 = addNewElement(0, 'div', productDIV, '', 'col-4 col-sm-3 col-md-3 col-lg-2 text-center', '', '', '', '', '', '', 1)
        productIMG = addNewElement(0, 'img', productPART1, '', 'img-responsive', 'max-height: 80px; max-width: 120px;', '', '', '', '', '', 1)
        productPART2 = addNewElement(0, 'div', productDIV, '', 'col-8 col-sm-6 col-md-6 col-lg-8', '', '', '', '', '', '', 1)
        productP2Name = addNewElement(0, 'h4', productPART2, '', 'product-name mb-0', '', '', '', '', '', '', 1)
        productNAME = addNewElement(0, 'strong', productP2Name, '', '', '', '', '', '', '', '', 1)
        productP2Color = addNewElement(0, 'h6', productPART2, '', 'mt-0', '', '', '', '', '', '', 1)
        productCOLOR = addNewElement(0, 'small', productP2Color, '', '', '', '', '', '', '', '', 1)
        productP2Desc = addNewElement(0, 'h5', productPART2, '', '', '', '', '', '', '', '', 1)
        productDESC = addNewElement(0, 'small', productP2Desc, '', '', '', '', '', '', '', '', 1)
        productP3 = addNewElement(0, 'div', productDIV, '', 'row justify-content-end align-items-center mt-2 col-12 col-sm-3 col-md-3 col-lg-2', '', '', '', '', '', '', 1)
        productP3Price = addNewElement(0, 'div', productP3, '', 'col-6 col-sm-12 col-lg-10', '', '', '', '', '', '', 1)
        productP3Pdiv = addNewElement(0, 'h6', productP3Price, '', '', '', '', '', '', '', '', 1)
        addNewElement(0, 'strong', productP3Pdiv, '', 'text-muted', '', '', '', '', 'Prix: ', '', 1)
        productPRICE = addNewElement(0, 'strong', productP3Pdiv, '', '', '', '', '', '', '', '', 1)
        productP3Qt = addNewElement(0, 'h6', productP3Price, '', '', '', '', '', '', '', '', 1)
        addNewElement(0, 'strong', productP3Qt, '', 'text-muted', '', '', '', '', 'Quantité: ', '', 1)
        productQUANTITY = addNewElement(0, 'strong', productP3Qt, '', '', '', '', '', '', '', '', 1)
        productP3Del = addNewElement(0, 'div', productP3, '', 'col-2 col-sm-6 text-right', '', '', '', '', '', '', 1)
        productDEL = addNewElement(0, 'button', productP3Del, '', 'btn btn-outline-danger btn-xs', '', 'button', '', '', '', [['onclick','deleteFunction(this.parentNode.parentNode.parentNode.id)']], 1)
        addNewElement(0, 'i', productDEL, '', 'fa fa-trash', '', '', '', '', '', '', 1)
        if(i+1<panier.length) {hrDiv = addNewElement(0, 'hr', productDIV, '', 'my-3', '', '', '', '', '', '', 1)}else{hrDiv= ''}

        // CREATION DU TABLEAU D'ELEMENT DOM + INJECTION DANS LE TABLEAU PANIER
        infosProduct.push([productDIV, productIMG, productNAME, productDESC, productCOLOR, 0, productPRICE, productQUANTITY, hrDiv, productDEL])
        panier[i][3] = infosProduct[i]

        // METTRE LES INFOS RECUS DANS LES ELEMENTS DOM
        articleREQ(panier[i][0])
            .then(function (article) {
                quantity = parseInt(panier[i][2], 10)
                price = (article.price/100)*quantity
                pricetot += price
                panier[i][3][1].src = article.imageUrl
                panier[i][3][1].alt = article.description
                panier[i][3][2].innerHTML = article.name
                panier[i][3][3].innerHTML = article.description
                panier[i][3][4].innerHTML = panier[i][1]
                panier[i][3][5] = (article.price/100)
                panier[i][3][6].innerHTML = price.toFixed(2).replace( ".", "," ) + '€'
                panier[i][3][7].innerHTML = 'x' + panier[i][2]
                pricetotaldiv.innerHTML = pricetot.toFixed(2).replace( ".", "," ) + '€'
            })
            .catch(function (er){er})
    }
    pricetotaldiv = addNewElement(0, 'strong', pricesDIV, 'pricetotal', '', '', '', '', '', '0,00€', '', 1)
    informationDiv = addNewElement(0, 'h4', cardFooterDIV, '', 'text-center my-4', '', '', '', '', 'Entrez vos informations', '', 1)

    //FORMULAIRE
    form = addNewElement(0, 'form', cardFooterDIV, '', 'row g-3 needs-validation mx-auto mb-3', 'max-width: 900px;', '', '', '', '', [['novalidate', '']], 1)
        colNom = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
            nomLabel = addNewElement(0, 'label', colNom, '', 'form-label', '', '', '', '', 'Nom', [['for','nom']], 1)
            nomInput = addNewElement(0, 'input', colNom, 'nom', 'form-control', '', 'text', '', '', '', [['required','']], 1)
            nomInvalide = addNewElement(0, 'div', colNom, '', 'invalid-feedback', '', '', '', '', 'Un nom valide est requis', '', 1)
        colPrenom = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
            prenomLabel = addNewElement(0, 'label', colPrenom, '', 'form-label', '', '', '', '', 'Prénom', [['for','prenom']], 1)
            prenomInput = addNewElement(0, 'input', colPrenom, 'prenom', 'form-control', '', 'text', '', '', '', [['min','5'],['max','30'],['required','']], 1)
            prenomInvalide = addNewElement(0, 'div', colPrenom, '', 'invalid-feedback', '', '', '', '', 'Un prenom valide est requis', '', 1)
        colMail = addNewElement(0, 'div', form, '', 'col-sm-12', '', '', '', '', '', '', 1)
            mailLabel = addNewElement(0, 'label', colMail, '', 'form-label', '', '', '', '', 'Email', [['for','email']], 1)
            mailInput = addNewElement(0, 'input', colMail, 'email', 'form-control', '', 'email', '', '', '', [['placeholder','vous@exemple.fr'],['required', '']], 1)
            mailInvalide = addNewElement(0, 'div', colMail, '', 'invalid-feedback', '', '', '', '', 'Une e-mail valide est requise', '', 1)
        colAdress = addNewElement(0, 'div', form, '', 'col-sm-12', '', '', '', '', '', '', 1)
            adressLabel = addNewElement(0, 'label', colAdress, '', 'form-label', '', '', '', '', 'Adresse', [['for','adress']], 1)
            adressInput = addNewElement(0, 'input', colAdress, 'adress', 'form-control', '', '', '', '', '', [['placeholder','01 rue Saint Martin'],['required','']], 1)
            adressInvalide = addNewElement(0, 'div', colAdress, '', 'invalid-feedback', '', '', '', '', 'Une adresse valide est requise', '', 1)
        colPostal = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
            postalLabel = addNewElement(0, 'label', colPostal, '', 'form-label', '', '', '', '', 'Code postal', [['for','postal']], 1)
            postalInput = addNewElement(0, 'input', colPostal, 'postal', 'form-control', '', 'text', '', '', '', [['placeholder','75000'],['required','']], 1)
            postalInvalide = addNewElement(0, 'div', colPostal, '', 'invalid-feedback', '', '', '', '', 'Un code postal valide est requis', '', 1)
        colVille = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
            villeLabel = addNewElement(0, 'label', colVille, '', 'form-label', '', '', '', '', 'Ville', [['for', 'ville']], 1)
            villeInput = addNewElement(0, 'input', colVille, 'ville', 'form-control', '', 'text', '', '', '', [['placeholder','Paris'],['required','']], 1)
            villeInvalide = addNewElement(0, 'div', colVille, '', 'invalid-feedback', '', '', '', '', 'Une ville valide est requise', '', 1)
        hrDiv = addNewElement(0, 'hr', form, '', '', '', '', '', '', '', '', 1)
        validButton = addNewElement(0, 'button', form, '', 'btn btn-primary btn-lg -btn-block', '', 'submit', '', '', 'Procéder au paiement', '', 1)

        checkSubmit()
}

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
    regex.push(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm)
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
// Page confirmation
function confirm(data) {
    newPage('Confirmation')
    addNewElement(0, 'div', mainDiv, '', "alert alert-success mt-5", '', '', '', '', "Votre commande n° " + data.orderId + " a bien été validée", [['role','alert']], 1)
    card = addNewElement(0, 'div', mainDiv, '', "card mt-5", '', '', '', '', '', '', 1)
    cardBody = addNewElement(0, 'div', card, '', "card-body mx-4 mt-4", '', '', '', '', '', '', 1)
    addNewElement(0, 'h5', cardBody, '', "card-title", '', '', '', '', 'Félicitation ' + data.contact.firstName + ' ' + data.contact.lastName + ' !', '', 1)
    addNewElement(0, 'p', cardBody, '', "card-text mt-2", '', '', '', '', "Un mail vous a été adressé à l'adresse " + data.contact.email, '', 1)
    addNewElement(0, 'p', cardBody, '', "card-text mt-4", '', '', '', '', 'Voici un récapitulatif de vos/votre article(s) :', '', 1)

    for (i=0; i < data.products.length; i++) {
        price = data.products[i].price/100
        articleData = addNewElement(0, 'div', cardBody, '', "card mb-3", "max-width: 800px", '', '', '', '', '', 1)
        articleRow = addNewElement(0, 'div', articleData, '', "row g-0", '', '', '', '', '', '', 1)
        articleRowCol = addNewElement(0, 'div', articleRow, '', "col-lg-4", '', '', '', '', '', '', 1)
        addNewElement(0, 'img', articleRowCol, '', 'rounded mx-auto mx-lg-0 d-block', 'max-width: 250px', '', data.products[i].imageUrl, data.products[i].description, '', '', 1)
        articleRowCol2 = addNewElement(0, 'div', articleRow, '', "col-lg-8", '', '', '', '', '', '', 1)
        articleBody = addNewElement(0, 'div', articleRowCol2, '', "card-body", '', '', '', '', '', '', 1)
        addNewElement(0, 'h5', articleBody, '', "card-title", '', '', '', '', data.products[i].name, '', 1)
        addNewElement(0, 'p', articleBody, '', "card-text", '', '', '', '', data.products[i].description, '', 1)
        priceP = addNewElement(0, 'p', articleBody, '', "card-text", '', '', '', '', '', '', 1)
        addNewElement(0, 'small', priceP, '', "card-muted", '', '', '', '', price.toFixed(2).replace( ".", "," ) + '€', '', 1)
    }

    addNewElement(0, 'p', cardBody, '', "card-text mt-4", '', '', '', '', "Vos/votre article(s) seront envoyé(s) à l'adresse:", '', 1)
    addNewElement(0, 'p', cardBody, '', "card-text", '', '', '', '', '<b>' + data.contact.lastName + ' ' + data.contact.firstName + '</br>' + data.contact.address + '<br>' + data.contact.city + '</b>', '', 1)
}