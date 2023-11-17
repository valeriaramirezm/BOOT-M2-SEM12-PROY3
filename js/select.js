export const populateBrandSelect = (data) => {
    const brandSelect = document.getElementById("brandSelect");

    const brand = data.map((elemento) => elemento.brand).sort();
    const brandSinRepetidos = [...new Set(brand)];

    brandSinRepetidos.forEach((element) => {
        const option = document.createElement("option");
        option.text = element;
        option.value = element;
        brandSelect.add(option);
    });
};

export const populateProductTypeSelect = (data) => {
    const productTypeSelect = document.getElementById("categorySelect");

    const product_type = data.map((elemento) => elemento.product_type).sort();
    const product_typeSinRepetidos = [...new Set(product_type)];

    product_typeSinRepetidos.forEach((element) => {
        const option = document.createElement("option");
        option.text = element;
        option.value = element;
        productTypeSelect.add(option);
    });
};
