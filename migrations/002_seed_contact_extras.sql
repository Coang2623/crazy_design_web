-- migrations/002_seed_contact_extras.sql
-- Thêm facebook_name và zalo_name vào site_content

INSERT INTO public.site_content (section, key, value_vi, value_en, type)
VALUES
  ('contact', 'facebook_name', 'Crazydesign', 'Crazydesign', 'text'),
  ('contact', 'zalo_name', '+84 912 345 678', '+84 912 345 678', 'text')
ON CONFLICT (section, key) DO NOTHING;
