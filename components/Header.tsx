"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "@/assets/images/logo.jpg"

const navLinks = [
  { title: "About/关于", path: "/about" },
  { title: "Project/项目", path: "/project" },
  { title: "Record/记录", path: "/record" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 判断当前路径是否匹配导航项
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // 菜单打开时禁止页面滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // 组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white">
      <div className="flex h-20 w-full justify-center border-b-2 border-[#eaeaea]">
        <div className="flex h-full w-full max-w-[1500px] items-center justify-between px-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              className="w-[200px] md:w-auto"
              priority
            />
          </Link>

          {/* 桌面端导航链接 */}
          <nav className="hidden items-center md:flex">
            {navLinks.map((nav) => (
              <Link
                key={nav.path}
                href={nav.path}
                className={`group relative mr-11 no-underline  hover:no-underline  text-black transition-colors  hover:opacity-90 ${
                  isActive(nav.path) ? "font-bold" : ""
                }`}
              >
                {nav.title}
                {/* 下划线动画 */}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-[#000] transition-all duration-300 ${
                    isActive(nav.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* 移动端菜单图标 */}
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      <div
        className={`absolute top-full right-0 left-0 z-50 overflow-hidden border-b-2 border-[#eaeaea] bg-white transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "h-screen !overflow-y-hidden opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-4">
          {navLinks.map((nav, index) => (
            <Link
              key={nav.path}
              href={nav.path}
              onClick={() => setIsMenuOpen(false)}
              className={`border-b border-gray-100 py-4 text-xl transition-all duration-300 hover:opacity-80 ${
                isActive(nav.path) ? "font-bold" : ""
              } ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 80}ms` : "0ms",
              }}
            >
              {nav.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
