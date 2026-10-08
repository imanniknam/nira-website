import { requireAdmin, adminUsername } from "@/lib/auth";
import { Card } from "../../ui";
import { PasswordForm } from "./PasswordForm";

export default async function SettingsPage() {
  await requireAdmin();
  return (
    <div className="max-w-2xl pb-16 space-y-5">
      <h1 className="text-xl font-bold text-accent">تنظیمات و پشتیبان</h1>

      <Card title="تغییر رمز عبور">
        <p className="text-xs text-muted mb-4">
          نام کاربری فعلی: <b dir="ltr" className="text-foreground">{await adminUsername()}</b>
        </p>
        <PasswordForm />
      </Card>

      <Card title="نسخه پشتیبان">
        <p className="text-sm text-muted leading-7">
          یک فایل JSON از همه‌ی متن‌های ویرایش‌شده، محصولات (با قیمت‌ها)، رویدادها، پروژه‌ها و پیام‌های دریافتی دانلود کنید و
          آن را جای امنی نگه دارید. تصاویر آپلودشده داخل این فایل نیستند؛ آن‌ها را مدیر فنی سایت هنگام پشتیبان‌گیری از سرور نگه می‌دارد.
        </p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download, not a page */}
        <a href="/api/admin/export" className="inline-flex mt-4 rounded-lg border border-line bg-white px-4 py-2 text-sm text-accent hover:border-accent">
          دانلود پشتیبان (JSON)
        </a>
      </Card>
    </div>
  );
}
