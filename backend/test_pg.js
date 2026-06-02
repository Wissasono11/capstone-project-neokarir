require('dotenv').config();
const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client({
  connectionString: DATABASE_URL,
});

async function run() {
  await client.connect();
  console.log('Connected to database via pooler.');

  try {
    console.log('\n--- Checking Tables ---');
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    console.log('Public tables:', tablesRes.rows.map(r => r.table_name));

    console.log('\n--- Checking Users Table Schema ---');
    const colsRes = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'users';
    `);
    console.log('Users columns:');
    console.table(colsRes.rows);

    console.log('\n--- Checking Trigger Functions ---');
    const funcRes = await client.query(`
      SELECT routine_name 
      FROM information_schema.routines 
      WHERE routine_schema = 'public' AND routine_name = 'handle_new_user';
    `);
    console.log('Trigger functions:', funcRes.rows.map(r => r.routine_name));

    console.log('\n--- Attempting Manual Insert to public.users ---');
    const fakeId = '00000000-0000-0000-0000-000000000001';
    const insertRes = await client.query(`
      INSERT INTO public.users (id, email, role, raw_user_meta, app_metadata, user_metadata)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [fakeId, 'test_manual@neokarir.com', 'user', '{}', '{}', '{}']);
    console.log('Insert success:', insertRes.rows[0]);
    
    // Clean up
    await client.query('DELETE FROM public.users WHERE id = $1', [fakeId]);
    console.log('Cleanup success.');
  } catch (err) {
    console.error('Database Error:', err.message);
    if (err.detail) console.error('Detail:', err.detail);
    if (err.hint) console.error('Hint:', err.hint);
  } finally {
    await client.end();
  }
}

run();
