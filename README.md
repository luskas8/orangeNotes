<h1 align="center">
   Orange Notes
</h1>

## 🎯 Objetivos

Uma plataforma onde as pessoas podem organizar suas ideias, atividades pendentes ou concluídas, anotações do dia a dia, e ainda podem ter um relógio de pomodoro para ajudar nas atividades rotineiras.

## Onde posso encontrar o __Orange Notes__?

Você pode acessalo <a href="http://orange-notes-six.vercel.app/" targetk="_blank"></a>

## 💻 Tecnologias

- NodeJS
- React
- Vite
- Google Firebase
- Typescript

## ♿ Assecibilidade

Para ser mais acessível a plataforma tende a ser adaptiva ao dispositivo que o usuário estiver usando, além de ter suporte para três idiomas inicialmente `inglês, espanhol e português`, podendo ter mais idiomas suportados futuramente.

## 🤔 Como instalar?

Não é nenhum bicho de 7 cabeças, mas você precisa antes de mais nada ter instalado no seu computador o [Node](https://nodejs.dev/learn/how-to-install-nodejs) e [Git](https://git-scm.com/downloads);
Após esse primeiro passo está na hora de ter o código em si na sua máquina, abrindo o terminal de comando execute os seguintes comandos:

```sh
git clone https://github.com/luskas8/orangeNotes.git
cd orangeNotes
npm install
npm run dev
```

Caso queira testar em rede, use o comando, lembrando que o dispositivo que usar deve está na mesma rede que o computador que estiver rodando o código:

```sh
npm run dev:net
```

#### _Observação_

Para utilizar seu banco de dados terá de alterar, o projeto foi inicialmente configurado e criado para se utilizar do __Google Firebase__, onde as credenciais podem ser reconfiguradas em `src/.env`
