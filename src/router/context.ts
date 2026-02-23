import type { UserPayload } from "@/api/server/utils/jwtUtils";

export type RouterContext = {
  user: UserPayload | null
}