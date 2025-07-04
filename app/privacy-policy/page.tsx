export default function PrivacyPolicyPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
        <div className="md:max-w-4xl w-full mx-auto md:py-16 md:px-4 p-2 text-white">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-200 leading-relaxed">
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-sm text-gray-300 mb-6">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              
              <p className="mb-6">
                Scriptioo is a video script AI generator that helps you create engaging scripts for YouTube, TikTok, and Instagram. We are committed to protecting your privacy and being transparent about our data practices. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
              </p>
            </div>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">Analytics Information</h3>
              <p className="mb-4">
                We use Vercel Analytics to collect basic usage statistics including the number of visits, countries of origin, and device types. This helps us understand how our service is being used and improve the user experience.
              </p>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">Content You Provide</h3>
              <p className="mb-4">
                When you use Scriptioo, we temporarily process the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Your video script ideas and prompts</li>
                <li>Selected video tone preferences</li>
                <li>Chosen platform (YouTube, TikTok, or Instagram)</li>
                <li>Script templates you upload (optional)</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">Third-Party Services</h3>
              <p>
                We use OpenAI&apos;s services to generate your video scripts. Your input is sent to OpenAI for processing and script generation. Please refer to OpenAI&apos;s privacy policy for information about how they handle data.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generate personalized video scripts based on your inputs</li>
                <li>Provide script download functionality in DOCX format</li>
                <li>Analyze usage patterns to improve our service</li>
                <li>Ensure the proper functioning of our AI script generation</li>
              </ul>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">3. Data Storage and Retention</h2>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">No Persistent Data Storage</h3>
              <p className="mb-4">
                Scriptioo does not store your generated scripts or personal information. All content processing happens in real-time, and your data is not saved to our databases.
              </p>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">Temporary Processing</h3>
              <p className="mb-4">
                When you upload a script template, it is temporarily stored on our servers only during the processing period and is automatically deleted immediately after your script is generated.
              </p>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">Analytics Data</h3>
              <p>
                Vercel Analytics data is aggregated and anonymized, and we retain this information to understand usage trends and improve our service.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">4. Third-Party Services</h2>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">OpenAI</h3>
              <p className="mb-4">
                We use OpenAI&apos;s API to generate your video scripts. Your prompts and inputs are sent to OpenAI for processing. OpenAI has its own privacy policy that governs how they handle this data.
              </p>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">Google AdSense</h3>
              <p className="mb-4">
                We display ads through Google AdSense to support our free service. Google may use cookies and similar technologies to serve ads based on your visits to our site and other sites on the Internet. We do not enable ad targeting or personalization.
              </p>
              
              <h3 className="text-xl font-medium mb-3 text-blue-200">Vercel Analytics</h3>
              <p>
                We use Vercel Analytics to collect anonymous usage statistics to help us understand how our service is being used and to improve the user experience.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">5. Cookies and Tracking</h2>
              <p className="mb-4">
                Scriptioo itself does not use cookies for functionality. However, third-party services may use cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Google AdSense may use cookies to serve relevant ads</li>
                <li>Vercel Analytics may use minimal tracking for analytics purposes</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">6. Data Security</h2>
              <p>
                We implement appropriate technical measures to protect your information during processing. Since we don&apos;t store your scripts or personal information, there is minimal risk of data breaches. All communications with our service are secured using industry-standard encryption.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">7. International Users</h2>
              <p>
                Scriptioo is available to users worldwide. By using our service, you acknowledge that your data may be processed in the United States where our servers and third-party services are located.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">8. Children&apos;s Privacy</h2>
              <p>
                While Scriptioo does not have age restrictions, we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can address this appropriately.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">9. Your Rights</h2>
              <p className="mb-4">
                Since Scriptioo does not store your personal information or generated scripts, most data subject rights are not applicable. However, you can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Stop using our service at any time</li>
                <li>Contact us with any privacy concerns</li>
                <li>Control cookies through your browser settings</li>
              </ul>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the updated policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </section>
  
            <section className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">11. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-medium">
                  Email: <a 
                    href="mailto:danielmauricioerazoespinoza@gmail.com?subject=Need assistance with Scriptioo" 
                    className="text-blue-300 hover:text-blue-200 underline break-all"
                  >
                    danielmauricioerazoespinoza@gmail.com
                  </a>
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  Click the email link above to send us a message with the subject &quot;Need assistance with Scriptioo&quot;
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }