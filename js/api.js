const ApiURL = 'http://makeup-api.herokuapp.com/api/v1/products.json';

export const getMakeupData = async () => {
    const response = await fetch(ApiURL);
    return response.json();
};

export const getMakeupDataByBrand = async (brand) => {
    const response = await fetch(`${ApiURL}?brand=${brand}`);
    return response.json();
};
