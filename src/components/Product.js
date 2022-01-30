import {Link} from "react-router-dom";

const Product = props => {
  const handleClicAdd = () =>{
  props.incrementarProducts(props.id);
  };
  return (
    <article className="card">
      <img src={props.imageUrl} className="card__img" alt={`Producto: ${props.name}`} />
      <h3 className="card__title">{props.name}</h3>
      <p className="card__description">{props.price} €</p>
      <button className="card__btn" title="Añadir este producto a la cesta" onClick={handleClicAdd}>
        Añadir a la cesta
      </button>
      <Link to={`/product-detail/${props.id}`}><button className="card__btn" title="Ver el detalle de este producto">
        Ver detalle del producto
      </button></Link>
    </article>
  );
};

export default Product;
