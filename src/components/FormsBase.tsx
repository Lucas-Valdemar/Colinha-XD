import React, { useState, useRef } from "react";
import SenProcModule from "@/components/FormsComponents/SenProcModule";
import PrestModule from "@/components/FormsComponents/PrestModule";

const useGeneratedText = () => {
  const initialState = {
    senhas: [""],
    procedimentos: [""],
    prestador: {
      prestNome: "",
      prestEndereco: "",
      prestNumero: "",
      prestComplemento: "",
      prestBairro: "",
      prestCEP: "",
      telefone1: "",
      telefone2: "",
      telefone3: "",
    },
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    telefone: "",
    telefone2: "",
    telefone3: "",
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

  const formattedText = `PREZADO SR(A) [_NM_BENEFICIARIO_] SOLICITAÇÃO DE ${formData.procedimentos.join(" / ") || ""}
AUTORIZADA POR SENHA: ${formData.senhas.join(" / ") || ""} E NÚMERO DE PROTOCOLO: [_NU_PROTOCOLO_] PARA PRESTADOR: ${formData.prestador.prestNome || ""}
 ${formData.prestador.prestEndereco ? "ENDEREÇO: " + formData.prestador.prestEndereco : ""}${formData.prestador.prestNumero ? ", N - " + formData.prestador.prestNumero : ""} ${formData.prestador.prestComplemento ? ", " + formData.prestador.prestComplemento : ""}${formData.prestador.prestBairro ? ", "+ formData.prestador.prestBairro : ""}${formData.prestador.prestCEP ? ", CEP: " +formData.prestador.prestCEP : ""}.
${formData.prestador.telefone1 ? "TELEFONE: " + formData.prestador.telefone1 : ""}${formData.prestador.telefone2 ? " / " + formData.prestador.telefone2 : ""}${formData.prestador.telefone3 ? " / " + formData.prestador.telefone3 : ""}.
EM CASO DE DÚVIDAS, ENTRE EM CONTATO COM A CENTRAL DE ATENDIMENTO 4090 1740 OU 0800 409 1740. 0800 463 4648`
  .replace(/\n/g, ' ')  // Remove as quebras de linha
  .replace(/\s{2,}/g, ' ') // Substitui múltiplos espaços por um único espaço
  .toUpperCase(); // Converte para maiúsculas
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

const FormsBase = () => {
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

  const formattedTextRef = useRef<HTMLDivElement | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);


  const handleCopyClick = async (event: React.MouseEvent) => { 
    if (formattedTextRef.current) {
      try {
        await navigator.clipboard.writeText(formattedText);
        formattedTextRef.current.classList.add("copied");
  
        setTimeout(() => {
          if (formattedTextRef.current) {
            formattedTextRef.current.classList.remove("copied");
          }
        }, 1500);
  
        showFloatingMessage("Texto copiado!", event); 
      } catch (err) {
        console.error("Falha ao copiar:", err);
        setCopyError(true);
        if (event) { 
          showFloatingMessage("Falha ao copiar o texto!", event);
        }
      }
    }
  };
  
  const showFloatingMessage = (message: string, event: React.MouseEvent) => {
    if (event) {
      const x = event.clientX;
      const y = event.clientY;
  
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messageElement.style.position = "absolute";
      messageElement.style.top = `${y - 30}px`; // Ajuste a posição vertical
      messageElement.style.left = `${x + 10}px`; // Ajuste a posição horizontal
      messageElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Cor de fundo
      messageElement.style.color = "white"; // Cor do texto
      messageElement.style.padding = "5px 10px"; // Espaçamento interno
      messageElement.style.borderRadius = "5px"; // Borda arredondada
      messageElement.style.zIndex = "9999"; // Garante que a mensagem fique acima de outros elementos
      document.body.appendChild(messageElement);
  
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 2000); // Tempo de exibição da mensagem
    }
  };
  return (
    <div className="flex flex-col" >
      <h2 style={{marginBottom: "10px"}}>FORMULÁRIOS DE DADOS</h2>
    <div className="flex flex-col">
    
 
{formData.senhas.map((senha, index) => (
  <SenProcModule
    key={index}
    senha={senha}
    procedimento={formData.procedimentos[index]}
    index={index}
    total={formData.senhas.length}
    onSenhaChange={handleSenhaChange}
    onProcedimentoChange={handleProcedimentoChange}
    onRemove={removeSenhaProcedimento}
  />
))}


      <button style={{ marginBottom: "10px" }} onClick={addSenhaProcedimento}>➕ Adicionar Senha/Procedimento</button>
      </div>
      <PrestModule
  value={formData.prestador}
  onChange={(updatedPrestador) =>
    setFormData({ ...formData, prestador: updatedPrestador })
  }
/>


     

      <button onClick={resetForm} style={{ backgroundColor: "red", color: "white" , marginTop: "20px"}}>
        🔄 Redefinir
      </button>
     
      <h3 style={{ marginBlock: "20px" }}>Mensagem PPO</h3>
      <div 
        ref={formattedTextRef}
        style={{
          border: "var(--message-border)",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer", // Indica que é clicável
        }}
        onClick={handleCopyClick} // Adiciona o evento de clique
      >
        <p>{formattedText}</p>
      </div>
    </div>
  );
};

export default FormsBase;
