import DxIcon from "@/components/Icons/DxIcon";
import Home from "@/components/Home";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { DOMAIN } from "@/constant";

export const metadata: Metadata = {
  title: "DisciplineX - Revolutionizing Discipline Management in Educational Institutions",
  description: "DisciplineX is a cutting-edge platform that helps schools and colleges streamline discipline management, track student behavior, and promote a culture of accountability and success. Empower your institution with real-time insights, fine management, and rewards for disciplined students.",
  keywords: ["Discipline management","School discipline","College discipline system","Student behavior tracking","Education software","Fine management system","Student motivation","Teacher tools","Discipline rewards","DisciplineX"],
  icons :{
    icon :`/images/DX.jpg`
  },
  robots: "index, follow", 
  openGraph: {
    title: "DisciplineX - Elevate Your Learning",
    description: "Join DisciplineX to improve your learning experience and stay disciplined.",
    url: `${DOMAIN}`,
    siteName: "DisciplineX",
    images: [
      {
        url: `${DOMAIN}/images/logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "DisciplineX Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@disciplinex",
    title: "DisciplineX - Elevate Your Learning",
    description: "Join DisciplineX to enhance your discipline and learning.",
    images: [`${DOMAIN}/images/logo.jpeg`],
  },
};

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
