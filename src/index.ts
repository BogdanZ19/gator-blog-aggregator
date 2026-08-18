import { Config, readConfig, setUser } from "./config.js";

function main() {
    setUser("test");
    const cfg: Config = readConfig();
    console.log(cfg)
}

main();