
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sjcpcsbwnhlzdssmrbbp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqY3Bjc2J3bmhsemRzc21yYmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NzY2NjMsImV4cCI6MjA2MzA1MjY2M30.hECxNHkHc7mWGbCo-Ch-ZRgaLlNdZN0nwn2pmfPXir8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
