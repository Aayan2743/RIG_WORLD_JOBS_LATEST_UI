import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'What is RigWorldJobs?',
    a: 'RigWorldJobs is a job platform dedicated to Oil & Gas, Offshore, Drilling, and Energy professionals. Job seekers can apply directly to global opportunities.',
  },
  {
    q: 'Is creating an account free?',
    a: 'Yes. Creating a regular account is free. Premium features like Resume Boosting or Priority Job Visibility may require subscription.',
  },
  {
    q: 'How do I apply for jobs?',
    a: 'Simply browse available jobs, click the job listing, and follow the application steps provided by the employer.',
  },
  {
    q: 'How does the subscription work?',
    a: 'Subscription gives access to premium features like highlighted profile visibility and faster employer reach. Charges depend on plan duration.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: (
      <>
        Yes, you can cancel anytime. However, partially used subscription periods are non-refundable as per our{' '}
        <Link to="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link>.
      </>
    ),
  },
  {
    q: 'Who can I contact for support?',
    a: (
      <>
        You can reach us anytime at{' '}
        <a href="mailto:support@rigworldjobs.com" className="text-blue-600 hover:underline">
          support@rigworldjobs.com
        </a>. Our team is available to assist you.
      </>
    ),
  },
];

export function Faqs() {
  const [open, setOpen] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="py-14 text-center" style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #0E7490 100%)' }}>
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-7 h-7 text-cyan-300" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
        <p className="text-cyan-100/70">Everything you need to know about RigWorldJobs.</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                {open === i
                  ? <ChevronUp className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                }
              </button>
              {open === i && (
                <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <p className="text-gray-700 font-semibold mb-1">Still have questions?</p>
          <p className="text-sm text-gray-500 mb-4">Our support team is happy to help.</p>
          <Link to="/contact-us"
            className="inline-flex items-center px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
