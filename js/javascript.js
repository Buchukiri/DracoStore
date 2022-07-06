let articlesObj = {
    id1 : {
        name : "potion",
        prix : 2,
        stock : 10,
    },
    id2 : {
        name : "elixir",
        prix : 3,
        stock : 10
    },
    id3 : {
        name : "dague",
        prix : 12,
        stock : 10
    },
    id4 : {
        name : "fleche",
        prix : 1,
        stock : 10
    },
    id5 : {
        name : "pantalon",
        prix : 8,
        stock : 10
    },
    id6 : {
        name : "gants",
        prix : 4,
        stock : 10
    },
    id7 : {
        name : "marteau",
        prix : 16,
        stock : 10
    },
    id8 : {
        name : "epee",
        prix : 22,
        stock : 10
    },
    id9 : {
        name : "casque",
        prix : 18,
        stock : 10
    },
}

if(localStorage.getItem("articles") !== null){
    articlesObj = JSON.parse(localStorage.getItem("articles"));
}
const articlesName = Object.keys(articlesObj);
const articles = document.getElementById("article-list");
let priceWithoutTaxe = 0;
let pourcentTaxe = 13
let taxe = (pourcentTaxe/100)

const admin = document.getElementById("admin");

function createModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);
    document.getElementById("articles").insertBefore(modal, document.getElementById("article-main"));
    modalContent.addEventListener("click", function() {
        this.remove();
        admin.addEventListener("click", clickAdmin);
    });
    return modalContent;
}

    admin.addEventListener("click", clickAdmin);
function clickAdmin(){
    const modalContent = createModal();
    modalContent.innerHTML = '<button class="modal-close">x</button>';
    modalContent.innerHTML +=  "<img class='modify-img' src='img/logo-white.png' alt='logo-white' id='whiteLogo'>" ;
    modalContent.innerHTML += "<form class='form' label>Taux de taxe : </label> <input type='text' value='"+ pourcentTaxe +"' id='modalTaxe'size='5'<form class='form' method='post'>";
    this.removeEventListener("click", clickAdmin)
}

admin.addEventListener("click", clickAdmin);

