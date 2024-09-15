import Form from "@/components/login/Form";
import { ModeToggle } from "@/components/ModeToggle";

export default function Login() {
  return (
    <main className="flex w-full min-h-[98vh] flex-col">
      <header className="w-full h-16 bg-secondary flex items-center justify-between p-2">
        <img
          src="/SitrauLogo-dark.svg"
          alt="Sitrau Logo"
          className="w-54 h-12 dark:block hidden"
        />
        <img
          src="/SitrauLogo.svg"
          alt="Sitrau Logo"
          className="w-54 h-12 dark:hidden block"
        />
        <ModeToggle />
      </header>
      <Form />
    </main>
  );
}
