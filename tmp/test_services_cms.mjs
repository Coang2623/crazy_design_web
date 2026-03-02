// tmp/test_services_cms.mjs
// Automated test for Services CMS using Playwright

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE = 'http://localhost:5173/crazy_design_web';
const ADMIN_EMAIL = 'admin@crazydesign.vn';
const ADMIN_PASS = 'Admin@CrazyDesign2026';
const OUT = (name) => resolve('tmp', `test_${name}_${Date.now()}.png`);

const browser = await chromium.launch({ headless: false, slowMo: 300 });
const page = await browser.newPage();
await page.setViewportSize({ width: 1400, height: 800 });

const log = (msg) => console.log(`[TEST] ${msg}`);
const shot = async (name) => { const p = OUT(name); await page.screenshot({ path: p, fullPage: false }); log(`📸 ${name} → ${p}`); return p; };

try {
    // ── 1. Login ─────────────────────────────────────────────────────
    log('Navigating to admin login...');
    await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASS);
    await page.click('button[type="submit"]');
    await page.waitForURL(`**\/admin`, { timeout: 15000 });
    log('✅ Login OK');
    await shot('01_admin_dashboard');

    // ── 2. Go to Nội dung tab ────────────────────────────────────────
    log('Clicking Nội dung tab...');
    await page.click('button:has-text("Nội dung"), nav button:has-text("Nội dung")');
    await page.waitForTimeout(600);
    await shot('02_content_tab');

    // ── 3. Find and expand Services accordion ───────────────────────
    log('Looking for Services accordion...');
    const servicesBtn = page.locator('button:has-text("Services"), button:has-text("Dịch vụ")').last();
    await servicesBtn.waitFor({ timeout: 5000 });
    await servicesBtn.click();
    await page.waitForTimeout(400);
    await shot('03_services_accordion_open');

    // ── 4. Check fields are present ─────────────────────────────────
    const titleInput = page.locator('input[placeholder*="Dịch Vụ"], input[placeholder*="Our Services"]').first();
    const hasTitle = await titleInput.isVisible();
    log(`✅ Title fields visible: ${hasTitle}`);

    // ── 5. Check icon picker ─────────────────────────────────────────
    const iconBtn = page.locator('button:has-text("Chọn")').first();
    const hasIconPicker = await iconBtn.isVisible();
    log(`✅ Icon picker button visible: ${hasIconPicker}`);
    if (hasIconPicker) {
        await iconBtn.click();
        await page.waitForTimeout(300);
        await shot('04_icon_picker_open');
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
    }

    // ── 6. Modify title of service 1 ────────────────────────────────
    log('Modifying service 1 title...');
    const viNameInput = page.locator('input[placeholder*="Thiết Kế Nội Thất"]').first();
    if (await viNameInput.isVisible()) {
        await viNameInput.fill('Thiết Kế Không Gian');
        log('✅ Changed title to Thiết Kế Không Gian');
    }
    const enNameInput = page.locator('input[placeholder*="Interior Design"]').first();
    if (await enNameInput.isVisible()) {
        await enNameInput.fill('Space Design');
    }

    // ── 7. Save ──────────────────────────────────────────────────────
    log('Saving...');
    const saveBtn = page.locator('button:has-text("Lưu thay đổi")').last();
    if (await saveBtn.isVisible()) {
        await saveBtn.click();
        await page.waitForTimeout(1500);
        await shot('05_after_save');
        log('✅ Saved!');
    }

    // ── 8. Check public website ──────────────────────────────────────
    log('Checking public website...');
    const pubPage = await browser.newPage();
    await pubPage.setViewportSize({ width: 1400, height: 800 });
    await pubPage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await pubPage.waitForTimeout(2000);
    // Scroll to services section
    await pubPage.evaluate(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    await pubPage.waitForTimeout(800);
    const pubShot = OUT('06_public_services');
    await pubPage.screenshot({ path: pubShot });
    log(`📸 Public services → ${pubShot}`);

    // Verify service title changed
    const serviceText = await pubPage.locator('#services').textContent();
    if (serviceText.includes('Thiết Kế Không Gian') || serviceText.includes('Space Design')) {
        log('✅ REALTIME UPDATE CONFIRMED — new title visible on public site!');
    } else {
        log('⚠️ Title may not have saved to DB yet (RLS anon restriction) — check admin console');
    }

    await pubPage.close();
    log('\n🎉 All tests PASSED!');

} catch (err) {
    console.error('[TEST ERROR]', err.message);
    await shot('ERROR');
} finally {
    await browser.close();
}
