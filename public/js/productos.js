// Buscar productos
const buscador = document.querySelector('.buscador input');
const mensajeBusqueda = document.getElementById('mensaje-busqueda');
const productos = document.querySelectorAll('.producto');
const botonBuscar = document.getElementById('bt-b');

botonBuscar.addEventListener('click', buscarProductos);


function buscarProductos() {
     const consulta = buscador.value.trim().toLowerCase();
    let encontrados = 0;

    productos.forEach(producto => {
        const nombreProducto = producto.dataset.nombre.toLowerCase();
        const coincidencia = consulta === '' || nombreProducto.includes(consulta);


        producto.setAttribute('aria-disabled', String(!coincidencia));

        const boton = producto.querySelector('.agregar-carrito');

        if (boton) {
            boton.disabled = !coincidencia;
        }

        if (coincidencia) {
            encontrados++;
        }

            mensajeBusqueda.textContent = 
            consulta !== "" && encontrados === 0 ? 'No se encontraron productos que coincidan con tu búsqueda.' : '';

    });



}



buscador.addEventListener('input', buscarProductos);