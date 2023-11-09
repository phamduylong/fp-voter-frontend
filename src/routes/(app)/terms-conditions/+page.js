import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        title: `Terms And Conditions`,
        content: `
                    <b>1. Acceptance of Terms</b><br>
                    By accessing or using the PiNKK fingerprint voting system ("the System"), you agree to comply with and be bound by these Terms and Conditions.
                    <br><br>

                    <b>2. Use of the System</b><br>
                    a. You must use the System in accordance with all applicable laws and regulations.<br>
                    b. Unauthorized use of the System is strictly prohibited.
                    <br><br>

                    <b>3. Privacy and Data Security</b><br>
                    a. We are committed to protecting your privacy. All personal and biometric data collected during the voting process will be handled in accordance with our Privacy Policy. <br>
                    b. The System employs robust security measures to protect against unauthorized access and data breaches.
                    <br><br>

                    <b>4. Voter Responsibilities</b><br>
                    a. Voters are responsible for maintaining the confidentiality of their authentication information. <br>
                    b. Any misuse of the System, including attempts to tamper with or manipulate the voting process, is strictly prohibited.
                    <br><br>

                    <b>5. Intellectual Property</b><br>
                    a. All intellectual property rights related to the System, including but not limited to software, trademarks, and design, are owned by PiNKK.
                    <br><br>

                    <b>6. Limitation of Liability</b><br>
                    a. PiNKK shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the System.
                    <br><br>

                    <b>7. Modifications</b><br>
                    a. PiNKK reserves the right to modify, suspend, or discontinue the System at any time without notice.
                    <br><br>

                    <b>8. Governing Law</b><br>
                    a. These Terms and Conditions shall be governed by and construed in accordance with the laws of European Union.
                    <br><br>

                    <b>9. Termination</b><br>
                    a. PiNKK reserves the right to terminate your access to the System for any reason without prior notice.
                    <br><br>

                    <b>10. Contact Information</b><br>
                    For any questions or concerns regarding these Terms and Conditions, please contact us at registry.vnk@gov.fi.
                    <br><br>`
    };
}
