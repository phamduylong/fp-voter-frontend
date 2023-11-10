import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ fetch }) {
    if(browser) {
        try {
            const response = await fetch(`https://fingerprint-voter-server.onrender.com/user/candidateVoted/id=${sessionStorage.getItem("userId")}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
                }
            });
            if(!response.ok) {
                const err = await response.json();
                throw error(response.status, { message: err.error });
            }
            if (response.status === 200) { const candidate = await response.json(); return { candidate: candidate }; }
            return;
        
        } catch(err) {
            if(err.status) throw error(err.status, { message: err });
            throw error(500, { message: err });
        }
    }
}
