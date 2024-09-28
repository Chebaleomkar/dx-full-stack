import { Metadata } from "next";
import PublicRoute from "@/components/PublicRoute";
import LoginPage from "@/components/Login/LoginPage";
import { DOMAIN } from "@/constant";

export const metadata: Metadata = {
  title: "DisciplineX Login",
  description: "Authentication forms for DisciplineX.",
  keywords: ["login", "DisciplineX", "authentication", "user login"],
  icons :{
    icon :`/images/DX.jpg`
  },
  robots: "index, follow", 
  openGraph: {
    title: "DisciplineX Login",
    description: "Authenticate and log in to your DisciplineX account.",
    url: `${DOMAIN}/login`,
    siteName: "DisciplineX",
    images: [
      {
        url: `${DOMAIN}/images/logo.jpeg`,
        width: 800,
        height: 600,
        alt: "DisciplineX Login",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@disciplinex",
    title: "DisciplineX Login",
    description: "Log in to your DisciplineX account.",
    images: [`${DOMAIN}/images/logo.jpeg`],
  },
};

export default function Login() {
  return (
    <>
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    </>
  );
}
