import { createClient } from '@supabase/supabase-js'
import { supabaseKey, supabaseUrl } from '../secrets/CredencialesSupa'

export const supabase = createClient(supabaseUrl,
     supabaseKey)