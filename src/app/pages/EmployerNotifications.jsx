import { useState } from 'react';
import { Bell, CheckCircle, XCircle, Mail, Lock, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext.jsx';

const NOTIFICATIONS_KEY = 'rwj_notifications';

function getNotifications() {
  try { return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]'); } catch { return []; }
}
function markRead(id) {
  const notifs = getNotifications();
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs.map(n => n.id === id ? { ...n, read: true } : n)));
}

export function EmployerNotifications() {
  const { user } = useAuth();
  const [notifs, setNotifs] = useState(() =>
    getNotifications().filter(n => n.recipientEmail === user?.email)
  );

  const handleRead = (id) => {
    markRead(id);
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Notifications</h2>
        {notifs.filter(n => !n.read).length > 0 && (
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
            {notifs.filter(n => !n.read).length} unread
          </span>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border/60 p-12 text-center text-muted-foreground">
          <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No notifications yet</p>
          <p className="text-sm mt-1">You'll be notified here when your registration is reviewed.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifs.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleRead(n.id)}
              className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-md ${
                n.read ? 'border-border/60' : 'border-primary/30 shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === 'approval' ? 'bg-emerald-100' : 'bg-red-100'
                }`}>
                  {n.type === 'approval'
                    ? <CheckCircle className="w-5 h-5 text-emerald-600" />
                    : <XCircle className="w-5 h-5 text-red-600" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`font-bold text-sm ${n.read ? 'text-foreground' : 'text-primary'}`}>{n.title}</h3>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{n.message}</p>

                  {n.type === 'approval' && n.credentials && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                      <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Your Login Credentials</p>
                      <div className="flex items-center space-x-2 text-sm text-emerald-800">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span>Email: <span className="font-mono font-semibold">{n.credentials.email}</span></span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-emerald-800">
                        <Lock className="w-4 h-4 flex-shrink-0" />
                        <span>Password: <span className="font-mono font-semibold">{n.credentials.password}</span></span>
                      </div>
                      <Link
                        to="/employer/login"
                        className="inline-flex items-center space-x-1.5 mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                        onClick={e => e.stopPropagation()}
                      >
                        <span>Go to Employer Login</span>
                      </Link>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(n.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
