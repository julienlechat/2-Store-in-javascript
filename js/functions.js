// PAGE PRETE
function ready(fn) {
    if (document.readyState !=  "loading") {
        fn()
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
// NOUVELLE PAGE
function newPage(title) {
    document.title = "Orinoco - " + title
    mainDiv.innerHTML = ''
}
// ALERTE
function alertSpoil(title, desc, color) {
    var divAlert = document.createElement('div');
    divAlert.className = "alert " + color + " alert-dismissible fade show mx-5";
    divAlert.setAttribute('role', 'alert')
    divAlert.innerHTML = desc
    mainDiv.prepend(divAlert);

    divAlert.prepend(addNewElement(0, 'strong', divAlert, '', '', '', '', '', '', title + ' ', 0))

    var buttonAlert = addNewElement(0, 'button', divAlert, '', 'btn-close', '', 'button', '', '', '', 1)
    buttonAlert.setAttribute('data-dismiss', 'alert')
    buttonAlert.setAttribute('aria-label', 'Close')
}
// AJOUTER UN ELEMENT
function addNewElement(val, elementName, to, id, className, style, type, src, alt, content, append) {
    let newElement = (val === 0) ? document.createElement(elementName) : (val === 1) ? document.getElementById(elementName) : document.getElementsByClassName(elementName)

    if (id !== "") newElement.id = id
    if (className !== "") newElement.className = className
    if (style !== "") newElement.style = style
    if (type !== "") newElement.type = type
    if (src !== "") newElement.src = src
    if (alt !== "") newElement.alt = alt
    if (content !== "") newElement.innerHTML = content

    if (append === 1) to.appendChild(newElement);
    return newElement
}
function loadPanier() {
    if (localStorage.getItem("panier") !== null) {
        panier = JSON.parse(localStorage.getItem("panier"))
        showPanierValue(panier)
    } else {
        panier = []
    }
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
    openPanier()
    showPanierValue(panier)
}
function showPanierValue(panier) {
    if (panier.length > 0) {
        let panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', '<strong>Panier <span class="badge bg-secondary">' + panier.length +'</span></strong>', 0)
    } else {
        let panierDiv = addNewElement(1, 'panier', '', 'panier', 'nav-link', '', '', '', '', 'Panier', 0)
    }
}