const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
mainDiv = document.getElementById("main")

//EXECUTION CODE -> LOAD PANIER | CHARGES LES ARTICLES DANS L'INDEX | BUTTON INDEX | BUTTON PANIER
ready(function() {
    panier = loadPanier()
    articlesREQ()
        .then(function (res){openArticles(res)})
        .catch(function (er){er})
})
// AFFICHAGE DES ARTICLES
function openArticles(articles) {
    newPage('Accueil')
    addNewElement(0, 'h1', mainDiv, '', "display-4 mt-5 mb-5 text-center", '', '', '', '', "Nos articles", '', 1)
    articlesDIV = addNewElement(0, 'div', mainDiv, "articles", "row", '', '', '', '', '', '', 1)
    // ARTICLE A L'UNITE
    for (let i = 0; i < articles.length; i++) {
        price = articles[i].price /100
        boxDIV = addNewElement(0, 'div', articlesDIV, "", "col-lg-4 col-md-6", '', '','', '','', '', 1)
        articleDIV = addNewElement(0, 'div', boxDIV, articles[i]._id, "card mt-1 mb-4 shadow-sm anim-zoom", '', '', '', '', '', [['onclick','openThisArticle(this.id)']], 1)
        addNewElement(0, 'div', articleDIV, "", "card-header font-weight-bold", '', '', '', '', articles[i].name, '', 1)
        addNewElement(0, 'img', articleDIV, "", "card-img-top", '', '', articles[i].imageUrl, articles[i].description, articles[i].name, '', 1)
        articleBODY = addNewElement(0, 'div', articleDIV, "", "card-body", '', '', '', '', '', '', 1)
        addNewElement(0, 'span', articleBODY, "", "badge bg-secondary", '', '', '', '', price.toFixed(2).replace(".", ",") + "€", '', 1)
        addNewElement(0, 'p', articleBODY, "", "card-text", '', '', '', '',articles[i].description, '', 1)
    }
}
function openThisArticle(id){
    localStorage.setItem("articlePage", id);
    window.location.href = "article.html";
}