import React from 'react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
    const lastUpdated = "October 26, 2023";

    return (
        <div className="p-6 overflow-y-auto h-full text-gray-800">
            <div className="prose max-w-full prose-headings:text-gray-800 prose-p:text-gray-700 prose-li:text-gray-700">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">Privacy Policy – GROWit</h1>
                <p className="text-sm text-gray-600"><strong>Last Updated:</strong> {lastUpdated}</p>
                
                <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
                <p>Welcome to GROWit. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. By using our service, you agree to the collection and use of information in accordance with this policy.</p>

                <h2 className="text-2xl font-semibold mt-6">2. What Information We Collect</h2>
                <p>We collect information you provide directly to us when you use GROWit, such as your content prompts, target audience descriptions, language preferences, and selected platforms.</p>
                <p>We may also automatically collect certain information when you use our service, including your IP address, device type, browser version, usage data, and other analytics data to help us improve our service.</p>

                <h2 className="text-2xl font-semibold mt-6">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Operate, maintain, and provide the features of the GROWit service.</li>
                    <li>Improve, personalize, and expand our service.</li>
                    <li>Analyze usage to understand how our service is used.</li>
                    <li>Communicate with you for service-related purposes.</li>
                    <li>Comply with legal obligations.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">4. Data Sharing & Disclosure</h2>
                <p>We may share your information with third-party service providers (e.g., our AI model provider, hosting services) to facilitate our service. We do not sell your personal data to advertisers or other third parties.</p>

                <h2 className="text-2xl font-semibold mt-6">5. Data Retention & Security</h2>
                <p>We retain your information only for as long as necessary to provide you with our service and for legitimate and essential business purposes. We take reasonable measures to protect your information, but please be aware that no security measures are 100% secure.</p>
                
                <h2 className="text-2xl font-semibold mt-6">6. Children’s Privacy</h2>
                <p>Our service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>

                <h2 className="text-2xl font-semibold mt-6">7. Changes to This Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                <h2 className="text-2xl font-semibold mt-6">8. Contact Information</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at support@growit.example.com.</p>
            </div>
            <div className="text-center mt-8">
                <button onClick={onBack} className="px-6 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">
                    &larr; Back to App
                </button>
            </div>
        </div>
    );
};