import ThemeSwitcher from "../theme-switcher/ThemeSwitcher";

export default function NavBar() {
  return (
    <nav className="flex justify-end py-4 w-full">
      <ThemeSwitcher />
    </nav>
  );
}
