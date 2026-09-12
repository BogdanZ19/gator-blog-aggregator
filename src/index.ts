import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands.js";
import { handlerLogin } from "./commands/users.js";
import { Config, readConfig, setUser } from "./config.js";

async function main() {
    // setUser("test");
    // const cfg: Config = readConfig();
    // console.log(cfg)

    let args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.log("usage: cli <command> [args...]");
        process.exit(1);
    }
    
    const commandName = args[0];
    const cmdArgs = args.slice(1);
    const cmdRegistry: CommandsRegistry = {};
    
    registerCommand(cmdRegistry, "login", handlerLogin);
    await runCommand(cmdRegistry, commandName, ...cmdArgs);

    process.exit(0)
}       

main();