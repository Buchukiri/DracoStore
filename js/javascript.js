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


let imgLinks;
let articlesName = Object.keys(articlesObj);
const articles = document.getElementById("article-list");
let priceWithoutTaxe = 0;
let pourcentTaxe = 0; 
const admin = document.getElementById("admin");
const finalCart = document.getElementById("final-cart-ul");
let priceTTC;
let totalCaisse=0;
let giftValue = 100;
const addArticle = document.getElementById("add-article");

if(localStorage.getItem("articles") !== null){
    articlesObj = JSON.parse(localStorage.getItem("articles"));
}
if(localStorage.getItem("caisse") !== null){
    totalCaisse = JSON.parse(localStorage.getItem("caisse"));
}
if(localStorage.getItem("pourcentTaxe") !== null){
    pourcentTaxe = localStorage.getItem("pourcentTaxe");
}
let taxe = (pourcentTaxe/100);
addOpcacityIfNoneStock();

function clickAdmin(){
    const modalContent = createModal();
    modalContent.innerHTML += "<img class='logo-white-img' src='img/logo-white.png' alt='logo-white' id='whiteLogo'>" ;
    modalContent.innerHTML += "<form class='form'  method='post'> <label>Taux de la taxe : </label> <input type='text' value='"+ (pourcentTaxe) +"' id='modalTaxe' class='modal-taxe' size='1'><br>"+
                                "<label>Montant cadeau : </label> <input type='text' value='"+ (giftValue) + "' id='modalThreshold' class='modal-threshold' size='2'<br><br>"+
                                "<img class='confirm-img' src='img/confirmButton.png' alt='confirmButton' id='confirmButton'></form>";
    const caissePO = parseInt(totalCaisse);
    const caissePA = (totalCaisse % 1).toFixed(1).substring(2);
    const infoCaisse = caissePO + " PO et " + caissePA + " PA.";
    modalContent.innerHTML += "<p class='modal-caisse'>Montant total en caisse : " + infoCaisse + "<br>"+
                                "Retirer de la caisse : <input type='text' size='1' id='pull-po' ><label> PO   </label>"+
                                "<input type='text' size='1' id='pull-pa' ><label> PA</label>"+
                                "<button class='pull-submit' id='pull-submit' >Valider</button></p>"
    this.removeEventListener("click", clickAdmin);
    document.getElementById("modal-close").addEventListener("click", function() {
        modalContent.parentElement.remove();
        admin.addEventListener("click", clickAdmin);
    });
    const confirmButtonTax = document.getElementById("confirmButton")
    confirmButtonTax.addEventListener("click", function (event) {
        pourcentTaxe = document.getElementById("modalTaxe").value;
        console.log(pourcentTaxe);
        localStorage.setItem("pourcentTaxe", pourcentTaxe);
        taxe = (pourcentTaxe/100);
        giftValue = document.getElementById('modalThreshold').value;
        modalContent.parentElement.remove();
        admin.addEventListener("click", clickAdmin);
    });

    document.getElementById("pull-submit").addEventListener("click", function(e){
        console.log("j\'ai retiré des sous !!!");
        const pullPO = parseInt(document.getElementById("pull-po").value);
        const pullPA = parseInt(document.getElementById("pull-pa").value);
        console.log(pullPO, pullPA);
        const pullTotal = pullPO + parseFloat("0."+pullPA);
        console.log(pullTotal);
        totalCaisse -= pullTotal;
        localStorage.setItem("caisse", totalCaisse);
        modalContent.parentElement.remove();
        admin.addEventListener("click", clickAdmin);
    });
}

admin.addEventListener("click", clickAdmin);

