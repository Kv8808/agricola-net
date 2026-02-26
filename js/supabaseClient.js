
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


export const supabase = createClient(
  'https://dclodqpggfezfqjzsrdx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbG9kcXBnZ2ZlemZxanpzcmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODE3MDgsImV4cCI6MjA4NzY1NzcwOH0.iPMP7wFXTkZMnI6LtG3CIgi_mQUxsBvU_oaRomVbNhM'
)


window.supabase = supabase