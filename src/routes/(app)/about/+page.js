import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ fetch }){
    try {
        const response = await fetch("https://api.github.com/repos/phamduylong/fp-voter-server/contributors", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!response.ok) {
            throw error(response.status, { status: response.status, message: response.statusText });
        }
        if(response.status === 200) {
            const contributors = await response.json();
            const res = [];
            contributors.forEach(c => {
                fetch(c.url).then(tmpRes => tmpRes.json()).then(contributor => res.push({name: contributor.login, img: contributor.avatar_url, message: contributor.bio}));
            });
            console.log("Loop completed")
            return { contributors: res };
        }

    } catch(err) {
        if(err.status && err.message) throw error(err.status, { status: err.status, message: err.message });
        throw error(500, { status: 500, message: "Server failure while loading page. Please try again." });
    }
}
