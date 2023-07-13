import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function ConfigurationLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <section className="h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <Link to="https://turistikrota.com" target="_blank" className="flex items-center mb-6">
          <Logo />
        </Link>
        <div className="w-full bg-second shadow-lg rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          {children}
        </div>
      </div>
    </section>
  );
}