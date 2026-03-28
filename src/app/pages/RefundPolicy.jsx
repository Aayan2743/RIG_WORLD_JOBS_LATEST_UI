import { Link } from 'react-router';

export function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1a56db' }}>Refund Policy</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          This Refund Policy applies only to Applicants who purchase premium or subscription-based services on RigWorldJobs.com.
        </p>

        <ol className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <li>
            <span className="font-bold text-gray-900">Eligibility for Refunds</span>
            {' - '}
            Refunds are available only for cases such as:
            <ul className="mt-2 ml-4 space-y-1 list-disc text-gray-600">
              <li>Duplicate payment</li>
              <li>Technical issues preventing service access</li>
              <li>Non-provision of purchased services</li>
            </ul>
          </li>
          <li>
            <span className="font-bold text-gray-900">Refund Request Process</span>
            {' - '}
            Refund requests must be submitted within 7 days of the transaction. Send your request to:{' '}
            <a href="mailto:support@rigworldjobs.com" className="text-blue-600 hover:underline">support@rigworldjobs.com</a>
          </li>
          <li>
            <span className="font-bold text-gray-900">Processing Time</span>
            {' - '}
            Once approved, refunds are processed within 10-15 business days to the original payment method.
          </li>
          <li>
            <span className="font-bold text-gray-900">Non-Refundable Services</span>
            {' - '}
            Partially used subscriptions or completed premium access periods are not eligible for refunds.
          </li>
        </ol>

        <p className="mt-10 text-sm text-gray-600">
          For additional clarification, please reach out to:{' '}
          <a href="mailto:support@rigworldjobs.com" className="text-blue-600 hover:underline">support@rigworldjobs.com</a>
        </p>

        <div className="mt-10 pt-8 border-t border-gray-200 text-xs text-gray-400">
          Last updated: January 2025
          <Link to="/contact-us" className="hover:underline text-gray-500 ml-2">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
