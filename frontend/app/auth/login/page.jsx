"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-pink-500 to-orange-400 relative overflow-hidden">
      {/* Vòng sáng động nền */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-300/20 blur-2xl rounded-full animate-[pulse_8s_ease-in-out_infinite]" />

      {/* Thẻ chính */}
      <Card className="relative w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 animate-fadeIn">
        <CardHeader className="flex flex-col items-center justify-center text-center p-6 border-b border-gray-100">
          {/* Logo trong vòng sáng */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 rounded-full blur-md opacity-70 animate-pulse" />
            <div className="relative p-3 bg-white rounded-full shadow-md">
              <Image
                src="/logomain.png"
                alt="PTIT Logo"
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800 mt-5 tracking-tight">
            Đăng nhập
          </h2>
          <p className="text-gray-600 text-base mt-1 font-medium">
            PTIT-Marketplace
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form className="space-y-6">
            {/* Tài khoản */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Tài khoản
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Nhập mã số sinh viên..."
                className="mt-1 focus:ring-red-500 focus:border-red-500"
                style={{ borderLeft: "4px solid #FF3B30" }}
              />
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="mt-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Ghi nhớ + Quên mật khẩu */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-red-600 font-medium hover:text-red-700 transition"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Nút đăng nhập */}
            <Button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 
                         hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-red-300/40"
            >
              🚀 Đăng nhập ngay
            </Button>

            {/* Dấu chia */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            {/* Microsoft login */}
            <Button
              type="button"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-[1.02] transition-transform text-white font-medium rounded-lg flex items-center justify-center gap-2 shadow-md"
            >
              <Image
                src="/microsoft-icon.png"
                alt="Microsoft"
                width={20}
                height={20}
              />
              PTIT Microsoft 365
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
