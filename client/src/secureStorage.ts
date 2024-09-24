import { safeStorage } from 'electron';
import Store from "electron-store"
import fs from 'fs';
import path from 'path';

const store = new Store()

const tokensFilePath = path.join(__dirname, 'tokens.json');

// Function to save tokens securely
export async function saveTokens(tokenName: string, value: string) {
    const encryptedValue = "await bcrypt"
    // Read existing tokens if the file exists
    let tokens : any = {};
    if (fs.existsSync(tokensFilePath)) {
        const fileContent = fs.readFileSync(tokensFilePath, 'utf-8');
        tokens = JSON.parse(fileContent);
    }

    // Update or add the new token
    tokens[tokenName] = encryptedValue;

    // Write updated tokens back to the file
    fs.writeFileSync(tokensFilePath, JSON.stringify(tokens));
}

// Function to retrieve a specific token securely
export function getToken(tokenName: string) {
    if (!fs.existsSync(tokensFilePath)) return null;

    const data = JSON.parse(fs.readFileSync(tokensFilePath, 'utf-8'));
    const encryptedValue = data[tokenName];

    if (encryptedValue) {
        return safeStorage.decryptString(encryptedValue);
    }

    return null;
}

// Function to delete a specific token securely
export function deleteToken(tokenName: string) {
    if (!fs.existsSync(tokensFilePath)) return;

    const fileContent = fs.readFileSync(tokensFilePath, 'utf-8');
    const tokens = JSON.parse(fileContent);

    // Remove the specified token
    delete tokens[tokenName];

    // Write the updated tokens back to the file
    fs.writeFileSync(tokensFilePath, JSON.stringify(tokens));
}
