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

const T21pppnPrestModule: React.FC<PrestModuleProps> = ({ value, onChange }) => {
  const [allPrestadores, setAllPrestadores] = useState<Prestador[]>([]);
  const [filteredPrestadores, setFilteredPrestadores] = useState<Prestador[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Busca todos os prestadores ao iniciar a página
  useEffect(() => {
    const fetchAllPrestadores = async () => {
      try {
        console.log("Buscando todos os prestadores...");
        const response = await fetch("/api/next-prestadores");
        // const response = await fetch("/api/prism_prestadores");
        if (!response.ok) throw new Error("Erro ao buscar prestadores");

        const data: Prestador[] = await response.json();
        setAllPrestadores(data);
        setFilteredPrestadores(data); // Inicialmente, todos os prestadores são mostrados
      } catch (error) {
        console.error("Erro ao buscar prestadores:", error);
      }
    };

    fetchAllPrestadores();
  }, []);

  // Filtra localmente quando o nome do prestador muda
  useEffect(() => {
    if (!value.prestNome.trim()) {
      setFilteredPrestadores(allPrestadores);
      setIsDropdownOpen(false);
      return;
    }

    const filtered = allPrestadores.filter((prestador) =>
      prestador.prestNome.toLowerCase().includes(value.prestNome.toLowerCase())
    );
    
    setFilteredPrestadores(filtered);
    setIsDropdownOpen(filtered.length > 0);
  }, [value.prestNome, allPrestadores]);

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
          onFocus={() => setIsDropdownOpen(filteredPrestadores.length > 0)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        />
        {isDropdownOpen && (
          <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-md max-h-24 overflow-y-auto z-10 text-black">
            {filteredPrestadores.map((prestador, index) => (
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
        </div>
    
        <div className="flex gap-4 justify-between">
        <label style={{width: "32%"}}>Telefone:
        <input
          type="text"
          value={value.telefone1}
          onChange={(e) => onChange({ ...value, telefone1: e.target.value })}
          className="text-black w-full"
        /></label>

     </div>
      </div>
    </div>
  );
};

export default T21pppnPrestModule;
