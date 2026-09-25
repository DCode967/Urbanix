/* ==================================================
   CARRITO URBANIX
   ================================================== */


/* ==================================================
   VARIABLES
   ================================================== */

let carrito = [];


/* ==================================================
   ELEMENTOS DEL HTML
   ================================================== */

const abrirCarrito = document.getElementById("abrir-carrito");

const cerrarCarrito = document.getElementById("cerrar-carrito");

const panelCarrito = document.getElementById("panel-carrito");

const overlayCarrito = document.getElementById("overlay-carrito");

const productosCarrito = document.getElementById("carrito-productos");

const carritoVacio = document.getElementById("carrito-vacio");

const contadorCarrito = document.getElementById("contador-carrito");

const carritoTotal = document.getElementById("carrito-total");

const vaciarCarrito = document.getElementById("vaciar-carrito");

const finalizarCompra = document.getElementById("finalizar-compra");


/* ==================================================
   CARGAR CARRITO
   ================================================== */

function cargarCarrito() {

    const carritoGuardado = localStorage.getItem(
        "urbanix-carrito"
    );

    if (carritoGuardado) {

        carrito = JSON.parse(carritoGuardado);

    } else {

        carrito = [];

    }

    actualizarCarrito();
}


/* ==================================================
   GUARDAR CARRITO
   ================================================== */

function guardarCarrito() {

    localStorage.setItem(
        "urbanix-carrito",
        JSON.stringify(carrito)
    );

}


/* ==================================================
   AGREGAR PRODUCTO
   ================================================== */

function agregarAlCarrito(productoElemento) {

    const id = productoElemento.dataset.id;

    const nombre = productoElemento.dataset.nombre;

    const precio = Number(
        productoElemento.dataset.precio
    );

    const imagen = productoElemento.dataset.imagen;


    /* Buscar si el producto ya existe */

    const productoExistente = carrito.find(
        producto => producto.id === id
    );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            id: id,

            nombre: nombre,

            precio: precio,

            imagen: imagen,

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarCarrito();

    abrirPanelCarrito();

}


/* ==================================================
   ELIMINAR PRODUCTO
   ================================================== */

function eliminarDelCarrito(id) {

    carrito = carrito.filter(
        producto => producto.id !== id
    );

    guardarCarrito();

    actualizarCarrito();

}


/* ==================================================
   AUMENTAR CANTIDAD
   ================================================== */

function aumentarCantidad(id) {

    const producto = carrito.find(
        producto => producto.id === id
    );

    if (producto) {

        producto.cantidad++;

    }

    guardarCarrito();

    actualizarCarrito();

}


/* ==================================================
   DISMINUIR CANTIDAD
   ================================================== */

function disminuirCantidad(id) {

    const producto = carrito.find(
        producto => producto.id === id
    );

    if (!producto) {
        return;
    }


    if (producto.cantidad > 1) {

        producto.cantidad--;

    } else {

        eliminarDelCarrito(id);

        return;

    }


    guardarCarrito();

    actualizarCarrito();

}


/* ==================================================
   CALCULAR TOTAL
   ================================================== */

function calcularTotal() {

    return carrito.reduce(

        (total, producto) => {

            return total +
                producto.precio *
                producto.cantidad;

        },

        0

    );

}


/* ==================================================
   CANTIDAD TOTAL DE PRODUCTOS
   ================================================== */

function calcularCantidadProductos() {

    return carrito.reduce(

        (cantidad, producto) => {

            return cantidad +
                producto.cantidad;

        },

        0

    );

}


/* ==================================================
   FORMATEAR PRECIO
   ================================================== */

function formatearPrecio(precio) {

    return precio.toLocaleString(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }
    );

}


/* ==================================================
   ACTUALIZAR CARRITO
   ================================================== */

