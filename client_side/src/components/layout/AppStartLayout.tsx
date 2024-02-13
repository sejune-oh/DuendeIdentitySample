import { setInterseptor } from "@/services/axios";
import { useSession } from "next-auth/react";
import { memo, useEffect } from "react";

interface Params {
  children: React.ReactNode;
}

function AppStartLayout({ children }: Params): React.ReactNode {
  const { data: session } = useSession();

  useEffect(() => {
    setInterseptor(session || null);
  }, [session]);

  return <div>{children}</div>;
}

export default memo(AppStartLayout);
