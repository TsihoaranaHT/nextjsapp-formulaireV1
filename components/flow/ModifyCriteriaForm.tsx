'use client';

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { trackModifyCriteriaModalView, trackCriteriaModified } from "@/lib/analytics";

interface ModifyCriteriaFormProps {
  onBack: () => void;
}

const CAPACITY_OPTIONS = [
  { value: "2.5t", label: "2,5 tonnes" },
  { value: "3t", label: "3 tonnes" },
  { value: "3.5t", label: "3,5 tonnes" },
  { value: "4t", label: "4 tonnes" },
  { value: "5t", label: "5 tonnes" },
  { value: "6t", label: "6 tonnes" },
];

const ZONE_OPTIONS = [
  { value: "idf", label: "Île-de-France" },
  { value: "75", label: "Paris (75)" },
  { value: "77", label: "Seine-et-Marne (77)" },
  { value: "78", label: "Yvelines (78)" },
  { value: "91", label: "Essonne (91)" },
  { value: "92", label: "Hauts-de-Seine (92)" },
  { value: "93", label: "Seine-Saint-Denis (93)" },
  { value: "94", label: "Val-de-Marne (94)" },
  { value: "95", label: "Val-d'Oise (95)" },
  { value: "nord", label: "Nord" },
  { value: "est", label: "Est" },
  { value: "ouest", label: "Ouest" },
  { value: "sud", label: "Sud" },
  { value: "france", label: "France entière" },
];

const OPTIONS_LIST = [
  { value: "traverseSuperieure", label: "Traverse supérieure" },
  { value: "passageRoue", label: "Passage de roue ajustable" },
  { value: "brasTelescopic", label: "Bras télescopiques" },
  { value: "verinFosse", label: "Vérin de fosse intégré" },
  { value: "eclairageLed", label: "Éclairage LED intégré" },
  { value: "telecommande", label: "Télécommande sans fil" },
  { value: "detecteurPosition", label: "Détecteur de position" },
  { value: "protectionAntiChute", label: "Protection anti-chute renforcée" },
];

const ModifyCriteriaForm = ({ onBack }: ModifyCriteriaFormProps) => {
  const [criteria, setCriteria] = useState({
    type: "2-colonnes",
    voltage: "400v",
  });

  const [selectedCapacities, setSelectedCapacities] = useState<string[]>(["4t"]);
  const [selectedZones, setSelectedZones] = useState<string[]>(["idf"]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["traverseSuperieure"]);

  const [expansions, setExpansions] = useState({
    capacity35t: false,
    allVoltages: false,
    allFrance: false,
  });

  // Track modal view on mount (only once per session)
  useEffect(() => {
    trackModifyCriteriaModalView();
  }, []);

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
            Annuler
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Modifier les critères
          </h2>
          <p className="mt-1 text-muted-foreground">
            Affinez votre recherche pour trouver les fournisseurs idéaux
          </p>
        </div>

        {/* Form - Single column layout */}
        <div className="space-y-4">
          {/* Type de pont */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Type de pont
            </label>
            <select
              value={criteria.type}
              onChange={(e) => setCriteria({ ...criteria, type: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="2-colonnes">2 colonnes</option>
              <option value="4-colonnes">4 colonnes</option>
              <option value="ciseaux">Ciseaux</option>
              <option value="fosse">Fosse</option>
            </select>
          </div>

          {/* Capacité */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Capacité
            </label>
            <MultiSelectDropdown
              options={CAPACITY_OPTIONS}
              selected={selectedCapacities}
              onChange={setSelectedCapacities}
              placeholder="Sélectionner les capacités..."
              searchPlaceholder="Rechercher une capacité..."
            />
          </div>

          {/* Alimentation */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Alimentation
            </label>
            <select
              value={criteria.voltage}
              onChange={(e) =>
                setCriteria({ ...criteria, voltage: e.target.value })
              }
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="230v">230V monophasé</option>
              <option value="400v">400V triphasé</option>
            </select>
          </div>

          {/* Zone géographique */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Zone géographique
            </label>
            <MultiSelectDropdown
              options={ZONE_OPTIONS}
              selected={selectedZones}
              onChange={setSelectedZones}
              placeholder="Sélectionner les zones..."
              searchPlaceholder="Rechercher une zone..."
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Options
            </label>
            <MultiSelectDropdown
              options={OPTIONS_LIST}
              selected={selectedOptions}
              onChange={setSelectedOptions}
              placeholder="Sélectionner les options..."
              searchPlaceholder="Rechercher une option..."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={onBack}
                className="order-2 sm:order-1 w-full sm:w-auto rounded-lg border-2 border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // Track criteria modification with modified fields
                  const modifiedFields = [];
                  if (criteria.type !== "2-colonnes") modifiedFields.push("type");
                  if (criteria.voltage !== "400v") modifiedFields.push("voltage");
                  if (selectedCapacities.length !== 1 || selectedCapacities[0] !== "4t") modifiedFields.push("capacity");
                  if (selectedZones.length !== 1 || selectedZones[0] !== "idf") modifiedFields.push("zone");
                  if (selectedOptions.length !== 1 || selectedOptions[0] !== "traverseSuperieure") modifiedFields.push("options");

                  const criteriaCount = selectedCapacities.length + selectedZones.length + selectedOptions.length;
                  trackCriteriaModified(criteriaCount, modifiedFields);

                  onBack();
                }}
                className="order-1 sm:order-2 w-full sm:w-auto flex-1 sm:flex-none rounded-lg bg-accent px-8 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5" />
                Voir les résultats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyCriteriaForm;
