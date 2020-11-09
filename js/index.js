const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
let mainDiv = document.getElementById("main")

//EXECUTION CODE
ready(function() {
    loadIndex();
});

// REQUETE JSON -> LISTE ARTICLES
function loadIndex(){
    newPage('Accueil')

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", link + article, true);
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4) {
            if (this.status === 200) {
                var data = xhttp.response;
                createArticle(data.length, data);
            } else if(this.status === 404) {
                alertSpoil('Erreur 404', 'Fichier introuvable', 'alert-danger')
            } else {
            alertSpoil('Erreur ' + this.status, 'Erreur de type inconnue', 'alert-danger')
            }
        }
    }
    xhttp.send();
}
// AFFICHAGE DES ARTICLES
function createArticle(nb, data) {
    var titlePage = addNewElement(0, 'h1', mainDiv, '', "display-4 mt-5 mb-5 text-center", '', '', '', '', "Nos articles")
    var articlesDiv = addNewElement(0, 'div', mainDiv, "articles", "row", '', '', '', '', '')
    // ARTICLE A L'UNITE
    for (let i = 0; i < nb; i++) {
        var price = data[i].price /100
        let firstDiv = addNewElement(0, 'div', articlesDiv, "", "col-lg-4 col-md-6", '', '','', '','')
        let secondDiv = addNewElement(0, 'div', firstDiv, i, "card mt-1 mb-4 shadow-sm anim-zoom", '', '', '', '', '')
        secondDiv.addEventListener('click', function() {
            openArticleReq(data[i]._id)
        }, false);
        var nameDiv = addNewElement(0, 'div', secondDiv, "", "card-header font-weight-bold", '', '', '', '', data[i].name)
        var imgDiv = addNewElement(0, 'img', secondDiv, "", "card-img-top", '', '', data[i].imageUrl, data[i].description, data[i].name)
        var cardBodyDiv = addNewElement(0, 'div', secondDiv, "", "card-body", '', '', '', '', '')
        var priceDiv =  addNewElement(0, 'span', cardBodyDiv, "", "badge bg-secondary", '', '', '', '', price.toFixed(2).replace(".", ",") + "€")
        var descDiv = addNewElement(0, 'p', cardBodyDiv, "", "card-text", '', '', '', '',data[i].description)
    }
}
// INDEX -> REQ JSON -> ARTICLE
function openArticleReq(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", link + article + '/' + id, true);
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4) {
            if (this.status === 200) {
                openArticleRes(xhttp.response);
            } else if(this.status === 404) {
                alertSpoil('Erreur 404', 'Fichier introuvable', 'alert-danger')
                return
            } else {
            alertSpoil('Erreur ' + this.status, 'Erreur de type inconnue', 'alert-danger')
            return
            }
        }
    }
    xhttp.send();
}
// PAGE ARTICLE
function openArticleRes(data) {
    newPage(data.name)
    var price = data.price /100
    //BOUTON RETOUR
    let returnButton = addNewElement(0, 'button', mainDiv, '', 'btn btn-outline-secondary', '', 'button', '', '', 'Retour')
    returnButton.addEventListener('click', function() {
        loadIndex();
    }, false);
    let articleMainDiv = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '')
    let imgDiv = addNewElement(0, 'img', articleMainDiv, '', 'card-img-top', '', '', data.imageUrl, data.description, '')
    let articleMainDiv2 = addNewElement(0, 'div', mainDiv, '', 'card mt-4 box-shadow anim-zoom-min shadow-sm', '', '', '', '', '')
    let cardHeaderDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-header', '', '', '', '', '')
    let titleDiv = addNewElement(0, 'h4', cardHeaderDiv, '', 'my-0 font-weight-normal text-center', '', '', '', '', data.name)
    let cardBodyDiv = addNewElement(0, 'div', articleMainDiv2, '', 'card-body', '', '', '', '', '')
    let priceDiv = addNewElement(0, 'h5', cardBodyDiv, '', 'card-title', '', '', '', '', price.toFixed(2).replace( ".", "," ) + "€")
    let descDiv = addNewElement(0, 'p', cardBodyDiv, '', 'card-text', '', '', '', '', data.description)
    let couleurText = addNewElement(0, 'strong', cardBodyDiv, '', '', '', '', '', '', 'Couleur :')
    let dropDownDiv = addNewElement(0, 'div', cardBodyDiv, '', 'ml-2 mt-2 dropdown', '', '', '', '', '')

    let dropButton = addNewElement(0, 'button', dropDownDiv, 'dropdownMenuButton', 'btn btn-secondary dropdown-toggle', '', 'button', '', '', 'Couleur')
    dropButton.setAttribute('data-toggle','dropdown')
    dropButton.setAttribute('aria-haspopup', 'true')
    dropButton.setAttribute('aria-expanded', 'false')

    let downMenuDiv = addNewElement(0, 'div', dropDownDiv, '', 'dropdown-menu', '', '', '', '', '')
    downMenuDiv.setAttribute('aria-labelledby', 'dropdownMenuButton')

    for (let i = 0; i < data.colors.length; i++) {
        var color = addNewElement(0, 'a', downMenuDiv, '', 'dropdown-item', '', '', '', '', data.colors[i])
        if (i === 0) dropButton.innerHTML = data.colors[i]
        color.addEventListener('click', function() {
            dropButton.innerHTML = data.colors[i]
        }, false);
    }
    let addPanierDiv = addNewElement(0, 'button', cardBodyDiv, '', 'btn btn-lg btn-block btn-primary mx-auto mt-2', 'max-width: 300px;', '', '', '', 'Ajouter au panier')
}