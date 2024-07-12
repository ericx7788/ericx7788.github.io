const productos = [
    {
        id: "necessaires-01",
        titulo: "Necessaires 01",
        imagen: "img/necessaires.jpg",
        categoria: {
            nombre: "Necessaires",
            id: "necessaires"
        },
        precio: 5500
    },
    {
        id: "necessaires-02",
        titulo: "Necessaires 02",
        imagen: "img/necessaires (2).jpg",
        categoria: {
            nombre: "Necessaires",
            id: "necessaires"
        },
        precio: 6900
    },
    {
        id: "necessaires-03",
        titulo: "Necessaires 03",
        imagen: "img/necessaires (3).jpg",
        categoria: {
            nombre: "Necessaires",
            id: "necessaires"
        },
        precio: 7200
    },
    {
        id: "necessaires-04",
        titulo: "Necessaires 04",
        imagen: "img/necessaires (4).jpg",
        categoria: {
            nombre: "Necessaires",
            id: "necessaires"
        },
        precio: 6500
    },
    {
        id: "chau latas-01",
        titulo: "Chau latas 01",
        imagen: "img/chau latas.jpg",
        categoria: {
            nombre: "Chau latas",
            id: "chau latas"
        },
        precio: 9500
    },
    {
        id: "chau latas-02",
        titulo: "Chau latas 02",
        imagen: "img/chau latas (2).jpg",
        categoria: {
            nombre: "Chau latas",
            id: "chau latas"
        },
        precio: 9500
    },
    {
        id: "chau latas-03",
        titulo: "Chau latas 03",
        imagen: "img/chau latas (3).jpg",
        categoria: {
            nombre: "Chau latas",
            id: "chau latas"
        },
        precio: 9500
    },
    {
        id: "chau latas-04",
        titulo: "Chau latas 04",
        imagen: "img/chau latas (4).jpg",
        categoria: {
            nombre: "Chau latas",
            id: "chau latas"
        },
        precio: 9500
    },
    {
        id: "porta anteojos-01",
        titulo: "Porta anteojos 01",
        imagen: "img/Porta anteojos.jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 4700
    },
    {
        id: "porta anteojos-02",
        titulo: "Porta anteojos 02",
        imagen: "img/Porta anteojos (2).jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 4700
    },
    {
        id: "materos",
        titulo: "Materos ",
        imagen: "img/Materos.jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 40000
    },
    {
        id: "matera de lona",
        titulo: "Matera de lona",
        imagen: "img/Matera de lona.jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 22000
    },
    {
        id: "porta mate de auto",
        titulo: "Porta mate de auto",
        imagen: "img/Porta mate de auto.jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 5000
    },
    {
        id: "riñonera",
        titulo: "Riñonera",
        imagen: "img/Riñonera.jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 12000
    }
];

const claveCorrecta = "eric"; // Reemplaza con tu clave correcta
const contenedorProductos = document.querySelector("#contenedor-productos");
const contenedorCarrito = document.querySelector("#contenedor-carrito");

function actualizarContenedorProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="">
            <div class="producto-detalles">
                <h3 class="producto-nombre">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="agregar-${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

actualizarContenedorProductos(productos);

const botones = document.querySelectorAll(".boton-categoria");
const titulo = document.querySelector("#titulo");
const contenedorTotal = document.querySelector("#total");
const carritoAcciones = document.querySelector("#carrito-acciones");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(boton => boton.classList.remove("active"));
        boton.classList.add("active");

        if (boton.id === "boton-todos") {
            actualizarContenedorProductos(productos);
            titulo.innerText = "Todos los productos";
            contenedorProductos.classList.remove("disabled");
            contenedorCarrito.classList.add("disabled");
        } else if (boton.id === "boton-carrito") {
            titulo.innerText = "Carrito";
            contenedorProductos.classList.add("disabled");
            contenedorCarrito.classList.remove("disabled");
        } else {
            let productoSeleccionado = productos.find(producto => "boton-" + producto.categoria.id === boton.id);
            titulo.innerText = productoSeleccionado.categoria.nombre;
            const productosNuevos = productos.filter(producto => "boton-" + producto.categoria.id === boton.id);
            actualizarContenedorProductos(productosNuevos);
            contenedorProductos.classList.remove("disabled");
            contenedorCarrito.classList.add("disabled");
        }
    });
});

const productosEnCarrito = [];

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const productoElegido = productos.find(producto => "agregar-" + producto.id === e.currentTarget.id);

    if (productosEnCarrito.find(producto => producto.id === productoElegido.id)) {
        const productoIndex = productosEnCarrito.findIndex(producto => producto.id === productoElegido.id);
        productosEnCarrito[productoIndex].cantidad++;
    } else {
        productoElegido.cantidad = 1;
        productosEnCarrito.push(productoElegido);
    }

    actualizarCarritoProductos();

    const mensaje = `¡Se agregó "${productoElegido.titulo}" al carrito!`;
    mostrarMensaje(mensaje);
}

