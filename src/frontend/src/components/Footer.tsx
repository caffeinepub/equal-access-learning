export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-2">
        <p className="text-sm">
          &copy; {year} Equal Access Learning. All rights reserved.
        </p>
        <p className="text-xs text-gray-600">
          &copy; {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-500 transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
