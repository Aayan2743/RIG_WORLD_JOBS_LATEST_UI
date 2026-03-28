import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Jobs } from "./pages/Jobs.jsx";
import { JobDetail } from "./pages/JobDetail.jsx";
import { About } from "./pages/About.jsx";
import { Companies } from "./pages/Companies.jsx";
import { CompanyDetail } from "./pages/CompanyDetail.jsx";
import { CandidateLogin } from "./pages/CandidateLogin.jsx";
import { CandidateRegister } from "./pages/CandidateRegister.jsx";
import { EmployerLogin } from "./pages/EmployerLogin.jsx";
import { EmployerRegister } from "./pages/EmployerRegister.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { CandidateDashboard } from "./pages/CandidateDashboard.jsx";
import { CandidateProfile } from "./pages/CandidateProfile.jsx";
import { CandidateApplications } from "./pages/CandidateApplications.jsx";
import { CandidateSettings } from "./pages/CandidateSettings.jsx";
import { SavedJobs } from "./pages/SavedJobs.jsx";
import { EmployerDashboard } from "./pages/EmployerDashboard.jsx";
import { PostJob } from "./pages/PostJob.jsx";
import { ApplicantManagement } from "./pages/ApplicantManagement.jsx";
import { EmployerJobListings } from "./pages/EmployerJobListings.jsx";
import { EmployerCompanyProfile } from "./pages/EmployerCompanyProfile.jsx";
import { EmployerAnalytics } from "./pages/EmployerAnalytics.jsx";
import { EmployerNotifications } from "./pages/EmployerNotifications.jsx";
// import { EmployerSettings } from "./pages/EmployerSettings.jsx";
import EmployerSettings from "./pages/EmployerSettings.jsx";
import { CompanyRequests } from "./pages/CompanyRequests.jsx";
import { ContactUs } from "./pages/ContactUs.jsx";
import { TermsOfUse } from "./pages/TermsOfUse.jsx";
import { ShippingPolicy } from "./pages/ShippingPolicy.jsx";
import { RefundPolicy } from "./pages/RefundPolicy.jsx";
import { PrivacyPolicy } from "./pages/PrivacyPolicy.jsx";
import { ApplicantTerms } from "./pages/ApplicantTerms.jsx";
import { Faqs } from "./pages/Faqs.jsx";
import { Payment } from "./pages/Payment.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { AdminLogin } from "./pages/AdminLogin.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { CandidateLayout } from "./components/CandidateLayout.jsx";
import { EmployerLayout } from "./components/EmployerLayout.jsx";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
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
      { path: "employer/login", Component: EmployerLogin },
      { path: "employer/register", Component: EmployerRegister },
    ],
  },
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
  {
    path: "/employer",
    element: (
      <ProtectedRoute allowedRoles={["employer"]} redirectTo="/employer/login">
        <EmployerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/employer/dashboard" replace /> },
      { path: "dashboard", Component: EmployerDashboard },
      { path: "jobs", Component: EmployerJobListings },
      // { path: "applicants", Component: ApplicantManagement }, // Applicants tab commented out
      { path: "company-profile", Component: EmployerCompanyProfile },
      { path: "analytics", Component: EmployerAnalytics },
      { path: "notifications", Component: EmployerNotifications },
      { path: "settings", Component: EmployerSettings },
      { path: "company-requests", Component: CompanyRequests },
      { path: "contact-us", Component: ContactUs },
      { path: "post-job", Component: PostJob },
    ],
  },
  // ── Admin ──
  { path: "/admin/login", Component: AdminLogin },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  { path: "*", Component: NotFound },
]);


