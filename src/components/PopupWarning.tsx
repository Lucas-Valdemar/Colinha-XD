import { useState, useEffect } from "react";

const PopupWarning = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("seenPopup");
    if (!hasSeenPopup) {
      setIsVisible(true);
      document.body.style.overflow = "hidden"; // Bloqueia rolagem
    }

    return () => {
      document.body.style.overflow = "auto"; // Libera rolagem ao fechar
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem("seenPopup", "true");
    setIsVisible(false);
    document.body.style.overflow = "auto"; // Permite rolagem novamente
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40" >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center" >
        <h2 className="text-lg font-bold text-red-900">Aviso</h2>
        <p className="mt-2 text-sm text-gray-700">
          Este site está em desenvolvimento. Qualquer conteúdo copiado daqui deve
          ser verificado antes de ser enviado ao beneficiário.
        </p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleClose}
        >
          Entendi
        </button>
      </div>
    </div>
  );
};

export default PopupWarning;
