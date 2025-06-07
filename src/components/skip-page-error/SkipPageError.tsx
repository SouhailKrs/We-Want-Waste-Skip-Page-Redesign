export default function SkipPageError() {
  return (
    <div className="flex flex-col items-center h-full justify-center  bg-light-grey/5">
      <h1 className="text-4xl font-bold text-text-primary mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-text-secondary mb-6">
        The page you are looking for does not exist.
      </p>
      <a href="/" className="text-primary hover:text-primary/80 transition-all duration-200">
        Go back to Home
      </a>
    </div>
  );
}