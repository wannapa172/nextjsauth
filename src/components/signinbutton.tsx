"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignin = () => {
    router.push("/signin");
  };
  if (session && session.user)
    return (
      <>
        <p>{session.user.name}</p>
        <button className="btn btn-primary">SignOut</button>
      </>
    );
  return (
    <>
      <button onClick={handleSignin} className="btn btn-primary">
        SignIn
      </button>
    </>
  );
};
export default SigninButton;
