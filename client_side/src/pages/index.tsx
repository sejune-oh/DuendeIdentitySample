import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Layout = dynamic(() => import("../components/layout"));

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("🚀 ~ Home ~ session:", session);
    console.log("🚀 ~ Home ~ status:", status);
  }, [session, status]);

  return (
    <Layout>
      <div className="h-full flex flex-col justify-center items-center">
        Main Page
        {session ? (
          <>
            <div>Exist Session {`${session.user?.email}`}</div>
          </>
        ) : (
          <>
            <div>{`Can't found Session`}</div>
          </>
        )}
      </div>
    </Layout>
  );
}
