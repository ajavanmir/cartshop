/*
Copyright amir javanmir
Released on: january 23, 2024
*/
const products = [{
    id : 1,
    name : "iPhone 12",
    price : 99,
    photo : "./img/airpods.jpg"
},
{
    id : 2,
    name : "AirPods",
    price : 108,
    photo : "./img/iphone-12.jpg"
},
{
    id : 3,
    name : "AirPods33",
    price : 200,
    photo : "./img/iphone-12.jpg"
},
];

const renderProducts = ()=>{
    const productDiv = document.querySelector(".product-list");
    productDiv.innerHTML = "";
    products.forEach((element,index) => {
        productDiv.innerHTML += `<div class="card">
        <img class="card-img-top" src="${element.photo}">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-price">${element.price} Toman</p>
            <a href="#" class="btn btn-primary btn-block" onClick="addToCart(${index},event)">ADD</a>
          </div>
    </div>` 
    });
    if(localStorage.getItem("listCart")){
        cart.items = JSON.parse(localStorage.getItem("listCart"));
    }
    renderCart();
}

const renderCart = ()=>{
    const cartDiv = document.querySelector(".product-add");
    const totalDiv = document.querySelector(".total");
    let totalNum = 0;
    
    cartDiv.innerHTML = "";
    if(cart.items.length !== 0){
        const notFoundDiv = document.querySelector(".not-found");
        if(notFoundDiv)notFoundDiv.remove();
        cart.items.forEach((item)=>{
            totalNum += item.total;
            cartDiv.innerHTML += `<div class="item">
            <h3>${item.name}</h3>
            <span class="count">${item.qty}</span>
            <button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Delete</button>
            </div>`;
        })
    }else{
        let eleNot = document.createElement("p");
        eleNot.setAttribute("class","not-found");
        eleNot.innerHTML = "Not Found Product!";
        document.querySelector(".cart-list").appendChild(eleNot);
    }
    totalDiv.innerHTML = `Total: ${totalNum} Toman`;
}

let cart = {
    items : [],
}

const addToCart = (idItem,e)=>{
    e.preventDefault();
    const product = products[idItem];
    if(product){
        let existProduct = false;
        let productSelected = cart.items.reduce(function(totalItem,current){
            if(product.name == current.name){
                existProduct = true;
                let newItem = {
                    ...current,
                    qty: (current.qty)+1,
                    total: (current.qty+1) * current.price,
                }
                return [...totalItem,newItem];
            };
            return [...totalItem,current];
        },[]);
        if(!existProduct){
            productSelected.push({
                ...product,
                qty:1,
                total: product.price
            })
        }
        
        cart.items = productSelected;
        saveInfo(cart.items);
        renderCart();
    }
}

const removeFromCart = (productName)=>{
    let productSelected = cart.items.reduce(function(totalItem,current){
        if(current.name == productName){
            if(current.qty>1){
                let newItem = {
                    ...current,
                    qty:(current.qty)-1,
                    total:(current.qty - 1) * current.price
                }
                return [...totalItem, newItem];
            }else{
                return totalItem;
            }
            
        }
        return [...totalItem,current]
    },[])
    cart.items = productSelected;
    saveInfo(cart.items);
    renderCart();
}

const saveInfo = (info)=>{
    if(info.length){
        localStorage.setItem("listCart", JSON.stringify(info));
    }else{
        localStorage.removeItem("listCart")
    }
}
renderProducts();