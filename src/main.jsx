import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";

// ── Always ensure demo credentials exist ──────────────────────────
const USERS_KEY = 'rwj_users';
const COMPANY_REQUESTS_KEY = 'rwj_company_requests';
const NOTIFICATIONS_KEY = 'rwj_notifications';

const demoUsers = [
  { id: 1, name: 'John Martinez', email: 'candidate@demo.com', password: 'candidate123', role: 'candidate', approvalStatus: 'approved' },
  { id: 2, name: 'Shell Energy HR', email: 'employer@demo.com', password: 'employer123', role: 'employer', approvalStatus: 'approved' },
  { id: 3, name: 'RigWorld Demo Company', email: 'company@demo.com', password: 'company123', role: 'employer', approvalStatus: 'approved', companyName: 'RigWorld Demo Company' },
  { id: 99, name: 'RigWorld Admin', email: 'admin@rigworldjobs.com', password: 'admin@123', role: 'admin', approvalStatus: 'approved' },
];

// Seed a demo pending company request so admin panel isn't empty
const demoPendingRequests = [
  {
    id: 'req_demo1',
    companyName: 'Gulf Drilling Co.',
    contactName: 'Ahmed Al-Rashid',
    email: 'ahmed@gulfdrilling.com',
    phone: '+971 50 123 4567',
    industry: 'Upstream / Drilling',
    website: 'gulfdrilling.com',
    message: 'We operate 12 offshore rigs in the Gulf region and are looking to hire 50+ engineers this year.',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'req_demo2',
    companyName: 'North Sea Energy Ltd.',
    contactName: 'James MacAllister',
    email: 'james@northseaenergy.co.uk',
    phone: '+44 7700 900123',
    industry: 'Offshore Engineering',
    website: 'northseaenergy.co.uk',
    message: 'Aberdeen-based operator seeking HSE and drilling talent for North Sea projects.',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
];

try {
  const existing = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const demoEmails = demoUsers.map(u => u.email);
  const nonDemo = existing.filter(u => !demoEmails.includes(u.email));
  localStorage.setItem(USERS_KEY, JSON.stringify([...demoUsers, ...nonDemo]));
} catch {
  localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
}

try {
  const existingReqs = JSON.parse(localStorage.getItem(COMPANY_REQUESTS_KEY) || '[]');
  const nonDemoReqs = existingReqs.filter(r => r.id !== 'req_demo1' && r.id !== 'req_demo2');
  localStorage.setItem(COMPANY_REQUESTS_KEY, JSON.stringify([...demoPendingRequests, ...nonDemoReqs]));
} catch {
  localStorage.setItem(COMPANY_REQUESTS_KEY, JSON.stringify(demoPendingRequests));
}

if (!localStorage.getItem(NOTIFICATIONS_KEY)) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
}
// ─────────────────────────────────────────────────────────────────

createRoot(document.getElementById("root")).render(<App />);
