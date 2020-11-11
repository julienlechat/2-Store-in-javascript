// REQUETE JSON -> LISTE ARTICLES
function allArticlesReq(success, error){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", link + article, true);
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4) {
            if (this.status === 200) {
                success(xhttp.response);
            } else if(this.status === 404) {
                error(alertSpoil('Erreur 404', 'Fichier introuvable', 'alert-danger'))
            } else {
                error(alertSpoil('Erreur ' + this.status, 'Erreur de type inconnue', 'alert-danger'))
            }
        }
    }
    xhttp.send();
}
// INDEX -> REQ JSON -> ARTICLE
function oneArticleReq(id, success, error) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", link + article + '/' + id, true);
    xhttp.responseType = "json";
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4) {
            if (this.status === 200) {
                success(xhttp.response);
            } else if(this.status === 404) {
                error(alertSpoil('Erreur 404', 'Fichier introuvable', 'alert-danger'))
            } else {
            error(alertSpoil('Erreur ' + this.status, 'Erreur de type inconnue', 'alert-danger'))
            }
        }
    }
    xhttp.send();
}
