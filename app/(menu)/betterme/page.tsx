import ProtectedRoute from '@/components/ProtectedRoute';
import BetterMePage from '@/components/shared/BettterMePage';
import { DOMAIN } from '@/constant';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "DisciplineX | BetterMe - Growth & Learning Hub",
  description:
    "Access the latest news, engage in self-improvement through AI chat, and explore curated self-help videos. Empower your growth with DisciplineX's BetterMe.",
  keywords: [
    "BetterMe",
    "self-help",
    "personal growth",
    "latest news",
    "AI chat",
    "self-improvement",
    "learning resources",
    "DisciplineX",
  ],
  icons :{
    icon :`/images/DX.jpg`
  },
  openGraph: {
    title: "DisciplineX | BetterMe - Growth & Learning Hub",
    description:
      "Discover news, chat with AI, and watch curated self-help videos to enhance your personal growth. Join the BetterMe community in DisciplineX.",
    type: "website",
    url: `${DOMAIN}/betterme`,
    images: [
      {
        url: "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75", 
        width: 1200,
        height: 630,
        alt: "BetterMe - Growth & Learning Hub",
      },
    ],
    siteName: "DisciplineX",
  },
  twitter: {
    card: "summary_large_image",
    title: "BetterMe - Growth & Learning Hub | DisciplineX",
    description:
      "Engage with the latest news, chat with AI, and explore self-help resources to foster your personal growth.",
    images: [
      "https://disciplinexin.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN}/betterme`, 
  },
};
const BetterPage = () => {
  return (
    <ProtectedRoute allowedRoles={["Admin", "HeadAdmin", "Student"]}>
      <BetterMePage />
    </ProtectedRoute>
)}
export default BetterPage;