function displayArticles(){
    
let display = "";

    for(const art of articlesName){
        display += "<li class='article-item'><a data-name='"+art+"' class='article-link' id='"+art+"' href='#' >"+
        "<img class='article-img' src='img/"+art+".png' alt='"+articlesObj[art].name+"' ></a>"+
        "<div class='art-info'><button data-article='"+art+"' class='modify-art'>"+
        "<img class='modify-img' src='img/crayon.png' alt='modifier'></button>"+
        "<p class='art-name'>"+articlesObj[art].name+"</p><p class='art-price'>"+articlesObj[art].prix+" PO</p>"+
        "<p data-stock='"+articlesObj[art].stock+"' class='art-stock'>En Stock : "+articlesObj[art].stock+"</p>"+
        // "<div class='main-btns' id='main-btns'><img class='minus' id='minus' src='img/minus.png'></div>"+
        "<input class='main-number' type='number' min='0' max='"+articlesObj[art].stock+"' data-qtty='"+art+"' value='0'></div></li>";
        // "<div><img class='plus' id='plus' src='img/plus.png'></div>
    
    }
    articles.innerHTML = display;


// compteur d'articles
// const articleCount = document.getElementById("articles-count");

// function articlesCounter() {
//   articleCount.innerText = finalCart.childElementCount; 
// }

const finalCart = document.getElementById("final-cart-ul")
const imgLinks = document.querySelectorAll(".article-link")

// click image
imgLinks.forEach(btn => {
        btn.addEventListener('click', addCart);
    
});


// add bucket
function addCart(event) {
    
    if (articlesObj[this.dataset.name].stock !== 0) {
        
        // compteur d'articles INPUT MAIN
        let mainInputArt = document.querySelector("[data-qtty='"+this.dataset.name+"']").value;
        const li = document.createElement("li");
        li.classList.add("articleCart");
        li.innerHTML = "<img class='cart-img' src='"+this.firstElementChild.src+"'>";
        li.innerHTML += "<div class='cart-art-info'><p>"+articlesObj[this.dataset.name].name+"</p>"+
        "<p>"+articlesObj[this.dataset.name].prix + " PO</p>"+
        // "<div class='quantity-item'><button class='art-button-moins'>-</button>"+
        "<input class='art-button' type='number' value='"+mainInputArt+"' min='0' max="+articlesObj[this.dataset.name].stock+" data-input='"+this.dataset.name+"' data-prix='"+ articlesObj[this.dataset.name].prix +"'>";
        // "<button class='art-button-plus'>+</button></div></div>";
        li.innerHTML += "<button><img class='cross-button' src=../img/cross-button.png></button>"
        finalCart.appendChild(li);
        priceWithoutTaxe += parseInt(articlesObj[this.dataset.name].prix);
        document.getElementById("final-price").innerHTML = "Prix HT : " + priceWithoutTaxe + " PO" + "<br>";
        let totalTaxe = parseFloat((taxe*priceWithoutTaxe).toFixed(2));
        document.getElementById("final-price").innerHTML += "Taxe : " + totalTaxe + " PO" + "<br>";
        let priceTTC = (priceWithoutTaxe + totalTaxe);
        document.getElementById("final-price").innerHTML += "Prix TTC : " + priceTTC + " PO" ;
        
        /*if (priceWithoutTaxe >= 100){
           
        }*/
        // articlesCounter()
        this.removeEventListener("click",addCart);
    }
}

    /* MODIFY STOCK AFTER SELLING */
function validateCart(){
    if(confirm("Voulez vous valider la transaction ?")){
        const qttList = document.querySelectorAll(".articleCart input");
        for(const qtt of qttList){
            // console.log(articlesObj[qtt.dataset.input].stock);
            // console.log(qtt.value);
            articlesObj[qtt.dataset.input].stock -= qtt.value;
            if(articlesObj[qtt.dataset.input].stock <= 0){
                alert("Attention ! Stock de "+articlesObj[qtt.dataset.input].name +" épuisé ! Il faut se réapprovisionner !");
            }
            // console.log(articlesObj[qtt.dataset.input].stock);
        }
        finalCart.innerHTML = "";
        document.getElementById("final-price").innerHTML = "";
        priceWithoutTaxe=0;
        displayArticles();
        this.removeEventListener("click",validateCart);
    }
    localStorage.setItem("articles", JSON.stringify(articlesObj));
}

document.getElementById("validate").addEventListener("click", validateCart);

    

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
    // console.log(article);
    const modalContent = createModal();
    modalContent.innerHTML = '<button class="modal-close" id="modal-close">x</button>';
    modalContent.innerHTML += "<div class='modif-content'><div><img src='img/"+article+".png' alt='"+articlesObj[article].name+"' </div>"+
    "<div><form class='form' method='post'>"+
    "<label>Nom de l'article : </label><input id='"+article+"-name' type='text' value='"+articlesObj[article].name+"' size='5'><br>"+
    "<label>Prix de l'article : </label><input id='"+article+"-price' type='text' value='"+articlesObj[article].prix+"' size='5'><br>"+
    "<label>Stock de l'article : </label><input id='"+article+"-stock' type='text' value='"+articlesObj[article].stock+"' size='5'><br>"+
    "<input type='submit' value='valider' id='submit'>"+
    "</form></div></div>";

    document.getElementById("submit").addEventListener("click", function(e){
        e.preventDefault();
        console.log(document.getElementById(article+"-name").value);
        articlesObj[article].name = document.getElementById(article+"-name").value;
        articlesObj[article].prix = document.getElementById(article+"-price").value;
        articlesObj[article].stock = document.getElementById(article+"-stock").value;
        displayArticles();
        modalContent.parentElement.remove();
        document.getElementById("validate").removeEventListener("click", validateCart);
    });

    document.getElementById("modal-close").addEventListener("click", function() {
        modalContent.parentElement.remove();
    });

}
    
    const modifList = document.querySelectorAll(".modify-art");
    
    for(const modif of modifList){
        modif.addEventListener("click", modifArticle);
    }
    
     finalCart.addEventListener("click", function(event) {
        if (event.target.classList.contains("cross-button")){
            event.target.parentElement.parentElement.remove()
        }
     })
}
    displayArticles();
