export function Footer() {
  return (
    <footer className="border-t border-[#2b2b2b] py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex items-center justify-between text-[12px] text-[#5c5c5c]">
          <p>© 2024 Solscan Echo. No wallet connection required.</p>
          <a
            href="https://solscan.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8a8a8a] transition-colors"
          >
            Powered by Solana
          </a>
        </div>
      </div>
    </footer>
  );
}