import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormResponse, FormSection } from "../types/formTypes";
import FormSectionComponent from "./FormSection";

interface Props {
  rollNumber: string;
}

const FormWizard: React.FC<Props> = ({ rollNumber }) => {
  const [form, setForm] = useState<FormResponse["form"] | null>(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    axios
      .get(
        `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
      )
      .then((res) => setForm(res.data.form))
      .catch(() => alert("Failed to load form"));
  }, [rollNumber]);

  if (!form) return <div>Loading form...</div>;

  const currentSection = form.sections[sectionIndex];

  const handleSectionData = (data: any, errors: any) => {
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }

    setFormData((prev) => ({ ...prev, ...data }));
    setErrors({});
    return true;
  };

  const handleNext = (data: any, errors: any) => {
    if (handleSectionData(data, errors)) {
      setSectionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = (data: any, errors: any) => {
    if (handleSectionData(data, errors)) {
      console.log("Final Form Data:", { ...formData, ...data });
    }
  };

  return (
    <div>
      <h2>{form.formTitle}</h2>
      <FormSectionComponent
        section={currentSection}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        isLast={sectionIndex === form.sections.length - 1}
        isFirst={sectionIndex === 0}
      />
    </div>
  );
};

export default FormWizard;
