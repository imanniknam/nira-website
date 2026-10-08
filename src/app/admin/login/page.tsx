import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-blush">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="eyebrow-latin block">Nira CMS</span>
          <h1 className="text-2xl font-bold text-accent mt-2">ورود به پنل مدیریت</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
