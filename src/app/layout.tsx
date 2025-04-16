import './globals.css';

export const metadata = {
  title: 'Next Challenge',
  description: 'The basic Next.js coding skill challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="mx-4">{children}</body>
    </html>
  );
}
