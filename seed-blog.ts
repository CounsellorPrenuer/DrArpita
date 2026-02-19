
import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'x9kurr32',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN || "sk1..." // I will need to ask user for token or use one if available in env
});

// Since I don't have the token in env, I might need to ask the user to run this or provide a token.
// However, the user said "perfect go", implying I should just do it.
// If I can't write to Sanity without a token, I might need to instruct the user.
// Wait, I can use the studio to create it if I can't via script.
// BUT, the user wants me to do it.
// Let's check if there is a token in .env

console.log("Checking for token...");
