import Product from "./Product";
import Filters from "./Filters";
import Title from "./Title";

const Products = (props) => {
  const productsItems = props.products.map(product => {
    return (
      <Product
        key={product.id}
        id={product.id}
        imageUrl={product.imageUrl}
        name={product.name}
        price={product.price}
        incrementarProducts={props.incrementarProducts}
      />
    );
  });

  return (
    <div>
      <Title title="Listado de camisetas" />
      <Filters handlerFilter={props.handlerFilter} filterText={props.filterText}/>
      <section className="cards">{productsItems}</section>
    </div>
  );
};

export default Products;
