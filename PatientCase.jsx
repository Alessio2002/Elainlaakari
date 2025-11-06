import React from "react";
import "./index.css";

export default function PatientCase({ data }) {
  if (!data) return <div>Ei potilastietoja löytynyt.</div>;

  const animal = data.animal || {};
  const visit = data.visit || {};
  const examFindings = Array.isArray(visit.exam_findings)
    ? visit.exam_findings
    : [];
  const symptoms = Array.isArray(data.symptoms) ? data.symptoms : [];
  const diagnoses = Array.isArray(data.diagnoses) ? data.diagnoses : [];
  const diffDiagnoses = Array.isArray(data.differential_diagnoses)
    ? data.differential_diagnoses
    : [];
  const treatments = Array.isArray(data.treatments) ? data.treatments : [];
  const homeCare = Array.isArray(data.home_care) ? data.home_care : [];
  const followUp = data.follow_up || {};

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow">
      {/* Eläimen tiedot */}
      <h1 className="text-2xl font-bold mb-2">{animal.name ?? "-"}</h1>
      <p className="text-gray-600">
        {animal.species ?? "-"} ({animal.sex ?? "-"}), {animal.age_years ?? "-"}{" "}
        vuotta
      </p>

      {/* Omistajan kertomus */}
      {visit.owner_report && (
        <>
          <h2 className="text-xl mt-4 font-semibold">Omistajan kertomus</h2>
          <p>{visit.owner_report}</p>
        </>
      )}

      {/* Kliiniset havainnot */}
      {examFindings.length > 0 && (
        <>
          <h2 className="text-xl mt-4 font-semibold">Kliiniset havainnot</h2>
          <ul className="list-disc pl-5">
            {examFindings.map((f, i) => (
              <li key={i}>
                {f.name}
                {f.severity_level !== undefined
                  ? `, vaikeusaste: ${f.severity_level}`
                  : ""}
                {f.value !== undefined ? `, arvo: ${f.value} ${f.unit}` : ""}
                {f.normal_range ? ` (normaali: ${f.normal_range})` : ""}
                {f.present === true ? ", löydös" : ""}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Oireet */}
      {symptoms.length > 0 && (
        <>
          <h2 className="text-xl mt-4 font-semibold">Oireet</h2>
          <ul className="list-disc pl-5">
            {symptoms.map((s, i) => (
              <li key={i}>
                {s.name}
                {s.frequency_per_day !== undefined
                  ? `, tiheys: ${s.frequency_per_day}/vrk`
                  : ""}
                {s.duration_seconds !== undefined
                  ? `, kesto: ${s.duration_seconds} sekuntia`
                  : ""}
                {s.intensity_level !== undefined
                  ? `, voimakkuus: ${s.intensity_level}`
                  : ""}
                {s.certainty_level !== undefined
                  ? `, varmuus: ${Math.round(s.certainty_level * 100)}%`
                  : ""}
                {s.frequency !== undefined ? `, tiheys: ${s.frequency}` : ""}
                {s.present === true ? ", esiintyy" : ""}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Diagnoosit */}
      <h2 className="text-xl mt-4 font-semibold">Diagnoosit</h2>
      {diagnoses.length > 0 ? (
        diagnoses.map((d, i) => (
          <div key={i} className="border-l-4 border-blue-500 pl-3 my-2">
            <p className="font-medium">{d.name ?? "-"}</p>
            <p className="text-sm text-gray-600">
              Vaikeusaste: {d.severity_level ?? "-"} / 3 ({d.category ?? "-"})
            </p>
            {d.lethality_rate_percent?.untreated !== undefined && (
              <p className="text-sm text-gray-600">
                Kuolleisuus hoitamattomana: {d.lethality_rate_percent.untreated}
                %
              </p>
            )}
            {d.lethality_rate_percent?.treated !== undefined && (
              <p className="text-sm text-gray-600">
                Kuolleisuus hoidettuna: {d.lethality_rate_percent.treated}%
              </p>
            )}
            {d.suspected_causes && d.suspected_causes.length > 0 && (
              <p className="text-sm text-gray-600">
                Mahdolliset syyt: {d.suspected_causes.join(", ")}
              </p>
            )}
            {d.secondary_to && (
              <p className="text-sm text-gray-600">
                Toissijainen tautiin: {d.secondary_to}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Ei diagnooseja.</p>
      )}

      {/* Erotusdiagnoosit */}
      {diffDiagnoses.length > 0 && (
        <>
          <h2 className="text-xl mt-4 font-semibold">Erotusdiagnoosit</h2>
          <ul className="list-disc pl-5">
            {diffDiagnoses.map((dd, i) => (
              <li key={i}>
                {dd.name}
                {dd.probability_percent !== undefined
                  ? `, todennäköisyys: ${dd.probability_percent}%`
                  : ""}
                {dd.detail ? ` (${dd.detail})` : ""}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Hoidot */}
      <h2 className="text-xl mt-4 font-semibold">Hoidot</h2>
      {treatments.length > 0 ? (
        <ul className="list-disc pl-5">
          {treatments.map((t, i) => (
            <li key={i}>
              {t.name ?? "-"}
              {t.method ? ` — ${t.method}` : ""}
              {t.volume_ml ? ` (${t.volume_ml} ml)` : ""}
              {t.drug ? `, lääke: ${t.drug}` : ""}
              {t.dose_mg_per_kg ? `, annos: ${t.dose_mg_per_kg} mg/kg` : ""}
              {t.diet_type ? `, ruokavalio: ${t.diet_type}` : ""}
              {t.product ? `, tuote: ${t.product}` : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Ei hoitoja.</p>
      )}

      {/* Kotihoito */}
      <h2 className="text-xl mt-4 font-semibold">Kotihoito</h2>
      {homeCare.length > 0 ? (
        <ul className="list-disc pl-5">
          {homeCare.map((h, i) => (
            <li key={i}>
              {h.instruction ?? "-"}
              {h.duration_days ? `, kesto: ${h.duration_days} päivää` : ""}
              {h.availability ? `, saatavuus: ${h.availability}` : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Ei kotihoito-ohjeita.</p>
      )}

      {/* Kontrolli */}
      <h2 className="text-xl mt-4 font-semibold">Kontrolli</h2>
      <p>
        {followUp.start_date
          ? new Date(followUp.start_date).toLocaleDateString()
          : "-"}
        {" – "}
        {followUp.end_date
          ? new Date(followUp.end_date).toLocaleDateString()
          : "-"}
      </p>
      <p>{followUp.reason ?? "-"}</p>
    </div>
  );
}
