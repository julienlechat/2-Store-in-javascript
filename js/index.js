const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
mainDiv = document.getElementById("main")
indexButton = document.getElementById("index")
panierButton = document.getElementById("panier")

//EXECUTION CODE
ready(function() {
    panier = loadPanier();
    allArticlesReq(function (res){
       createArticle(res)
    }, function (error) { error});
    indexButton.addEventListener('click', function() {
        allArticlesReq(function (res){
            createArticle(res)
         }, function (error) { error});
    }, false);
    panierButton.addEventListener('click', function() {
        openPanier();
    }, false);
});
// AFFICHAGE DES ARTICLES
function createArticle(data) {
    newPage('Accueil')
    titlePage = addNewElement(0, 'h1', mainDiv, '', "display-4 mt-5 mb-5 text-center", '', '', '', '', "Nos articles", '', 1)
    articlesDiv = addNewElement(0, 'div', mainDiv, "articles", "row", '', '', '', '', '', '', 1)
    // ARTICLE A L'UNITE
    for (let i = 0; i < data.length; i++) {
        price = data[i].price /100
        firstDiv = addNewElement(0, 'div', articlesDiv, "", "col-lg-4 col-md-6", '', '','', '','', '', 1)
        secondDiv = addNewElement(0, 'div', firstDiv, i, "card mt-1 mb-4 shadow-sm anim-zoom", '', '', '', '', '', '', 1)
        secondDiv.addEventListener('click', function() {
            oneArticleReq(data[i]._id, function (req){
                openArticleRes(req)
            }, function (error) { error })
        }, false);
        nameDiv = addNewElement(0, 'div', secondDiv, "", "card-header font-weight-bold", '', '', '', '', data[i].name, '', 1)
        imgDiv = addNewElement(0, 'img', secondDiv, "", "card-img-top", '', '', data[i].imageUrl, data[i].description, data[i].name, '', 1)
        cardBodyDiv = addNewElement(0, 'div', secondDiv, "", "card-body", '', '', '', '', '', '', 1)
        priceDiv =  addNewElement(0, 'span', cardBodyDiv, "", "badge bg-secondary", '', '', '', '', price.toFixed(2).replace(".", ",") + "€", '', 1)
        descDiv = addNewElement(0, 'p', cardBodyDiv, "", "card-text", '', '', '', '',data[i].description, '', 1)
    }
}
// PAGE ARTICLE
function openArticleRes(data) {
    newPage(data.name)
    price = data.price /100
    //BOUTON RETOUR
    returnButton = addNewElement(0, 'button', mainDiv, '', 'btn btn-outline-secondary', '', 'button', '', '', 'Retour', '', 1)
    returnButton.addEventListener('click', function() {
        allArticlesReq(function (res){
            createArticle(res)
         }, function (error) { error});
    }, false);

    // DETAILS DU PRODUIT
    articleMainDiv = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '', '', 1)
    imgDiv = addNewElement(0, 'img', articleMainDiv, '', 'card-img-top', '', '', data.imageUrl, data.description, '', '', 1)
    articleMainDiv2 = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '', '', 1)
    cardHeaderDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-header', '', '', '', '', '', '', 1)
    titleDiv = addNewElement(0, 'h4', cardHeaderDiv, '', 'my-0 font-weight-normal text-center', '', '', '', '', data.name, '', 1)
    cardBodyDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-body', '', '', '', '', '', '', 1)
    descDiv = addNewElement(0, 'p', cardBodyDiv, '', 'card-text', '', '', '', '', data.description, '', 1)
    priceDiv = addNewElement(0, 'h5', cardBodyDiv, '', 'card-title', '', '', '', '', 'Prix: ', '', 1)
    priceValue = addNewElement(0, 'span', priceDiv, '', 'badge bg-success', '', '', '', '', price.toFixed(2).replace( ".", "," ) + "€", '', 1)
    couleurText = addNewElement(0, 'strong', cardBodyDiv, '', '', '', '', '', '', 'Couleur :', '', 1)
    dropDownDiv = addNewElement(0, 'div', cardBodyDiv, '', 'ml-2 mt-2 dropdown', '', '', '', '', '', '', 1)
    dropButton = addNewElement(0, 'button', dropDownDiv, 'dropdownMenuButton', 'btn btn-secondary dropdown-toggle', '', 'button', '', '', 'Couleur', [['data-toggle','dropdown'],['aria-haspopup', 'true'],['aria-expanded', 'false']], 1)
    downMenuDiv = addNewElement(0, 'div', dropDownDiv, '', 'dropdown-menu', '', '', '', '', '', [['aria-labelledby', 'dropdownMenuButton']], 1)

    // COULEUR DU PRODUIT
    for (let i = 0; i < data.colors.length; i++) {
        color = addNewElement(0, 'a', downMenuDiv, '', 'dropdown-item', '', '', '', '', data.colors[i], '', 1)
        if (i === 0) dropButton.innerHTML = data.colors[i]
        color.addEventListener('click', function() {
            dropButton.innerHTML = data.colors[i]
        }, false);
    }

    // AJOUTER AUX PANIER
    addPanierDiv = addNewElement(0, 'button', cardBodyDiv, '', 'btn btn-lg btn-block btn-primary mx-auto mt-2', 'max-width: 300px;', '', '', '', 'Ajouter au panier', '', 1)
    addPanierDiv.addEventListener('click', function() {
        panier = checkPanier(0, data._id, dropButton.innerHTML, panier, '')
    }, false);
}
// PAGE PANIER
function openPanier(){
    newPage('Panier')
    var pricetot = 0
    var infosProduct = []
        cardDiv = addNewElement(0, 'div', mainDiv, '', 'card shopping-cart mt-5', '', '', '', '', '', '', 1)
        cardHeaderDiv = addNewElement(0, 'div', cardDiv, '', 'card-header bg-dark text-light align-middle', '', '', '', '', '', '', 1)
            iconDiv = addNewElement(0, 'i', cardHeaderDiv, '', 'fa fa-shopping-cart', '', '', '', '', '', '', 1)
            titreHeaderDiv = addNewElement(0, 'span', cardHeaderDiv, '', 'ml-2', '', '', '', '', 'Mon panier', '', 1)
        cardBodyDiv = addNewElement(0, 'div', cardDiv, '', 'card-body', '', '', '', '', '', '', 1)
        cardFooterDiv = addNewElement(0, 'div', cardDiv, '', 'card-footer px-5', '', '', '', '', '', '', 1)
            priceTotDiv = addNewElement(0, 'div', cardFooterDiv, '', 'mt-3 text-right', '', '', '', '', 'Prix total: ', '', 1)

        // PRODUIT DANS LE PANIER
        for (let i = 0; i < panier.length; i++) {
            productDiv = addNewElement(0, 'div', cardBodyDiv, i, 'row', '', '', '', '', '', '', 1)
                contentRowDiv = addNewElement(0, 'div', productDiv, '', 'col-4 col-sm-3 col-md-3 col-lg-2 text-center', '', '', '', '', '', '', 1)
                    contentRowImg = addNewElement(0, 'img', contentRowDiv, '', 'img-responsive', 'max-height: 80px; max-width: 120px;', '', '', 'test', '', '', 1)
                contentRow2Div = addNewElement(0, 'div', productDiv, '', 'col-8 col-sm-6 col-md-6 col-lg-8', '', '', '', '', '', '', 1)
                    contentRow2Name = addNewElement(0, 'h4', contentRow2Div, '', 'product-name mb-0', '', '', '', '', '', '', 1)
                        contentRow2NameStrong = addNewElement(0, 'strong', contentRow2Name, '', '', '', '', '', '', 'article.name', '', 1)
                    contentRow2Color = addNewElement(0, 'h6', contentRow2Div, '', 'mt-0', '', '', '', '', '', '', 1)
                        contentRow2ColorText = addNewElement(0, 'small', contentRow2Color, '', '', '', '', '', '', '', '', 1)
                    contentRow2Desc = addNewElement(0, 'h5', contentRow2Div, '', '', '', '', '', '', '', '', 1)
                        contentRow2DescStrong = addNewElement(0, 'small', contentRow2Desc, '', '', '', '', '', '', 'article.description', '', 1)
                contentRow3Div = addNewElement(0, 'div', productDiv, '', 'row justify-content-end align-items-center mt-2 col-12 col-sm-3 col-md-3 col-lg-2', '', '', '', '', '', '', 1)
                    contentRow3Price = addNewElement(0, 'div', contentRow3Div, '', 'col-6 col-sm-12 col-lg-10', '', '', '', '', '', '', 1)
                        priceDiv = addNewElement(0, 'h6', contentRow3Price, '', '', '', '', '', '', '', '', 1)
                            PriceName = addNewElement(0, 'strong', priceDiv, '', 'text-muted', '', '', '', '', 'Prix: ', '', 1)
                                priceStrong = addNewElement(0, 'strong', priceDiv, '', '', '', '', '', '', '', '', 1)
                        quantityDiv = addNewElement(0, 'h6', contentRow3Price, '', '', '', '', '', '', '', '', 1)
                            quantityName = addNewElement(0, 'strong', quantityDiv, '', 'text-muted', '', '', '', '', 'Quantité: ', '', 1)
                                quantityStrong = addNewElement(0, 'strong', quantityDiv, '', '', '', '', '', '', '', '', 1)
                    contentRow3Delete = addNewElement(0, 'div', contentRow3Div, '', 'col-2 col-sm-6 text-right', '', '', '', '', '', '', 1)
                        deleteDiv = addNewElement(0, 'button', contentRow3Delete, '', 'btn btn-outline-danger btn-xs', '', 'button', '', '', '', [['onclick','deleteFunction(this.parentNode.parentNode.parentNode.id)']], 1)
                            deleteIconDiv = addNewElement(0, 'i', deleteDiv, '', 'fa fa-trash', '', '', '', '', '', '', 1)
            if(i+1<panier.length) {hrDiv = addNewElement(0, 'hr', productDiv, '', 'my-3', '', '', '', '', '', '', 1)}else{hrDiv= ''}

            infosProduct.push([productDiv, contentRowImg, contentRow2NameStrong, contentRow2DescStrong, contentRow2ColorText, 0, priceStrong, quantityStrong, hrDiv, deleteDiv])
            panier[i][3] = infosProduct[i]

            oneArticleReq(panier[i][0], function (article) {
                quantity = parseInt(panier[i][2], 10)
                price = (article.price/100)*quantity
                pricetot += price
                panier[i][3][1].src = article.imageUrl
                panier[i][3][2].innerHTML = article.name
                panier[i][3][3].innerHTML = article.description
                panier[i][3][4].innerHTML = panier[i][1]
                panier[i][3][5] = (article.price/100)
                panier[i][3][6].innerHTML = price.toFixed(2).replace( ".", "," ) + '€'
                panier[i][3][7].innerHTML = 'x' + panier[i][2]
                pricetotaldiv.innerHTML = pricetot.toFixed(2).replace( ".", "," ) + '€'
            }, function (err) { error })
        }

        pricetotaldiv = addNewElement(0, 'strong', priceTotDiv, 'pricetotal', '', '', '', '', '', '0,00€', '', 1)
        informationDiv = addNewElement(0, 'h4', cardFooterDiv, '', 'text-center my-4', '', '', '', '', 'Entrez vos informations', '', 1)

        //FORMULAIRE
        form = addNewElement(0, 'form', cardFooterDiv, '', 'row g-3 needs-validation mx-auto mb-3', 'max-width: 900px;', '', '', '', '', [['novalidate', '']], 1)
            colNom = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
                nomLabel = addNewElement(0, 'label', colNom, '', 'form-label', '', '', '', '', 'Nom', [['for','nom']], 1)
                nomInput = addNewElement(0, 'input', colNom, 'nom', 'form-control', '', 'text', '', '', '', '', 1)
                nomInvalide = addNewElement(0, 'div', colNom, '', 'invalid-feedback', '', '', '', '', 'Un nom valide est requis', '', 1)
            colPrenom = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
                prenomLabel = addNewElement(0, 'label', colPrenom, '', 'form-label', '', '', '', '', 'Prénom', [['for','prenom']], 1)
                prenomInput = addNewElement(0, 'input', colPrenom, 'prenom', 'form-control', '', 'text', '', '', '', '', 1)
                prenomInvalide = addNewElement(0, 'div', colPrenom, '', 'invalid-feedback', '', '', '', '', 'Un prenom valide est requis', '', 1)
            colMail = addNewElement(0, 'div', form, '', 'col-sm-12', '', '', '', '', '', '', 1)
                mailLabel = addNewElement(0, 'label', colMail, '', 'form-label', '', '', '', '', 'Email', [['for','email']], 1)
                mailInput = addNewElement(0, 'input', colMail, 'email', 'form-control', '', '', '', '', '', [['placeholder','vous@exemple.fr'],['required', '']], 1)
                mailInvalide = addNewElement(0, 'div', colMail, '', 'invalid-feedback', '', '', '', '', 'Une e-mail valide est requise', '', 1)
            colAdress = addNewElement(0, 'div', form, '', 'col-sm-12', '', '', '', '', '', '', 1)
                adressLabel = addNewElement(0, 'label', colAdress, '', 'form-label', '', '', '', '', 'Adresse', [['for','adress']], 1)
                adressInput = addNewElement(0, 'input', colAdress, 'adress', 'form-control', '', '', '', '', '', [['placeholder','01 rue Saint Martin'],['required','']], 1)
                adressInvalide = addNewElement(0, 'div', colAdress, '', 'invalid-feedback', '', '', '', '', 'Une adresse valide est requise', '', 1)
            colPostal = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
                postalLabel = addNewElement(0, 'label', colPostal, '', 'form-label', '', '', '', '', 'Code postal', [['for','postal']], 1)
                postalInput = addNewElement(0, 'input', colPostal, 'postal', 'form-control', '', 'text', '', '', '', [['placeholder','75000']], 1)
                postalInvalide = addNewElement(0, 'div', colPostal, '', 'invalid-feedback', '', '', '', '', 'Un code postal valide est requis', '', 1)
            colVille = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', '', 1)
                villeLabel = addNewElement(0, 'label', colVille, '', 'form-label', '', '', '', '', 'Ville', [['for', 'ville']], 1)
                villeInput = addNewElement(0, 'input', colVille, 'ville', 'form-control', '', 'text', '', '', '', [['placeholder','Paris']], 1)
                villeInvalide = addNewElement(0, 'div', colVille, '', 'invalid-feedback', '', '', '', '', 'Une ville valide est requise', '', 1)
            hrDiv = addNewElement(0, 'hr', form, '', '', '', '', '', '', '', '', 1)
            validButton = addNewElement(0, 'button', form, '', 'btn btn-primary btn-lg -btn-block', '', 'submit', '', '', 'Procéder au paiement', '', 1)

            validButton.addEventListener('click', function() {
                //ENVOYER LE FORMULAIRE
            }, false);
}
function deleteFunction(id) {
    id = parseInt(id, 10)
    let priceTot = 0
    if (panier[id][2] === 1) {
        panier[id][3][0].remove()
        console.log('je delete: ',panier[id][3][0])
        if (id+1 === panier.length && id>0) panier[id-1][3][8].remove()
    } 
    panier = checkPanier(1, panier[id][0], panier[id][1], panier, id)
    for (f=0;f<panier.length;f++){
        priceTot += panier[f][3][5]*panier[f][2]
        panier[f][3][0].id = f
    }
    pricetotaldiv.innerHTML = priceTot.toFixed(2).replace( ".", "," ) + '€' 
}