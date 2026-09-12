import { proxyCmApi } from "@/lib/proxyCmApi";

export const GET = () => proxyCmApi("/cities/all");
