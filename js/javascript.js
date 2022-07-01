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




// const admin = document.getElementById("admin");

// function createModal() {
//     const modal = document.createElement("div");
//     modal.className = "modal";
//     const modalContent = document.createElement("div");
//     modalContent.className = "modal-content";
//     modal.appendChild(modalContent);
//     document.getElementById("articles").insertBefore(modal, document.getElementById("article-main"));
//     modalContent.addEventListener("click", function() {
//         this.remove();
//         admin.addEventListener("click", clickAdmin);
//     });
//     return modalContent;
// }

// function clickAdmin(){
//     const modalContent = createModal();
//     modalContent.innerHTML = '<button class="modal-close">x</button>';
//     this.removeEventListener("click", clickAdmin)
// }

// admin.addEventListener("click", clickAdmin);


const articlesName = Object.keys(articlesObj);
// console.log(articlesName);

const articles = document.getElementById("article-list");
let display = "";

for(const art of articlesName){
    display += "<li class='article-item'><a  data-name='"+art+"' class='article-link' id='"+art+"' href='#' >"+
    "<img class='article-img' src='img/"+art+".png' alt='"+art+"' ></a>"+
    "<div class='art-info'><button class='modify-art'>"+
    "<img class='modify-img' src='img/crayon.png' alt='modifier'></button>"+
    "<p class='art-name'>"+art+"</p><p class='art-price'>"+articlesObj[art].prix+" PO</p>"+
    "<p class='art-stock'>En Stock : "+articlesObj[art].stock+"</p></div></li>";

}

articles.innerHTML = display;

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
        "<p>"+articlesObj[this.dataset.name].prix + " PO</p></div>"; 
        priceWithoutTaxe += articlesObj[this.dataset.name].prix;
        document.getElementById("final-price").innerHTML = "Prix HT : " + priceWithoutTaxe + " PO";
        finalCart.appendChild(li);
        // articlesCounter()
        this.removeEventListener("click",addCart)
    }
    
