import { useEffect } from "react";
import "./App.css";
import AuthStatus from "./AuthStatus";
import DashboardHeader from "./components/DashboardHeader";
import AuthControls from "./components/auth/AuthControls";
import AuthenticatedContent from "./components/auth/AuthenticatedContent";
import { register as registerMouse } from "./state/mouse";

function App() {
  useEffect(registerMouse, []);

  return (
    <>
      <AuthStatus />
      <AuthControls />
      <div>
        This is some publicly viewable text, anyone can see this text and enjoy
        it!
      </div>
      <AuthenticatedContent>
        <div className="card">
          <div>This is some authenticated text, welcome to the club.</div>
          <h1>Dashboard</h1>
          <DashboardHeader />
        </div>
      </AuthenticatedContent>
    </>
  );
}

export default App;
