import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Service Delivery',
    body: 'Digital services are activated immediately after successful payment and confirmation email.',
  },
  {
    title: 'Access Issues',
    body: (
      <>
        If you experience difficulty accessing your purchased services, please reach out to:{' '}
        <a href="mailto:support@rigworldjobs.com" className="text-blue-600 hover:underline">
          support@rigworldjobs.com
        </a>
      </>
    ),
  },
  {
    title: 'No Shipping Charges',
    body: 'Since no physical products are delivered, there are no applicable shipping fees or delivery timelines.',
  },
];

export function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1a56db' }}>
          Shipping Policy
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          RigWorldJobs.com provides digital subscription services only. No physical products are shipped to users.
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
          For any further assistance, contact us at:{' '}
          <a href="mailto:support@rigworldjobs.com" className="text-blue-600 hover:underline">
            support@rigworldjobs.com
          </a>
        </p>

        <div className="mt-10 pt-8 border-t border-gray-200 text-xs text-gray-400">
          Last updated: January 2025 &nbsp;·&nbsp;
          <Link to="/contact-us" className="hover:underline text-gray-500">Contact us</Link> with any questions.
        </div>
      </div>
    </div>
  );
}
