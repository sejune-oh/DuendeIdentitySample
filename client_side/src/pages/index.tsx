import dynamic from "next/dynamic";

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
