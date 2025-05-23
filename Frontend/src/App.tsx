import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/NotFound";
import UserProfiles from "./pages/UserProfiles";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import { User } from "./interfaces";
import { useAuthStore } from "./stores/auth.store";
import { PostPage } from "./pages/PostPage";


export default function App() {

  const user = useAuthStore(state => state.user)



  type ProtectedRouteProps = {
    user_: User | null;
    redirectPath?: string;
  };

  const ProtectedRoute = ({ user_, redirectPath = "/signin" }: ProtectedRouteProps) => {
    if (!user_) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute user_={user ? user : null} />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/posts" element={<PostPage />} />

            </Route>
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
