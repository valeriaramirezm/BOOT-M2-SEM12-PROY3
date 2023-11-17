import { getMakeupData, getMakeupDataByBrand } from "./js/api.js";
import { populateBrandSelect, populateProductTypeSelect } from "./js/select.js";
import { createChart } from "./js/chart.js";

const ctx = document.getElementById("myChart");
const boton = document.getElementById("showGraphic");
const selectedBrand = document.getElementById("brandSelect");
const selectedProductType = document.getElementById("categorySelect");

document.addEventListener("DOMContentLoaded", async () => {
    await initializePage();
});

const initializePage = async () => {
    await obtenerDatosMakeup();
};

const obtenerDatosMakeup = async () => {
    $('#spinnerModal').modal('show');

    const data = await getMakeupData();
    populateBrandSelect(data);

    $('#spinnerModal').modal('hide');
};

const obtenerDatos = async () => {
    const data = await getMakeupDataByBrand(selectedBrand.value);

    const datosFiltrados = data
        .filter((maquillaje) => maquillaje.product_type === selectedProductType.value);

    const price = datosFiltrados.map((maquillaje) => maquillaje.price);
    const category = datosFiltrados.map((maquillaje) => `${maquillaje.id} - ${maquillaje.category}`);

    createChart(ctx, price, category);
};

boton.addEventListener("click", obtenerDatos);

selectedBrand.addEventListener("change", () => {
    actualizarSelect();
});

const actualizarSelect = async () => {
    const data = await getMakeupDataByBrand(selectedBrand.value);
    populateProductTypeSelect(data);
};
