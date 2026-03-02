
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: 'd:/workspaces/Web/crazy_design/.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    console.log('\n--- Testing INSERT (anon) ---');
    const { data, error } = await supabase
        .from('bookings')
        .insert([
            {
                name: 'Node Test User',
                phone: '00000000',
                date: '2026-03-03',
                time_slot: 'morning',
                note: 'Testing from script'
            }
        ])
        .select();

    if (error) {
        console.error('Insert Failed:', error);
    } else {
        console.log('Insert Success:', data);
    }
}

testInsert();
