"use client";

type FooterProps = {
  companyName?: string;
};

export default function Footer({ companyName = "Spotter Labs" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center px-4 text-sm leading-loose text-muted-foreground md:text-left">
          © {year} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
