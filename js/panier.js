const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
mainDiv = document.getElementById("main")

//EXECUTION CODE -> LOAD PANIER | CHARGES LES ARTICLES DANS L'INDEX | BUTTON INDEX | BUTTON PANIER
ready(function() {
    panier = loadPanier()
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
})