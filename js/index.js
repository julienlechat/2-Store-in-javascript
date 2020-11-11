const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
let mainDiv = document.getElementById("main")
let indexButton = document.getElementById("index")
let panierButton = document.getElementById("panier")

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
    var titlePage = addNewElement(0, 'h1', mainDiv, '', "display-4 mt-5 mb-5 text-center", '', '', '', '', "Nos articles", 1)
    var articlesDiv = addNewElement(0, 'div', mainDiv, "articles", "row", '', '', '', '', '', 1)
    // ARTICLE A L'UNITE
    for (let i = 0; i < data.length; i++) {
        var price = data[i].price /100
        let firstDiv = addNewElement(0, 'div', articlesDiv, "", "col-lg-4 col-md-6", '', '','', '','', 1)
        let secondDiv = addNewElement(0, 'div', firstDiv, i, "card mt-1 mb-4 shadow-sm anim-zoom", '', '', '', '', '', 1)
        secondDiv.addEventListener('click', function() {
            oneArticleReq(data[i]._id, function (response){
                var req = response 
                openArticleRes(req)
            }, function (error) { error })

        }, false);
        var nameDiv = addNewElement(0, 'div', secondDiv, "", "card-header font-weight-bold", '', '', '', '', data[i].name, 1)
        var imgDiv = addNewElement(0, 'img', secondDiv, "", "card-img-top", '', '', data[i].imageUrl, data[i].description, data[i].name, 1)
        var cardBodyDiv = addNewElement(0, 'div', secondDiv, "", "card-body", '', '', '', '', '', 1)
        var priceDiv =  addNewElement(0, 'span', cardBodyDiv, "", "badge bg-secondary", '', '', '', '', price.toFixed(2).replace(".", ",") + "€", 1)
        var descDiv = addNewElement(0, 'p', cardBodyDiv, "", "card-text", '', '', '', '',data[i].description, 1)
    }
}
// PAGE ARTICLE
function openArticleRes(data) {
    newPage(data.name)
    var price = data.price /100
    //BOUTON RETOUR
    let returnButton = addNewElement(0, 'button', mainDiv, '', 'btn btn-outline-secondary', '', 'button', '', '', 'Retour', 1)
    returnButton.addEventListener('click', function() {
        allArticlesReq(function (res){
            createArticle(res)
         }, function (error) { error});
    }, false);
    let articleMainDiv = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '', 1)
    let imgDiv = addNewElement(0, 'img', articleMainDiv, '', 'card-img-top', '', '', data.imageUrl, data.description, '', 1)
    let articleMainDiv2 = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '', 1)
    let cardHeaderDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-header', '', '', '', '', '', 1)
    let titleDiv = addNewElement(0, 'h4', cardHeaderDiv, '', 'my-0 font-weight-normal text-center', '', '', '', '', data.name, 1)
    let cardBodyDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-body', '', '', '', '', '', 1)
    let priceDiv = addNewElement(0, 'h5', cardBodyDiv, '', 'card-title', '', '', '', '', price.toFixed(2).replace( ".", "," ) + "€", 1)
    let descDiv = addNewElement(0, 'p', cardBodyDiv, '', 'card-text', '', '', '', '', data.description, 1)
    let couleurText = addNewElement(0, 'strong', cardBodyDiv, '', '', '', '', '', '', 'Couleur :', 1)
    let dropDownDiv = addNewElement(0, 'div', cardBodyDiv, '', 'ml-2 mt-2 dropdown', '', '', '', '', '', 1)

    let dropButton = addNewElement(0, 'button', dropDownDiv, 'dropdownMenuButton', 'btn btn-secondary dropdown-toggle', '', 'button', '', '', 'Couleur', 1)
    dropButton.setAttribute('data-toggle','dropdown')
    dropButton.setAttribute('aria-haspopup', 'true')
    dropButton.setAttribute('aria-expanded', 'false')

    let downMenuDiv = addNewElement(0, 'div', dropDownDiv, '', 'dropdown-menu', '', '', '', '', '', 1)
    downMenuDiv.setAttribute('aria-labelledby', 'dropdownMenuButton')

    for (let i = 0; i < data.colors.length; i++) {
        var color = addNewElement(0, 'a', downMenuDiv, '', 'dropdown-item', '', '', '', '', data.colors[i], 1)
        if (i === 0) dropButton.innerHTML = data.colors[i]
        color.addEventListener('click', function() {
            dropButton.innerHTML = data.colors[i]
        }, false);
    }
    let addPanierDiv = addNewElement(0, 'button', cardBodyDiv, '', 'btn btn-lg btn-block btn-primary mx-auto mt-2', 'max-width: 300px;', '', '', '', 'Ajouter au panier', 1)
    addPanierDiv.addEventListener('click', function() {
        panier = addPanier(data._id, dropButton.innerHTML, panier)
        console.log('panier: ' + panier)
    }, false);
}
// PAGE PANIER
function openPanier(){
    newPage('Panier')
        cardDiv = addNewElement(0, 'div', mainDiv, '', 'card shopping-cart mt-5', '', '', '', '', '', 1)
        cardHeaderDiv = addNewElement(0, 'div', cardDiv, '', 'card-header bg-dark text-light align-middle', '', '', '', '', '', 1)
            iconDiv = addNewElement(0, 'i', cardHeaderDiv, '', 'fa fa-shopping-cart', '', '', '', '', '', 1)
            titreHeaderDiv = addNewElement(0, 'span', cardHeaderDiv, '', 'ml-2', '', '', '', '', 'Mon panier', 1)
        cardBodyDiv = addNewElement(0, 'div', cardDiv, '', 'card-body', '', '', '', '', '', 1)

        cardFooterDiv = addNewElement(0, 'div', cardDiv, '', 'card-footer px-5', '', '', '', '', '', 1)
            priceTotDiv = addNewElement(0, 'div', cardFooterDiv, '', 'mt-3 text-right', '', '', '', '', 'Prix total: ', 1)
        for (let i = 0; i < panier.length; i++) {
            var pricetot = 0
            oneArticleReq(panier[i][0], function (article) {
                pricetot +=(article.price /100)
                price = article.price /100
                productDiv = addNewElement(0, 'div', cardBodyDiv, '', 'row', '', '', '', '', '', 1)
                    contentRowDiv = addNewElement(0, 'div', productDiv, '', 'col-4 col-sm-3 col-md-3 col-lg-2 text-center', '', '', '', '', '', 1)
                        contentRowImg = addNewElement(0, 'img', contentRowDiv, '', 'img-responsive', 'max-height: 80px; max-width: 120px;', '', article.imageUrl, 'test', '', 1)
                    contentRow2Div = addNewElement(0, 'div', productDiv, '', 'col-5 col-sm-6 col-md-7 col-lg-8', '', '', '', '', '', 1)
                        contentRow2Name = addNewElement(0, 'h4', contentRow2Div, '', 'product-name', '', '', '', '', '', 1)
                            contentRow2NameStrong = addNewElement(0, 'strong', contentRow2Name, '', '', '', '', '', '', article.name, 1)
                        contentRow2Desc = addNewElement(0, 'h5', contentRow2Div, '', '', '', '', '', '', '', 1)
                            contentRow2DescStrong = addNewElement(0, 'small', contentRow2Desc, '', '', '', '', '', '', article.description, 1)
                    contentRow3Div = addNewElement(0, 'div', productDiv, '', 'col-3 col-sm-3 col-md-2 col-lg-2 text-right', '', '', '', '', '', 1)
                        contentRow3Price = addNewElement(0, 'div', contentRow3Div, '', 'text-center', 'padding-top: 5px;', '', '', '', '', 1)
                            priceDiv = addNewElement(0, 'h6', contentRow3Price, '', '', '', '', '', '', '', 1)
                                priceStrong = addNewElement(0, 'strong', priceDiv, '', '', '', '', '', '', price.toFixed(2).replace( ".", "," ), 1)
                                    priceDevice = addNewElement(0, 'strong',priceStrong, '', 'text-muted', '', '', '', '', ' €', 1)
                        contentRow3Delete = addNewElement(0, 'div', contentRow3Div, '', 'text-right mr-3', '', '', '', '', '', 1)
                            deleteDiv = addNewElement(0, 'button', contentRow3Delete, '', 'btn btn-outline-danger btn-xs', '', 'button', '', '', '', 1)
                                deleteIconDiv = addNewElement(0, 'i', deleteDiv, '', 'fa fa-trash', '', '', '', '', '', 1)
                if (i+1 < panier.length) hrDiv = addNewElement(0, 'hr', cardBodyDiv, '', '', '', '', '', '', '', 1)
                if(i+1 === panier.length) pricetotaldiv = addNewElement(0, 'strong', priceTotDiv, '', '', '', '', '', '', pricetot.toFixed(2).replace( ".", "," ) + ' €', 1)
                deleteDiv.addEventListener('click', function() {
                    delPanier(panier[i])
                }, false);
            }, function (err) { error })
        }
        informationDiv = addNewElement(0, 'h4', cardFooterDiv, '', 'text-center my-4', '', '', '', '', 'Entrez vos informations', 1)
        form = addNewElement(0, 'form', cardFooterDiv, '', 'row g-3 needs-validation mx-auto mb-3', 'max-width: 900px;', '', '', '', '', 1)  
        form.setAttribute('novalidate', '')
            colNom = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', 1)
                nomLabel = addNewElement(0, 'label', colNom, '', 'form-label', '', '', '', '', 'Nom', 1)
                nomLabel.setAttribute('for','nom')
                nomInput = addNewElement(0, 'input', colNom, 'nom', 'form-control', '', 'text', '', '', '', 1)
                nomInvalide = addNewElement(0, 'div', colNom, '', 'invalid-feedback', '', '', '', '', 'Un nom valide est requis', 1)

            colPrenom = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', 1)
                prenomLabel = addNewElement(0, 'label', colPrenom, '', 'form-label', '', '', '', '', 'Prénom', 1)
                prenomLabel.setAttribute('for','prenom')
                prenomInput = addNewElement(0, 'input', colPrenom, 'prenom', 'form-control', '', 'text', '', '', '', 1)
                prenomInvalide = addNewElement(0, 'div', colPrenom, '', 'invalid-feedback', '', '', '', '', 'Un prenom valide est requis', 1)

            colMail = addNewElement(0, 'div', form, '', 'col-sm-12', '', '', '', '', '', 1)
                mailLabel = addNewElement(0, 'label', colMail, '', 'form-label', '', '', '', '', 'Email', 1)
                mailLabel.setAttribute('for','email')
                mailInput = addNewElement(0, 'input', colMail, 'email', 'form-control', '', '', '', '', '', 1)
                mailInput.setAttribute('placeholder','vous@exemple.fr')
                mailInput.setAttribute('required', '')
                mailInvalide = addNewElement(0, 'div', colMail, '', 'invalid-feedback', '', '', '', '', 'Une e-mail valide est requise', 1)

            colAdress = addNewElement(0, 'div', form, '', 'col-sm-12', '', '', '', '', '', 1)
                adressLabel = addNewElement(0, 'label', colAdress, '', 'form-label', '', '', '', '', 'Adresse', 1)
                adressLabel.setAttribute('for','adress')
                adressInput = addNewElement(0, 'input', colAdress, 'adress', 'form-control', '', '', '', '', '', 1)
                adressInput.setAttribute('placeholder','01 rue Saint Martin')
                adressInput.setAttribute('required', '')
                adressInvalide = addNewElement(0, 'div', colAdress, '', 'invalid-feedback', '', '', '', '', 'Une adresse valide est requise', 1)

            colPostal = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', 1)
                postalLabel = addNewElement(0, 'label', colPostal, '', 'form-label', '', '', '', '', 'Code postal', 1)
                postalLabel.setAttribute('for','postal')
                postalInput = addNewElement(0, 'input', colPostal, 'postal', 'form-control', '', 'text', '', '', '', 1)
                postalInvalide = addNewElement(0, 'div', colPostal, '', 'invalid-feedback', '', '', '', '', 'Un code postal valide est requis', 1)

            colVille = addNewElement(0, 'div', form, '', 'col-sm-6', '', '', '', '', '', 1)
                villeLabel = addNewElement(0, 'label', colVille, '', 'form-label', '', '', '', '', 'Ville', 1)
                villeLabel.setAttribute('for','ville')
                villeInput = addNewElement(0, 'input', colVille, 'ville', 'form-control', '', 'text', '', '', '', 1)
                villeInvalide = addNewElement(0, 'div', colVille, '', 'invalid-feedback', '', '', '', '', 'Une ville valide est requise', 1)

            hrDiv = addNewElement(0, 'hr', form, '', '', '', '', '', '', '', 1)
            validButton = addNewElement(0, 'button', form, '', 'btn btn-primary btn-lg -btn-block', '', 'submit', '', '', 'Procéder au paiement', 1)
}