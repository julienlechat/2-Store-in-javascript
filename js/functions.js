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
    divAlert.innerHTML = "<strong>" + title + "</strong> " + desc
    mainDiv.prepend(divAlert);

    var buttonAlert = addNewElement(0, 'button', divAlert, '', 'btn-close', '', 'button', '', '')
    buttonAlert.setAttribute('data-dismiss', 'alert')
    buttonAlert.setAttribute('aria-label', 'Close')
}
// AJOUTER UN ELEMENT
function addNewElement(val, elementName, to, id, className, style, type, src, alt, content) {
    let newElement = (val === 0) ? document.createElement(elementName) : (val === 1) ? document.getElementById(elementName) : document.getElementsByClassName(elementName)

    if (id !== "") newElement.id = id
    if (className !== "") newElement.className = className
    if (style !== "") newElement.style = style
    if (type !== "") newElement.type = type
    if (src !== "") newElement.src = src
    if (alt !== "") newElement.alt = alt
    if (content !== "") newElement.innerHTML = content

    to.appendChild(newElement);
    return newElement
}