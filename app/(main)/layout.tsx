import { Metadata } from "next";
import Navbar from "../components/Appbar"; 
import { ScrollProvider } from "../contexts/scrollContext"; 
import { LmsAccessProvider } from "../components/LmsRegistrationModal";

export const metadata: Metadata = {
  title: "Persevex",
  description: "Empowering careers",
  
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollProvider>
      <LmsAccessProvider>
        <Navbar />
        {children}
      </LmsAccessProvider>
    </ScrollProvider>
  );
}
