import "./input.scss";

const Input = (props) => {
  const { id, type, text, value, required, holder, onChange } = props;
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="input-group">
      <label className="input__label" htmlFor={id}>
        {text}
      </label>

      <input
        id={id}
        className="input"
        value={value || ""}
        required={required}
        type={type || "text"}
        placeholder={holder || "text"}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
