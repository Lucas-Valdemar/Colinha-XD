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

const T21pppnSenProcModule: React.FC<SenProcModuleProps> = ({
  senha,
  procedimento,
  index,
  total,
  onSenhaChange,
  onProcedimentoChange,
  onRemove,
}) => {
  return (
    <div className="flex flex-col w-full gap-4" style={{ marginBottom: "10px" }}>
      <div className="flex justify-between">
        <label>{total === 1 ? "Senha" : `Senha ${index + 1}`}:</label>
        <input
          type="text"
          value={senha}
          onChange={(e) => onSenhaChange(index, e.target.value)}
          className="text-black"
          style={{ width: "65%" }}
        />
      </div>
      <div className="flex justify-between">
        <label>{total === 1 ? "Procedimento" : `Procedimento ${index + 1}`}:</label>
        <input
          type="text"
          value={procedimento}
          onChange={(e) => onProcedimentoChange(index, e.target.value)}
          className="text-black"
          style={{ width: "65%" }}
        />
      </div>
      {total > 1 && (
        <button onClick={() => onRemove(index)}>❌ Remover</button>
      )}
    </div>
  );
};

export default T21pppnSenProcModule;
