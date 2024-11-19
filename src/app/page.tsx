import Header from "@/components/header";
import PostForm from "@/components/post-form";
import PostsFeed from "@/components/posts-feed";
import SidebarRight from "@/components/sidebar-right";
import UserInformation from "@/components/user-information";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function Home() {
  await delay(2000)
  return (
    <>
      <Header />
      <div className="bg-slate-100 min-h-screen grid grid-cols-8 gap-6 p-5">
        <div className={"hidden md:block md:col-span-2"}>
          <UserInformation />
        </div>
        <div className={"col-span-full md:col-span-6 lg:col-span-4 space-y-4"}>
          <PostForm />
          <PostsFeed />
        </div>
        <div className={"hidden lg:block lg:col-span-2"}>
          <SidebarRight />
        </div>
        <ToastContainer position={"bottom-left"} />
      </div>
    </>
  );
}


const delay = async(ms:number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}