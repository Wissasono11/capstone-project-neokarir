const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function test() {
  const email = `testuser_${Date.now()}@gmail.com`;
  const password = 'TestPassword123!';
  
  console.log('Attempting signup for:', email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    console.error('Signup error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Signup success:', data);
  }
}

test();
