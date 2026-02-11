# Crazydesign — Premium Interior Design Portfolio

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-v18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-v5.4.21-purple.svg)

Trang web portfolio chuyên nghiệp dành cho **Crazydesign** — đơn vị thiết kế nội thất cao cấp. Dự án được xây dựng với mục tiêu mang lại trải nghiệm thị giác ấn tượng, hiệu năng cao và khả năng mở rộng dễ dàng.

🌐 **Demo:** [https://Coang2623.github.io/crazy_design_web/](https://Coang2623.github.io/crazy_design_web/)

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

Dự án sử dụng các công nghệ hiện đại nhất trong hệ sinh thái React:

-   **Core:** React 18, Vite 5
-   **Styling:** Tailwind CSS (với thiết kế tùy chỉnh Typography & Colors)
-   **Content:** Velite (quản lý nội dung MDX, Type-safe)
-   **Animation:** Framer Motion (cho các hiệu ứng chuyển động mượt mà)
-   **Routing:** React Router DOM v6
-   **i18n:** React-i18next (hỗ trợ song ngữ Anh - Việt)
-   **SEO:** React Helmet Async
-   **Icons:** Material Icons & Google Fonts (Playfair Display, Inter)
-   **Deploy:** GitHub Pages (tự động hóa với `gh-pages`)

---

## 🚀 Hướng Dẫn Cài Đặt (Installation)

Để chạy dự án trên máy local, bạn cần cài đặt **Node.js** (phiên bản 18+ khuyến nghị).

### 1. Clone dự án

```bash
git clone https://github.com/Coang2623/crazy_design_web.git
cd crazy_design_web
```

### 2. Cài đặt thư viện (Dependencies)

Sử dụng `npm` để cài đặt các gói cần thiết:

```bash
npm install
```

### 3. Chạy môi trường phát triển (Development)

Lệnh sau sẽ khởi động server Vite và Velite (quản lý nội dung):

```bash
npm run dev
```

-   Truy cập: `http://localhost:5173`
-   Chế độ HMR (Hot Module Replacement) được bật sẵn giúp cập nhật code tức thì.

---

## 📖 Hướng Dẫn Sử Dụng (Usage)

### Cấu Trúc Thư Mục

```
src/
├── assets/          # Hình ảnh, logo, static files
├── components/      # Các component tái sử dụng
│   ├── common/      # Button, Card, Input, Lightbox...
│   ├── layout/      # Header, Footer
│   ├── sections/    # Hero, About, Projects, Contact...
├── contexts/        # ThemeContext, LanguageContext
├── hooks/           # Custom hooks (useMDX, useScroll...)
├── lib/             # Tiện ích (config, api, analytics)
├── pages/           # Các trang chính (Home, Projects, Blog)
├── styles/          # Global styles, Tailwind setup
├── translations/    # File ngôn ngữ (en.js, vi.js)
```

### Thêm Dự Án Mới (Portfolio)

Dự án sử dụng **Velite** để quản lý nội dung. Các dự án nằm trong thư mục `content/projects/`.

1.  Tạo file `.mdx` mới trong `content/projects/`.
2.  Điền thông tin theo mẫu Frontmatter:

```yaml
---
slug: "ten-du-an"
title: "Tên Dự Án"
date: 2024-03-20
coverImage: "/images/projects/project-1.jpg"
summary: "Mô tả ngắn gọn về dự án..."
tags: ["Workshop", "Industrial"]
language: "vi" # hoặc "en"
translationKey: "project-1" # Dùng để liên kết bản dịch Anh-Việt
images: # Danh sách ảnh cho gallery
  - "/images/projects/project-1-a.jpg"
  - "/images/projects/project-1-b.jpg"
---

Nội dung chi tiết của dự án viết bằng Markdown...
```

### Cấu Hình Hệ Thống

Chỉnh sửa file `src/lib/config.js` để thay đổi các thông tin toàn cục:

-   **Site Info:** Tên trang web, mô tả mặc định.
-   **Contact:** Email, số điện thoại, link mạng xã hội.
-   **Features:** Bật/tắt Dark Mode, Analytics, v.v.

---

## 🧪 Testing

Dự án tích hợp sẵn **Vitest** để kiểm thử unit test.

```bash
npm test
```

Để chạy test và xem báo cáo chi tiết:

```bash
npx vitest run --reporter=verbose
```

---

## 📦 Build & Deploy

### Tạo bản Build Production

Lệnh này sẽ tối ưu hóa code, nén ảnh và tạo thư mục `dist`:

```bash
npm run build
```

### Deploy lên GitHub Pages

Để deploy phiên bản mới nhất lên GitHub Pages:

```bash
npm run deploy
```

*Lưu ý: Lệnh này sẽ tự động chạy build trước khi deploy.*

---

## 🤝 Đóng Góp (Contributing)

1.  Fork dự án
2.  Tạo branch tính năng (`git checkout -b feature/AmazingFeature`)
3.  Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4.  Push lên branch (`git push origin feature/AmazingFeature`)
5.  Tạo Pull Request

---

## 📄 License

Dự án được phát hành dưới giấy phép [MIT](LICENSE).

---

**Liên hệ:**
-   Email: [contact@crazydesign.com](mailto:contact@crazydesign.com)
-   Website: [https://crazydesign.com](https://crazydesign.com)
