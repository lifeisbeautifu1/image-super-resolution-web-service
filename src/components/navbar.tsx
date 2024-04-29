import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between p-4">
        <p className="text-xl font-bold">Upscale images</p>
        <ThemeSwitch />
      </div>
    </nav>
  );
};
