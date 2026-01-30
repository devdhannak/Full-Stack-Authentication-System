import "./App.css";
import useAuth from "./auth/auth";
import AuthLandingPage from "./components/Home/AuthLandingPage";
function App() {
  const user = useAuth();
  console.log("USER: ", user);

  return (
    <div className="flex flex-col gap-2 p-10 justify-center items-center">
      <div>
        <AuthLandingPage />
      </div>
      {/* <h1 className="text-3xl font-bold">Welcome to Auth App</h1>

      <Calendar /> */}
    </div>
  );
}

export default App;
