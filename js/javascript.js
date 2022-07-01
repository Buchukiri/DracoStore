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
    "<img data-name='"+art+"' class='article-img' src='img/"+art+".png' alt='"+art+"' >"+
    "<div class='art-info'><p class='art-name'>"+art+"</p>"+
    "<p class='art-price'>"+articlesObj[art].prix+" PO</p>"+
    "<p class='art-stock'>En Stock : "+articlesObj[art].stock+"</p>"+
    // "<div class='main-btns' id='main-btns'><img class='minus' id='minus' src='img/minus.png'></div>"+
    "<input class ='main-number' id='main-number' type='number'></div></div></a></li>";
    // "<div><img class='plus' id='plus' src='img/plus.png'></div>
   

}

articles.innerHTML = display;

// compteur d'articles
const articleCount = document.getElementById("articles-count");

// function articlesCounter() {
//   articleCount.innerText = finalCart.childElementCount; 
// }

const finalCart = document.getElementById("final-cart-ul")
const imgBtns = document.querySelectorAll(".article-img")

// click image
imgBtns.forEach(btn => {
        btn.addEventListener('click', addCart);
    
});

let priceWithoutTaxe = 0;

// add bucket
function addCart(event) {
        const li = document.createElement("li");
        li.classList.add("articleCart");
        // console.log(this);
        li.innerHTML = "<img class='cart-img' src='"+this.src+"'>";
        li.innerHTML += "<div class='cart-art-info'><p>"+this.dataset.name+"</p>"+
        "<p>"+articlesObj[this.dataset.name].prix + " PO</p></div>"; 
        priceWithoutTaxe += articlesObj[this.dataset.name].prix;
        console.log(priceWithoutTaxe);
        document.getElementById("final-price").innerHTML = "Prix HT : " + priceWithoutTaxe + " PO";
        finalCart.appendChild(li);
        // articlesCounter()
        this.removeEventListener("click",addCart)
    }
    
