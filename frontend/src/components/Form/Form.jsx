import { useState } from "react";
import "./Form.scss";
const Form = ({ onSubmit, fields, buttonText }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {fields.map((field) => (
        <div key={field.name} className="">
          <input
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            value={formValues[field.name] || ""}
            onChange={handleChange}
            className="border border-[#DFE1E3] w-full p-2 mt-5 rounded"
            required={field.required}
          />
        </div>
      ))}
      <button
        type="submit"
        className="banner-button bg-pinkMedium text-white mt-5 p-2 font-semibold text-base rounded w-full"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
