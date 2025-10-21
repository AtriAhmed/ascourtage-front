import { ReactNode, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';

import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Adherents from '../pages/user/Adherents';
import Declaration from '../pages/user/Declaration';
import { useAuthContext } from '../context/AuthProvider';
import Dashboard from '../pages/user/Dashboard';
import AdherentPrestataires from '../pages/user/AdherentPrestataires';
import Prestataires from '../pages/user/Prestataires';
import Bordereaux from '../pages/user/Bordereaux';
import BordereauDecomptes from '../pages/user/BordereauDecomptes';
import Loading from '../components/Loading';
import DecomptesPage from '../pages/user/DecomptesPage';
import CumulPrestataires from '../pages/user/CumulPrestataires';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Users from '../pages/admin/Users';
import Declarations from '../pages/admin/Declarations';
import AdherentsAdmin from '../pages/admin/AdherentsAdmin';
import BordereauxAdmin from '../pages/admin/BordereauxAdmin';
import DecompteDetails from '../pages/user/DecompteDetails';
import CumulPrestatairesDetail from '../pages/user/CumulPrestataireDetail';
import ProfileEdit from '../pages/ProfileEdit';
import UserEdit from '../pages/admin/UserEdit';
import Home from '../pages/Home';
import Message from '../pages/user/Message';
import MessageAdmin from '../pages/admin/MessageAdmin';
import AdminMessages from '../pages/admin/AdminMessages';
import AdherentDashboard from '../pages/adherent/AdherentDashboard';
import AdherentDetails from '../pages/adherent/AdherentDetails';
import AdherentDecomptesPage from '../pages/adherent/AdherentDecomptesPage';

export default function AnimatedRoutes() {
  const location = useLocation();
  const { user, userLoading } = useAuthContext();

  // Helper: Return where to redirect based on user role
  function getRedirectByRole(role: number) {
    switch (role) {
      case 2: // Admin
        return '/admin/dashboard';
      case 4: // "Company/Societe" user
        return '/dashboard';
      case 5: // "Adherent" user
        return '/adherent/dashboard';
      default:
        // If user has a role that's not recognized, send them somewhere safe:
        return '/login';
    }
  }

  // Helper: Basic auth check
  // `requiresAdmin` is a boolean to check if the route is admin-only
  function auth(component: ReactNode, requiresAdmin = false) {
    if (userLoading) {
      return <Loading type="page" />;
    }
    if (!user) {
      // If there's no user, redirect to login
      return <Redirect to="/login" />;
    }
    // If route requires admin role (role === 2), check user
    if (requiresAdmin && user.role !== 2) {
      return <Redirect to="/login" />;
    }
    // Otherwise, user is allowed
    return component;
  }

  useEffect(() => {
    // Just to debug role in console:
    console.log('role: ', user?.role);
  }, [user]);

  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>

        {/* Public routes */}
        <Route path="/home" component={Home} exact />

        {/* Login Route */}
        <Route
          path="/login"
          exact
          render={() => {
            if (userLoading) {
              return <Loading type="page" />;
            }
            // If not logged in, show <Login />
            if (!user) {
              return <Login />;
            }
            // If user is logged in, redirect based on role
            return <Redirect to={getRedirectByRole(user.role)} />;
          }}
        />

        {/* Profile */}
        <Route
          path="/profile"
          exact
          render={() => auth(<Profile />)}
        />
        <Route
          path="/profile/edit"
          exact
          render={() => auth(<ProfileEdit />)}
        />

        {/* Adherent-only pages (role=5) - if you want a stricter check, do it inside `auth` or inline */}
        <Route
          path="/adherent/dashboard"
          exact
          render={() => auth(<AdherentDashboard />)}
        />
        <Route
          path="/adherent/details"
          exact
          render={() => auth(<AdherentDetails />)}
        />
        <Route
          path="/adherent/decomptes"
          exact
          render={() => auth(<AdherentDecomptesPage />)}
        />

        {/* Common user pages (role=4 or role=5) — or any logged-in user */}
        <Route
          path="/prestataires"
          exact
          render={() => auth(<Prestataires />)}
        />
        <Route
          path="/bordereaux"
          exact
          render={() => auth(<Bordereaux />)}
        />
        <Route
          path="/decomptes/by-bordereau/:id"
          exact
          render={() => auth(<BordereauDecomptes />)}
        />
        <Route
          path="/decomptes"
          exact
          render={() => auth(<DecomptesPage />)}
        />
        <Route
          path="/decomptes/:id"
          exact
          render={() => auth(<DecompteDetails />)}
        />
        <Route
          path="/cumul-prestataires"
          exact
          render={() => auth(<CumulPrestataires />)}
        />
        <Route
          path="/cumul-prestataires/:id"
          exact
          render={() => auth(<CumulPrestatairesDetail />)}
        />
        <Route
          path="/declaration"
          exact
          render={() => auth(<Declaration />)}
        />
        <Route
          path="/assistance"
          exact
          render={() => auth(<Message />)}
        />
        <Route
          path="/dashboard"
          exact
          render={() => auth(<Dashboard />)}
        />
        <Route
          path="/adherents"
          exact
          render={() => auth(<Adherents />)}
        />
        <Route
          path="/prestataires/by-adherent/:id"
          exact
          render={() => auth(<AdherentPrestataires />)}
        />

        {/* Admin routes (role=2) */}
        <Route
          path="/admin/dashboard"
          exact
          render={() => auth(<AdminDashboard />, true)}
        />
        <Route
          path="/admin/messages"
          exact
          render={() => auth(<AdminMessages />, true)}
        />
        <Route
          path="/admin/messages/:id"
          exact
          render={() => auth(<MessageAdmin />, true)}
        />
        <Route
          path="/admin/users"
          exact
          render={() => auth(<Users />, true)}
        />
        <Route
          path="/admin/users/:id"
          exact
          render={() => auth(<UserEdit />, true)}
        />
        <Route
          path="/admin/bordereaux"
          exact
          render={() => auth(<BordereauxAdmin />, true)}
        />
        <Route
          path="/admin/adherents"
          exact
          render={() => auth(<AdherentsAdmin />, true)}
        />
        <Route
          path="/admin/declarations"
          exact
          render={() => auth(<Declarations />, true)}
        />

        {/* Catch-all redirect: if no path matches, go to /home */}
        <Redirect exact from="/" to="/home" />
      </Switch>
    </AnimatePresence>
  );
}
