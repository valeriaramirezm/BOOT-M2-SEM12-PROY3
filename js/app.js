const ctx = document.getElementById('myChart');
const boton = document.getElementById('showGraphic');
const ApiURL = 'http://makeup-api.herokuapp.com/api/v1/products.json';

// Obtén los valores seleccionados del buscador
const selectedBrand = document.getElementById("brandSelect");
const selectedProduct_type = document.getElementById("categorySelect");

//Cargar lo que ponga dentro d ela función, cuando la página se recarga
document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosMakeup();
});

// Completar los select
const obtenerDatosMakeup = async () => {

    //Primero mostrará el spinner
    $('#spinnerModal').modal('show');

    //Consulta a la api
    const respuesta = await fetch(ApiURL)
        .then(response => response.json()) //Aqui la api da la respuesta y la formatea a JSON
        .then(datos => { //Esta la respuesta

            const brand = datos.map((elemento) => elemento.brand).sort(); //Acá se guardan las marcas en un solo arreglo 'brand' (el .sort() ordena alfabeticamente)
            const brandSinRepetidos = [...new Set(brand)]; //Con esto quitamos los duplicados

            brandSinRepetidos.forEach(element => { // Rellenamos con  option el select
                const option = document.createElement("option");
                option.text = element; // La etiqueta que veo
                option.value = element; // El valor seleccionado en el option
                selectedBrand.add(option); // Agregará un option a mi select seleccionado
            });

            // La solicitud Fetch ha completado, oculta el modal
            $('#spinnerModal').modal('hide');
        });
}

const obtenerDatos = async () => { //Obtengo mis datos mediante funciones asincronas(tarea en segundo plano)

    const respuesta = await fetch(ApiURL + '?brand=' + selectedBrand.value); //Armamos la URL con un parametro de tipo empresa
    const datos = await respuesta.json();

    const datosFiltrados = datos
        .filter(maquillaje => maquillaje.brand === selectedBrand.value)
        .filter(maquillaje => maquillaje.product_type === selectedProduct_type.value)

    const price = datosFiltrados.map((maquillaje) => maquillaje.price); //el .map me devuelve el arreglo que yo quiera
    const category = datosFiltrados.map((maquillaje) => `${maquillaje.id} - ${maquillaje.category}`); //concatene mis elementos para ver ID más categoría

    crearGrafico(price, category);
}


const crearGrafico = (datos, etiquetas) => {
    var existingChart = Chart.getChart("myChart");

    // Destruye el gráfico si existe
    if (existingChart) {
        existingChart.destroy();
    }
    existingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Producto por precio en Dolares',
                data: datos,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


boton.addEventListener('click', obtenerDatos);

selectedBrand.addEventListener('change', function () { //Se ejecuta cada vez que se cambia el select
    actualizarSelect();
});

const actualizarSelect = async () => { //Actualiza el segundo select de la marca seleccionada
    const respuesta = await fetch(ApiURL + '?brand=' + selectedBrand.value); //Construí la Url por marca seleccionada
    const productosPorMarca = await respuesta.json();
    const product_type = productosPorMarca.map((elemento) => elemento.product_type).sort(); //Acá se guardan las productos en un solo arreglo 'producto' (el .sort() ordena alfabeticamente)

    const product_typeSinRepetidos = [...new Set(product_type)]; //Con esto quitamos los duplicados

    product_typeSinRepetidos.forEach(element => { //Le agregué un option por cada elemento a mi select
        const option = document.createElement("option");
        option.text = element;
        option.value = element;
        selectedProduct_type.add(option);
    });
}