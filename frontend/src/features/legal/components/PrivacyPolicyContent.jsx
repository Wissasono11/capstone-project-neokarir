import React from 'react';

const PrivacyPolicyContent = () => {
  return (
    <>
      <section id="overview">
        <h2 className="text-xl font-bold mb-3">Privacy Policy of NeoKarir</h2>
        <p className="mb-4">
          At NeoKarir, we are committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, store, and protect your information when you use our AI-powered career guidance platform.
        </p>
        <div className="bg-gray-100 p-4 border border-gray-300 rounded">
          <p className="mb-2">
            <strong>NeoKarir</strong> is an AI-powered career guidance platform developed as a capstone project for the DBS Foundation Coding Camp 2026 program. This privacy policy applies to all users of the NeoKarir platform.
          </p>
          <p>
            <strong>Data Controller:</strong> NeoKarir Development Team<br />
            <strong>Contact email:</strong> support@neokarir.com
          </p>
        </div>
      </section>

      <section id="data-we-collect">
        <h2 className="text-xl font-bold mb-3">Data We Collect</h2>
        <p className="mb-4">
          We collect different types of data depending on how you interact with our platform. Below is a comprehensive overview of the data we collect:
        </p>

        <h3 className="font-bold mb-2">Personal Data Provided by You</h3>
        <p className="mb-2">
          When you register for an account or use our services, we may collect the following personal data:
        </p>
        <ul className="list-disc pl-5 mb-5 space-y-1">
          <li><strong>Account Information:</strong> Full name, email address, and encrypted password;</li>
          <li><strong>Career Profile Data:</strong> Skills, work experience, educational background, career interests, and professional goals;</li>
          <li><strong>Resume Data:</strong> Information you provide when building or uploading your resume through our platform;</li>
          <li><strong>Assessment Responses:</strong> Your answers to career aptitude assessments and skill evaluations;</li>
          <li><strong>Communication Data:</strong> Messages, feedback, and inquiries you send to us.</li>
        </ul>

        <h3 className="font-bold mb-2">Data Collected Automatically</h3>
        <p className="mb-2">
          When you use our platform, we may automatically collect:
        </p>
        <ul className="list-disc pl-5 mb-5 space-y-1">
          <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on the platform, and interaction patterns;</li>
          <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution;</li>
          <li><strong>Log Data:</strong> IP address, access times, referring URLs, and error logs;</li>
          <li><strong>Cookie Data:</strong> Information collected through cookies and similar tracking technologies (see Cookies section below).</li>
        </ul>

        <h3 className="font-bold mb-2">AI-Generated Data</h3>
        <p>
          Our AI models may generate derivative data based on your inputs, including career path predictions, skill gap analyses, and personalized recommendations. This generated data is associated with your account and treated with the same level of privacy protection as your personal data.
        </p>
      </section>

      <section id="how-we-use-data">
        <h2 className="text-xl font-bold mb-3">How We Use Your Data</h2>
        <p className="mb-4">
          We use the data we collect for the following purposes:
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 border border-gray-200 rounded">
            <h4 className="font-bold mb-2">Service Delivery</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>To create and maintain your account;</li>
              <li>To provide AI-powered career recommendations and analysis;</li>
              <li>To generate personalized skill gap assessments;</li>
              <li>To offer resume building and optimization features.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200 rounded">
            <h4 className="font-bold mb-2">Service Improvement</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>To improve and train our AI models for better career recommendations;</li>
              <li>To analyze usage patterns and optimize platform performance;</li>
              <li>To conduct research and development for new features;</li>
              <li>To identify and fix bugs and technical issues.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200 rounded">
            <h4 className="font-bold mb-2">Communication</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>To send you account-related notifications;</li>
              <li>To respond to your inquiries and support requests;</li>
              <li>To send you career insights and platform updates (with your consent);</li>
              <li>To provide important service announcements.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200 rounded">
            <h4 className="font-bold mb-2">Security & Compliance</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>To protect against fraud, abuse, and unauthorized access;</li>
              <li>To comply with legal obligations;</li>
              <li>To enforce our Terms of Service.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="ai-data-processing" className="mt-6">
        <h2 className="text-xl font-bold mb-3">AI & Data Processing</h2>
        <p className="mb-4">
          NeoKarir uses artificial intelligence to process your career data and generate personalized recommendations. Here's how we handle your data in relation to our AI systems:
        </p>

        <h3 className="font-bold mb-2">How AI Processes Your Data</h3>
        <ul className="list-disc pl-5 mb-5 space-y-1">
          <li>Your career profile data (skills, experience, education) is processed by our AI models to generate career path recommendations;</li>
          <li>Assessment responses are analyzed to identify skill gaps and suggest learning paths;</li>
          <li>The AI uses pattern recognition and machine learning to match your profile with suitable career opportunities;</li>
          <li>Your data may be used in aggregated, anonymized form to improve our AI models.</li>
        </ul>

        <div className="bg-green-50 p-4 border border-green-200 rounded mb-5">
          <h4 className="font-bold mb-2">AI Data Protection Guarantees</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your personal data is never sold to third-party AI training datasets;</li>
            <li>AI-generated insights are private to your account;</li>
            <li>You can request deletion of all AI-generated data associated with your account;</li>
            <li>No automated decisions with legal effect are made without human review.</li>
          </ul>
        </div>

        <h3 className="font-bold mb-2">Legal Basis for Processing</h3>
        <p>
          We process your personal data based on: (a) your consent, provided at the time of registration; (b) our legitimate interests in providing and improving the NeoKarir service; (c) the performance of the contract between you and NeoKarir; and (d) compliance with legal obligations.
        </p>
      </section>

      <section id="data-sharing">
        <h2 className="text-xl font-bold mb-3">Data Sharing & Third Parties</h2>
        <p className="mb-4">
          We value your privacy and limit data sharing to what is strictly necessary:
        </p>

        <h3 className="font-bold mb-2">When We May Share Your Data</h3>
        <ul className="list-disc pl-5 mb-5 space-y-1">
          <li><strong>Service Providers:</strong> We may share data with trusted third-party service providers who assist us in operating the platform (e.g., cloud hosting, analytics, email delivery). These providers are contractually obligated to protect your data;</li>
          <li><strong>Legal Requirements:</strong> We may disclose your data if required by law, regulation, legal process, or government request;</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction;</li>
          <li><strong>With Your Consent:</strong> We may share your data with other parties when you have given us explicit consent to do so.</li>
        </ul>

        <div className="bg-red-50 p-4 border border-red-200 rounded">
          <h4 className="font-bold mb-2">We Will Never</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Sell your personal data to advertisers or data brokers;</li>
            <li>Share your career profile with employers without your explicit consent;</li>
            <li>Use your personal data for purposes unrelated to NeoKarir's career guidance services.</li>
          </ul>
        </div>
      </section>

      <section id="cookies">
        <h2 className="text-xl font-bold mb-3">Cookies & Tracking Technologies</h2>
        <p className="mb-4">
          NeoKarir uses cookies and similar tracking technologies to enhance your experience on our platform. Here's what you need to know:
        </p>

        <div className="overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">Type</th>
                <th className="p-2 border border-gray-300">Purpose</th>
                <th className="p-2 border border-gray-300">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">Essential</td>
                <td className="p-2 border border-gray-300">Authentication, session management, security</td>
                <td className="p-2 border border-gray-300">Session / 30 days</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">Functional</td>
                <td className="p-2 border border-gray-300">User preferences, language settings</td>
                <td className="p-2 border border-gray-300">1 year</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">Analytics</td>
                <td className="p-2 border border-gray-300">Usage statistics, performance monitoring</td>
                <td className="p-2 border border-gray-300">2 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          You can manage your cookie preferences through your browser settings. Please note that disabling essential cookies may affect the functionality of the platform.
        </p>
      </section>

      <section id="data-retention">
        <h2 className="text-xl font-bold mb-3">Data Retention</h2>
        <p className="mb-4">
          We retain your personal data only for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Account Data:</strong> Retained as long as your account is active. Deleted within 30 days of account deletion request;</li>
          <li><strong>Career Profile Data:</strong> Retained as long as your account is active. Can be individually deleted at your request;</li>
          <li><strong>AI-Generated Data:</strong> Retained as long as your account is active. Deleted upon account deletion;</li>
          <li><strong>Usage & Analytics Data:</strong> Retained in anonymized form for up to 2 years for service improvement purposes;</li>
          <li><strong>Communication Records:</strong> Retained for up to 3 years for legal compliance.</li>
        </ul>
      </section>

      <section id="your-rights">
        <h2 className="text-xl font-bold mb-3">Your Rights</h2>
        <p className="mb-4">
          Depending on your jurisdiction, you may have the following rights regarding your personal data:
        </p>

        <ul className="list-disc pl-5 mb-5 space-y-1">
          <li><strong>Right of Access:</strong> Request a copy of all personal data we hold about you.</li>
          <li><strong>Right of Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right of Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
          <li><strong>Right to Restrict Processing:</strong> Request temporary halt of data processing activities.</li>
          <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
          <li><strong>Right to Object:</strong> Object to data processing based on legitimate interests.</li>
        </ul>

        <p>
          To exercise any of these rights, please contact us at <a href="mailto:support@neokarir.com" className="text-blue-600 hover:underline">support@neokarir.com</a>. We will respond to your request within 30 days.
        </p>
      </section>

      <section id="data-security">
        <h2 className="text-xl font-bold mb-3">Data Security</h2>
        <p className="mb-4">
          We take the security of your data seriously and implement appropriate technical and organizational measures to protect it:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>Encryption:</strong> All data in transit is encrypted using TLS/SSL. Passwords are hashed using industry-standard algorithms;</li>
          <li><strong>Access Controls:</strong> We implement strict role-based access controls to limit who can access your data;</li>
          <li><strong>Regular Audits:</strong> We conduct periodic security assessments and vulnerability testing;</li>
          <li><strong>Incident Response:</strong> We have procedures in place to detect, report, and respond to data breaches.</li>
        </ul>
        <div className="bg-yellow-50 p-4 border border-yellow-200 rounded">
          <p>
            <strong>Note:</strong> While we strive to use commercially acceptable means to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your data.
          </p>
        </div>
      </section>

      <section id="children">
        <h2 className="text-xl font-bold mb-3">Children's Privacy</h2>
        <p className="mb-4">
          NeoKarir is not intended for use by individuals under the age of 17. We do not knowingly collect personal data from children under 17. If we become aware that we have collected personal data from a child under 17 without verification of parental consent, we will take steps to remove that information from our servers.
        </p>
        <p>
          If you are a parent or guardian and believe that your child has provided us with personal data, please contact us at <a href="mailto:support@neokarir.com" className="text-blue-600 hover:underline">support@neokarir.com</a>, and we will take appropriate action.
        </p>
      </section>

      <section id="policy-changes">
        <h2 className="text-xl font-bold mb-3">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Posting the updated policy on our platform with a new "Last Updated" date;</li>
          <li>Sending an email notification to registered users for significant changes;</li>
          <li>Displaying a prominent notice on our platform.</li>
        </ul>
        <p>
          Your continued use of NeoKarir after the effective date of the revised Privacy Policy constitutes your acceptance of the changes.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
        <p className="mb-4">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="bg-gray-100 p-4 border border-gray-300 rounded">
          <p>
            <strong>NeoKarir — Data Privacy Team</strong><br />
            DBS Foundation Coding Camp 2026 — Capstone Project<br />
            Email: <a href="mailto:support@neokarir.com" className="text-blue-600 hover:underline">support@neokarir.com</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyContent;
