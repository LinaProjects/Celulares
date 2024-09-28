document.addEventListener('DOMContentLoaded', () => {
    // Definir el contenedor de productos
    const productContainer = document.getElementById('product-container');

    if (!productContainer) {
        console.error('El contenedor de productos no se encuentra.');
        return;
    }

    // Verificar si la variable productos está disponible
    if (typeof productos !== 'undefined') {
        console.log("Variable productos está disponible.");
        console.log(productos);
    } else {
        console.log("Variable productos no está definida.");
        return;
    }

    // Crear las tarjetas de productos
    productos.forEach(producto => {
        const cardDiv = document.createElement('div');
        cardDiv.dataset.id = producto.id;
        cardDiv.dataset.brand = producto.marca;
        cardDiv.dataset.price = producto.precio;
        cardDiv.dataset.storage = producto.almacenamiento;
        cardDiv.dataset.camera = producto.camara;
        cardDiv.dataset.connect = producto.conectividad;
        cardDiv.dataset.ram = producto.ram;
        cardDiv.dataset.screen = producto.pantalla;
        cardDiv.dataset.warranty = producto.garantia;

        cardDiv.innerHTML = `
            <div class="card">
                <div class="card-img-container">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <div class="card-details">
                        <p class="card-price">${producto.precio}</p>
                        <p class="card-specs">
                            <span>RAM: ${producto.ram}</span> |
                            <span>Almacenamiento: ${producto.almacenamiento}</span>
                        </p>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <a href="#" class="btn btn-primary ver-detalles" data-id="${producto.id}">Ver Detalles</a>
                </div>
            </div>
        `;

        productContainer.appendChild(cardDiv);
    });

    // Manejar el clic en el botón "Ver Detalles"
    productContainer.addEventListener('click', async (event) => {
        if (event.target && event.target.classList.contains('ver-detalles')) {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace
            const productId = event.target.getAttribute('data-id');
            console.log('Botón "Ver Detalles" clicado, ID del producto:', productId);
            await loadProductDetails(productId);
        }
    });

    // Obtener todos los elementos de producto
    const products = document.querySelectorAll('.product');

    // Función para aplicar filtros
    function applyFilters() {
        // Obtener todos los filtros seleccionados
        const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
        const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
        const selectedStorages = Array.from(document.querySelectorAll('input[name="storage"]:checked')).map(cb => cb.value);
        const selectedCameras = Array.from(document.querySelectorAll('input[name="camera"]:checked')).map(cb => cb.value);
        const selectedConnects = Array.from(document.querySelectorAll('input[name="connect"]:checked')).map(cb => cb.value);
        const selectedRams = Array.from(document.querySelectorAll('input[name="ram"]:checked')).map(cb => cb.value);
        const selectedScreens = Array.from(document.querySelectorAll('input[name="screen"]:checked')).map(cb => cb.value);
        const selectedWarranties = Array.from(document.querySelectorAll('input[name="warranty"]:checked')).map(cb => cb.value);

        // Filtrar los productos
        products.forEach(product => {
            const brand = product.getAttribute('data-brand');
            const price = parseFloat(product.getAttribute('data-price').replace('$', '').replace(',', ''));
            const storage = product.getAttribute('data-storage');
            const camera = product.getAttribute('data-camera');
            const connect = product.getAttribute('data-connect');
            const ram = product.getAttribute('data-ram');
            const screen = product.getAttribute('data-screen');
            const warranty = product.getAttribute('data-warranty');

            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
            const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(range => {
                const [min, max] = range.split('-').map(Number);
                return isNaN(max) ? price >= min : (price >= min && price <= max);
            });
            const matchesStorage = selectedStorages.length === 0 || selectedStorages.includes(storage);
            const matchesCamera = selectedCameras.length === 0 || selectedCameras.includes(camera);
            const matchesConnect = selectedConnects.length === 0 || selectedConnects.includes(connect);
            const matchesRam = selectedRams.length === 0 || selectedRams.includes(ram);
            const matchesScreen = selectedScreens.length === 0 || selectedScreens.includes(screen);
            const matchesWarranty = selectedWarranties.length === 0 || selectedWarranties.includes(warranty);

            // Mostrar u ocultar productos según los filtros
            if (matchesBrand && matchesPrice && matchesStorage && matchesCamera && matchesConnect && matchesRam && matchesScreen && matchesWarranty) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Agregar evento de cambio a los filtros
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Aplicar filtros al cargar la página
    applyFilters();

    // Función para alternar entre mostrar y ocultar los formularios
    function toggleVisibility() {
        var mostrar = document.getElementById('mostrar');
        var oculto = document.getElementById('oculto');

        if (oculto.style.display === 'none' || !oculto.style.display) {
            // Cargar la información actual en el formulario antes de mostrar
            cargarInformacionFormulario();
            // Mostrar formulario de edición y ocultar vista
            oculto.style.display = 'block';
            mostrar.style.display = 'none';
        } else {
            // Mostrar vista y ocultar formulario de edición
            oculto.style.display = 'none';
            mostrar.style.display = 'block';
        }
    }

    // Función para cargar la información en el formulario para edición
    function cargarInformacionFormulario() {
        document.getElementById('updateName').value = localStorage.getItem('nombre') || "";
        document.getElementById('updateDescription').value = localStorage.getItem('descripcion') || "";
        document.getElementById('updateDisplay').value = localStorage.getItem('pantalla') || "";
        document.getElementById('updateProcessor').value = localStorage.getItem('procesador') || "";
        document.getElementById('updateRAM').value = localStorage.getItem('ram') || "";
        document.getElementById('updateStorage').value = localStorage.getItem('almacenamiento') || "";
        document.getElementById('updateCameras').value = localStorage.getItem('camaras') || "";
        document.getElementById('updateBattery').value = localStorage.getItem('bateria') || "";
        document.getElementById('updatePrice').value = localStorage.getItem('precio') || "";
    }

    // Función para guardar la información en localStorage
    function guardarInformacion() {
        // Obtener valores del formulario
        var nombre = document.getElementById('updateName').value;
        var descripcion = document.getElementById('updateDescription').value;
        var pantalla = document.getElementById('updateDisplay').value;
        var procesador = document.getElementById('updateProcessor').value;
        var ram = document.getElementById('updateRAM').value;
        var almacenamiento = document.getElementById('updateStorage').value;
        var camaras = document.getElementById('updateCameras').value;
        var bateria = document.getElementById('updateBattery').value;
        var precio = document.getElementById('updatePrice').value;

        // Guardar en localStorage
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('descripcion', descripcion);
        localStorage.setItem('pantalla', pantalla);
        localStorage.setItem('procesador', procesador);
        localStorage.setItem('ram', ram);
        localStorage.setItem('almacenamiento', almacenamiento);
        localStorage.setItem('camaras', camaras);
        localStorage.setItem('bateria', bateria);
        localStorage.setItem('precio', precio);

        // Actualizar la información mostrada
        actualizarInformacion();

        // Cambiar visibilidad de los divs
        toggleVisibility();
    }

    // Función para actualizar la información mostrada
    function actualizarInformacion() {
        document.getElementById('displayName').textContent = "Nombre del Celular: " + (localStorage.getItem('nombre') || "Sin información");
        document.getElementById('displayDescription').textContent = "Descripción: " + (localStorage.getItem('descripcion') || "Sin descripción");
        document.getElementById('displaySpecifications').innerHTML = "Pantalla: " + (localStorage.getItem('pantalla') || "Sin datos") + "<br>" +
            "Procesador: " + (localStorage.getItem('procesador') || "Sin datos") + "<br>" +
            "Memoria: " + (localStorage.getItem('ram') || "Sin datos") + "<br>" +
            "Cámaras: " + (localStorage.getItem('camaras') || "Sin datos") + "<br>" +
            "Batería: " + (localStorage.getItem('bateria') || "Sin datos");
        document.getElementById('displayPrice').textContent = "Precio: " + (localStorage.getItem('precio') || "Sin precio");
    }

    // Función para borrar la información almacenada
    function borrarInformacion() {
        localStorage.clear();
        actualizarInformacion();
    }

    // Event Listeners para los botones
    document.getElementById('toggleButton1').addEventListener('click', toggleVisibility);
    document.getElementById('toggleButton2').addEventListener('click', guardarInformacion);
    document.getElementById('deleteButton').addEventListener('click', borrarInformacion);

    // Cargar la información al cargar la página
    actualizarInformacion(); // Solo un lugar para cargar la información al inicio
});
