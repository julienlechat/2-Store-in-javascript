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
function addPanier(id, color, panier) {
    panier.push([id, color])
    localStorage.setItem("panier", JSON.stringify(panier));
    showPanierValue(panier)
    return panier
}
function delPanier(id) {
    panier.splice(panier.indexOf(id), 1)
    localStorage.setItem("panier", JSON.stringify(panier))
    openPanier() //a voir pour delete
    showPanierValue(panier)
}
function showPanierValue(panier) {
    panier.length > 0 ? panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', '<strong>Panier <span class="badge bg-secondary">' + panier.length +'</span></strong>', '', 0) : panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', 'Panier', '', 0)
}