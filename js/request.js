// REQUETE JSON -> LISTE ARTICLES
function articlesREQ(){
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", link + article, true);
        xhttp.responseType = "json";
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                if (this.status === 200) {
                    resolve(xhttp.response);
                } else if(this.status === 404) {
                    reject(alertSpoil('Erreur 404', 'Fichier introuvable', 'alert-danger'))
                } else {
                    reject(alertSpoil('Erreur ' + this.status, 'Erreur de type inconnue', 'alert-danger'))
                }
            }
        }
        xhttp.send();
    })
}
// REQUETE JSON -> ARTICLE
function articleREQ(id) {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", link + article + '/' + id, true);
        xhttp.responseType = "json";
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                if (this.status === 200) {
                    resolve(xhttp.response);
                } else if(this.status === 404) {
                    reject(alertSpoil('Erreur 404', 'Fichier introuvable', 'alert-danger'))
                } else {
                reject(alertSpoil('Erreur ' + this.status, 'Erreur de type inconnue', 'alert-danger'))
                }
            }
        }
        xhttp.send();
    })
}
// REQUETE POST FORMULAIRE
function postREQ(data, products) {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", link + article + '/order', true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                if (this.status === 201) {
                    reponse = JSON.parse(xhttp.response)
                    resolve(reponse);
                } else {
                reject(alertSpoil('Erreur ' + this.status, 'Oups, une erreur est survenue lors du traitement de votre commande.', 'alert-danger'))
                }
            }
        }
        contact = {"contact": {'firstName': data[0], 'lastName': data[1], 'address': data[3], 'city': data[5], 'email': data[2]}, "products": products}
        xhttp.send(JSON.stringify(contact));
    })
}