function mostrarMensaje(mensaje) {
    const mensajeElemento = document.createElement("div");
    mensajeElemento.classList.add("mensaje");
    mensajeElemento.textContent = mensaje;

    document.body.appendChild(mensajeElemento);

    setTimeout(() => {
        mensajeElemento.remove();
    }, 1000);
}

const carritoProductos = document.querySelector("#carrito-productos");

function actualizarCarritoProductos() {
    carritoProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-nombre">
                <small>Nombre</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="eliminar-${producto.id}">
                <i class="bi bi-trash-fill"></i>
            </button>
        `;
        carritoProductos.append(div);
    });

    actualizarBotonesEliminar();
    actualizarTotal();
    actualizarCarritoNumero();
    carritoVacio();
}

function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarUnaUnidadDelCarrito);
    });
}

function eliminarUnaUnidadDelCarrito(e) {
    const productoId = e.currentTarget.id.replace("eliminar-", "");
    const productoIndex = productosEnCarrito.findIndex(producto => producto.id === productoId);

    if (productosEnCarrito[productoIndex].cantidad > 1) {
        productosEnCarrito[productoIndex].cantidad--;
    } else {
        productosEnCarrito.splice(productoIndex, 1);
    }

    actualizarCarritoProductos();

    const productoEliminado = productos.find(producto => producto.id === productoId);
    const mensaje = `¡Se eliminó una unidad de "${productoEliminado.titulo}" del carrito!`;
    mostrarMensaje(mensaje);
}

function actualizarTotal() {
    const total = productosEnCarrito.reduce((accumulator, producto) => {
        return accumulator + (producto.precio * producto.cantidad);
    }, 0);

    contenedorTotal.textContent = `$${total}`;
}

function actualizarCarritoNumero() {
    const carritoNumero = document.querySelector("#carrito-numero");
    carritoNumero.textContent = productosEnCarrito.length;
}

function carritoVacio() {
    if (productosEnCarrito.length === 0) {
        carritoAcciones.classList.add("disabled");
    } else {
        carritoAcciones.classList.remove("disabled");
    }
}

const vaciarCarrito = document.querySelector("#vaciar-carrito");
vaciarCarrito.addEventListener("click", () => {
    productosEnCarrito.length = 0;
    actualizarCarritoProductos();

    const mensaje = `¡Se vació el carrito!`;
    mostrarMensaje(mensaje);
});

const generarMensajeWhatsApp = () => {
    // Construir el mensaje inicial
    let mensaje = `Hola, estoy interesado en los siguientes productos: \n\n`;

    // Recorrer los productos en el carrito y agregarlos al mensaje
    productosEnCarrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.titulo} - Cantidad: ${producto.cantidad} - Precio unitario: $${producto.precio.toFixed(2)} - Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}\n`;
    });

    // Agregar el total del carrito al mensaje
    mensaje += `\nTotal: $${contenedorTotal.textContent}`;

    // Codificar el mensaje para que sea parte de la URL
    const encodedMensaje = encodeURIComponent(mensaje);

    // Número de teléfono al que se enviará el mensaje (sin el signo +)
    const numeroTelefono = "5492915116875"; // Reemplaza con tu número de teléfono

    // Construir la URL de WhatsApp
    const whatsappURL = `https://wa.me/${numeroTelefono}?text=${encodedMensaje}`;

    // Abrir la URL en una nueva pestaña
    window.open(whatsappURL, "_blank");
};

  


const abrirFormulario = document.getElementById('abrir-formulario');
const formularioProducto = document.getElementById('formulario-producto');

abrirFormulario.addEventListener('click', () => {
    const claveIngresada = prompt("Ingresa la clave para abrir el formulario:");

    if (claveIngresada === claveCorrecta) {
        formularioProducto.classList.add('active');
    } else {
        alert("Clave incorrecta. No puedes acceder al formulario.");
    }
});

const formCargarProducto = document.getElementById('form-cargar-producto');
formCargarProducto.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevoProducto = {
        titulo: formCargarProducto.titulo.value,
        imagen: formCargarProducto.imagen.value,
        categoria: {
            nombre: formCargarProducto.categoria.value,
            id: formCargarProducto.categoria.value.toLowerCase().replace(/\s+/g, '-')
        },
        precio: parseFloat(formCargarProducto.precio.value),
        id: formCargarProducto.titulo.value.toLowerCase().replace(/\s+/g, '-')
    };
    productos.push(nuevoProducto);
    actualizarContenedorProductos(productos);
    formCargarProducto.reset();
    formularioProducto.classList.remove('active');
});
