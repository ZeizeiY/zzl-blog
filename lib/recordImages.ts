/**
 * 记录页画廊图片路径封装
 * 图片文件放在 public/assets/images/record/ 下，通过文件名引用
 */

const RECORD_IMAGES_BASE = "/assets/images/record";

/**
 * 根据文件名获取 record 目录下图片的访问路径
 * @param filename 文件名，如 "1.jpg"、"chi2025-01.png"
 * @returns 图片完整路径，用于 img src 或 Next/Image
 */
export function getRecordImage(filename: string): string {
  const name = filename.replace(/^\//, "").trim();
  return name ? `${RECORD_IMAGES_BASE}/${name}` : RECORD_IMAGES_BASE;
}
