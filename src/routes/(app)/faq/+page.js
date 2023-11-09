import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        title: `Frequently Asked Questions`,
        content: `
                <b>What is a fingerprint voting system?</b><br>
                A fingerprint voting system is an advanced voting technology that uses biometric fingerprint recognition to verify the identity of voters. It enhances the security and accuracy of the voting process.
                <br><br>

                <b>How does the fingerprint voting system work?</b><br>
                The system captures and analyzes unique features of an individual's fingerprint, creating a secure and verifiable link between the voter and their vote. This ensures that only eligible voters can cast their ballots.
                <br><br>

               <b> Is it safe and secure?</b><br>
                Yes, our fingerprint voting system prioritizes security. The biometric data is encrypted and stored securely, adhering to the highest standards of data protection. Additionally, the system undergoes regular security audits to identify and address potential vulnerabilities.
                <br><br>

                <b>Can the system be fooled by fake fingerprints?</b><br>
                Our system is designed to detect and reject fake fingerprints. Advanced algorithms and sensors are employed to distinguish between genuine and forged prints, ensuring the integrity of the voting process.
                <br><br>

                <b>What if someone's fingerprint is not recognized?</b><br>
                In such cases, alternative methods of identification, such as a government-issued ID, may be used to verify the voter's identity. This ensures that everyone has a fair opportunity to participate in the voting process.
                <br><br>

                <b>How user-friendly is the system?</b><br>
                The system is designed with user convenience in mind. The fingerprint scanning process is quick and intuitive, making it accessible to voters of all ages and technological backgrounds.
                <br><br>

                <b>Can voters review or amend their choices after their fingerprints have been scanned?</b><br>
                Yes, our system allows voters a final review of their choices on the electronic ballot after the fingerprint verification. If they wish to make any changes, they can do so before submitting their vote. This additional step ensures accuracy and gives voters the opportunity to verify their selections before finalizing the voting process.
                <br><br>

                <b>What happens in case of a power outage or technical failure?</b><br>
                The system is equipped with backup power sources and contingency plans to ensure continuous operation. Technical support teams are also on standby to address any issues promptly.
                <br><br>

                <b>How do you protect voter privacy?</b><br>
                Voter privacy is a top priority. The system only stores the necessary biometric data for identification purposes, and all data is anonymized. Strict privacy policies are in place to safeguard the confidentiality of individual votes.
                <br><br>

                <b>Is the fingerprint voting system cost-effective for electoral bodies?</b><br>
                While the initial setup may involve some investment, the long-term benefits, including increased security, efficiency, and reduced administrative costs, make it a cost-effective solution for electoral bodies committed to modernizing their voting processes.
                <br><br>`
    };
}