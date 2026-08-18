import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';

export type Config = {
    dbUrl: string;
    currentUserName: string;
};

export function setUser(userName: string) {
    const cfg: Config = readConfig();
    cfg.currentUserName = userName;

    writeConfig(cfg);
}

function validateConfig(rawConfig: any) {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url field is not set correctly")
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name ?? "",
    };

    return config;
}

export function readConfig(): Config {
    const data = fs.readFileSync(getConfigFilePath(), 'utf-8');
    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
    const configFileName = ".gatorconfig.json";
    const homeDir = os.homedir();

    return path.join(homeDir, configFileName);
}

function writeConfig(config: Config): void {
    const rawConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName,
    }

    const data = JSON.stringify(rawConfig)

    fs.writeFileSync(getConfigFilePath(), data, { encoding: "utf8" });
}
