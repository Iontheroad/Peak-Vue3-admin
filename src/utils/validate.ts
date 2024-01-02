/**
 * 验证工具
 */

/**
 * @description 是否是链接开头
 * @param {string} path
 * @returns {Boolean}
 */
type isExternal = (path: string) => boolean;
export function isExternal(path: string): boolean {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}
