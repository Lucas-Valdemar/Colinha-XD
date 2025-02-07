import React, { useState, useEffect } from "react";

interface Prestador {
  prestNome: string;
  prestEndereco: string;
  prestNumero: string;
  prestComplemento: string;
  prestBairro: string;
  prestCEP: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
}

interface PrestModuleProps {
  value: Prestador;
  onChange: (value: Prestador) => void;
}

const prestadorDefault: Prestador = {
  prestNome: "insira o nome do prestador",
  prestEndereco: "insira o endereço do prestador",
  prestNumero: "insira o número do prestador",
  prestComplemento: "",
  prestBairro: "insira o bairro do prestador",
  prestCEP: "insira o CEP do prestador",
  telefone1: "insira o telefone do prestador",
  telefone2: "",
  telefone3: "",
};

const PrestModule: React.FC<PrestModuleProps> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<Prestador[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPrestadores = async () => {
      if (!value.prestNome.trim()) {
        setSuggestions([]);
        setIsDropdownOpen(false);
        return;
      }

      try {
        console.log(`Buscando prestadores para: ${value.prestNome}`);
        const response = await fetch(`/api/prism_prestadores?q=${value.prestNome}`);
        if (!response.ok) throw new Error("Erro ao buscar prestadores");

        const data: Prestador[] = await response.json();
        setSuggestions(data);
        setIsDropdownOpen(data.length > 0);
      } catch (error) {
        console.error("Erro ao buscar prestadores:", error);
      }
    };

    const delayDebounce = setTimeout(fetchPrestadores, 300);
    return () => clearTimeout(delayDebounce);
  }, [value.prestNome]);

  const handlePrestadorSelection = (selectedPrestador: Prestador) => {
    const mergedPrestador = { ...prestadorDefault, ...selectedPrestador };
    onChange(mergedPrestador);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full flex flex-col gap-[80px] space-between h-fit">
      <div>
        <label>Prestador:</label>
        <input
          type="text"
          value={value.prestNome}
          onChange={(e) => onChange({ ...value, prestNome: e.target.value })}
          className="text-black w-full"
          onFocus={() => setIsDropdownOpen(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        />
        {isDropdownOpen && (
          <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-md max-h-24 overflow-y-auto z-10 text-black">
            {suggestions.map((prestador, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onMouseDown={() => handlePrestadorSelection(prestador)}
              >
                {prestador.prestNome}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-4 h-fit">
        <div className="flex gap-4 justify-between" >
          <div style={{width: "80%"}}>
        <label>Endereço:
        <input
          type="text"
          value={value.prestEndereco}
          onChange={(e) => onChange({ ...value, prestEndereco: e.target.value })}
          className="text-black w-full"
        /></label></div>
        <div style={{width:"15%"}}>
        <label >Número:
        <input
          type="text"
          value={value.prestNumero}
          onChange={(e) => onChange({ ...value, prestNumero: e.target.value })}
          className="text-black w-full"
        /></label></div>
        </div>
        <div className="flex gap-4 justify-between">
        <label style={{width: "32%"}}>Complemento:
        <input
          type="text"
          value={value.prestComplemento}
          onChange={(e) => onChange({ ...value, prestComplemento: e.target.value })}
          className="text-black w-full"
        /></label>

        <label style={{width: "32%"}}>Bairro:
        <input
          type="text"
          value={value.prestBairro}
          onChange={(e) => onChange({ ...value, prestBairro: e.target.value })}
          className="text-black w-full"
        /></label>

        <label style={{width: "32%"}}>CEP:
        <input
          type="text"
          value={value.prestCEP}
          onChange={(e) => onChange({ ...value, prestCEP: e.target.value })}
          className="text-black w-full"
        /></label></div>
        <div className="flex gap-4 justify-between">
        <label style={{width: "32%"}}>Telefone 1:
        <input
          type="text"
          value={value.telefone1}
          onChange={(e) => onChange({ ...value, telefone1: e.target.value })}
          className="text-black w-full"
        /></label>

        <label style={{width: "32%"}}>Telefone 2:
        <input
          type="text"
          value={value.telefone2 || ""}
          onChange={(e) => onChange({ ...value, telefone2: e.target.value })}
          className="text-black w-full"
        /></label>

        <label style={{width: "32%"}}>Telefone 3:
        <input
          type="text"
          value={value.telefone3}
          onChange={(e) => onChange({ ...value, telefone3: e.target.value })}
          className="text-black w-full"
        /></label> </div>
      </div>
    </div>
  );
};

export default PrestModule;
