/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ fetch }) {
    try {
        const response = await fetch("http://localhost:8080/candidate/all", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` 
            }
        });
        const candidates = await response.json();
        return { candidates: [ ...candidates ] };
    } catch(err) {
    }
}
