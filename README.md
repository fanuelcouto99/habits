# Habits

Aplicação desenvolvida durante o NLW Setup, usando React, NodeJs e React Native.

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/logo.svg" width="300">
</p>

<hr>

<p align="center">
 <a href="#scroll-sobre-o-projeto">Sobre o projeto</a> •
 <a href="#pencil-como-usar-na-web">Como usar na web</a> •
 <a href="#pencil-como-usar-no-mobile">Como usar no mobile</a> •
 <a href="#rocket-executando-o-projeto">Instalação</a> •
</p>

### :scroll: **Sobre o projeto**

<p>Projeto criado para aprendizagem, visando a criação de uma aplicação para monitoramento de hábitos do usuário, para assim ter um controle diário da rotina.</p>
<p>Ao criar um novo hábito, o usuário pode selecionar em quais dias da semana ele ficará disponível para marcar se o mesmo foi completado ou não.</p> 
<p>Outro ponto é o controle por datas, onde não é possível marcar como completado um hábito em data passada. Assim como as datas futuras, também não ficam disponíveis para visualização.</p>
<p>Para o desenvolvimento do projeto, foram criadas três aplicações, a primeira usando NodeJs para a construção do servidor backend, a segunda usando React para a criado da aplicação web.</p> 
<p>E por fim, usando o expo foi feita a aplicação para mobile.
No projeto foi usado também CSS, criado especificamente para ele, usando TailwindCSS.</p>

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/main.png">
</p>

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/detail.png">
</p>

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/new.png">
</p>

### :pencil: **Como usar na web**

Navegando pela tela principal e acessando os hábitos já criados para atualização de status.

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/navigate-main.gif">
</p>

Criando um novo hábito.

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/new-habit.gif">
</p>

<hr>

### :pencil: **Como usar no mobile**

Navegando pela tela principal e acessando os hábitos já criados para atualização de status.

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/navigate-main-mobile.gif" width="400" height="800">
</p>

Criando um novo hábito.

<p align="center">
   <img src="https://github.com/fanuelcouto99/habits/blob/main/img/new-habit-mobile.gif">
</p>

<hr>

### :rocket: **Executando o projeto**

<p>Primeiramente é preciso instalar as dependências necessárias para o projeto, para isso basta acessar as pastas server e web pelo terminal, e em ambas, executar o install.</p>

```bash
  npm install
```

### :rocket: Executando o projeto para mobile

<p>Para a aplicação mobile também é preciso instalar as dependências necessárias, para isso basta acessar a pasta mobile pelo terminal, e executar o install.</p>

```bash
  expo install
```

<hr>

### :factory: Executando o servidor (Aplicação em NodeJs)

<p>Acessar a pasta server e alterar o arquivo .env com as configurações de base de dados local. Para o projeto está configurado uma base de dados em Sqlite3, disponibilizada junto com o projeto.</p> 

<p>Para a conexão com o banco de dados, foi utilizado o Prisma, entretanto ele também suporta outros tipos de banco de dados. Mais informações na documentação http://prisma.io/</p>

<!-- <p align="center">
   <img src="https://github.com/fanuelcouto99/rickAndMorty/blob/main/img/knexfile.png">
</p> -->

<p>Configurado a base de dados, ou usado a que está no projeto, só será preciso executar o comando abaixo na pasta server, para que o servidor fique rodando, ele funciona na porta 3333</p>

```bash
  npm run dev
```

### :computer: Executando o Frontend (React)

<p>Na aplicação react só será preciso executar o start na pasta web, e a aplicação será carregada.</p>

```bash
  npm run dev
```

### :iphone: Executando o Mobile (Aplicação em Expo)

<p>Na aplicação mobile só será preciso executar o start na pasta mobile, e a aplicação será carregada.</p>

```bash
  expo start
```