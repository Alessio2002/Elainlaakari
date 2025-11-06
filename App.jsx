import React from "react";
import PatientCase from "./PatientCase";
import patientData from "./patient.json";

export default function App() {
  return <PatientCase data={patientData} />;
}
