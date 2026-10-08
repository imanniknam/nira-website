export const metadata = {
  title: "پنل مدیریت | نیرا",
  robots: { index: false, follow: false },
};

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 bg-background text-foreground">{children}</div>;
}