function actualizarCarrito() {

    productosCarrito.innerHTML = "";


    /* Actualizar contador */

    const cantidadProductos =
        calcularCantidadProductos();

    contadorCarrito.textContent =
        cantidadProductos;


    /* Actualizar total */

    const total = calcularTotal();

    carritoTotal.textContent =
        formatearPrecio(total);


    /* Comprobar si está vacío */

    if (carrito.length === 0) {

        carritoVacio.style.display = "flex";

        vaciarCarrito.style.display = "none";

        finalizarCompra.style.display = "none";

        return;

    }


    carritoVacio.style.display = "none";

    vaciarCarrito.style.display = "block";

    finalizarCompra.style.display = "block";


    /* Crear productos */

    carrito.forEach(producto => {

        const elementoProducto =
            document.createElement("div");

        elementoProducto.classList.add(
            "item-carrito"
        );


        elementoProducto.innerHTML = `

            <div class="item-carrito-imagen">

                <img 
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

            </div>


            <div class="item-carrito-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p class="item-precio">

                    ${formatearPrecio(
                        producto.precio
                    )}

                </p>


                <div class="controles-cantidad">

                    <button
                        type="button"
                        class="boton-cantidad disminuir"
                        data-id="${producto.id}"
                        aria-label="Disminuir cantidad"
                    >
                        −
                    </button>


                    <span>
                        ${producto.cantidad}
                    </span>


                    <button
                        type="button"
                        class="boton-cantidad aumentar"
                        data-id="${producto.id}"
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                type="button"
                class="boton-eliminar"
                data-id="${producto.id}"
                aria-label="Eliminar producto"
            >
                🗑️
            </button>

        `;


        productosCarrito.appendChild(
            elementoProducto
        );

    });


    agregarEventosProductos();

}


/* ==================================================
   EVENTOS DE LOS PRODUCTOS
   ================================================== */

function agregarEventosProductos() {


    /* Botones aumentar */

    const botonesAumentar =
        document.querySelectorAll(
            ".boton-cantidad.aumentar"
        );


    botonesAumentar.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const id =
                    boton.dataset.id;

                aumentarCantidad(id);

            }
        );

    });


    /* Botones disminuir */

    const botonesDisminuir =
        document.querySelectorAll(
            ".boton-cantidad.disminuir"
        );


    botonesDisminuir.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const id =
                    boton.dataset.id;

                disminuirCantidad(id);

            }
        );

    });


    /* Botones eliminar */

    const botonesEliminar =
        document.querySelectorAll(
            ".boton-eliminar"
        );


    botonesEliminar.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const id =
                    boton.dataset.id;

                eliminarDelCarrito(id);

            }
        );

    });

}


/* ==================================================
   ABRIR CARRITO
   ================================================== */

function abrirPanelCarrito() {

    panelCarrito.classList.add(
        "carrito-abierto"
    );

    overlayCarrito.classList.add(
        "overlay-visible"
    );

    document.body.classList.add(
        "carrito-bloqueado"
    );

}


/* ==================================================
   CERRAR CARRITO
   ================================================== */

function cerrarPanelCarrito() {

    panelCarrito.classList.remove(
        "carrito-abierto"
    );

    overlayCarrito.classList.remove(
        "overlay-visible"
    );

    document.body.classList.remove(
        "carrito-bloqueado"
    );

}


/* ==================================================
   EVENTO ABRIR
   ================================================== */

abrirCarrito.addEventListener(
    "click",
    abrirPanelCarrito
);


/* ==================================================
   EVENTO CERRAR
   ================================================== */

cerrarCarrito.addEventListener(
    "click",
    cerrarPanelCarrito
);


/* ==================================================
   CERRAR HACIENDO CLICK EN EL FONDO
   ================================================== */

overlayCarrito.addEventListener(
    "click",
    cerrarPanelCarrito
);


/* ==================================================
   CERRAR CON ESC
   ================================================== */

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "Escape"
        ) {

            cerrarPanelCarrito();

        }

    }
);


/* ==================================================
   BOTONES "AGREGAR AL CARRITO"
   ================================================== */

const botonesAgregar =
    document.querySelectorAll(
        ".agregar-carrito"
    );


botonesAgregar.forEach(boton => {

    boton.addEventListener(
        "click",
        () => {

            const producto =
                boton.closest(
                    ".producto"
                );

            agregarAlCarrito(producto);

        }
    );

});


/* ==================================================
   VACIAR CARRITO
   ================================================== */

vaciarCarrito.addEventListener(
    "click",
    () => {

        carrito = [];

        guardarCarrito();

        actualizarCarrito();

    }
);


/* ==================================================
   FINALIZAR COMPRA
   ================================================== */

finalizarCompra.addEventListener(
    "click",
    () => {

        if (carrito.length === 0) {

            return;

        }


        alert(
            "La función de pago se agregará próximamente."
        );

    }
);


/* ==================================================
   INICIAR
   ================================================== */

cargarCarrito();