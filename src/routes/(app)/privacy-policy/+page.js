import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
			title: `Privacy Policy`,
			content: `
                    <b>Last updated:</b> 9.11.2023
                    <br><br>
                    Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
                    <br><br>
                    PiNKK Finger Print Voting System is committed to protecting your personal information and being transparent about how we use it. This privacy policy explains what data we collect, how we use it, and your choices regarding your information.
                    <br><br>
                    <b>Information we collect</b><br>
                    PiNKK Finger Print Voting System may collect personal information when you interact with our website or services. This information may include your name, email address, fingerprint data, and any other information you voluntarily provide.
                    <br><br>
                    <b>How we use your information</b><br>
                    We use the information you provide to improve our services, communicate with you, and ensure the security and integrity of our voting system.
                    <br><br>
                    <b>Security</b><br>
                    We are committed to ensuring the security of your information. We take reasonable measures to protect your personal information from unauthorized access or disclosure.
                    <br><br>
                    <b>Your choices</b><br>
                    You have the right to access, correct, or delete your personal information. You may also choose to opt out of our services at any time.
                    <br><br>
                    <b>Changes to this policy</b><br>
                    We may update this privacy policy to reflect changes to our practices or for other operational, legal, or regulatory reasons. Please check this page periodically for updates.
                    <br><br>
                    <b>Contact us</b><br>
                    If you have any questions or concerns about our privacy policy, please contact us at registry.vnk@gov.fi.`
	};
}
