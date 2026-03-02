// tmp/_seed_contact_fields.mjs — seed facebook_name + zalo_name into site_content
const SUPABASE_URL = 'https://krgnpmizhzvpqvjvqyuc.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZ25wbWl6aHp2cHF2anZxeXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTIyNTAsImV4cCI6MjA4Nzk4ODI1MH0.JWyyqj83U-1XHLGpH3X6IXXm-roIJucM15Bl640dVEo';

const items = [
    { section: 'contact', key: 'facebook_name', value_vi: 'Crazydesign', value_en: 'Crazydesign', type: 'text' },
    { section: 'contact', key: 'zalo_name', value_vi: '+84 912 345 678', value_en: '+84 912 345 678', type: 'text' },
];

const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
    method: 'POST',
    headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(items),
});

if (res.ok) {
    console.log('✅ Seeded facebook_name + zalo_name successfully');
} else {
    const txt = await res.text();
    console.error('❌ Error:', res.status, txt);
}
