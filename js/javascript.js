const articlesObj = {
    potion : {
        prix : 2,
        quantité : 10
    },
    elixir : {
        prix : 3,
        quantité : 10
    },
    dague : {
        prix : 12,
        quantité : 10
    },
    fleche : {
        prix : 1,
        quantité : 10
    },
    pantalon : {
        prix : 8,
        quantité : 10
    },
    gants : {
        prix : 4,
        quantité : 10
    },
    marteau : {
        prix : 16,
        quantité : 10
    },
    epee : {
        prix : 22,
        quantité : 10
    },
    casque : {
        prix : 18,
        quantité : 10
    },
}

const articlesName = Object.keys(articlesObj);
// console.log(articlesName);

const articles = document.getElementById("article-list");
let display = "";

for(const art of articlesName){
    display += "<li class='article-item'><a class='article-link' id='"+art+"' href='#' >"+
    "<img class='article-img' src='img/"+art+".png' alt='"+art+"' >"+
    "<p class='price'>"+articlesObj[art].prix+" PO</p></a></li>";
}

articles.innerHTML = display;