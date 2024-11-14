import AppLayout from "@ui/AppLayout";
import Home from "@ui/Home";
import Login from "@features/authentication/Login";
import SignUp from "@features/authentication/Signup";
import TaskDetails from "@features/tasks/TaskDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@contexts/authContext";
import { TaskProvider } from "@contexts/taskContext";
import PrivateRoute from "@features/navigation/PrivateRoute";
import NotFound from "@features/navigation/NotFound";
import { ThemeProvider } from "@contexts/themeContext";
import GlobalStyles from "./styles/globalStyles";
import { Toaster } from "react-hot-toast";
import Tasks from "@features/tasks/Tasks";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ThemeProvider>
          <GlobalStyles />
          <Router>
            <Toaster position="top-center" />
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="tasks/:id" element={<TaskDetails />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
