import { error } from '@sveltejs/kit';
import { PAT } from '$env/static/private';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ fetch }){
    try {
        const response = await fetch("https://api.github.com/repos/phamduylong/fp-voter-server/contributors", {
            headers: {
                "Authorization": `Bearer ${PAT}`,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok) {
            throw error(response.status, { status: response.status, message: response.statusText });
        }
        const res = [];
        if(response.status === 200) {
            const contributors = await response.json();
            return { contributors: contributors.map(c => { return { name: c.login, img: c.avatar_url, message: "" } }) };
        }

    } catch(err) {
        if(err.status && err.message) throw error(err.status, { status: err.status, message: err.message });
        throw error(500, { status: 500, message: "Server failure while loading page. Please try again." });
    }
}
