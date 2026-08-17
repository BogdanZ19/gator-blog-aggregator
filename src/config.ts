import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { config } from 'node:process';

type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser() {

}

export function readConfig(): Config {
    const cfg = JSON.parse(getConfigFilePath());
    return cfg;
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
    
}

function writeConfig(cfg: Config): void {
    fs.writeFile(getConfigFilePath(), JSON.stringify(cfg), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("config written successfully")
        }
    });
}

// function validateConfig(rawConfig: any): Config {
//     return 
// }