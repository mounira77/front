import "./search.scss";
import Button from "../button/Button";
import Input from "../input/Input";

const Search = (props) => {
  const { handleSubmit, id, value, holder, onChange, required, type } = props;
  const handleChange = (value) => {
    onChange(value);
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          id={id}
          value={value || ""}
          required={required}
          type={type || "text"}
          placeholder={holder || "text"}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
