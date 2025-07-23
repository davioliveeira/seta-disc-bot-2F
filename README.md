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

Siga o passo a passo abaixo sempre que precisar adicionar um novo comando ao projeto:

1. Atualize o comando dentro do arquivo `src/discord/commands/public/Generate2FCode.ts` conforme necessário.
2. Salve a alteração no arquivo.
3. No terminal, execute o comando:
   ```sh
   npm run build
   ```
4. Faça o upload do projeto usando a extensão do Discloud.
5. Faça o commit das alterações no repositório Git.

---

## Structures

- [Commands](https://constatic-docs.vercel.app/docs/discord/commands)
- [Responder](https://constatic-docs.vercel.app/docs/discord/responders)
- [Events](https://constatic-docs.vercel.app/docs/discord/events)