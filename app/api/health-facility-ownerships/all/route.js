import { proxyCmApi } from "@/lib/proxyCmApi";

export const GET = () => proxyCmApi("/health-facility-ownerships/all");
