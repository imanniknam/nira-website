import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/MotionSection";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "ورود | نیرا عطر صحرا",
};

export default function LoginPage() {
  return (
    <div>
      <PageHero eyebrow="حساب کاربری" title="ورود به نیرا" />
      <div className="max-w-md mx-auto px-4 sm:px-8 py-14">
        <FadeUp>
          <LoginForm />
          <p className="text-center text-sm text-muted mt-6">
            حساب کاربری ندارید؟{" "}
            <Link href="/register" className="text-accent hover:underline">
              ثبت‌نام کنید
            </Link>
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
