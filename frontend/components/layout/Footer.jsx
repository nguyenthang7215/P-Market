"use client";

import Image from "next/image";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#c40000] text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        {/* Logo + mô tả */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo-footer.png"
              alt="P-Market"
              width={150}
              height={50}
              className="h-12 w-12"
            />
            <span className="text-2xl font-bold">P-Market</span>
          </div>
          <p className="text-sm max-w-md opacity-90">
            Sàn giao dịch dành cho sinh viên PTIT. Mua bán, trao đổi đồ cũ an toàn và tiện lợi.
          </p>
        </div>

        {/* Liên kết và hỗ trợ */}
        <div className="grid md:grid-cols-3 gap-8 text-sm text-center md:text-left">
          {/* Liên kết */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <a href="#categories" className="hover:underline">
                  Danh mục
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:underline">
                  Cách hoạt động
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  An toàn giao dịch
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-white" />
                <span>nguyenhuuniem12022005@gmail.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-white" />
                <span>0886199836</span>
              </li>
              <li className="flex justify-center md:justify-start gap-3 mt-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#c40000] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#c40000] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} P-Market. Dành cho sinh viên PTIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
