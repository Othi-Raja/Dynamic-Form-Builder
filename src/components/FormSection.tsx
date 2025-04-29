import React, { useState } from "react";
import { FormSection } from "../types/formTypes";
import "./FormSectionComponent.css"; // Importing the CSS for styling

interface Props {
  section: FormSection;
  onNext: (data: any, errors: any) => void;
  onPrev: () => void;
  onSubmit: (data: any, errors: any) => void;
  isLast: boolean;
  isFirst: boolean;
}

const FormSectionComponent: React.FC<Props> = ({
  section,
  onNext,
  onPrev,
  onSubmit,
  isLast,
  isFirst,
}) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    section.fields.forEach((field) => {
      const val = values[field.fieldId];
      if (field.required && !val)
        newErrors[field.fieldId] = "This field is required";
      if (field.minLength && val?.length < field.minLength)
        newErrors[field.fieldId] = field.validation?.message || "Too short";
      if (field.maxLength && val?.length > field.maxLength)
        newErrors[field.fieldId] = field.validation?.message || "Too long";
    });
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (id: string, value: any) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleAction = () => {
    const validationErrors = validate();
    if (isLast) {
      onSubmit(values, validationErrors);
    } else {
      onNext(values, validationErrors);
    }
  };

  return (
    <div className="form-section-container">
      <h3 className="form-title">{section.title}</h3>
      <p className="form-description">{section.description}</p>
      {section.fields.map((field) => (
        <div key={field.fieldId} className="form-field">
          <label className="form-label">{field.label}</label>
          {field.type === "text" ||
          field.type === "email" ||
          field.type === "tel" ||
          field.type === "date" ? (
            <input
              className="form-input"
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.fieldId] || ""}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              data-testid={field.dataTestId}
            />
          ) : field.type === "textarea" ? (
            <textarea
              className="form-input"
              placeholder={field.placeholder}
              value={values[field.fieldId] || ""}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
            />
          ) : field.type === "dropdown" ? (
            <select
              className="form-input"
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select
              </option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div>
              {field.options?.map((opt) => (
                <label key={opt.value} className="form-radio-label">
                  <input
                    type="radio"
                    name={field.fieldId}
                    value={opt.value}
                    checked={values[field.fieldId] === opt.value}
                    onChange={(e) =>
                      handleChange(field.fieldId, e.target.value)
                    }
                    data-testid={opt.dataTestId}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          ) : field.type === "checkbox" ? (
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                checked={values[field.fieldId] || false}
                onChange={(e) => handleChange(field.fieldId, e.target.checked)}
                data-testid={field.dataTestId}
              />
              {field.label}
            </label>
          ) : null}
          {errors[field.fieldId] && (
            <p className="form-error">{errors[field.fieldId]}</p>
          )}
        </div>
      ))}
      <div className="form-actions">
        {!isFirst && (
          <button className="form-button prev" onClick={onPrev}>
            Prev
          </button>
        )}
        <button className="form-button next" onClick={handleAction}>
          {isLast ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default FormSectionComponent;
