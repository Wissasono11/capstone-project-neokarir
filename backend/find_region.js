const { Client } = require('pg');

const regions = [
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-south-1',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-central-1',
  'ca-central-1',
  'sa-east-1'
];

async function testRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const connectionString = `postgresql://postgres.rkzqnkcknsoleestgsnv:neo-karir-01@${host}:6543/postgres`;
  
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
  });
  
  try {
    await client.connect();
    await client.end();
    return { region, success: true, message: 'Connected successfully!' };
  } catch (err) {
    return { region, success: false, message: err.message };
  }
}

async function run() {
  console.log('Testing regions...');
  for (const region of regions) {
    const result = await testRegion(region);
    console.log(`Region: ${result.region} -> Success: ${result.success} | Message: ${result.message}`);
    if (result.success || result.message.includes('password authentication failed')) {
      console.log(`\n🎉 Found matching region: ${region}`);
      break;
    }
  }
}

run();
