import { Link } from 'react-router';

const sections = [
  {
    title: 'Account Creation',
    body: 'Companies must register using valid business credentials. RigWorldJobs.com may verify authenticity before granting access.',
  },
  {
    title: 'Use of Services',
    body: 'Employers can post jobs, search candidate databases, and purchase premium subscriptions.',
    highlight: 'Misuse of candidate data is strictly prohibited.',
  },
  {
    title: 'Payments',
    body: (
      <>
        All payments for subscriptions or job postings must be made through approved payment channels.
        Fees are <strong>non-refundable</strong> unless stated otherwise in writing.
      </>
    ),
  },
  {
    title: 'Data Handling',
    body: 'Companies must comply with applicable data protection laws when handling candidate information obtained from RigWorldJobs.com.',
  },
  {
    title: 'Content Responsibility',
    body: 'Employers are solely responsible for the accuracy and legality of job postings. Any misleading, false or illegal job listings may result in suspension or removal.',
  },
  {
    title: 'Intellectual Property',
    body: 'All platform content, branding, and software remain the exclusive property of RigWorldJobs.com and may not be reproduced or distributed without permission.',
  },
  {
    title: 'Termination',
    body: "RigWorldJobs.com may suspend or terminate a company's access for misuse, non-payment, or violation of these terms.",
  },
];

export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1a56db' }}>
          Company Terms &amp; Conditions
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          These Terms and Conditions apply to companies, employers, and recruiters (<strong>"Company Users"</strong>) using RigWorldJobs.com for posting jobs or accessing subscribed services.
        </p>

        <ol className="space-y-6">
          {sections.map((s, i) => (
            <li key={i} className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-900">{s.title}</span>
              {' – '}
              {s.body}
              {s.highlight && (
                <p className="mt-1 font-semibold" style={{ color: '#e63946' }}>{s.highlight}</p>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-12 pt-8 border-t border-gray-200 text-xs text-gray-400">
          Last updated: January 2025 &nbsp;·&nbsp;
          <Link to="/contact-us" className="hover:underline text-gray-500">Contact us</Link> with any questions.
        </div>
      </div>
    </div>
  );
}
