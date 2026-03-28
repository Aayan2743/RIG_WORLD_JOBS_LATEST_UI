import { Link } from 'react-router';

const sections = [
  {
    title: 'Eligibility',
    body: 'You must be at least 18 years old to create an account and apply for jobs on RigWorldJobs.com.',
  },
  {
    title: 'Account Responsibility',
    body: 'You are responsible for maintaining the confidentiality of your login credentials. All activities under your account will be considered your actions.',
  },
  {
    title: 'Use of Platform',
    body: 'Applicants may search and apply for jobs, create professional profiles, and subscribe to optional premium services. The platform must not be used for fraudulent or misleading purposes.',
  },
  {
    title: 'Subscription & Payment',
    body: (
      <>
        Premium services, if purchased, are billed on a subscription basis. Refunds are governed by the{' '}
        <Link to="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link>.
      </>
    ),
  },
  {
    title: 'Prohibited Conduct',
    body: 'Applicants shall not post false information, impersonate others, or attempt to breach platform security.',
  },
  {
    title: 'Limitation of Liability',
    body: 'RigWorldJobs.com does not guarantee job placement or the authenticity of third-party listings.',
  },
  {
    title: 'Termination',
    body: 'RigWorldJobs.com reserves the right to suspend or terminate any account found in violation of these terms.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms are governed by the laws of India. Any disputes shall be handled in Bengaluru, India.',
  },
];

export function ApplicantTerms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1a56db' }}>
          Applicant Terms &amp; Conditions
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          These Terms and Conditions govern your use of RigWorldJobs.com as an Applicant (job seeker).
          By registering or using this platform, you agree to comply with the following terms:
        </p>

        <ol className="space-y-6">
          {sections.map((s, i) => (
            <li key={i} className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-900">{s.title}</span>
              {' – '}
              {s.body}
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-gray-600">
          If you have any questions regarding these terms, please contact:{' '}
          <a href="mailto:support@rigworldjobs.com" className="text-blue-600 hover:underline">
            support@rigworldjobs.com
          </a>
        </p>

        <div className="mt-10 pt-8 border-t border-gray-200 text-xs text-gray-400">
          Last updated: January 2025 &nbsp;·&nbsp;
          <Link to="/contact-us" className="hover:underline text-gray-500">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
