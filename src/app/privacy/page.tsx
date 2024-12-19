import { Metadata } from 'next'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { FancyHomeButton } from '@/components/global/fancy-button'

export const metadata: Metadata = {
  title: 'Privacy Policy | Chatal',
  description: 'Privacy Policy for Chatal - Instagram DM Automation Service',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">Privacy Policy</h1>
          <div className="relative group">
            <FancyHomeButton />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Back to Home
            </span>
          </div>
        </div>
        <Card className="bg-gray-800 border-blue-500">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-400">Chatal Privacy Policy</CardTitle>
            <CardDescription className="text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-200">
            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">1. Introduction</h2>
              <p>
                Welcome to Chatal (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Instagram DM automation service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Account information (e.g., name, email address, Instagram username)</li>
                <li>Instagram account access tokens</li>
                <li>Direct message content for automation purposes</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns and trends</li>
                <li>Protect against, identify, and prevent fraud and other illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">4. Data Sharing and Disclosure</h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With service providers and business partners who assist in providing our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">5. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. You can request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">6. Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Correct any inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict the processing of your information</li>
                <li>Request a copy of your information in a structured, machine-readable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">8. Third-Party Services</h2>
              <p>
                Our service integrates with Instagram and may contain links to other third-party websites or services. We are not responsible for the privacy practices of these third parties, and we encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">9. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete that information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@chatal.com<br />
                <strong>Address:</strong> 123 Automation Street, Tech City, TC 12345, Country
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

