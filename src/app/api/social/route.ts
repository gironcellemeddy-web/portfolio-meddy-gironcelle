import { NextResponse } from "next/server";
import { getSocialStats } from "@/lib/socialStats";

// GET /api/social — renvoie les nombres d'abonnés par réseau (JSON).
// Utilise les APIs officielles si les clés sont configurées, sinon des replis.
export async function GET() {
  const stats = await getSocialStats();
  return NextResponse.json(stats, {
    headers: {
      // Cache CDN : 1 h, avec service du cache périmé pendant la revalidation.
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
