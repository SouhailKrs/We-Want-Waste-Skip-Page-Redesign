export default function Footer() {
  const linkClass =
    "text-primary hover:text-primary/80 hover:underline transition-all duration-200";

  return (
    <footer className="flex justify-center items-cente flex-wrap p-6 text-small text-text-primary">
      <p className="text-small">© {new Date().getFullYear()}&nbsp;</p>
      <a
        target="_blank"
        href="https://www.souhailkrissaane.com"
        className={linkClass}
      >
        Souhail Krissaane
      </a>
      &nbsp;X&nbsp;
      <a target="_blank" href="https://wewantwaste.co.uk" className={linkClass}>
        We Want Waste
      </a>
    </footer>
  );
}
