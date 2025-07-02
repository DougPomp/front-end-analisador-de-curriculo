import React, { useState, useRef } from 'react';
import { FileUp, CheckCircle, BrainCircuit, Star, Search, Lightbulb, X, User, Mail, Phone, Code, Briefcase } from 'lucide-react';

// --- Componente de Modal de Sucesso ---
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center transform transition-all duration-300 scale-100">
        <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mt-6">Sucesso!</h3>
        <p className="text-gray-600 mt-2">Seu currículo foi analisado com sucesso.</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

// --- Componente de Ícone para Seção de Resultados ---
const SectionIcon = ({ icon: Icon, colorClass }) => (
  <div className={`mr-4 flex-shrink-0 bg-opacity-10 rounded-lg p-3 ${colorClass}`}>
    <Icon className="h-6 w-6" />
  </div>
);

// --- Componente de Item de Informação ---
const InfoItem = ({ icon: Icon, label, value, colorClass }) => (
    value && (
        <div className="flex items-start p-4 bg-gray-50 rounded-lg">
             <SectionIcon icon={Icon} colorClass={colorClass} />
            <div>
                <p className="text-sm font-semibold text-blue-600">{label}</p>
                <p className="text-lg text-gray-800">{value}</p>
            </div>
        </div>
    )
);


// --- Componente Principal da Aplicação ---
export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileName(file.name);
      setError(null);
    } else {
      setSelectedFile(null);
      setFileName('');
      setError("Por favor, selecione um arquivo PDF.");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Nenhum arquivo selecionado. Por favor, escolha um currículo.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    // O backend espera o campo 'curriculo'
    formData.append('curriculo', selectedFile);

    try {
      // Chamada real para a API do backend
      const response = await fetch('/analisar-curriculo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Falha na análise do currículo. Tente novamente.');
      }

      const data = await response.json();

      setAnalysisResult(data);
      setIsModalOpen(true);

    } catch (err) {
      setError(err.message || "Ocorreu um erro desconhecido.");
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setSelectedFile(null);
    setFileName('');
    setAnalysisResult(null);
    setError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center p-4 transition-all duration-500">
        
        {/* Card Principal */}
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500">
            {!analysisResult ? (
              // --- Tela de Upload ---
              <div className="text-center">
                <BrainCircuit className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Analisador de Currículo com IA</h1>
                <p className="mt-3 text-lg text-gray-600">Envie seu PDF e receba um resumo automático para recrutadores.</p>

                {/* Área de Upload */}
                <div 
                  className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-all duration-300"
                  onClick={handleFileClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf" // Apenas PDF
                  />
                  <div className="flex flex-col items-center justify-center">
                    <FileUp className="h-12 w-12 text-gray-400 mb-4" />
                    {fileName ? (
                        <p className="text-blue-600 font-semibold">{fileName}</p>
                    ) : (
                        <p className="text-gray-500">Clique para selecionar seu currículo</p>
                    )}
                    <p className="text-sm text-gray-400 mt-1">Apenas arquivos PDF</p>
                  </div>
                </div>

                {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

                {/* Botão de Envio */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !selectedFile}
                  className="mt-8 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analisando...
                    </>
                  ) : (
                    "Enviar Currículo"
                  )}
                </button>
              </div>
            ) : (
              // --- Tela de Resultados ---
              <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Resultado da Análise</h2>
                    <button onClick={resetState} className="text-gray-500 hover:text-gray-800 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Informações do Candidato */}
                    <InfoItem icon={User} label="Nome Completo" value={analysisResult.nome_completo} colorClass="text-blue-500 bg-blue-100" />
                    <InfoItem icon={Mail} label="Email" value={analysisResult.email} colorClass="text-red-500 bg-red-100" />
                    <InfoItem icon={Phone} label="Telefone" value={analysisResult.telefone} colorClass="text-green-500 bg-green-100" />

                    {/* Habilidades Técnicas */}
                    {analysisResult.habilidades_tecnicas && analysisResult.habilidades_tecnicas.length > 0 && (
                        <div className="flex items-start">
                            <SectionIcon icon={Code} colorClass="text-purple-500 bg-purple-100" />
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">Habilidades Técnicas</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {analysisResult.habilidades_tecnicas.map((skill, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Experiência Profissional */}
                    {analysisResult.experiencia_profissional && analysisResult.experiencia_profissional.length > 0 && (
                        <div className="flex items-start">
                             <SectionIcon icon={Briefcase} colorClass="text-yellow-500 bg-yellow-100" />
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">Experiência Profissional</h3>
                                <div className="space-y-4 mt-2">
                                    {analysisResult.experiencia_profissional.map((exp, index) => (
                                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                            <p className="font-semibold text-gray-800">{exp.cargo}</p>
                                            <p className="text-gray-600">{exp.empresa}</p>
                                            <p className="text-sm text-gray-500">{exp.periodo}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <button 
                  onClick={resetState} 
                  className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Analisar Outro Currículo
                </button>
              </div>
            )}
          </div>
          <p className="text-center mt-6 text-sm text-gray-500">
            Desenvolvido com ❤️ por Zeronauta.
          </p>
        </div>

        {/* Modal */}
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}