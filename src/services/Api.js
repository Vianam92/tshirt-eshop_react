const GetDataFromApi = () => {
return fetch('https://beta.adalab.es/ejercicios-extra/api/eshop/v2/cart.json')
.then(response => response.json())
.then(data => {
    data.cart.items.forEach((item, index)=>{
        item.id="p"+index
    });
    return data.cart.items;
});
};

export default GetDataFromApi;