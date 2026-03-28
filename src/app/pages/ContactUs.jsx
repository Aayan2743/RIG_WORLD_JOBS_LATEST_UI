import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #0E7490 100%)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-7 h-7 text-cyan-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-cyan-100/70 text-lg">Have a question or need help? We're here for you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Info cards */}
          <div className="space-y-5">
            {[
              { icon: Mail, title: 'Email Us', lines: ['support@rigworldjobs.com', 'employers@rigworldjobs.com'] },
              { icon: Phone, title: 'Call Us', lines: ['+1 (800) 745-9200', 'Mon–Fri, 9am–6pm EST'] },
              { icon: MapPin, title: 'Office', lines: ['123 Energy Plaza, Suite 400', 'Houston, TX 77002, USA'] },
              { icon: Clock, title: 'Response Time', lines: ['We reply within 24 hours', 'on business days'] },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-2xl border border-border/60 p-5 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <card.icon className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm mb-1">{card.title}</p>
                  {card.lines.map(l => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border/60 p-8 shadow-sm">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)}
                    className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
                    style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-foreground mb-1">Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
                      <input name="name" type="text" placeholder="Jane Smith" required value={form.name} onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                      <input name="email" type="email" placeholder="jane@example.com" required value={form.email} onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                    <input name="subject" type="text" placeholder="How can we help?" required value={form.subject} onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                    <textarea name="message" rows={5} placeholder="Tell us more..." required value={form.message} onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.01] disabled:opacity-70"
                    style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
                    <Send className="w-4 h-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
