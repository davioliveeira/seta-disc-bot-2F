import { QuickDB } from "quick.db";
import { GuildData } from "./interfaces/GuildData.js";
import { MemberData } from "./interfaces/MemberData.js";
import { ClientData } from "./interfaces/ClientData.js";
import { RequestData } from "./interfaces/RequestData.js";

const filePath = rootTo("localdb.sqlite");

const db = {
    guilds: new QuickDB<GuildData>({ filePath, table: "guilds" }),
    members: new QuickDB<MemberData>({ filePath, table: "members" }),
    clientes: new QuickDB<ClientData>({ filePath, table: "clientes" }), 
    solicitacoes: new QuickDB<RequestData>({ filePath, table: "solicitacoes" }) 
};

export { db };