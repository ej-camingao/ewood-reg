import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const GOOGLE_CREDENTIALS = {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix private key formatting
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
};

const SHEET_ID = process.env.SHEET_ID;

export async function POST({ request }) {
    const body = await request.json();

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: GOOGLE_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A:G',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[
                    body.name,
                    body.age,
                    body.birthday,
                    body.gender,
                    body.contactNumber,
                    body.facebookName,
                    new Date().toISOString()
                ]],
            },
        });

        return new Response(JSON.stringify({ 
            success: true,
            response: response.data
        }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error details:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: error.message,
            details: error.errors
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}