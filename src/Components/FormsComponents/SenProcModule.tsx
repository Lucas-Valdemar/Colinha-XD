import React from "react";

interface SenProcModuleProps {
  senha: string;
  procedimento: string;
  index: number;
  total: number;
  onSenhaChange: (index: number, value: string) => void;
  onProcedimentoChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

const SenProcModule: React.FC<SenProcModuleProps> = ({
  senha,
  procedimento,
  index,
  total,
  onSenhaChange,
  onProcedimentoChange,
  onRemove,
}) => {
  return (
    <div className="flex flex-col w-full" style={{ marginBottom: "20px" }}>
      <div className="flex flex-col">
        <label>{total === 1 ? "Senha" : `Senha ${index + 1}`}:</label>
        <input
          type="text"
          value={senha}
          onChange={(e) => onSenhaChange(index, e.target.value)}
          className="text-black"
        />
      </div>
      <div className="flex flex-col">
        <label>{total === 1 ? "Procedimento" : `Procedimento ${index + 1}`}:</label>
        <input
          type="text"
          value={procedimento}
          onChange={(e) => onProcedimentoChange(index, e.target.value)}
          className="text-black"
        />
      </div>
      {total > 1 && (
        <button onClick={() => onRemove(index)}>❌ Remover</button>
      )}
    </div>
  );
};

export default SenProcModule;
