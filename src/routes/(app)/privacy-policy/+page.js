/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
			title: `Privacy Policy`,
			content: [
                {
                    subtitle: `Information we collect`,
                    subcontent: `PiNKK Finger Print Voting System may collect personal information when you interact with our website or services. 
                    This information may include your name, email address, fingerprint data, and any other information you voluntarily provide.`
                },
                {
                    subtitle: `How we use your information`,
                    subcontent: `We use the information you provide to improve our services, communicate with you, and ensure the security and integrity of our voting system.`
                },
                {
                    subtitle: `Security`,
                    subcontent: `We are committed to ensuring the security of your information. We take reasonable measures to protect your personal information 
                    from unauthorized access or disclosure.`
                },
                {
                    subtitle: `Your choices`,
                    subcontent: `You have the right to access, correct, or delete your personal information. You may also choose to opt out of our services at any time.`
                },
                {
                    subtitle: `Changes to this policy`,
                    subcontent: `We may update this privacy policy to reflect changes to our practices or for other operational, legal, or regulatory reasons. 
                    Please check this page periodically for updates.`
                },
                {
                    subtitle: `Contact us`,
                    subcontent: `If you have any questions or concerns about our privacy policy, please contact us at registry.vnk@gov.fi.`
                }
            ],
	};
}
