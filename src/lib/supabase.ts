// Re-export the auto-generated Lovable Cloud client.
// Cast as `any` so existing services that reference tables not yet created
// don't break the TypeScript build. Auth still works fully-typed via the
// underlying client.
import { supabase as typedSupabase } from "@/integrations/supabase/client";
export type { Database } from "@/integrations/supabase/types";

export const supabase = typedSupabase as any;
