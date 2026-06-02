require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: {
    persistSession: false,
  }
});

async function run() {
  const email = 'testuser@neokarir.com';
  const password = 'TestPassword123!';
  
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (loginError) {
    console.error('Login error:', loginError.message);
    return;
  }
  
  const token = loginData.session.access_token;
  
  try {
    const res = await fetch('http://localhost:3000/api/v1/market/trend/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        n_months: 3,
        domain: null
      })
    });
    
    const text = await res.text();
    console.log('Raw Express response text:', text);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

run();
