import Link from "next/link";
import { siteInfo } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Logo className="h-11 w-auto" />
          <p className="text-sm text-muted mt-4 max-w-xs leading-6">
            نیرا، جادویی از رایحه برای لحظات خاص زندگی. تولید، سفارشی‌سازی و پخش عطر و
            ادکلن با استانداردهای بین‌المللی.
          </p>
        </div>

        <div>
          <h5 className="font-medium mb-3">دسترسی سریع</h5>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link className="hover:text-accent" href="/shop">
                فروشگاه
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/catalog">
                کاتالوگ
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/gallery">
                گالری نیرا
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/archive">
                آرشیو پروژه‌ها
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-3">خدمات</h5>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link className="hover:text-accent" href="/custom-order">
                عطر اختصاصی سازمانی
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/contact">
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-3">ارتباط با ما</h5>
          <ul className="space-y-2 text-sm text-muted">
            <li>{siteInfo.address}</li>
            <li>{siteInfo.landline}</li>
            <li>{siteInfo.phone}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-xs text-muted text-center">
        © ۱۴۰۴ نیرا عطر صحرا. تمامی حقوق محفوظ است — نسخه نمونه اولیه (MVP)
      </div>
    </footer>
  );
}
