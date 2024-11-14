import { Command } from "#base";
import { authenticator } from 'otplib';
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "shopify-davi-2f",
    description: "Gere um código de autenticação para o cliente.",
    type: ApplicationCommandType.ChatInput,
    dmPermission: false, 
    async run(interaction) {
        // Obter o nome do membro
        const memberName = interaction.member.displayName;

        // Defina sua chave secreta para gerar o código TOTP
        const secret: string = 'A7FNJYOA4XYJBPRKVVGUMC3PBBDJE6KM'; 

        // Gerar o código TOTP
        const code: string = authenticator.generate(secret);

        // Responder ao usuário
        await interaction.reply(`Certo ${memberName}, aqui está o código de Auth para esse Cliente:\n\n${code}`);
    }
});
