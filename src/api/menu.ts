/**
 * 菜单api
 */

import request from "@/utils/request.ts";
const prefix = "";

/**
 * 获取权限菜单接口
 * @param data
 */
export function reqGetMenuTree() {
  return request({
    url: `${prefix}/menus/tree`,
    method: "get"
  });
}
