export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
            <div className="md:max-w-4xl w-full mx-auto md:py-16 md:px-4 p-2 text-white">
                <h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
                
                <div className="space-y-8 text-gray-200 leading-relaxed">
                    <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <p className="text-sm text-gray-300 mb-6">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                        </p>
                        
                        <p className="mb-6">
                            Welcome to Scriptioo! These Terms and Conditions (&quot;Terms&quot;) govern your use of our video script AI generator service. By accessing or using Scriptioo, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our service.
                        </p>
                    </div>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">1. Service Description</h2>
                        <p className="mb-4">
                            Scriptioo is an AI-powered video script generator that helps users create engaging scripts for YouTube, TikTok, and Instagram. Our service allows you to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Generate video scripts based on your ideas and prompts</li>
                            <li>Select different video tones and platforms</li>
                            <li>Upload script templates as references (optional)</li>
                            <li>Copy generated scripts and download them in DOCX format</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">2. Acceptance of Terms</h2>
                        <p>
                            By using Scriptioo, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms constitute a legally binding agreement between you and Scriptioo.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">3. Use of Service</h2>
                        
                        <h3 className="text-xl font-medium mb-3 text-blue-200">3.1 Permitted Use</h3>
                        <p className="mb-4">
                            You may use Scriptioo for any lawful purpose to generate video scripts for your content creation needs. The generated scripts are yours to use freely for any purpose, including commercial use.
                        </p>
                        
                        <h3 className="text-xl font-medium mb-3 text-blue-200">3.2 File Upload Requirements</h3>
                        <p className="mb-4">
                            When uploading script templates:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Only DOCX files are accepted</li>
                            <li>Maximum file size is 1 MB</li>
                            <li>Files are temporarily processed and immediately deleted after script generation</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">4. Intellectual Property Rights</h2>
                        
                        <h3 className="text-xl font-medium mb-3 text-blue-200">4.1 Generated Scripts</h3>
                        <p className="mb-4">
                            You retain full ownership and rights to the scripts generated by Scriptioo. You may use, modify, distribute, and commercialize the generated content without restriction.
                        </p>
                        
                        <h3 className="text-xl font-medium mb-3 text-blue-200">4.2 Service Ownership</h3>
                        <p className="mb-4">
                            Scriptioo and its underlying technology, including but not limited to the website, software, algorithms, and user interface, are owned by us and are protected by copyright, trademark, and other intellectual property laws.
                        </p>
                        
                        <h3 className="text-xl font-medium mb-3 text-blue-200">4.3 User Content</h3>
                        <p>
                            You retain ownership of any content you provide to Scriptioo, including your prompts, ideas, and uploaded templates. You grant us a temporary license to process this content solely for the purpose of generating your requested scripts.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">5. Disclaimers and Warranties</h2>
                        
                        <h3 className="text-xl font-medium mb-3 text-blue-200">5.1 AI-Generated Content</h3>
                        <p className="mb-4">
                            Scriptioo uses artificial intelligence to generate scripts. While we strive to provide high-quality outputs, we cannot guarantee the accuracy, completeness, or quality of the generated scripts. The AI may produce:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                            <li>Factually incorrect information</li>
                            <li>Biased or inappropriate content</li>
                            <li>Content that requires editing or refinement</li>
                            <li>Scripts that may not perfectly match your expectations</li>
                        </ul>
                        
                        <h3 className="text-xl font-medium mb-3 text-blue-200">5.2 Service Availability</h3>
                        <p className="mb-4">
                            We provide Scriptioo on an &quot;as is&quot; and &quot;as available&quot; basis. We do not warrant that:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>The service will be uninterrupted or error-free</li>
                            <li>The service will meet your specific requirements</li>
                            <li>Any errors in the service will be corrected</li>
                            <li>The service will be available at all times</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">6. Limitation of Liability</h2>
                        <p className="mb-4">
                            To the maximum extent permitted by law, Scriptioo and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                            <li>Loss of profits, revenue, or business opportunities</li>
                            <li>Loss of data or information</li>
                            <li>Costs of replacement services</li>
                            <li>Damages arising from use of generated scripts</li>
                        </ul>
                        <p>
                            Our total liability for any claims arising from your use of Scriptioo shall not exceed the amount you paid for the service in the preceding twelve months (which is currently zero, as our service is free).
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">7. User Responsibilities</h2>
                        <p className="mb-4">You are responsible for:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Reviewing and editing generated scripts before use</li>
                            <li>Ensuring that your use of generated scripts complies with applicable laws</li>
                            <li>Verifying the accuracy of any factual information in generated scripts</li>
                            <li>Using the service in accordance with these Terms</li>
                            <li>Respecting the intellectual property rights of others</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">8. Third-Party Services</h2>
                        <p className="mb-4">
                            Scriptioo integrates with third-party services to provide our functionality:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>OpenAI for AI script generation</li>
                            <li>Google AdSense for advertising</li>
                            <li>Vercel for hosting and analytics</li>
                        </ul>
                        <p className="mt-4">
                            These third-party services have their own terms of service and privacy policies, which you should review.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">9. Advertising</h2>
                        <p>
                            Scriptioo is supported by advertising through Google AdSense. By using our service, you agree to the display of advertisements. We do not control the content of these advertisements and are not responsible for their accuracy or appropriateness.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">10. Modifications to Service</h2>
                        <p>
                            We reserve the right to modify, suspend, or discontinue Scriptioo at any time, with or without notice. We may also update these Terms periodically. Continued use of the service after any changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">11. Termination</h2>
                        <p>
                            Since Scriptioo does not require user accounts, these Terms remain in effect while you use our service. You may stop using Scriptioo at any time. We reserve the right to restrict access to our service if these Terms are violated.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">12. Governing Law</h2>
                        <p>
                            These Terms are governed by and construed in accordance with the laws of Ecuador. Any disputes arising from these Terms or your use of Scriptioo shall be subject to the exclusive jurisdiction of the courts of Ecuador.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">13. Severability</h2>
                        <p>
                            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">14. Contact Information</h2>
                        <p className="mb-4">
                            If you have any questions about these Terms and Conditions, please contact us:
                        </p>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="font-medium">
                                Email: <a 
                                    href="mailto:danielmauricioerazoespinoza@gmail.com?subject=Terms and Conditions Inquiry - Scriptioo" 
                                    className="text-blue-300 hover:text-blue-200 underline break-all"
                                >
                                    danielmauricioerazoespinoza@gmail.com
                                </a>
                            </p>
                            <p className="text-sm text-gray-300 mt-2">
                                Click the email link above to send us a message about these Terms and Conditions
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}