function displayArticles(){
    if(localStorage.getItem("articles") !== null){
        articlesObj = JSON.parse(localStorage.getItem("articles"));
    }
    console.log(articlesObj);
    articlesName = Object.keys(articlesObj);
    
    let display = "";

    for(const art of articlesName){
        display += "<li class='article-item'><a data-name='"+art+"' class='article-link' id='"+art+"' href='#' >"+
        "<img class='article-img' src='img/"+art+".png' alt='"+articlesObj[art].name+"' ></a>"+
        "<div class='art-info'><button data-article='"+art+"' class='modify-art'>"+
        "<img class='modify-img' src='img/crayon.png' alt='modifier'></button>"+
        "<p class='art-name'>"+articlesObj[art].name+"</p><p class='art-price'>"+articlesObj[art].prix+" PO</p>"+
        "<p data-stock='"+articlesObj[art].stock+"' class='art-stock'>En Stock : "+articlesObj[art].stock+"</p>"+
        // "<div class='main-btns' id='main-btns'><img class='minus' id='minus' src='img/minus.png'></div>"+
        "<input class='main-number' type='number' min='0' max='"+articlesObj[art].stock+"' data-qtty='"+art+"' value='1'></div></li>";
        // "<div><img class='plus' id='plus' src='img/plus.png'></div>
    
    }

    articles.innerHTML = display;

    imgLinks = document.querySelectorAll(".article-link")

    addEventOnImages(imgLinks);

    document.getElementById("validate").addEventListener("click", validateCart);
        
    const modifList = document.querySelectorAll(".modify-art");

    for(const modif of modifList){
        modif.addEventListener("click", modifArticle);
    }
        
    finalCart.addEventListener("click", function(event) {
        if (event.target.classList.contains("cross-button")){
            console.log(this.childElementCount);
            if(this.childElementCount === 1){
                document.getElementById("final-price").innerHTML = "";
                document.querySelector("[data-name="+event.target.dataset.id+"]").addEventListener("click", addCart);
                // event.target.addEventListener("click", addCart);
                event.target.parentElement.parentElement.remove();
            }
            else{
                document.querySelector("[data-name="+event.target.dataset.id+"]").addEventListener("click", addCart);
                // event.target.addEventListener("click", addCart);
                event.target.parentElement.parentElement.remove();
                modifTotalPrice();
            }
        }
    });

    addOpcacityIfNoneStock();
}

displayArticles();

// click image
function addEventOnImages(imgList){
    imgList.forEach(btn => {
            btn.addEventListener('click', addCart);
    });
}

// add bucket
function addCart() {
    let mainInputArt = document.querySelector("[data-qtty='"+this.dataset.name+"']").value;
    if(articlesObj[this.dataset.name].stock === 0 || mainInputArt == 0) return
    const li = document.createElement("li");
    li.classList.add("articleCart");
    li.innerHTML = "<img class='cart-img' src='"+this.firstElementChild.src+"'>";
    li.innerHTML += "<div class='cart-art-info' data-name-info-cart= '"+this.dataset.name+"'><p>"+articlesObj[this.dataset.name].name+"</p>"+
    "<p> <span class='price-article'>"+addPriceArticles(this)+"</span> PO</p>"+
    // "<div class='quantity-item'><button class='art-button-moins'>-</button>"+
    "<input class='art-button' type='number' value='"+mainInputArt+"' min='1' max="+articlesObj[this.dataset.name].stock+" data-input='"+this.dataset.name+"' data-prix='"+ articlesObj[this.dataset.name].prix+"'>";
    // "<button class='art-button-plus'>+</button></div></div>";
    li.innerHTML += "<button><img data-id='"+this.dataset.name+"' class='cross-button' src=img/cross-button.png></button>"
    finalCart.appendChild(li);
    finalCart.addEventListener('change' ,updateValue);
    document.getElementById("final-price").innerHTML = "<p><span class='span-price'>Prix HT : </span><span id='price-without-taxe'>"+/* + priceWithoutTaxe + */"</span> PO" + "</p>";
    document.getElementById("final-price").innerHTML += "<p><span class='span-price'>Taxe : </span><span id='gold-taxe'>" +/* goldTaxe + */"</span> PO, <span id='silver-taxe'>" +/* silverTaxe + */"</span> PA</p>";
    document.getElementById("final-price").innerHTML += "<p><span class='span-price'>Prix TTC : </span><br><span id='gold-total-price'>" +/* goldTotalPrice + */"</span> PO, <span id='silver-total-price'>" +/* silverTotalPrice + */"</span> PA<p>" ;
    modifTotalPrice();
    this.removeEventListener("click",addCart);
}

