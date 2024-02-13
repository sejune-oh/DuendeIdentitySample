import dynamic from "next/dynamic";
import { memo } from "react";

const Header = dynamic(() => import("../header"));

interface Params {
  children: React.ReactNode;
}

function index({ children }: Params): React.ReactNode {
  return (
    <div className="relative w-full h-screen">
      <div className="max-w-[1280px] bg-[#F6F6F6] mx-auto h-full">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default memo(index);
