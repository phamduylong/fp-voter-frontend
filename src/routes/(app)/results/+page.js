import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ fetch }) {
    try {
        const response = await fetch(`https://fingerprint-voter-server.onrender.com/result/all`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!response.ok) {
            const err = await response.json();
            throw error(response.status, { message: err.error });
        }
        if (response.ok) {
            if(response.status === 204) return {result: []};
            const result =  await response.json();
            return { result: result };
        }
        return [];
    
    } catch(err) {
        if(err.status) throw error(err.status, { message: err });
        throw error(500, { message: err });
    }
    
}
