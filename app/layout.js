/* Phần 1: Import các thư viện cần thiết */
import { Geist, Geist_Mono } from "next/font/google";/* hai kiểu chữ(font) từ Google */
import "./globals.css";/* file css global */

/* Phần 2: Định nghĩa các biến css cho font geistSans và geistMono */
const geistSans = Geist({
  variable: "--font-geist-sans",/* định nghĩa biến css cho font geistSans */
  subsets: ["latin"],/* định nghĩa tập hợp các ký tự Latin */
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",/* định nghĩa biến css cho font geistMono */
  subsets: ["latin"],/* định nghĩa tập hợp các ký tự Latin */
});

/* Phần 3: Định nghĩa metadata của trang web */
export const metadata = {
  title: "Do Duc Khanh Nguyen | Blog & Portfolio",/* tiêu đề của trang web */
  description: "My personal blog & portfolio: Data Science, Engineering, and Life",/* mô tả của trang web; mô tả hiện trên kết quả Google Search */
};

/* Phần 4: Định nghĩa RootLayout */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


/*
RootLayout = khung HTML bọc ngoài toàn bộ trang web
{children} = prop đặc biệt — đại diện cho nội dung của từng trang con

Hình dung cấu trúc:

RootLayout (layout.js)
└── <html>
    └── <body>
        └── {children} ← page.js điền vào đây
*/