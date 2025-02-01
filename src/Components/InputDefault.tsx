import React, { useState } from "react";

const useGeneratedText = () => {
  const initialState = {
    senhas: [""],
    procedimentos: [""],
    prestador: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    telefone: "",
    telefone2: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSenhaChange = (index: number, value: string) => {
    const novasSenhas = [...formData.senhas];
    novasSenhas[index] = value;
    setFormData({ ...formData, senhas: novasSenhas });
  };

  const handleProcedimentoChange = (index: number, value: string) => {
    const novosProcedimentos = [...formData.procedimentos];
    novosProcedimentos[index] = value;
    setFormData({ ...formData, procedimentos: novosProcedimentos });
  };

  const addSenhaProcedimento = () => {
    setFormData({
      ...formData,
      senhas: [...formData.senhas, ""],
      procedimentos: [...formData.procedimentos, ""],
    });
  };

  const removeSenhaProcedimento = (index: number) => {
    if (formData.senhas.length > 1) {
      setFormData({
        ...formData,
        senhas: formData.senhas.filter((_, i) => i !== index),
        procedimentos: formData.procedimentos.filter((_, i) => i !== index),
      });
    }
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  const formattedText = `PREZADO SR(A) [_NM_BENEFICIARIO_] SOLICITAÇÃO DE ${formData.procedimentos.join(" / ") || "insiraprocedimento"}
  AUTORIZADA POR SENHA: ${formData.senhas.join(" / ") || "*insirasenha*"} E NÚMERO DE PROTOCOLO: [NU_PROTOCOLO] PARA PRESTADOR: ${formData.prestador || "insiraprestador"}
  ENDEREÇO: R. ${formData.rua || "insirarua"}, NÚMERO ${formData.numero || "insiranumero"}${formData.complemento ? ", " + formData.complemento : ""}, ${formData.bairro || "insirabairro"}, CEP ${formData.cep || "insiracep"}.
  TELEFONE ${formData.telefone || "insiratelefone"}${formData.telefone2 ? ", " + formData.telefone2 : ""}.
  EM CASO DE DÚVIDAS, ENTRE EM CONTATO COM A CENTRAL DE ATENDIMENTO 4090 1740 OU 0800 409 1740. 0800 463 4648`;

  return {
    formData,
    handleSenhaChange,
    handleProcedimentoChange,
    addSenhaProcedimento,
    removeSenhaProcedimento,
    resetForm,
    formattedText,
    setFormData,
  };
};

const Formulario = () => {
  const {
    formData,
    handleSenhaChange,
    handleProcedimentoChange,
    addSenhaProcedimento,
    removeSenhaProcedimento,
    resetForm,
    formattedText,
    setFormData,
  } = useGeneratedText();

  return (
    <div className="flex flex-col" >
      <h2>Dados</h2>
    <div className="flex flex-col">
      {formData.senhas.map((senha, index) => (
        <div className="flex flex-col w-full"  key={index} style={{ marginBottom: "10px" }}>
          <div className="flex justify-between w-full">
          <label>{formData.senhas.length === 1 ? "Senha" : `Senha ${index + 1}`}: </label>
          <input
            type="text"
            value={senha}
            onChange={(e) => handleSenhaChange(index, e.target.value)}
            className="text-black"
          />
          </div>
          <div className="flex items-end">
          <label>{formData.senhas.length === 1 ? "Procedimento" : `Procedimento ${index + 1}`}: </label>
          <input
            type="text"
            value={formData.procedimentos[index]}
            onChange={(e) => handleProcedimentoChange(index, e.target.value)}
            className="text-black"
          />
          </div>
          {formData.senhas.length > 1 && (
            <button onClick={() => removeSenhaProcedimento(index)}>❌ Remover</button>
          )}
        </div>
      ))}

      <button onClick={addSenhaProcedimento}>➕ Adicionar Senha/Procedimento</button>
      </div>
      <div>
        <label>Prestador: </label>
        <input
          type="text"
          value={formData.prestador}
          onChange={(e) => setFormData({ ...formData, prestador: e.target.value })}
          className="text-black"
        />
      </div>

      <div>
        <label>Rua: </label>
        <input
          type="text"
          value={formData.rua}
          onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
          className="text-black"
        />
      </div>

      <div>
        <label>Número: </label>
        <input
          type="text"
          value={formData.numero}
          onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
          className="text-black"
        />
      </div>

      <div>
        <label>Complemento: </label>
        <input
          type="text"
          value={formData.complemento}
          onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
          className="text-black"
        />
      </div>

      <div>
        <label>Bairro: </label>
        <input
          type="text"
          value={formData.bairro}
          onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
          className="text-black"
        />
      </div>

      <div>
        <label>CEP: </label>
        <input
          type="text"
          value={formData.cep}
          onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
          className="text-black"
        />
      </div>

      <div>
        <label>Telefone: </label>
        <input
          type="text"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          className="text-black"
        />
      </div>

      <div>
        <label>Telefone 2: </label>
        <input
          type="text"
          value={formData.telefone2}
          onChange={(e) => setFormData({ ...formData, telefone2: e.target.value })}
          className="text-black"
        />
      </div>

     

      <button onClick={resetForm} style={{ backgroundColor: "red", color: "white" }}>
        🔄 Redefinir
      </button>
     
      <h3>Mensagem PPO</h3>
      
      <p>{formattedText}</p>
    </div>
  );
};

export default Formulario;
