import LoginForms from "@/components/forms/LoginForm";
import Layout from "@/components/layout";
import React from "react";

interface Params {}

export default function index({}: Params): React.ReactNode {
  return (
    <Layout>
      <div className="h-full flex justify-center items-center">
        <LoginForms />
      </div>
    </Layout>
  );
}
