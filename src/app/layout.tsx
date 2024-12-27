// src/app/layout.tsx
import '../styles/globals.css';

export const metadata = {
  title: 'My Gym App',
  description: 'Track your workouts and progress with ease.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
