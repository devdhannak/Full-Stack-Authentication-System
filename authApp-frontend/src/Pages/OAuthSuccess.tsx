import useAuth from "@/auth/auth";
import { refreshToken } from "@/services/AuthService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function OAuthSuccess() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const changeLocalLoginData = useAuth((s) => s.changeLocalLoginData);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccessToken() {
      if (!isRefreshing) {
        // refresh token api call
        setIsRefreshing(true);
        try {
          const responseLoginData = await refreshToken();
          console.log("responseLoginData: ", responseLoginData);

          changeLocalLoginData(
            responseLoginData.accesstoken,
            responseLoginData.user,
            true,
          );
          toast.success("Login success");
          navigate("/dashboard");
        } catch (error) {
          toast.error("Error while login");
          console.log(error);
        } finally {
          setIsRefreshing(false);
        }
      }
    }
    getAccessToken();
  }, []);
  return (
    <div className="p-10 flex justify-center items-center gap-3">
      {/* <Spinner />
      <h1 className="text-2xl font-semibold ">Please wait..</h1> */}
    </div>
  );
}

export default OAuthSuccess;
