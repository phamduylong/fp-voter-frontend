/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        title: `Terms And Conditions`,
        content: [
            {
                subtitle: `1. Acceptance of Terms`,
                subcontent: [
                                `By accessing or using the PiNKK fingerprint voting system ("the System"), 
                                you agree to comply with and be bound by these Terms and Conditions.`
                            ]
            },
            {
                subtitle: `2. Use of the System`,
                subcontent: [
                                `You must use the System in accordance with all applicable laws and regulations.`,
                                `Unauthorized use of the System is strictly prohibited.`
                            ]
            },
            {
                subtitle: `3. Privacy and Data Security`,
                subcontent: [
                                `We are committed to protecting your privacy. All personal and biometric data collected during the voting process 
                                will be handled in accordance with our Privacy Policy.`,
                                `The System employs robust security measures to protect against unauthorized access and data breaches.`
                            ]
            },
            {
                subtitle: `4. Voter Responsibilities`,
                subcontent: [
                                `Voters are responsible for maintaining the confidentiality of their authentication information.`,
                                `Any misuse of the System, including attempts to tamper with or manipulate the voting process, is strictly prohibited.`
                            ]
            },
            {
                subtitle: `5. Intellectual Property`,
                subcontent: [
                                `All intellectual property rights related to the System, including but not limited to software, trademarks, and design, are owned by PiNKK.`
                            ]
            },
            {
                subtitle: `6. Limitation of Liability`,
                subcontent: [
                                `PiNKK shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the System.`
                            ]
            },
            {
                subtitle: `7. Modifications`,
                subcontent: [
                                `PiNKK reserves the right to modify, suspend, or discontinue the System at any time without notice.`
                            ]
            },
            {
                subtitle: `8. Governing Law`,
                subcontent: [
                                `These Terms and Conditions shall be governed by and construed in accordance with the laws of European Union.`
                            ]
            },
            {
                subtitle: `9. Termination`,
                subcontent: [
                                `PiNKK reserves the right to terminate your access to the System for any reason without prior notice.`
                            ]
            },
            {
                subtitle: `10. Contact Information`,
                subcontent: [
                                `For any questions or concerns regarding these Terms and Conditions, please contact us at registry.vnk@gov.fi.`
                            ]
            },
        ]
    };
}
