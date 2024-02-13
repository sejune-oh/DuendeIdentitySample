import Layout from "@/components/layout";
import { Context } from "@/context/contextProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

interface Params {}

function Security<Props extends Params>({}: Props): React.ReactNode {
  const { currentMenu } = useContext(Context);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (currentMenu && currentMenu.role.length > 0) {
      if (!session) {
        alert("Unauthorization!!!");
        router.push("/");
      }
    }
  }, [currentMenu]);

  return (
    <Layout>
      <main className="h-full flex justify-center items-center">
        <div>Security Page</div>
      </main>
    </Layout>
  );
}

export default Security;
