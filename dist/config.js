import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
export function setUser(newUserName) {
    let cfg = readConfig(getConfigFilePath());
    cfg.currentUserName = newUserName;
    writeConfig(cfg);
}
export function readConfig(filePath) {
    let rawJson;
    try {
        rawJson = fs.readFileSync(getConfigFilePath(), 'utf-8');
    }
    catch (err) {
        console.log(err);
        throw new Error("Failed to read config file");
    }
    const cfg = validateConfig(JSON.parse(rawJson));
    if (cfg != null) {
        return cfg;
    }
    else {
        throw new Error("Config file is not valid");
    }
}
function getConfigFilePath() {
    return path.join(os.homedir(), ".gatorconfig.json");
}
function writeConfig(cfg) {
    fs.writeFile(getConfigFilePath(), JSON.stringify(cfg), err => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("config written successfully");
        }
    });
}
function validateConfig(rawConfig) {
    if (rawConfig && typeof rawConfig === 'object' && 'dbUrl' in rawConfig) {
        return rawConfig;
    }
    else {
        return null;
    }
}
