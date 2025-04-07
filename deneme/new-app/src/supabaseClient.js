import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://alooejwhubqlytkmryfr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsb29landodWJxbHl0a21yeWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MzI5MjIsImV4cCI6MjA1OTUwODkyMn0.ID1VfjvkXA9Oh68QJCKoOfgLCGwXhPCcANE_ci5Hyd0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 