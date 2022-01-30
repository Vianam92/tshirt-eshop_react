const Filters = props => {
  const handlerFilterValue = ev => {
    props.handlerFilter(ev.target.value);
  };
  return (
    <form className="mb-1" onSubmit={eve=>eve.preventDefault()}>
      <label className="form__label" htmlFor="name">
        Filtrar por nombre:
      </label>
      <input className="form__input-text" type="text" id="name" value={props.filterText} onChange={handlerFilterValue}/>
    </form>
  );
};

export default Filters;
