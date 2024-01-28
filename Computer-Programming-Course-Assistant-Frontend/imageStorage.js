import { createClient } from '@supabase/supabase-js'




const projectUrl = "https://raavtojoseeuqlsnyczk.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYXZ0b2pvc2VldXFsc255Y3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NzMzNTEsImV4cCI6MjAyMjA0OTM1MX0.iPwD1ks4na9T6URJoHt_YIEWNBUvf8qocfs3GEqqBdM" 

export const supabase = createClient(projectUrl, apiKey)
