import { createBrowserRouter, Navigate } from "react-router-dom";

import { Layout } from "./components/Layout.jsx";
import { CandidateLayout } from "./components/CandidateLayout.jsx";
import { CompanyLayout } from "./components/CompanyLayout.jsx";
import { AdminLayout } from "./components/AdminLayout.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

// Public Pages
import { Home } from "./pages/Home.jsx";
import { Jobs } from "./pages/Jobs.jsx";
import { JobDetail } from "./pages/JobDetail.jsx";
import { About } from "./pages/About.jsx";
import { Companies } from "./pages/Companies.jsx";
import { CompanyDetail } from "./pages/CompanyDetail.jsx";
import { CandidateLogin } from "./pages/CandidateLogin.jsx";
import { CandidateRegister } from "./pages/CandidateRegister.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { ContactUs } from "./pages/ContactUs.jsx";
import { TermsOfUse } from "./pages/TermsOfUse.jsx";
import { ShippingPolicy } from "./pages/ShippingPolicy.jsx";
import { RefundPolicy } from "./pages/RefundPolicy.jsx";
import { PrivacyPolicy } from "./pages/PrivacyPolicy.jsx";
import { ApplicantTerms } from "./pages/ApplicantTerms.jsx";
import { Faqs } from "./pages/Faqs.jsx";
import { Payment } from "./pages/Payment.jsx";
import { NotFound } from "./pages/NotFound.jsx";

// Candidate Pages
import { CandidateDashboard } from "./pages/CandidateDashboard.jsx";
import { CandidateProfile } from "./pages/CandidateProfile.jsx";
import { CandidateApplications } from "./pages/CandidateApplications.jsx";
import { CandidateSettings } from "./pages/CandidateSettings.jsx";
import { SavedJobs } from "./pages/SavedJobs.jsx";

// Company Pages
import { EmployerDashboard } from "./pages/EmployerDashboard.jsx";
import { PostJob } from "./pages/PostJob.jsx";
import { JobListings } from "./pages/JobListings.jsx";
import { EmployerJobListings } from "./pages/EmployerJobListings.jsx";
import { EmployerCompanyProfile } from "./pages/EmployerCompanyProfile.jsx";
import { EmployerAnalytics } from "./pages/EmployerAnalytics.jsx";
import { EmployerNotifications } from "./pages/EmployerNotifications.jsx";
import EmployerSettings from "./pages/EmployerSettings.jsx";
import { CompanyApplicants } from "./pages/CompanyApplicants.jsx";
import { CompanyLogin } from "./pages/CompanyLogin.jsx";
import { CompanyRegister } from "./pages/Companyregister.jsx";
import { CompanyRequests } from "./pages/CompanyRequests.jsx";

// Admin Pages
import { AdminLogin } from "./pages/AdminLogin.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { AdminPayments } from "./pages/AdminPayments.jsx";
import { AdminCompanyProfiles } from "./pages/AdminCompanyProfiles.jsx";
import AdminSettings from "./pages/AdminSettings.jsx";

// ✅ NEW IMPORT
import { AdminIndustries } from "./pages/AdminIndustries.jsx";

export const router = createBrowserRouter([

  // ── Public routes ─────────────────────────────────
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "jobs", Component: Jobs },
      { path: "jobs/:id", Component: JobDetail },
      { path: "about", Component: About },
      { path: "companies", Component: Companies },
      { path: "companies/:slug", Component: CompanyDetail },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "candidate/login", Component: CandidateLogin },
      { path: "candidate/register", Component: CandidateRegister },
      { path: "contact-us", Component: ContactUs },
      { path: "terms-of-use", Component: TermsOfUse },
      { path: "shipping-policy", Component: ShippingPolicy },
      { path: "refund-policy", Component: RefundPolicy },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "applicant-terms", Component: ApplicantTerms },
      { path: "faqs", Component: Faqs },
      { path: "payment", Component: Payment },

      { path: "company/login", Component: CompanyLogin },
      { path: "company/register", Component: CompanyRegister },

      { path: "employer/login", element: <Navigate to="/company/login" replace /> },
      { path: "employer/register", element: <Navigate to="/company/register" replace /> },
    ],
  },

  // ── Candidate routes ──────────────────────────────
  {
    path: "/candidate",
    element: (
      <ProtectedRoute allowedRoles={["candidate"]} redirectTo="/candidate/login">
        <CandidateLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/candidate/dashboard" replace /> },
      { path: "dashboard", Component: CandidateDashboard },
      { path: "applications", Component: CandidateApplications },
      { path: "profile", Component: CandidateProfile },
      { path: "saved-jobs", Component: SavedJobs },
      { path: "settings", Component: CandidateSettings },
      { path: "contact-us", Component: ContactUs },
    ],
  },

  // ── Company routes ────────────────────────────────
  {
    path: "/company",
    element: (
      <ProtectedRoute allowedRoles={["employer"]} redirectTo="/company/login" requireCompany>
        <CompanyLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/company/dashboard" replace /> },
      { path: "dashboard", Component: EmployerDashboard },
      { path: "jobs", Component: JobListings },
      { path: "jobs/:jobId/applicants", Component: CompanyApplicants },
      { path: "post-job", Component: PostJob },
      { path: "company-profile", Component: EmployerCompanyProfile },
      { path: "notifications", Component: EmployerNotifications },
      { path: "settings", Component: EmployerSettings },
      { path: "contact-us", Component: ContactUs },
    ],
  },

  // Legacy redirects
  { path: "/employer", element: <Navigate to="/company/dashboard" replace /> },
  { path: "/employer/dashboard", element: <Navigate to="/company/dashboard" replace /> },

  // ── Admin routes ─────────────────────────────────
  { path: "/admin/login", Component: AdminLogin },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "jobs", element: <EmployerJobListings /> },
      { path: "jobs/:jobId/applicants", element: <CompanyApplicants /> },
      { path: "post-job", element: <PostJob /> },
      { path: "company-profile", element: <AdminCompanyProfiles /> },
      { path: "analytics", element: <EmployerAnalytics /> },
      { path: "notifications", element: <EmployerNotifications /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "company-requests", element: <CompanyRequests /> },
      { path: "payments", element: <AdminPayments /> },

      //  NEW ROUTE ADDED
      { path: "industries", element: <AdminIndustries /> },

      { path: "contact-us", element: <ContactUs /> },
    ],
  },

  // ── 404 ──────────────────────────────────────────
  { path: "*", Component: NotFound },
]);