import "../styles/CartItem.scss";
import { useState, useEffect } from "react";
import GetDataFromApi from "../services/Api";
import Products from "./Products";
import Loader from "./Loader";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import { Route, Switch } from "react-router-dom";
import ls from "../services/localStorage";

function App() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState(ls.getFromLocalStorage());
  const [filterText, setFilterText] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => ls.setInLocalStorage(cartProducts));

  useEffect(() => {
    setIsLoader(true);
    GetDataFromApi().then((data) => {
      setIsLoader(false);
      setProducts(data);
    });
  }, []);

  const incrementarProducts = clickedProductId => {
    const cartProductsFound = findProductInCart(clickedProductId);
    if (cartProductsFound) {
      cartProductsFound.units += 1;
    } else {
      const foundClickedId = products.find(
        (product) => clickedProductId === product.id
      );
      foundClickedId.units = 1;
      cartProducts.push(foundClickedId);
    }
    setCartProducts([...cartProducts]);
  };

  const findProductInCart = clickedProductId => {
    return cartProducts.find(
      cartProduct => clickedProductId === cartProduct.id
    );
  };

  const decrementCartProduct = (clickedProductId) => {
    const cartProductFound = findProductInCart(clickedProductId);
    if (cartProductFound.units > 1) {
      cartProductFound.units -= 1;
      setCartProducts([...cartProducts]);
    } else {
      deleteCartProduct(clickedProductId);
    }
  };

  const deleteCartProduct = (clickedProductId) => {
    const cartProductIndexFound = cartProducts.findIndex(
      (cartProduct) => clickedProductId === cartProduct.id
    );
    cartProducts.splice(cartProductIndexFound, 1);
    setCartProducts([...cartProducts]);
  };

  const handlerFilter = (value) => {
    setFilterText(value);
  };

  const filterProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(filterText.toLowerCase());
  });

  const renderDetail = (props) => {
    const routeId = props.match.params.id;
    const foundProduct = products.find((product) => {
      return routeId === product.id;
    });
    if (foundProduct) {
      return (
        <ProductDetail
          name={foundProduct.name}
          price={foundProduct.price}
          description={foundProduct.description}
          imageUrl={foundProduct.imageUrl}
          sizes={foundProduct.sizes}
        />
      );
    } else {
      return <p>Producto no encontrado</p>;
    }
  };

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <div className="col2">
            <Loader isLoader={isLoader} />
            <Products
              products={filterProducts}
              handlerFilter={handlerFilter}
              filterText={filterText}
              incrementarProducts={incrementarProducts}
            />
            <Cart
              cartProducts={cartProducts}
              incrementarProducts={incrementarProducts}
              decrementCartProduct={decrementCartProduct}
              deleteCartProduct={deleteCartProduct}
            />
          </div>
        </Route>
        <Route path="/product-detail/:id" component={renderDetail}></Route>
      </Switch>
    </>
  );
}

export default App;
