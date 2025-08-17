import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreateQuesSetPage from "./Pages/Admin/QuestionSet/CreateQuesSetPage";
import NotFound from "./Pages/NotFound";
import { jwtDecode } from "jwt-decode";
import ListQuestionSetPage from "./Pages/Admin/QuestionSet/ListQuestionSetPage";
import AttemptQuizPage from "./Pages/Admin/QuestionSet/AttemptQuizPage";
import CreateProfile from "./Pages/Professionals/CreateProfile";
import Dashboard from "./Pages/Admin/AdminDashboard";
import ProfessionalDashboard from "./Pages/Professionals/ProfessionalDashboard";
import ProfessionalProtectedRoute from "./components/Professionals/ProfessionalProtectedRoute";
import People from "./Pages/Professionals/People";
import ProfilePage from "./Pages/Professionals/Profile";

// ---------- Auth Types ----------
export interface IAuthState {
  id: string,
  isAuth: boolean;
  role: "admin" | "professional" | "guest";
}

export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JwtDecode {
  id: string;
  role: "admin" | "professional";
}

// ---------- Auth Context ----------
export const AuthContext = createContext<IAuthContext>({
  id: "",
  isAuth: false,
  role: "guest",
  setAuthState: () => { },
});

// ---------- Layouts ----------
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="shrink-0">
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Admin sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">Admin Menu</aside>
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">{children}</main>
    </div>
  );
}

function ProfessionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="shrink-0">
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

// ---------- App Component ----------
function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    id: "",
    isAuth: false,
    role: "guest",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    async function fetchData() {
      await axios
        .get("http://localhost:3000/api/verify/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          const { id, role }: JwtDecode = jwtDecode(accessToken as string);
          setAuthState((prev) => ({
            ...prev,
            id: id,
            isAuth: true,
            role: role,
          }));
        })
        .catch(() => {
          localStorage.clear();
        });
    }

    fetchData();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        id: authState?.id,
        isAuth: authState.isAuth,
        role: authState?.role,
        setAuthState,
      }}
    >
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="*"
          element={
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          }
        />

        {!authState?.isAuth && (
          <>
            <Route
              path="/register"
              element={
                <PublicLayout>
                  <Register />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PublicLayout>
                  <Login />
                </PublicLayout>
              }
            />
          </>
        )}

        {/* ---------- Professional Routes ---------- */}
        {authState?.isAuth && authState.role === "professional" && (
          <>
            <Route
              path="/professional/home"
              element={
                <ProfessionalProtectedRoute>
                  <ProfessionalLayout>
                    <ProfessionalDashboard />
                  </ProfessionalLayout>
                </ProfessionalProtectedRoute>
              }
            />
            <Route
              path="/questionset/list"
              element={
                <ProfessionalProtectedRoute>

                  <ProfessionalLayout>
                    <ListQuestionSetPage />
                  </ProfessionalLayout>
                </ProfessionalProtectedRoute>
              }
            />
            <Route
              path="/questionset/:id/attempt"
              element={
                <ProfessionalProtectedRoute>
                  <ProfessionalLayout>
                    <AttemptQuizPage />
                  </ProfessionalLayout>
                </ProfessionalProtectedRoute>
              }
            />
            <Route
              path="/people"
              element={
                <ProfessionalProtectedRoute>
                  <ProfessionalLayout>
                    <People />
                  </ProfessionalLayout>
                </ProfessionalProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProfessionalProtectedRoute>
                  <ProfessionalLayout>
                    <ProfilePage />
                  </ProfessionalLayout>
                </ProfessionalProtectedRoute>
              }
            />
            <Route
              path="/profile/create"
              element={
                <ProfessionalLayout>
                  <CreateProfile />
                </ProfessionalLayout>
              }
            />
          </>
        )}

        {/* ---------- Admin Routes ---------- */}
        {authState?.role === "admin" && (
          <>
            <Route
              path="/admin/questionset/create"
              element={
                <AdminLayout>
                  <CreateQuesSetPage />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/"
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
          </>
        )}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
