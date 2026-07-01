import { buildDrugSitemapByLetter } from "@/lib/drugSitemap";

export async function GET() {
  return buildDrugSitemapByLetter("m");
}
