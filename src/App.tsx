import React, { useState } from "react";
import Login from "./components/Login";
import FormWizard from "./components/FormWizard";

const App: React.FC = () => {
  const [rollNumber, setRollNumber] = useState("");

  return (
    <div>
      {rollNumber ? (
        <FormWizard rollNumber={rollNumber} />
      ) : (
        <Login onLoginSuccess={setRollNumber} />
      )}
    </div>
  );
};

export default App;
