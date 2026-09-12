import { proxyCmApi } from "@/lib/proxyCmApi";

export const GET = () => proxyCmApi("/provinces/all");
