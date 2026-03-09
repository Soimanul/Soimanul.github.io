export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-display text-base font-bold text-text-muted">VS</span>
        <p className="font-body text-xs text-text-muted">
          © {new Date().getFullYear()} Vlad Soimu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
