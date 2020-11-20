const article = 'teddies'
const link = 'http://' + window.location.hostname + ':3000/api/'
mainDiv = document.getElementById("main")

//EXECUTION CODE -> LOAD PANIER | CHARGES LES ARTICLES DANS L'INDEX | BUTTON INDEX | BUTTON PANIER
ready(function() {
    panier = loadPanier()
    newPage('Confirmation')
    pricetot = 0

    data = JSON.parse(localStorage.getItem("confirmation"));

    addNewElement(0, 'div', mainDiv, '', "alert alert-success mt-3", '', '', '', '', "Votre commande n° " + data.orderId + " a bien été validée", [['role','alert']], 1)
    card = addNewElement(0, 'div', mainDiv, '', "card mt-5", '', '', '', '', '', '', 1)
    cardBody = addNewElement(0, 'div', card, '', "card-body mx-4 mt-4", '', '', '', '', '', '', 1)
    addNewElement(0, 'h5', cardBody, '', "card-title", '', '', '', '', 'Félicitation ' + data.contact.firstName + ' ' + data.contact.lastName + ' !', '', 1)
    addNewElement(0, 'p', cardBody, '', "card-text mt-2", '', '', '', '', "Un mail vous a été adressé à l'adresse " + data.contact.email, '', 1)
    addNewElement(0, 'p', cardBody, '', "card-text mt-4", '', '', '', '', 'Voici un récapitulatif de vos/votre article(s) :', '', 1)

    for (i=0; i < data.products.length; i++) {
        price = data.products[i].price/100
        pricetot += price
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
    addNewElement(0, 'p', cardBody, '', "card-text mt-1", '', '', '', '', 'Montant total de votre commande: <b>' + pricetot.toFixed(2).replace( ".", "," ) + '€</b>', '', 1)
    addNewElement(0, 'p', cardBody, '', "card-text mt-4", '', '', '', '', "Vos/votre article(s) seront envoyé(s) à l'adresse:", '', 1)
    addNewElement(0, 'p', cardBody, '', "card-text", '', '', '', '', '<b>' + data.contact.lastName + ' ' + data.contact.firstName + '</br>' + data.contact.address + '<br>' + data.contact.city + '</b>', '', 1)

    // Delete panier
    panier = []
    localStorage.clear()
    showPanierValue(panier)

})