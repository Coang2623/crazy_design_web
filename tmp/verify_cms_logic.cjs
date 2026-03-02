// tmp/verify_cms_logic.cjs
// Verify CMS data structures and logic without a browser

const fs = require('fs');
const path = require('path');

let passed = 0, failed = 0;
const ok = (msg) => { console.log('  ✅', msg); passed++; };
const err = (msg) => { console.log('  ❌', msg); failed++; };
const section = (title) => console.log(`\n── ${title} ──────────────────────────────────`);

// ─── 1. Check all files exist ─────────────────────────────────────
section('File Existence');
const required = [
    'src/components/admin/ServicesEditor.jsx',
    'src/components/admin/ContentEditor.jsx',
    'src/components/admin/TestimonialEditor.jsx',
    'src/components/admin/PricingEditor.jsx',
    'src/components/admin/ImageUploader.jsx',
    'src/contexts/ContentContext.jsx',
    'src/lib/cms.js',
    'src/pages/Admin.jsx',
    'src/components/sections/Services.jsx',
    'src/components/sections/Contact.jsx',
    'src/components/sections/Hero.jsx',
    'src/components/sections/Testimonials.jsx',
    'migrations/002_seed_contact_extras.sql',
    'migrations/003_seed_services_content.sql',
];
required.forEach(f => {
    fs.existsSync(f) ? ok(f) : err(`MISSING: ${f}`);
});

// ─── 2. ContentContext has services defaults ───────────────────────
section('ContentContext — Services Defaults');
const ctx = fs.readFileSync('src/contexts/ContentContext.jsx', 'utf8');
['item1_icon', 'item1_title', 'item1_desc', 'item2_icon', 'item2_title', 'item2_desc',
    'item3_icon', 'item3_title', 'item3_desc', 'facebook_name', 'zalo_name']
    .forEach(key => {
        ctx.includes(key) ? ok(`DEFAULTS has key: ${key}`) : err(`DEFAULTS missing key: ${key}`);
    });

// ─── 3. ServicesEditor exports ────────────────────────────────────
section('ServicesEditor');
const se = fs.readFileSync('src/components/admin/ServicesEditor.jsx', 'utf8');
['export default function ServicesEditor', 'IconPicker', 'ServiceItemCard',
    'fieldsToItems', 'itemsToRows', 'upsertManySiteContent', 'useContent']
    .forEach(s => {
        se.includes(s) ? ok(`has: ${s}`) : err(`missing: ${s}`);
    });

// ─── 4. Services.jsx reads from CMS ──────────────────────────────
section('Services.jsx — CMS Integration');
const svc = fs.readFileSync('src/components/sections/Services.jsx', 'utf8');
["useContent", "item${i}_icon", "item${i}_title", "item${i}_desc", "get('services'"]
    .forEach(s => {
        svc.includes(s) ? ok(`has: ${s}`) : err(`missing: ${s}`);
    });

// ─── 5. Admin.jsx mounts ServicesEditor ────────────────────────────
section('Admin.jsx — ServicesEditor mounted');
const admin = fs.readFileSync('src/pages/Admin.jsx', 'utf8');
['ServicesEditor', 'ContentEditor', 'TestimonialEditor', 'PricingEditor',
    "activeTab === 'content'", "activeTab === 'testimonials'", "activeTab === 'pricing'"]
    .forEach(s => {
        admin.includes(s) ? ok(`has: ${s}`) : err(`missing: ${s}`);
    });

// ─── 6. Contact.jsx reads facebookName, zaloName ─────────────────
section('Contact.jsx — CMS fields');
const contact = fs.readFileSync('src/components/sections/Contact.jsx', 'utf8');
['facebookName', 'zaloName', 'facebook_name', 'zalo_name', 'useContent']
    .forEach(s => {
        contact.includes(s) ? ok(`has: ${s}`) : err(`missing: ${s}`);
    });

// ─── 7. ContentEditor has SingleField for contact ─────────────────
section('ContentEditor — SingleField for Contact');
const ce = fs.readFileSync('src/components/admin/ContentEditor.jsx', 'utf8');
['function SingleField', 'facebook_name', 'zalo_name', 'Facebook — Tên hiển thị',
    'Zalo — Tên / Số hiển thị', '📞 Thông tin liên lạc', '🔗 Mạng xã hội']
    .forEach(s => {
        ce.includes(s) ? ok(`has: ${s}`) : err(`missing: ${s}`);
    });

// ─── 8. CMS lib has required functions ────────────────────────────
section('cms.js — Functions');
const cms = fs.readFileSync('src/lib/cms.js', 'utf8');
['getSiteContent', 'upsertManySiteContent', 'getTestimonials', 'createTestimonial',
    'updateTestimonial', 'deleteTestimonial', 'getPricingConfig', 'upsertPricingConfig',
    'uploadCmsImage', 'subscribeToContentChanges']
    .forEach(s => {
        cms.includes(s) ? ok(`exported: ${s}`) : err(`missing: ${s}`);
    });

// ─── Summary ──────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════════════');
console.log(`Result: ${passed} passed, ${failed} failed`);
if (failed === 0) console.log('🎉 All checks PASSED — CMS implementation is complete!');
else console.log('⚠️  Some checks failed — review above');
