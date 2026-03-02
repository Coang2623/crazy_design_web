-- migrations/003_seed_services_content.sql
-- Seed dịch vụ vào site_content để CMS quản lý được

INSERT INTO public.site_content (section, key, value_vi, value_en, type)
VALUES
  -- Section header
  ('services', 'title',    'Dịch Vụ Của Chúng Tôi', 'Our Services', 'text'),
  ('services', 'subtitle', 'Từ ý tưởng ban đầu đến lắp đặt hoàn chỉnh, chúng tôi cung cấp trọn gói dịch vụ thiết kế phù hợp với nhu cầu của bạn.',
   'From initial concept to final installation, we offer a comprehensive suite of design services tailored to your needs.', 'textarea'),
  -- Dịch vụ 1: Thiết kế nội thất
  ('services', 'item1_icon',  'space_dashboard', 'space_dashboard', 'text'),
  ('services', 'item1_title', 'Thiết Kế Nội Thất',  'Interior Design',  'text'),
  ('services', 'item1_desc',  'Lập kế hoạch không gian toàn diện, lựa chọn vật liệu và thiết kế ánh sáng để tạo ra môi trường đồng nhất.',
   'Holistic space planning, material selection, and lighting design to create a cohesive environment.', 'textarea'),
  -- Dịch vụ 2: Nội thất theo yêu cầu
  ('services', 'item2_icon',  'chair', 'chair', 'text'),
  ('services', 'item2_title', 'Nội Thất Theo Yêu Cầu', 'Custom Furniture', 'text'),
  ('services', 'item2_desc',  'Các sản phẩm nội thất đặt riêng được thiết kế và chế tác để phù hợp hoàn hảo với không gian và phong cách của bạn.',
   'Bespoke furniture pieces designed and crafted to fit your space and style perfectly.', 'textarea'),
  -- Dịch vụ 3: Quản lý dự án
  ('services', 'item3_icon',  'construction', 'construction', 'text'),
  ('services', 'item3_title', 'Quản Lý Dự Án',    'Project Management', 'text'),
  ('services', 'item3_desc',  'Giám sát toàn diện từ đầu đến cuối để đảm bảo dự án của bạn hoàn thành đúng tiến độ, đúng ngân sách và đạt tiêu chuẩn cao nhất.',
   'End-to-end oversight to ensure your project is completed on time, on budget, and to our high standards.', 'textarea')
ON CONFLICT (section, key) DO NOTHING;
