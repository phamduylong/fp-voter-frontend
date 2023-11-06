import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ fetch }) {
    if(browser) {
        try {
            const response = await fetch("https://fingerprint-voter-server.onrender.com/candidate/all", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(!response.ok) {
                throw error(response.status, { status: response.status, message: response.statusText });
            }
            const candidates = await response.json();
            return { candidates: [ ...candidates ] };
        
        } catch(err) {
            throw error(err.status, { status: err.status, message: err.body.message });
        }
    }
}