function addOpcacityIfNoneStock() {
    document.querySelectorAll("[data-stock]").forEach(p => {
        if (p.dataset.stock == 0) {
            p.parentElement.parentElement.classList.add("opacity")
        }
        if (p.dataset.stock > 0) {
            p.parentElement.parentElement.classList.remove("opacity")
        }
    });
}

function updateValue(event) {
    if(event.target.hasAttribute("data-input")){
        modifPriceArcticle(event.target)
    }
}

/* Update Price on Quantity change */
function addPriceArticles(link){
    let artNbr = parseInt(document.querySelector("[data-qtty="+link.dataset.name+"]").value);
    let total = artNbr * articlesObj[link.dataset.name].prix ;
    return(total)
}

function modifPriceArcticle(input){
    let artNbrCart = parseInt(document.querySelector("[data-input="+input.dataset.input+"]").value);
    let totalPriceArt = artNbrCart * articlesObj[input.dataset.input].prix ;
    document.querySelector("[data-name-info-cart="+input.dataset.input+"] p:nth-child(2)").innerHTML = "<span class='price-article'>"+totalPriceArt+"</span> PO";
    priceWithoutTaxe = modifTotalPrice();
}

function modifTotalPrice(){
    const priceArticles = document.querySelectorAll(".price-article");
    let totalPrice=0;
    let goldTaxe, silverTaxe, goldTotalPrice, silverTotalPrice;
    let totalTaxe;
    for(const price of priceArticles){
        totalPrice += parseInt(price.textContent);
        totalTaxe = parseFloat((taxe*totalPrice));
        silverTaxe = (totalTaxe % 1).toFixed(1).substring(2);
        goldTaxe = parseInt(totalTaxe);
        priceTTC = (totalPrice + totalTaxe);
        silverTotalPrice = (priceTTC % 1).toFixed(1).substring(2);
        goldTotalPrice = parseInt(priceTTC);
    }
    document.getElementById("price-without-taxe").innerHTML = totalPrice;
    document.getElementById("gold-taxe").innerHTML = goldTaxe;
    document.getElementById("silver-taxe").innerHTML = silverTaxe;
    document.getElementById("gold-total-price").innerHTML = goldTotalPrice;
    document.getElementById("silver-total-price").innerHTML = silverTotalPrice;
    return totalPrice;
}


const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", function(event) {
    document.getElementById("final-cart-ul").innerHTML = "";
    document.getElementById("final-price").innerHTML = "";
    addEventOnImages(imgLinks);
});


/* MODIFY STOCK AFTER SELLING */

function validateCart(){
    const name = prompt("Veillez saisir le nom");
    if(confirm("Voulez vous valider la transaction ?")){
        const qttList = document.querySelectorAll(".articleCart input");
        for(const qtt of qttList){
            articlesObj[qtt.dataset.input].stock -= qtt.value;
            if(articlesObj[qtt.dataset.input].stock <= 0){
                alert("Attention ! Stock de "+articlesObj[qtt.dataset.input].name +" épuisé ! Il faut se réapprovisionner !");
            }
            finalCart.innerHTML = "";
            document.getElementById("final-price").innerHTML = "";
            priceWithoutTaxe=0;
            this.removeEventListener("click",validateCart);
            localStorage.setItem("articles", JSON.stringify(articlesObj));
            displayArticles();
        }
        totalCaisse += priceTTC;
        // const caissePO = parseInt(totalCaisse);
        // const caissePA = (totalCaisse % 1).toFixed(1).substring(2);
        // const infoCaisse = caissePO + " PO et " + caissePA + " PA.";
        localStorage.setItem("caisse", totalCaisse);
        giftThreshold(priceTTC);
    }
}

document.getElementById("validate").addEventListener("click", validateCart);

function createModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.innerHTML = '<button class="modal-close" id="modal-close">x</button>';
    modal.appendChild(modalContent);
    document.getElementById("articles").insertBefore(modal, document.getElementById("article-main"));
    // document.getElementById("modal-close").addEventListener("click", function(e) {
    //     console.log("test");
    //     modalContent.parentElement.remove();
    // });
    return modalContent;
}

