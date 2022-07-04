const articlesObj = {
    potion : {
        prix : 2,
        stock : 10,
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


function displayArticles(){
let display = "";
    for(const art of articlesName){
        display += "<li class='article-item'><a data-name='"+art+"' class='article-link' id='"+art+"' href='#' >"+
        "<img class='article-img' src='img/"+art+".png' alt='"+art+"' ></a>"+
        "<div class='art-info'><button data-article='"+art+"' class='modify-art'>"+
        "<img class='modify-img' src='img/crayon.png' alt='modifier'></button>"+
        "<p class='art-name'>"+art+"</p><p class='art-price'>"+articlesObj[art].prix+" PO</p>"+
        "<p class='art-stock'>En Stock : "+articlesObj[art].stock+"</p>"+
        // "<div class='main-btns' id='main-btns'><img class='minus' id='minus' src='img/minus.png'></div>"+
        "<input class ='main-number' id='main-number' type='number'></div></li>";
        // "<div><img class='plus' id='plus' src='img/plus.png'></div>
    
    }
    articles.innerHTML = display;
}

displayArticles();

// compteur d'articles
const articleCount = document.getElementById("articles-count");

// function articlesCounter() {
//   articleCount.innerText = finalCart.childElementCount; 
// }

const finalCart = document.getElementById("final-cart-ul")
const imgLinks = document.querySelectorAll(".article-link")

// click image
imgLinks.forEach(btn => {
        btn.addEventListener('click', addCart);
    
});

let priceWithoutTaxe = 0;

// add bucket
function addCart(event) {
        const li = document.createElement("li");
        li.classList.add("articleCart");
        li.innerHTML = "<img class='cart-img' src='"+this.firstElementChild.src+"'>";
        li.innerHTML += "<div class='cart-art-info'><p>"+this.dataset.name+"</p>"+
        "<p>"+articlesObj[this.dataset.name].prix + " PO</p>"
        li.innerHTML += "<button><img class='cross-button' src=../img/cross-button.png></button>"
        finalCart.appendChild(li);
        // "<div class='quantity-item'><button class='art-button-moins'>-</button>"+
        "<input class='art-button'type='number'>";
        // "<button class='art-button-plus'>+</button></div></div>";
        priceWithoutTaxe += articlesObj[this.dataset.name].prix;
        document.getElementById("final-price").innerHTML = "Prix HT : " + priceWithoutTaxe + " PO";
        finalCart.appendChild(li);
        // articlesCounter()
        this.removeEventListener("click",addCart) 
    }

    
function createModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);
    document.getElementById("articles").insertBefore(modal, document.getElementById("article-main"));

    return modalContent;
}

function modifArticle(){
    const article = this.dataset.article;
    const modalContent = createModal();
    modalContent.innerHTML = '<button class="modal-close" id="modal-close">x</button>';
    modalContent.innerHTML += "<div class='modif-content'><div><img src='img/"+article+".png' alt='"+article+"' </div>"+
    "<div><form class='form' method='post'>"+
    "<label>Nom de l'article : </label><input id='"+article+"-name' type='text' value='"+article+"' size='5'><br>"+
    "<label>Prix de l'article : </label><input id='"+article+"-price' type='text' value='"+articlesObj[article].prix+"' size='5'><br>"+
    "<label>Stock de l'article : </label><input id='"+article+"-stock' type='text' value='"+articlesObj[article].stock+"' size='5'><br>"+
    "<input type='submit' value='valider' id='submit'>"+
    "</form></div></div>";

    document.getElementById("submit").addEventListener("click", function(e){
        e.preventDefault();
        console.log(article);
        // articlesObj[article].name = document.getElementById(article+"-name").value;
        articlesObj[article].prix = document.getElementById(article+"-price").value;
        articlesObj[article].stock = document.getElementById(article+"-stock").value;
        displayArticles();
        modalContent.parentElement.remove();
    });

    document.getElementById("modal-close").addEventListener("click", function() {
        modalContent.parentElement.remove();
    });

}
    
    const modifList = document.querySelectorAll(".modify-art");
    
    for(const modif of modifList){
        modif.addEventListener("click", modifArticle);
    }
    
    // finalCart

     finalCart.addEventListener("click", function(event) {
        if (event.target.classList.contains("cross-button")){
            event.target.parentElement.parentElement.remove()
        }
     })




    // finalCart.addEventListener("click", function(event) {
    //     if (document.querySelectorAll(".cross-button"))
    //         console.log(event.target)
    //        finalCart.remove(".articleCart");
    //      console.log(querySelectorAll(".button"));           
    // })
        

    // let finalCartUl = document.querySelector(".final-cart-ul");
    // finalCart.addEventListener("click", function(event) {
    //     document.querySelectorAll(".cross-button").addEventListener('click', function(event) {
    //         console.log(document.querySelectorAll(".articleCart >.cross-button"))
    //         finalCartUl.remove("target.articleCart");
    //             })})