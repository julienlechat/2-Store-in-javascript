const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
mainDiv = document.getElementById("main")

//EXECUTION CODE -> LOAD PANIER | CHARGES LES ARTICLES DANS L'INDEX | BUTTON INDEX | BUTTON PANIER
ready(function() {
    panier = loadPanier()
    articleREQ(localStorage.getItem("articlePage"))
        .then(function (res){openArticle(res)})
        .catch(function (er){er})
})
// CHARGE LA PAGE D'UN ARTICLE
function openArticle(article) {
    newPage(article.name)
    price = article.price /100
    //BOUTON RETOUR
    returnButton = addNewElement(0, 'button', mainDiv, '', 'btn btn-outline-secondary', '', 'button', '', '', 'Retour', [['onclick','goIndex()']], 1)
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
function goIndex() {
    window.location.href = "index.html";
}