import React, { useState } from "react";
import axios from "axios";

const Form = ({ user }) => {
  const [formData, setFormData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("https://compliance-backend-x0r6.onrender.com/submit-form", {
        userId: user.id,
        formData,
      });
      alert("Form submitted successfully!");
    } catch (error) {
      alert("Submission failed: " + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Submit Compliance Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Enter form data..." value={formData} onChange={(e) => setFormData(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
