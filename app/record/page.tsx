"use client";
import { getRecordImage } from "@/lib/recordImages";
import { useState } from "react";
import { Image } from "antd";
// 画廊图片配置：filename 对应 assets/images/record 下的文件名，width/height 为子元素自定义宽高（像素）
type GalleryItem = {
  id: number;
  filename?: string;
  fullWidth?:boolean
};

const gallery: GalleryItem[] = [
  { id: 1, filename: "record1.jpg", },
  { id: 2, filename: "record2.jpg",},
  { id: 3, filename: "record3.jpg",},
  { id: 4, filename: "record4.jpg", },
  { id: 5, filename: "record5.jpg", },
  { id: 6, filename: "record6.jpg", },
  { id: 7, filename: "record7.jpg", },
  { id: 8, filename: "record8.jpg", },
  { id: 9, filename: "record9.jpg",  },
  {
    id: 10,
    filename: "record10.jpg",
    fullWidth: true,
  },
  { id: 11, filename: "record11.jpg", },
  { id: 12, filename: "record12.jpg",  },
  { id: 13, filename: "record13.jpg",},
  { id: 14, filename: "record14.jpg", },
  { id: 15, filename: "record15.jpg", },
  { id: 16, filename: "record16.jpg", },
];

export default function RecordPage() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="min-h-screen bg-white pb-12 pt-8 sm:pt-12">
      <div className="mx-auto max-w-[1500px]">
        {/* 主标题：Rcord 记录 */}
        <h1 className="font-hanyi text-2xl font-bold tracking-wide text-black sm:text-3xl">
          Rcord 记录
        </h1>
        <Image.PreviewGroup>
          {/* 事件标题列表：每项带小三角 + 横线 */}
          <nav className="mt-2 space-y-0 sm:mt-4">
            <div className="flex items-center gap-2 pt-3 sm:pt-4">
              <button
                type="button"
                className="flex flex-1 items-center gap-2 text-left text-sm text-black hover:opacity-80 sm:text-base"
              >
                <span className="font-hanyi text-[24px] font-bold">
                  CHI2025 in Yokohama, 2025,5
                </span>
              </button>
            </div>
            {/* <div className="!my-4 flex items-center gap-4">
              <button
                onClick={() => setIsShow(!isShow)}
                className={`cursor-pointer transition-transform ${
                  isShow ? "rotate-0" : "-rotate-90"
                }`}
              >
                <svg
                  width="22"
                  height="15"
                  viewBox="0 0 22 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 15L0 0H22L11 15Z" fill="black" />
                </svg>
              </button>
              <hr className="h-px flex-1 bg-black" />
            </div>
            {isShow && <div className="">待开发...</div>} */}
            <div className="flex items-center gap-2 py-3 sm:py-4">
              <button
                type="button"
                className="flex flex-1 items-center gap-2 text-left text-sm text-black hover:opacity-80 sm:text-base"
              >
                <span className="font-hanyi text-[24px] font-bold">
                  UbiComp2024 in Melbourne, 2024,10
                </span>
              </button>
            </div>
          </nav>

          {/* 画廊：3 列网格，fullWidth 时占满一行（col-span-3） */}
          <div className="mt-2 grid grid-cols-3 gap-3 sm:mt-4 sm:gap-4">
            {gallery.map((photo, index) => (
              <div
                key={index}
                className={`min-w-0 overflow-hidden bg-gray-100 ${
                  photo.fullWidth
                    ? "col-span-3  aspect-[2/1] w-full"
                    : "aspect-[7/4] w-full"
                }`}
              >
                <Image
                  src={getRecordImage(photo?.filename || "")}
                  alt=""
                  className="h-full !w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Image.PreviewGroup>
      </div>
    </div>
  );
}
