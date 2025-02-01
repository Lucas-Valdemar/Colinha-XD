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

  const fetchPrestadores = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      console.log(`Buscando prestadores para: ${query}`);

      const mockPrestadores: Prestador[] = [
        {
          prestNome: "Clínica São José",
          prestEndereco: "Rua das Flores, 123",
          telefone1: "(11) 99999-1234",
          telefone2: "(11) 98888-5678",
          prestNumero: "456",
          prestComplemento: "Apto 10",
          prestBairro: "Jardins",
          prestCEP: "01414-000",
          telefone3: "", // Added telefone3
        },
        {
          prestNome: "Hospital Central",
          prestEndereco: "Av. Paulista",
          prestNumero: "1234",
          prestComplemento: "Bloco B",
          prestBairro: "Centro",
          prestCEP: "12345-678",
          telefone1: "(11) 97777-4321",
          telefone2: "(11) 96666-8765",
          telefone3: "(11) 95555-1212",
        },
        {
          prestNome: "Clínica Popular",
          prestEndereco: "Rua da Saúde, 789",
          telefone1: "(21) 95555-7890",
          prestNumero: "10",
          prestComplemento: "", // Added prestComplemento
          prestBairro: "Copacabana",
          prestCEP: "22020-080",
          telefone2: "", // Added telefone2
          telefone3: "", // Added telefone3
        },
      ];

      const filtered = mockPrestadores
        .filter((prestador) =>
          prestador.prestNome.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filtered);
      setIsDropdownOpen(filtered.length > 0);
    } catch (error) {
      console.error("Erro ao buscar prestadores:", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPrestadores(value.prestNome);
    }, 300);

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
        <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-md max-h-40 overflow-y-auto z-10">
          {suggestions.map((prestador, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handlePrestadorSelection(prestador)}
            >
              {prestador.prestNome}
            </li>
          ))}
        </ul>
      )}
      </div>

      <div className="flex flex-col gap-4 h-fit">
      <label>Endereço:</label>
      <input
        type="text"
        value={value.prestEndereco}
        onChange={(e) => onChange({ ...value, prestEndereco: e.target.value })}
        className="text-black w-full"
      />

      <label>Número:</label>
      <input
        type="text"
        value={value.prestNumero}
        onChange={(e) => onChange({ ...value, prestNumero: e.target.value })}
        className="text-black w-full"
      />

      <label>Complemento:</label>
      <input
        type="text"
        value={value.prestComplemento}
        onChange={(e) => onChange({ ...value, prestComplemento: e.target.value })}
        className="text-black w-full"
      />

      <label>Bairro:</label>
      <input
        type="text"
        value={value.prestBairro}
        onChange={(e) => onChange({ ...value, prestBairro: e.target.value })}
        className="text-black w-full"
      />
  
      <label>CEP:</label>
      <input
        type="text"
        value={value.prestCEP}
        onChange={(e) => onChange({ ...value, prestCEP: e.target.value })}
        className="text-black w-full"
      />

      <label>Telefone 1:</label>
      <input
        type="text"
        value={value.telefone1}
        onChange={(e) => onChange({ ...value, telefone1: e.target.value })}
        className="text-black w-full"
      />

      <label>Telefone 2:</label>
      <input
        type="text"
        value={value.telefone2 || ""}
        onChange={(e) => onChange({ ...value, telefone2: e.target.value })}
        className="text-black w-full"
      />

    <label>Telefone 3:</label>
      <input
        type="text"
        value={value.telefone3}
        onChange={(e) => onChange({ ...value, telefone3: e.target.value })}
        className="text-black w-full"
      />
      </div>
    </div>
  );
};

export default PrestModule;
