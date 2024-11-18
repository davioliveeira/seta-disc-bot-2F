import { Command, Responder, ResponderType } from "#base";
import { createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, InteractionReplyOptions, StringSelectMenuBuilder, User } from "discord.js";
import { authenticator } from 'otplib';

new Command({
    name: "shopify-davi-2f",
    description: "Gere um código de autenticação para o cliente.",
    type: ApplicationCommandType.ChatInput,
    dmPermission:false, 
    run(interaction) {
        interaction.reply(authCodeMenu(interaction.user));
    }
});

new Responder({
    customId: "generate_auth_code/:timestamp",
    type: ResponderType.Button,
    cache: "cached",
    run(interaction, { timestamp }) {
        
        const currentTime = Date.now();
        const elapsedTime = currentTime - Number(timestamp);

        if (elapsedTime < 30000) {
            const remainingTime = Math.ceil((30000 - elapsedTime) / 1000);
            interaction.reply({ content: `ℹ️ - O código ainda é válido por ${remainingTime} segundos.`, ephemeral: true });
            return;
        }

        interaction.update(authCodeMenu(interaction.user as User));
    },
});

function authCodeMenu(user: User): any {
    //const secret = 'A7FNJYOA4XYJBPRKVVGUMC3PBBDJE6KM';
    const secret = 'IVXQTXLCXBY3CSK2GMTG2USILVW75KYG'
    const code = authenticator.generate(secret);
    
    const embed = createEmbed({
        author: createEmbedAuthor(user),
        color: "Random",
        description: `Código de Two Factor para esse Cliente:\n\n       ➡️ ${code}\n\n*_Este código é válido por 30 segundos._*`
    });

    const components = [
        createRow(
            new ButtonBuilder({
                customId: `generate_auth_code/${Date.now()}`,
                label: "Gerar Novamente",
                style: ButtonStyle.Primary
            })   
        )
    ];

    return {
        ephemeral: false,
        embeds: [embed],
        components
    } satisfies InteractionReplyOptions;
}