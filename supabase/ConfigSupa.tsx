import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://piqahyswnmqueabjcsec.supabase.co',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcWFoeXN3bm1xdWVhYmpjc2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTkyNzEsImV4cCI6MjA2NzAzNTI3MX0.bg5q7rA_5dEzIVnrco_THuMaiTTmb9Rj4cJLdI6Ydvs')