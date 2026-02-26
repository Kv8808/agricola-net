// js/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(
  'https://dclodqpggfezfqjzsrdx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbG9kcXBnZ2ZlemZxanpzcmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODE3MDgsImV4cCI6MjA4NzY1NzcwOH0.iPMP7wFXTkZMnI6LtG3CIgi_mQUxsBvU_oaRomVbNhM'
)

import { supabase } from './js/supabaseClient.js'

(async () => {

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    window.location.href = "login.html"
    return
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (user.user_metadata.role !== "admin") {
    alert("Acceso restringido")
    window.location.href = "index.html"
    return
  }

})();

// opcional para depuración en consola (puedes comentarlo)
window.supabase = supabase