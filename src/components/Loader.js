import "../styles/Loader.scss"

const Loader = (props) => {
  return props.isLoader ? (
    <div className="loader"></div>
  ) : null;
};

export default Loader;
