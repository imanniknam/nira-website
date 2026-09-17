import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FadeUp } from "@/components/MotionSection";
import { RegisterForm } from "./RegisterForm";

export const metadata = {
  title: "ثبت‌نام | نیرا عطر صحرا",
};

export default function RegisterPage() {
  return (
    <div>
      <PageHero
        eyebrow="My Account"
        title="ثبت‌نام در نیرا"
        image="/img/brand/marble-rose.png"
      />
      <div className="max-w-md mx-auto px-4 sm:px-8 py-14">
        <FadeUp>
          <RegisterForm />
          <p className="text-center text-sm text-muted mt-6">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="text-accent hover:underline">
              وارد شوید
            </Link>
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
