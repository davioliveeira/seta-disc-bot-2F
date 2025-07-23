# Awesome Bot Base

> [!NOTE] 
> This project **base** can be generated using the [Constant CLI](https://github.com/rinckodev/constatic)
> See the full documentation for this base by accessing: https://constatic-docs.vercel.app/docs/discord/start

This is the most complete discord bot base you've ever seen! Developed by [@rinckodev](https://github.com/rinckodev), this project uses typescript in an incredible way to provide complete structures and facilitate the development of your discord bot.

> [!WARNING]
> [NodeJs](https://nodejs.org/en) version required: 20.12 or higher

## Scripts

- `dev`: running bot in development
- `build`: build the project
- `watch`: running in watch mode
- `start`: running the compiled bot

## Como adicionar um novo comando

Siga o passo a passo detalhado abaixo sempre que precisar adicionar um novo comando ao projeto:

1. **Atualize o comando**
   - Edite ou adicione o comando desejado no arquivo:
     ```
     src/discord/commands/public/Generate2FCode.ts
     ```
   - Faça as alterações necessárias no código para implementar ou modificar o comando.

2. **Salve as alterações**
   - Certifique-se de salvar o arquivo após editar.

3. **Compile o projeto**
   - No terminal, execute o comando abaixo para compilar o projeto:
     ```sh
     npm run build
     ```
   - Isso irá gerar os arquivos compilados na pasta `dist`.

4. **Faça o upload para o Discloud**
   - Utilize a extensão do Discloud no VSCode para fazer o upload do projeto.
   - Siga as instruções da extensão para garantir que o bot seja atualizado corretamente na plataforma.

5. **Faça o commit das alterações**
   - No terminal, confira os arquivos modificados:
     ```sh
     git status
     ```
   - Adicione os arquivos alterados ao commit:
     ```sh
     git add .
     ```
   - Faça o commit com uma mensagem descritiva (exemplo):
     ```sh
     git commit -m "feat: adiciona novo comando 2FA ao bot"
     ```
   - (Opcional) Envie as alterações para o repositório remoto:
     ```sh
     git push origin nome-da-sua-branch
     ```

---

## Structures

- [Commands](https://constatic-docs.vercel.app/docs/discord/commands)
- [Responder](https://constatic-docs.vercel.app/docs/discord/responders)
- [Events](https://constatic-docs.vercel.app/docs/discord/events)