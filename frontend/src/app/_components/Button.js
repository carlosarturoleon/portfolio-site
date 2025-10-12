import Link from "next/link";

export default function Button({
  href = "#contact",
  children = "Get Started",
  variant = "primary" // "primary" or "dark"
}) {
  const baseClasses = "inline-block text-neutral-0 text-5 rounded-full transition-colors";
  const variantClasses = variant === "dark"
    ? "bg-neutral-900 px-300 py-100 md:px-500 md:py-150 hover:bg-brand-blue-500"
    : "bg-brand-red-500 px-500 py-150 hover:bg-brand-yellow-500";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </Link>
  );
}