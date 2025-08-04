import { Command, Responder, ResponderType } from "#base";
import { createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord";
import { 
    ApplicationCommandType, 
    ButtonBuilder, 
    ButtonStyle, 
    InteractionReplyOptions, 
    InteractionUpdateOptions, 
    User 
} from "discord.js";
import { authenticator } from 'otplib';

// Definindo explicitamente o tipo das chaves
const KEYS = {
    yampi:"UBP5D7MBB4XXE25BY7MA2C3MADAE4BDBA2DHUTIK3HLM2AEEL3AND56GTHLN3ILAO7K3QIN7F4ZVSE4VDBDRWIHCJCI2QAN4MQNQU6A",
    shopify01: "EQPYSZE4HXYGHAOTXIPDCANW7FO6L2PL",
    shopify02: "LH5MRYXKUSPZDFKPNROYHMTQ5EH4ZM2M",
    shopify03: "PXV5XGB2TMOSK55GMNS246NVLJ3CJNXR",
    shopify04: "62L2U67CINQQAFJ5S2IBJDCK23ZT2SF4",
    shopify05: "ISOUPDZWLHEHLHKIE65732BV4ARDEISU", 
    shopify06: "LUPWLM5OZEVEHLH3Z6GTORK2ZU7ZPWY5",
    shopify07: "4ZOBIRLCZIIJJXFBVFVIFWRLDDQPHQ5T", 
    "shopify-helper": "QPHO66FIPNSNRJX5HQXIB3P7OWNJVAVR", 
    "pagarme-cygnuss": "55AQGFYMKH4RMRAQ6FOMZEIOF3EE5T5Z&",
    "pagarme-consolatio": "VQITEJVVVX53XB6ZANAVNUXUESKRJZQX", 
    "dom-akada": "T43LYGMXQKM2YBZ3XTE2K4A2ULVV6HFQ", 
    "dom-kasamo": "YZSNAJRZUJBKX6AD2AC2GM37UMJ2BV2F",
    "vindi-manclub": "FAF4NW554IKUUB2QXGWTFDL664YG33K3",
    "pagarme-manclub": "4CHDBCFFVFLZIIMJRU3SMBUQDV4QUZPC",
    "mp-consolatio": "MVSNU43TN4O3XSFLOK3SCR5F2WNIPJLZ",
    "mp-manclub": "P6MLJDOI4OH2FBV7F2KSI3NNEGW5EH2F", 
    "cartpanda-seta": "EOVTX2GIA744L532",
    "mp-kombucha": "NQNH4OLEKGUE34EF3CWAQSSYVAOMMIY3", 
    "dom-boldies":"YTSNJMOTR56FXQMQK2KNCPSPNAJYHUXG",
    "mp-alma-selvagem": "7JII7E66CHMJFFW6V6OMCPO5OAK3NGS4", 
    "facebook-setara": "TJRL2N3MEKMAOLXHETFCTRT4BTORZ3NV", 
    nuvemshop: "KXHY6SCPV2L5M4ZD", 
    "mp-maria-tangerina": "JLFMWTYKSOJDUEYYB7Q5GKDX4MAGRF45", 
    "vtex-mormaii": "HE2TANBZIY4DMNRRGQZDMRCEIU",
    "pagarme-lilo":"FRWAH3BT4CVXCONQLBQ3BIHM3GFTVTUJ",
    "stripe-amelie": "nospercyrajlrsx5fkbfd7qw", 
    "pagarme-akada": "BOU2NTLEP6RD6YRRVDTENJHHIWPU5AEE", 
    "facebook-setasupmeta": "YKWU6H5ECQ7AXIOKYQN5NVSXQ6LUAO5V", 
    "facebook-letvirtual": "YOBVRZEOERK5RDOSNCD2ROAOW7YF6QIW",
    "facebook-emersondigital": "KGJ5XSI7LIGNDROJ6G46F6ZW7P5JUZKT",
    "facebook-emersondigital-2": "GDN54QSQGS5FC4UVHPTMTMOEIDYMPSXS",
    "nuvemshop-realleto": "TDSYJWMRZCAHKO35",
    "mp-mimou": "WEAWLTT5B34BZDOPHO3QTB6X2PKDLJE7" ,
    "nuvemshop-qualitysono": "QWVY4PIFD27KAXZU",
    "mp-alleganza": "MP72LMVGLCJZQ4CZCLLYHTRUBQDTPZON",
    "mp-mundostreet": "GGPEHKKDSAZ3GBNSKVBU4SMHUTDOKHQS",
    "mp-realleto": "IPUNVIFIODCAETVCD54XMSLAKPSQHN6U",
    "pagarme-boldies": "HNL4VHZGWNQ2HDCCKVSLEF2BHVEDTPTO",
    "nuvemshop-mariatangerina" : "O6MZ2ANLDGJT4P5C"
} as const;

type ShopifyCommandName = keyof typeof KEYS;

// Criando comandos dinamicamente
Object.keys(KEYS).forEach((commandName) => {
    new Command({
        name: commandName as ShopifyCommandName, // Tipagem explícita
        description: `Gere um código de autenticação para a loja ${commandName}.`,
        type: ApplicationCommandType.ChatInput,
        dmPermission: false,
        run(interaction) {
            const key = KEYS[commandName as ShopifyCommandName];
            if (!key) {
                interaction.reply({
                    content: "⚠️ - Chave de autenticação não encontrada para este comando.",
                    ephemeral: true,
                });
                return;
            }
            interaction.reply(authCodeMenu(interaction.user, key, commandName as ShopifyCommandName));
        },
    });
});

// Responder para regenerar o código
new Responder({
    customId: "generate_auth_code/:timestamp/:commandName",
    type: ResponderType.Button,
    cache: "cached",
    run(interaction, { timestamp, commandName }) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - Number(timestamp);

        if (elapsedTime < 30000) {
            const remainingTime = Math.ceil((30000 - elapsedTime) / 1000);
            interaction.reply({ content: `ℹ️ - O código ainda é válido por ${remainingTime} segundos.`, ephemeral: true });
            return;
        }

        const key = KEYS[commandName as ShopifyCommandName];
        if (!key) {
            interaction.reply({
                content: "⚠️ - Chave de autenticação não encontrada para este comando.",
                ephemeral: true,
            });
            return;
        }
        
        // Ajuste para usar `InteractionUpdateOptions` no método `update`
        interaction.update(authCodeMenu(interaction.user, key, commandName as ShopifyCommandName) as InteractionUpdateOptions);
    },
});

// Função para criar o menu de autenticação
function authCodeMenu(user: User, secret: string, commandName: ShopifyCommandName): InteractionReplyOptions {
    const code = authenticator.generate(secret);

    const embed = createEmbed({
        author: createEmbedAuthor(user),
        color: "Random",
        description: `Código de Two Factor para a loja **${commandName}**:\n\n       ➡️ ${code}\n\n*_Este código é válido por 30 segundos._*`,
    });

    const components = [
        createRow(
            new ButtonBuilder({
                customId: `generate_auth_code/${Date.now()}/${commandName}`,
                label: "Gerar Novamente",
                style: ButtonStyle.Primary,
            })
        ),
    ];

    return {
        ephemeral: false,
        embeds: [embed],
        components,
    } satisfies InteractionReplyOptions;
}
