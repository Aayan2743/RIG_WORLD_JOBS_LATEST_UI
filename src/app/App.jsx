import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { JobsProvider } from './context/JobsContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <JobsProvider>
        <RouterProvider router={router} />
      </JobsProvider>
    </AuthProvider>
  );
}
