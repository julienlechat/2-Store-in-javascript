// PAGE PRETE
function ready(fn) {
    if (document.readyState !=  "loading"){fn()}
    else
    {document.addEventListener("DOMContentLoaded", fn)}
}
// NOUVELLE PAGE
function newPage(title) {
    document.title = "Orinoco - " + title
    mainDiv.innerHTML = ''
}
// ALERTE
function alertSpoil(title, desc, color) {
    divAlert = addNewElement(0, 'div', mainDiv, '', 'alert ' + color + ' alert-dismissible fade show mx-5', '', '', '', '', ' ' + desc, [['role','alert']], 2)
    divTitle = addNewElement(0, 'strong', divAlert, '', '', '', '', '', '', title + '', '', 2)
    buttonAlert = addNewElement(0, 'button', divAlert, '', 'btn-close', '', 'button', '', '', '', [['data-dismiss','alert'],['aria-dismiss','Close']], 1)
}
// AJOUTER UN ELEMENT
function addNewElement(val, elementName, to, id, className, style, type, src, alt, content, attribut, append) {
    if (val === 0){newElement = document.createElement(elementName)}else if(val === 1){newElement = document.getElementById(elementName)}else{newElement = document.getElementsByClassName(elementName)}
    if (id !== "") newElement.id = id
    if (className !== "") newElement.className = className
    if (style !== "") newElement.style = style
    if (type !== "") newElement.type = type
    if (src !== "") newElement.src = src
    if (alt !== "") newElement.alt = alt
    if (content !== "") newElement.innerHTML = content
    if (attribut !== "") for (let i = 0; i < attribut.length; i++) newElement.setAttribute(attribut[i][0],attribut[i][1])
    if (append === 1) to.appendChild(newElement);
    if (append === 2) to.prepend(newElement);
    return newElement
}
// PANIER
function loadPanier() {
    if (localStorage.getItem("panier") !== null) {
        panier = JSON.parse(localStorage.getItem("panier"))
        showPanierValue(panier)
    } else {panier = []}
    return panier
}
function addDelPanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
    showPanierValue(panier)
    return panier
}
function checkPanier(action, id, color, panier, idPanier) {
    function check() {
        for (let i = 0; i < panier.length; i++) {
            if (panier[i][0] === id && panier[i][1] === color) {
                if (action === 0) { 
                    panier[i][2] += 1
                    return 1
                } else if (action === 1 && panier[i][2] > 1) {
                    panier[i][2] -= 1
                    price = panier[i][3][5]*panier[i][2]
                    panier[i][3][7].innerHTML = 'x' + panier[i][2]
                    panier[i][3][6].innerHTML = price.toFixed(2).replace( ".", "," ) + '€'
                    return 2
                }
            }
        }
        return 0
    }
    var checkMulti = check()
    if (checkMulti === 0) {
        if (action === 0) panier.push([id, color, 1])
        if (action === 1) panier.splice(panier.indexOf(panier[idPanier]), 1)
    }
    changeStatus = addDelPanier(panier)
    console.log('panier: ' + changeStatus)
    return changeStatus
}
function showPanierValue(panier) {
    panier.length > 0 ? panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', '<strong>Panier <span class="badge bg-secondary">' + panier.length +'</span></strong>', '', 0) : panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', 'Panier', '', 0)
}
// BOUTON DELETE - PANIER
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