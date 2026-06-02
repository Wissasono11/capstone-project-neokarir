const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: {
    persistSession: false,
  }
});

async function run() {
  const email = 'testuser@neokarir.com';
  const password = 'TestPassword123!';
  
  console.log('Logging in...');
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (loginError) {
    console.error('Login error:', loginError);
    return;
  }
  
  const token = loginData.session.access_token;
  console.log('Token generated:', token.substring(0, 20) + '...');
  
  console.log('Getting user...');
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  
  if (userError) {
    console.error('getUser error:', userError);
  } else {
    console.log('getUser success! User ID:', userData.user.id);
  }
}

run();
