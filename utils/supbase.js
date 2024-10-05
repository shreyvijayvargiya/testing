import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bbviewmsqgtepwkbpakl.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseApp = createClient(supabaseUrl, supabaseKey);
export default supabaseApp;
