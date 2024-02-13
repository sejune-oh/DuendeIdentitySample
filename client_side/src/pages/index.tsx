import LoginForms from "@/components/forms/LoginForm";
import LoginModal from "@/components/modal/LoginModal";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const Layout = dynamic(() => import("../components/layout"));

export default function Home() {
  return (
    <Layout>
      <div className="h-full flex flex-col justify-center items-center">
        Main Page
      </div>
    </Layout>
  );
}
