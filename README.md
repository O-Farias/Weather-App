# Weather App ☁️☀️

Este é um aplicativo de clima desenvolvido com React e Vite, que permite aos usuários verificar a previsão do tempo atual e a previsão para os próximos 5 dias. O aplicativo inclui funcionalidades como geolocalização, animações de gradiente, notificações e gráficos de previsão do tempo.

## Funcionalidades

- Previsão do tempo atual
- Previsão do tempo para os próximos 5 dias
- Geolocalização para obter a previsão do tempo com base na localização atual do usuário
- Animação de gradiente no fundo e no título
- Notificações de erro
- Gráficos de previsão do tempo

## Tecnologias Utilizadas

- React
- Vite
- React Spring (para animações)
- React Toastify (para notificações)
- React Icons (para ícones)
- OpenWeather API (para dados de previsão do tempo)

## Pré-requisitos

- Node.js instalado
- NPM ou Yarn instalado

## Instalação

1. Clone o repositório para o seu ambiente local:

   ```bash
   git clone https://github.com/O-Farias/Weather-App.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd weather-app
   ```

3. Instale as dependências do projeto:
   ```bash
   npm install
   ```
   ou, se estiver usando Yarn:
   ```bash
   yarn install
   ```

## Configuração da API

Para utilizar a OpenWeather API, você precisará de uma chave de API. Siga os passos abaixo para configurar a chave de API no projeto:

1. Crie uma conta na [OpenWeather](https://openweathermap.org/) e obtenha uma chave de API.
2. Crie um arquivo `.env` na raiz do projeto e adicione a seguinte linha, substituindo `YOUR_API_KEY` pela sua chave de API:
   ```env
   REACT_APP_OPENWEATHER_API_KEY=YOUR_API_KEY
   ```

## Execução do Projeto

Para executar o projeto em modo de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
```

ou, se estiver usando Yarn:

```bash
yarn dev
```

Abra http://localhost: no navegador para visualizar o aplicativo.

## Estrutura do Projeto

- `src/:` Contém todo o código-fonte do projeto
  - `components/:` Contém os componentes React
  - `SearchBar.jsx:` Componente para a barra de pesquisa
  - `WeatherCard.jsx:` Componente para exibir a previsão do tempo atual
  - `WeatherDetails.jsx:` Componente para exibir detalhes adicionais da previsão do tempo
  - `WeatherChart.jsx:` Componente para exibir o gráfico de previsão do tempo
  - `services/:` Contém os serviços para chamadas de API
  - `weatherService.js:` Contém funções para buscar dados da OpenWeather API
  - `App.jsx:` Componente principal do aplicativo
  - `index.jsx:` Ponto de entrada da aplicação
- `public/:` Contém arquivos estáticos e a imagem de favicon
- `.env:` Arquivo de configuração para variáveis de ambiente
- `App.css:` Estilos globais do aplicativo
- `index.css:` Estilos adicionais

## Estilização

O aplicativo utiliza App.css e index.css para a estilização. Além disso, são utilizadas bibliotecas de ícones e animações para melhorar a interface do usuário.

## Animações

As animações de gradiente foram implementadas utilizando a biblioteca react-spring para uma experiência de usuário mais dinâmica.

## Notificações

O aplicativo usa react-toastify para exibir notificações de erro ao usuário.
