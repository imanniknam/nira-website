import { notFound } from "next/navigation";

/** Sends unknown URLs through the site's own 404 page (with header and footer). */
export default function CatchAll() {
  notFound();
}
