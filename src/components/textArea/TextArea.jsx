import "./textArea.scss";

const TextArea = (props) => {
  const { id, type, text, value, required, holder, onChange } = props;
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="textarea-group">
      <label className="textarea__label" htmlFor={id}>
        {text}
      </label>

      <textarea
        id={id}
        className="textarea"
        value={value || ""}
        required={required}
        type={type || "text"}
        placeholder={holder || "text"}
        rows={30}
        cols={50}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export default TextArea;
