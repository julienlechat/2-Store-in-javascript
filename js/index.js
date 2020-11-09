const article = 'teddies'

let mainDiv = document.getElementById("main")

//EXECUTION CODE
ready(function() {
    loadIndex();
});

//FONCTIONS
function ready(fn) {
    if (document.readyState !=  "loading") {
        fn()
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
function loadIndex(){
    document.title = "Orinoco - Accueil"
    mainDiv.innerHTML = ''

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", 'http://' + window.location.hostname + ':3000/api/' + article, true);
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

function createArticle(nb, data) {

    var titlePage = document.createElement('h1')
    titlePage.className = "display-4 mt-5 mb-5 text-center"
    titlePage.innerHTML = "Nos articles"
    mainDiv.appendChild(titlePage)

    var articlesDiv = document.createElement('div')
    articlesDiv.id = "articles"
    articlesDiv.className = "row"
    mainDiv.appendChild(articlesDiv)

    for (let i = 0; i < nb; i++) {
        //CREATION DIV TABLEAU
        var firstDiv = document.createElement('div')
        firstDiv.className = "col-lg-4 col-md-6";
        articlesDiv.appendChild(firstDiv)
        
        //SECOND DIV ( CARD )
        var secondDiv = document.createElement('div')
        secondDiv.className = "card mt-1 mb-4 shadow-sm article-index";
        secondDiv.id = i
        secondDiv.addEventListener('click', function() {
            openArticleReq(data[i]._id)
            console.log('Ouvrir le lien ' + data[i]._id)
        }, false);
        firstDiv.appendChild(secondDiv)


        //NAME DIV
        var nameDiv = document.createElement('div')
        nameDiv.className = "card-header font-weight-bold";
        nameDiv.innerHTML = data[i].name
        secondDiv.appendChild(nameDiv)

        //IMAGE DIV
        var imgDiv = document.createElement('img')
        imgDiv.className = "card-img-top";
        imgDiv.src = data[i].imageUrl
        secondDiv.appendChild(imgDiv)

        //DIV CARD-BODY
        var cardBodyDiv = document.createElement('div')
        cardBodyDiv.className = "card-body"
        secondDiv.appendChild(cardBodyDiv)

        //PRICE H5
        var priceDiv = document.createElement('h5')
        priceDiv.className = "card-title"
        var price = data[i].price /100
        priceDiv.innerHTML = price.toFixed(2).replace(".", ",") + "€"
        cardBodyDiv.appendChild(priceDiv)

        //DESCRIPTION p
        var descDiv = document.createElement('p')
        descDiv.className = "card-text"
        descDiv.innerHTML = data[i].description
        cardBodyDiv.appendChild(descDiv)
    }
}
function openArticleReq(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'http://' + window.location.hostname + ':3000/api/' + article + '/' + id, true);
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4) {
            if (this.status === 200) {
                //data = xhttp.response;
                openArticleRes(xhttp.response);
                console.log('envoie des infos')
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
function openArticleRes(data) {
    mainDiv.innerHTML = ''
    document.title = "Orinoco - " + data.name

    //BOUTON RETOUR
    let returnButton = document.createElement('button')
    returnButton.setAttribute('type', 'button')
    returnButton.className = "btn btn-outline-secondary"
    returnButton.innerHTML = 'Retour'
    returnButton.addEventListener('click', function() {
        loadIndex();
    }, false);
    mainDiv.appendChild(returnButton)


    //IMAGE
    let articleMainDiv = document.createElement('div')
    articleMainDiv.className = "card mt-4 box-shadow article-desc shadow-sm"
    mainDiv.appendChild(articleMainDiv)

    let imgDiv = document.createElement('img')
    imgDiv.className = "card-img-top"
    imgDiv.src = data.imageUrl
    articleMainDiv.appendChild(imgDiv)

    // PARTIE 2
    articleMainDiv = document.createElement('div')
    articleMainDiv.className = "card mt-4 box-shadow article-desc shadow-sm"
    mainDiv.appendChild(articleMainDiv)

    //TITRE
    let cardHeaderDiv = document.createElement('div')
    cardHeaderDiv.className = "card-header"
    articleMainDiv.appendChild(cardHeaderDiv)
   
    let titleDiv = document.createElement('h4')
    titleDiv.className = "my-0 font-weight-normal text-center"
    titleDiv.innerHTML = data.name
    cardHeaderDiv.appendChild(titleDiv)

    let cardBodyDiv = document.createElement('div')
    cardBodyDiv.className = "card-body"
    articleMainDiv.appendChild(cardBodyDiv)

    let priceDiv = document.createElement('h5')
    priceDiv.className = "card-title"
    var price = data.price /100
    priceDiv.innerHTML = price.toFixed(2).replace( ".", "," ) + "€"
    cardBodyDiv.appendChild(priceDiv)

    let descDiv = document.createElement('p')
    descDiv.className = "card-text"
    descDiv.innerHTML = data.description
    cardBodyDiv.appendChild(descDiv)

    let dropDownDiv = document.createElement('div')
    dropDownDiv.className = "dropdown"
    cardBodyDiv.appendChild(dropDownDiv)
    /*
        function setAttributes(div, dict){
            for (i = 0; i < len(dict); i++){
                div.setAttribute(dict[i].keys, dict[i].values)
            }
        }
        {"data-tootle": dropdown, "aria": true"}
    */
    let dropButton = document.createElement('button')
    dropButton.className = "btn btn-secondary dropdown-toggle"
    dropButton.setAttribute('type', 'button')
    dropButton.id = "dropdownMenuButton"
    dropButton.setAttribute('data-toggle','dropdown')
    dropButton.setAttribute('aria-haspopup', 'true')
    dropButton.setAttribute('aria-expanded', 'false')
    dropButton.innerHTML = "Couleur"
    dropDownDiv.appendChild(dropButton)

    let downMenuDiv = document.createElement('div')
    downMenuDiv.className = "dropdown-menu"
    downMenuDiv.setAttribute('aria-labelledby', 'dropdownMenuButton')
    dropDownDiv.appendChild(downMenuDiv)

    for (let i = 0; i < data.colors.length; i++) {
        var color = document.createElement('a')
        color.className = "dropdown-item"
        if (i === 0) color.className = "dropdown-item active"
        color.innerHTML = data.colors[i]
        downMenuDiv.appendChild(color)
    }

    let addPanierDiv = document.createElement('button')
    addPanierDiv.type = "button"
    addPanierDiv.className = "btn btn-lg btn-block btn-primary mx-auto mt-2"
    addPanierDiv.style = "max-width: 300px;"
    addPanierDiv.innerHTML = "Ajouter au panier"
    cardBodyDiv.appendChild(addPanierDiv)

}
function alertSpoil(title, desc, color) {
    var container = document.getElementById("main");

    var divAlert = document.createElement('div');
    divAlert.className = "alert " + color + " alert-dismissible fade show mx-5";
    divAlert.setAttribute('role', 'alert')
    divAlert.innerHTML = "<strong>" + title + "</strong> " + desc
    container.prepend(divAlert);

    var buttonAlert = document.createElement('button')
    buttonAlert.type = "button"
    buttonAlert.className = "close"
    buttonAlert.setAttribute('data-dismiss', 'alert')
    buttonAlert.setAttribute('aria-label', 'Close')
    divAlert.appendChild(buttonAlert);

    var contentButton = document.createElement('span')
    contentButton.setAttribute('aria-hidden','true')
    contentButton.innerHTML = "&times;"
    buttonAlert.appendChild(contentButton);
}