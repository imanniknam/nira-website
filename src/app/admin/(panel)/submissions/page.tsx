import { requireAdmin } from "@/lib/auth";
import { getSubmissions } from "@/lib/db";
import { SubmissionList } from "./SubmissionList";

export default async function SubmissionsPage() {
  await requireAdmin();
  const submissions = await getSubmissions();
  return (
    <div className="max-w-4xl pb-16">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-accent">پیام‌ها و درخواست‌ها</h1>
        <p className="text-sm text-muted mt-1">
          فرم تماس، درخواست همکاری شرکتی و درخواست خرید مشتریان اینجا جمع می‌شود.
        </p>
      </header>
      <SubmissionList items={submissions} />
    </div>
  );
}
