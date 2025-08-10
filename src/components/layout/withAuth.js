import { useRouter } from "next/router";
import { useAuth } from "../../contex/AuthContex";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function ProtectedPage(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/signup");
      }
    }, [user]);

    return user ? <Component {...props} /> : null;
  };
}
