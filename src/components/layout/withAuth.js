import { useRouter } from "next/router";
import { useAuth } from "../../contex/AuthContex";
import { useEffect } from "react";
import LoadingScreen from "../ui/LoadingScreen";

export default function withAuth(Component) {
  return function ProtectedPage(props) {
    const { isAuth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuth) {
        router.replace("/signup");
      }
    }, [isAuth, loading]);
    if (loading) return <LoadingScreen />;
    return isAuth ? <Component {...props} /> : null;
  };
}
