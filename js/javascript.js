const articlesObj = {
    potion : {
        name : "potion",
        prix : 2,
        stock : 10,
    },
    elixir : {
        name : "elixir",
        prix : 3,
        stock : 10
    },
    dague : {
        name : "dague",
        prix : 12,
        stock : 10
    },
    fleche : {
        name : "fleche",
        prix : 1,
        stock : 10
    },
    pantalon : {
        name : "pantalon",
        prix : 8,
        stock : 10
    },
    gants : {
        name : "gants",
        prix : 4,
        stock : 10
    },
    marteau : {
        name : "marteau",
        prix : 16,
        stock : 10
    },
    epee : {
        name : "epee",
        prix : 22,
        stock : 10
    },
    casque : {
        name : "casque",
        prix : 18,
        stock : 10
    },
}


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

function clickAdmin(){
    const modalContent = createModal();
    modalContent.innerHTML = '<button class="modal-close">x</button>';
    this.removeEventListener("click", clickAdmin)
}

admin.addEventListener("click", clickAdmin);



const articlesName = Object.keys(articlesObj);
const articles = document.getElementById("article-list");
let priceWithoutTaxe = 0;


function displayArticles(){
let display = "";

    for(const art of articlesName){
        display += "<li class='article-item'><a data-name='"+art+"' class='article-link' id='"+art+"' href='#' >"+
        "<img class='article-img' src='img/"+art+".png' alt='"+art+"' ></a>"+
        "<div class='art-info'><button data-article='"+art+"' class='modify-art'>"+
        "<img class='modify-img' src='img/crayon.png' alt='modifier'></button>"+
        "<p class='art-name'>"+articlesObj[art].name+"</p><p class='art-price'>"+articlesObj[art].prix+" PO</p>"+
        "<p class='art-stock'>En Stock : "+articlesObj[art].stock+"</p>"+
        // "<div class='main-btns' id='main-btns'><img class='minus' id='minus' src='img/minus.png'></div>"+
        "<input class ='main-number' id='main-number' type='number'></div></li>";
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
    let currentValue = this.nextSibling.lastChild.value;
    if(currentValue == '') {
        currentValue = 1;
    }
        const li = document.createElement("li");
        li.classList.add("articleCart");
        li.setAttribute('data-total', currentValue * articlesObj[this.dataset.name].prix);
        li.innerHTML = "<img class='cart-img' src='"+this.firstElementChild.src+"'>";
        li.innerHTML += "<div class='cart-art-info'><p>"+this.dataset.name+"</p>"+
        "<p>"+articlesObj[this.dataset.name].prix + " PO</p>"+
        // "<div class='quantity-item'><button class='art-button-moins'>-</button>"+
        "<input class='art-button' type='number' min='1' max="+articlesObj[this.dataset.name].stock+" data-input='"+this.dataset.name+"' data-prix='"+ articlesObj[this.dataset.name].prix +"'>";
        // "<button class='art-button-plus'>+</button></div></div>";
        li.getElementsByClassName('art-button')[0].value = currentValue;
        priceWithoutTaxe += parseInt(articlesObj[this.dataset.name].prix);
        document.getElementById("final-price").innerHTML = "Prix HT : " + priceWithoutTaxe + " PO";
        
        if (priceWithoutTaxe >= 100){
           
        }
        finalCart.appendChild(li);
        // articlesCounter()
        this.removeEventListener("click",addCart);
        UpdateTotal();
    }
    
/* Update Price on Quantity change */

finalCart.addEventListener('click', function(evt) {
    if(evt.target && evt.target.className == 'art-button') {
        let currentValue = evt.target.value;
        let currentPrice = evt.target.dataset.prix;
        let currentTotal = currentValue * currentPrice;
        UpdateTotal();
    }
});

function UpdateTotal() {
    let articles = document.getElementsByClassName('articleCart');
    let total = 0;
    // articles.forEach(article => {
    //     total += article.dataset.total;

    // });
    document.getElementById("final-price").innerHTML = "Prix HT : " + total + " PO";
    console.log(total)
}

    /* MODIFY STOCK AFTER SELLING */
function validateCart(){
    if(confirm("Voulez vous valider la transaction ?")){
        const qttList = document.querySelectorAll(".articleCart input");
        for(const qtt of qttList){
            // console.log(articlesObj[qtt.dataset.input].stock);
            console.log(qtt.value);
            articlesObj[qtt.dataset.input].stock -= qtt.value;
            // console.log(articlesObj[qtt.dataset.input].stock);
        }
        finalCart.innerHTML = "";
        document.getElementById("final-price").innerHTML = "";
        priceWithoutTaxe=0;
        displayArticles();
    }
    this.removeEventListener("click",validateCart);
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
    console.log(article);
    const modalContent = createModal();
    modalContent.innerHTML = '<button class="modal-close" id="modal-close">x</button>';
    modalContent.innerHTML += "<div class='modif-content'><div><img src='img/"+article+".png' alt='"+article+"' </div>"+
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
    });

    document.getElementById("modal-close").addEventListener("click", function() {
        modalContent.parentElement.remove();
    });

}
    
    const modifList = document.querySelectorAll(".modify-art");
    
    for(const modif of modifList){
        modif.addEventListener("click", modifArticle);
    }
    
}
    displayArticles();
