import React, { useState, useRef } from 'react';
import { FileUp, CheckCircle, BrainCircuit, Star, Search, Lightbulb, X } from 'lucide-react';

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
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setSelectedFile(file);
      setFileName(file.name);
      setError(null);
    } else {
      setSelectedFile(null);
      setFileName('');
      setError("Por favor, selecione um arquivo PDF ou DOCX.");
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
    formData.append('file', selectedFile);

    try {
      // Simulação de chamada de API
      // const response = await fetch('https://analisador.zeronauta.com.br/analisar', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Falha na análise do currículo. Tente novamente.');
      // }

      // const data = await response.json();

      // ** Usando dados mockados para demonstração, já que a API real pode não estar acessível **
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay da rede
      const mockData = {
        candidateName: "João da Silva",
        desiredRole: "Desenvolvedor Full-Stack Sênior",
        keywords: ["React", "Node.js", "TypeScript", "AWS", "SQL", "Docker"],
        strengths: "Vasta experiência em desenvolvimento de aplicações web escaláveis com React e Node.js. Sólidos conhecimentos em arquitetura de microsserviços e práticas DevOps.",
        suggestionsForRecruiter: "Candidato com perfil técnico forte e alinhado com as tecnologias mais modernas do mercado. Recomenda-se focar a entrevista em desafios de arquitetura e escalabilidade."
      };
      
      setAnalysisResult(mockData);
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
                <p className="mt-3 text-lg text-gray-600">Envie seu PDF ou Word e receba um resumo automático para recrutadores.</p>

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
                    accept=".pdf,.docx"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <FileUp className="h-12 w-12 text-gray-400 mb-4" />
                    {fileName ? (
                       <p className="text-blue-600 font-semibold">{fileName}</p>
                    ) : (
                       <p className="text-gray-500">Clique para selecionar seu currículo</p>
                    )}
                    <p className="text-sm text-gray-400 mt-1">PDF ou DOCX</p>
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
                  {/* Nome do Candidato */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-blue-600">Nome do Candidato</p>
                    <p className="text-xl text-gray-800">{analysisResult.candidateName}</p>
                  </div>

                  {/* Cargo Desejado */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-blue-600">Cargo Desejado</p>
                    <p className="text-xl text-gray-800">{analysisResult.desiredRole}</p>
                  </div>
                  
                  {/* Palavras-chave */}
                  <div className="flex items-start">
                    <SectionIcon icon={Search} colorClass="text-purple-500 bg-purple-100" />
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Palavras-chave</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {analysisResult.keywords.map((keyword, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{keyword}</span>
                            ))}
                        </div>
                    </div>
                  </div>
                  
                  {/* Pontos Fortes */}
                  <div className="flex items-start">
                    <SectionIcon icon={Star} colorClass="text-yellow-500 bg-yellow-100" />
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Pontos Fortes</h3>
                        <p className="text-gray-600 mt-1">{analysisResult.strengths}</p>
                    </div>
                  </div>

                  {/* Sugestões */}
                  <div className="flex items-start">
                    <SectionIcon icon={Lightbulb} colorClass="text-green-500 bg-green-100" />
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Sugestões para o Recrutador</h3>
                        <p className="text-gray-600 mt-1">{analysisResult.suggestionsForRecruiter}</p>
                    </div>
                  </div>
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
            Desenvolvido com ❤️ por Gemini.
          </p>
        </div>

        {/* Modal */}
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}