function giftThreshold(priceTTC) {
    if (priceTTC >= giftValue) {
        const modalContent = createModal();
    modalContent.innerHTML += "<img class='gift-img' src='img/chest.jpg' alt='imggift' id='imgGift'>" ;
    modalContent.innerHTML += "<form class='modal-gift'  method='post'> <label> Le client obtient le cadeau spécial ! </label></form>";
    modalContent.innerHTML += '<button class="modal-close" id="modal-close2">x</button>';
    modalContent.innerHTML += "<img class='confirm-img' src='img/confirmButton.png' alt='confirmButton' id='confirmButton'></form>";

    
        document.getElementById("modal-close2").addEventListener("click", function() {
        modalContent.parentElement.remove();
         })
        document.getElementById("confirmButton").addEventListener("click", function() {
        modalContent.parentElement.remove();
         });
    
    };
}


function modifArticle(){
    const article = this.dataset.article;
    const modalContent = createModal();
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
        modalContent.parentElement.remove();
        document.getElementById("validate").removeEventListener("click", validateCart);
        localStorage.setItem("articles", JSON.stringify(articlesObj));
        displayArticles();
    });

    document.getElementById("modal-close").addEventListener("click", function() {
        modalContent.parentElement.remove();
    });
}

// MODAL DE CONFIRMATION DE COMANDE AVEC INPUTS

// function purchaseDetailsModal() {
//     const createModalOfDetails = createModal();
//     createModalOfDetails.innerHTML +=
//     `<div class="detail-modal">
//         <div class="detail-header">
//             <h4 class="validate-cart-ttl">Pannier</h4>
//             <div class="detail-name">
//             <label class="nom">Nom:</label><input id ="nom" class="nom" type='text' placeholder="Entrez le Nom"<br>
//             <label class="prenom">Prenom:</label><input id ="prenom" class="prenom" type='text' placeholder="Entrez le Prenom"<br>
//             </div>
//         </div>
//         <ul class ="final-list-to-validate" id="final-list-to-validate">
           

//         </ul>
//         <section class="confirma-or-not" id ="confirm-or-not">
//             <img src="img/confirmButton.png" class="confirm-btn"  id ="confirm-btn">
//             <img src="img/confirmButton.png" class="cancel-btn"  id ="cancel-btn">
//         </section>
//     </div>`
//     // document.getElementById("final-list-to-validate").add(finalCart);

//     document.getElementById("modal-close").addEventListener("click", function() {
//         createModalOfDetails.parentElement.remove();
   
// })}
addArticle.addEventListener("click", addAnArticle);

function addAnArticle(){
    const modalContent = createModal();
    modalContent.innerHTML += "<form class='add-art-modal'><div><label>Id de l'article : </label><input type='text' id='add-id' value=''></div>"+
    "<div><label>Nom de l'article : </label><input type='text' id='add-name' value=''></div>"+
    "<div><label>Prix de l'article en PO : </label><input type='text' id='add-price'></div>"+
    "<div><label>Stock de l'article : </label><input type='text' id='add-stock'></div>"+
    "<div><label>Categorie de l'article : </label><input type='text' id='add-category'></div>"+
    "<button class='submit-add' id='submit-add'>Valider</button></form>";

    document.getElementById("submit-add").addEventListener("click", function(e){
        const addId = document.getElementById("add-id").value;
        const addName = document.getElementById("add-name").value;
        const addPrice = document.getElementById("add-price").value;
        const addStock = document.getElementById("add-stock").value;
        const addCategory = document.getElementById("add-category").value;

        console.log("id"+addId);
        articlesObj["id"+addId] = {};
        articlesObj["id"+addId].name = addName;
        articlesObj["id"+addId].prix = addPrice;
        articlesObj["id"+addId].stock = addStock;
        articlesObj["id"+addId].categorie = addCategory;
        modalContent.parentElement.remove();
        localStorage.setItem("articles", JSON.stringify(articlesObj));
        displayArticles();
    });

    document.getElementById("modal-close").addEventListener("click", function() {
        modalContent.parentElement.remove();
    });
}
