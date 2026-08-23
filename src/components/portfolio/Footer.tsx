export function Footer() {
  return (
    <footer className="border-t border-border pb-28 pt-8">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Abhinab Das
        </p>
      </div>
    </footer>
  );
}
