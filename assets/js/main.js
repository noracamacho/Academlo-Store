
const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'shirts',
      quantity: 20
    }
]

/*---------------------LOADER------------------------- */
/* Esta función se encarga de hacer desaparecer el loader pasados 3seg desde el momento en el que se ejecuta */
const loadComponent = () => {
    const loader = document.getElementById( "loader" )

    setTimeout(() => {
        //Agrega la clase 'hide' al elemento loader
        loader.classList.add( "hide" )
    }, 3000);
}

// DARK MODE

document.addEventListener( "DOMContentLoaded", () =>{
    console.log( "DOM Cargado" ) ;
});

const themeIcon = document.getElementById( "theme-btn" );
themeIcon.addEventListener( "click", () => {
    //element.classList.toggle("clase")
    //Si la clase NO existe, la agrega
    //Si la clase YA existe, la quita

    document.body.classList.toggle("dark")

    if( themeIcon.classList.contains("bx-moon") ){ //evaluar si existe la clase bx-moon
        themeIcon.classList.replace("bx-moon", "bx-sun");
    }else{
        themeIcon.classList.replace("bx-sun", "bx-moon");
    }

});

/* ---------------------VISTA DE CARRITO DE COMPRAS--------------------------- */
const cart = document.getElementById("cart-container")
const shopIcon = document.getElementById("cart-shop")
const shopCloseIcon = document.getElementById("close-cart")

//Cuando ocurre un click sobre el icono de la tienda, quita la clase hide al elemento 'cart' 
//para volverlo visible
shopIcon.addEventListener("click", () => {
    cart.classList.remove("hide") 
})


//Cuando detecta un click sobre el icono de cerrar, añade de nuevo la clase 'hide' al elemento 'cart' para ocultarlo
shopCloseIcon.addEventListener( "click", () => {
    cart.classList.add("hide")
})


/* ----------------------MOSTRAR LISTADO DE PRODUCTOS--------------------------- */
// contenedor.innerHTML = "html"
const showProducts = () => {
    const productContainer = document.getElementById("products-list")

    let fragment = ``

    items.forEach( producto => {
        fragment += `
        <div class="product--card" id="${producto.id}">
            <div class="image--container">
            <img src="${producto.image}" alt="">
            </div>
            <p>$${producto.price}.00<span>Stock: ${producto.quantity}</span></p>
            <h4>${producto.name}</h4>
            <button class="btn-add"><i class='bx bx-plus bx-sm'></i></button>
        </div>
         `
    })

    productContainer.innerHTML = fragment

    cartFunctionality()
}

/* ---------------------AÑADE FUNCIONALIDAD A LOS BOTONES EN LOS PRODUCTOS--------------------------- */
function cartFunctionality(){
    /* Obtiene todos los botones de los productos */
    const btns = document.querySelectorAll(".btn-add")
    const cart = []

    //Añade un eventListener a cada boton para detectar un click
    btns.forEach( button => {
        button.addEventListener( "click", e => {
            //Obtiene el id del elemento que sufrio el click
            const id = parseInt(e.target.parentElement.id)
            //Encuentra al elemento seleccionado en el arreglo de productos
            const selectedProduct = items.find( item => item.id === id )
            
            //Determina si ese producto ya fue seleccionado de forma previa. (Determina si el producto ya existe en el carrito)
            let index = cart.indexOf( selectedProduct )

            //Sí index es DISTINTO de -1 entonces el producto ya existe en el carrito. Fue seleccionado antes
            if( index !== -1 ){
                //Evalua si hay suficientes productos en stock para que el cliente pueda añadir otro producto a su carrito
                if( cart[index].quantity <= cart[index].cantidad ){
                    alert("No hay stock")
                }else{
                    //Si la cantidad de ese producto seleccionado aun no sobrepasa la cantidad de productos disponibles en stock, añade otro producto igual al carrito
                    cart[index].cantidad++
                }
                
            }else{
                //Ese producto aun no existe en el carrito

                //Se añade la propiedad 'cantidad' para representar cuantos productos han sido seleccionados
                selectedProduct.cantidad = 1

                //Se añade al carrito
                cart.push( selectedProduct )
            }

            console.log( cart )
            showProducts( cart )
        })
    } )

}

function showProductsInCart(cart){

}

document.addEventListener( "DOMContentLoaded", () =>{
    loadComponent() 
    showProducts()
})
