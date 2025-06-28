# 🚀 Analisador de Currículo com IA

Este projeto é uma aplicação web moderna construída com React e Vite, projetada para analisar currículos em formato PDF ou DOCX. A ferramenta extrai informações-chave do documento e as apresenta de forma resumida, ideal para otimizar o processo de triagem de recrutadores.

![Imagem da tela inicial do projeto](https://placehold.co/800x450/F3F4F6/3B82F6?text=Analisador+de+Currículo)

---

## ✨ Funcionalidades

-   **Upload Simples:** Interface limpa para upload de arquivos `.pdf` e `.docx`.
-   **Análise com IA:** Integração com uma API backend (`https://analisador.zeronauta.com.br/analisar`) para processar o currículo.
-   **Visualização Clara:** Exibição organizada dos dados extraídos:
    -   Nome do Candidato
    -   Cargo Desejado
    -   Palavras-chave
    -   Pontos Fortes
    -   Sugestões para o Recrutador
-   **Feedback Visual:** Indicadores de carregamento durante a análise e modais de sucesso.
-   **Design Responsivo:** Totalmente funcional em desktops e dispositivos móveis.

---

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** [React](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Estilização:** [TailwindCSS](https://tailwindcss.com/)
-   **Ícones:** [Lucide React](https://lucide.dev/)
-   **Deploy:** [Vercel](https://vercel.com/)

---

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto em sua máquina local, siga os passos abaixo.

### Pré-requisitos

Antes de começar, você precisará ter o Node.js e o npm instalados em sua máquina.

1.  **Instale o Node.js:**
    * Acesse o [site oficial do Node.js](https://nodejs.org/en).
    * Baixe a versão **LTS** (Long Term Support), que é a mais estável e recomendada.
    * Execute o instalador e siga as instruções, mantendo as opções padrão. O `npm` (Node Package Manager) é instalado automaticamente junto com o Node.js.

2.  **Verifique a instalação (Opcional):**
    * Abra seu terminal e execute os seguintes comandos para confirmar que a instalação foi bem-sucedida:
    ```bash
    node -v
    npm -v
    ```
    * Você deverá ver as versões do Node.js e do npm, respectivamente.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/DougPomp/front-end-analisador-de-curriculo.git](https://github.com/DougPomp/front-end-analisador-de-curriculo.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd front-end-analisador-de-curriculo
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Execução

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

2.  **Abra o navegador:**
    Acesse `http://localhost:5173` para ver a aplicação em funcionamento.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
