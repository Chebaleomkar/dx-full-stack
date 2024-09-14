import DxIcon from "@/components/Icons/DxIcon";
import Home from "@/components/Home";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div className="bg mt-20 flex items-center rounded-2xl  justify-center h-[35rem] p-5 max-sm:h-[20rem] max-sm:mt-10 max-sm:m-2 max-sm:rounded-3xl">
          <DxIcon className="h-40 max-sm:h-20 " />
        </div>
        <Home />
        <Footer />
      </div>
    </>
  );
}
