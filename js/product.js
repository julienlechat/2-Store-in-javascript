var productImgParent = document.getElementById('product-img')
let indicatorDivParent = document.getElementById('product-indicator')
var mainDivParent = document.getElementById('main')

articles = ['teddies', 'cameras' ,'furniture']

var RESjson = {};

//EXECUTION CODE
ready(function() {
    document.title = document.title + " - Produit"

    var idLink = window.location.pathname
    const regexLink = /\d/g;
    getInfoArt(idLink[idLink.search(regexLink)]);
});


//FONCTIONS
function ready(fn) {
    if (document.readyState !=  "loading") {
        fn()
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function getInfoArt(id) {
    let xhttp = new XMLHttpRequest();
        let article = articles[id];

        xhttp.open("GET", 'http://' + window.location.hostname + ':3000/api/' + article, true);
        xhttp.responseType = "json";
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                if (this.status === 200) {
                    var data = xhttp.response;
                    //let articleToModify = articles.indexOf(article);
                    createArticle(data.length, data);
                    console.log(data.length, data)
                    //console.log(id, data[0].name, data[0].imageUrl, data[0].description, data[0].price/100);

                } else if(this.status === 404) {
                    alertSpoil('Erreur 404', 'Fichier introuvable', 'alert-danger')
                    document.getElementById(i).remove();
                } else {
                alertSpoil('Erreur ' + this.status, 'Erreur de type inconnue', 'alert-danger')
                }
            }
        }
        xhttp.send();
}
function createArticle(length, data) {
    RESjson = data;

    //CAROUSEL
    for (let i = 0; i < length; i++) {

        //CREATION DIV + IMAGE ASSIGNEE
        let productDiv = document.createElement('div')
        productDiv.id = 'img-' + i
        productDiv.className = 'carousel-item'
        productImgParent.appendChild(productDiv)

        let imgDiv = document.createElement('img')
        imgDiv.className = 'd-block w-100'
        imgDiv.src = data[i].imageUrl
        productDiv.appendChild(imgDiv)

        // SLIDE
        let indicatorDiv = document.createElement('li')
        indicatorDiv.setAttribute('data-target', '#carousel')
        indicatorDiv.setAttribute('data-slide-to',i)
        indicatorDivParent.appendChild(indicatorDiv)


        console.log(data[i].colors.length)
        //console.log(data[i].name)
    }

    //MAIN DIV
    let cardHeaderDiv = document.createElement('div')
    cardHeaderDiv.className = 'card-header'
    mainDivParent.appendChild(cardHeaderDiv)

    let titleDiv = document.createElement('h4')
    titleDiv.id = 'titleDiv'
    titleDiv.className = "my-0 font-weight-normal text-center"
    titleDiv.innerHTML = data[0].name
    cardHeaderDiv.appendChild(titleDiv)

    let cardBodyDiv = document.createElement('div')
    cardBodyDiv.className = 'card-body'
    mainDivParent.appendChild(cardBodyDiv)

    priceDiv = document.createElement('h5')
    priceDiv.className = "card-title"
    let price = data[0].price /100
    priceDiv.innerHTML = price.toFixed(2).replace( ".", ",") + "€"
    cardBodyDiv.appendChild(priceDiv)

    console.log(data[0].name)

    //DEFINI LE 1e ELEMENT EN ACTIVE
    productImgParent.firstElementChild.className = 'carousel-item active'
    indicatorDivParent.firstElementChild.className = "active"

}
function SetInfoArt() {

}