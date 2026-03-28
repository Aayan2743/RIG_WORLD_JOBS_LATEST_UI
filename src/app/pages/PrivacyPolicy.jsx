import { Link } from 'react-router';

const sections = [
  {
    title: 'Captured Information Details',
    bullets: [
      'Personal details (name, email, contact number)',
      'Professional information (resume, skills, work history)',
      'Account information (login data, subscription activity)',
      'Billing information (for premium users)',
      'Technical information (browser, device, IP address)',
    ],
  },
  {
    title: 'Use of Information',
    body: 'Collected data is used to manage user accounts, process subscriptions, deliver job alerts, and improve platform performance.',
  },
  {
    title: 'Data Protection',
    body: 'All information is stored securely in access-controlled cloud servers. RigWorldJobs.com employs encryption and periodic audits to maintain data integrity.',
  },
  {
    title: 'User Rights',
    body: (
      <>
        Users can request access, correction, or deletion of personal information by contacting:{' '}
        <a href="mailto:support@rigworldjobs.com" className="text-blue-600 hover:underline">support@rigworldjobs.com</a>
      </>
    ),
  },
  {
    title: 'Policy Updates',
    body: 'This policy may be updated periodically. Users will be notified of significant changes through email or platform notifications.',
  },
];

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1a56db' }}>Privacy Policy</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          RigWorldJobs.com values your privacy and is committed to safeguarding your personal information. This policy describes how we collect, use, and protect your data.
        </p>

        <ol className="space-y-6">
          {sections.map((s, i) => (
            <li key={i} className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-900">{s.title}:</span>
              {s.body && <> {s.body}</>}
              {s.bullets && (
                <ul className="mt-2 ml-4 space-y-1 list-disc text-gray-600">
                  {s.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 pt-8 border-t border-gray-200 text-xs text-gray-400">
          Last updated: January 2025 &nbsp;·&nbsp;
          <Link to="/contact-us" className="hover:underline text-gray-500">Contact us</Link> with any questions.
        </div>
      </div>
    </div>
  );
}
