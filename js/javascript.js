const articlesObj = {
    potion : {
        prix : 2,
        stock : 10
    },
    elixir : {
        prix : 3,
        stock : 10
    },
    dague : {
        prix : 12,
        stock : 10
    },
    fleche : {
        prix : 1,
        stock : 10
    },
    pantalon : {
        prix : 8,
        stock : 10
    },
    gants : {
        prix : 4,
        stock : 10
    },
    marteau : {
        prix : 16,
        stock : 10
    },
    epee : {
        prix : 22,
        stock : 10
    },
    casque : {
        prix : 18,
        stock : 10
    },
}

const articlesName = Object.keys(articlesObj);
// console.log(articlesName);

const articles = document.getElementById("article-list");
let display = "";

for(const art of articlesName){
    display += "<li class='article-item'><a class='article-link' id='"+art+"' href='#' >"+
    "<img class='article-img' src='img/"+art+".png' alt='"+art+"' >"+
    "<div class='art-info'><p class='art-name'>"+art+"</p>"+
    "<p class='art-price'>"+articlesObj[art].prix+" PO</p>"+
    "<p class='art-stock'>En Stock : "+articlesObj[art].stock+"</p></div></a></li>";

}

articles.innerHTML = display;