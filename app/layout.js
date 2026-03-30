/* Phần 1: Import các thư viện cần thiết */
import { Geist, Geist_Mono, Merriweather } from "next/font/google";/* hai kiểu chữ(font) từ Google */
import "./globals.css";/* file css global */

/* Phần 2: Định nghĩa các biến css cho font geistSans và geistMono */
const geistSans = Geist({
  variable: "--font-geist-sans",/* định nghĩa biến css cho font geistSans */
  subsets: ["vietnamese", "latin"],/* định nghĩa tập hợp các ký tự Latin */
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",/* định nghĩa biến css cho font geistMono */
  subsets: ["vietnamese", "latin"],/* định nghĩa tập hợp các ký tự Latin */
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["vietnamese"],
  weight: ["400", "700"],
});

/* Phần 3: Định nghĩa metadata của trang web */
export const metadata = {
  title: "Do Duc Khanh Nguyen | Blog & Portfolio",/* tiêu đề của trang web */
  description: "My personal blog & portfolio: Data Science, Engineering, and Life",/* mô tả của trang web; mô tả hiện trên kết quả Google Search */
};

/* Phần 4: Định nghĩa RootLayout */
import { LanguageProvider } from "./context/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
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