/**
 * @name 分类标签api
 */

import request from "@/utils/request";
const prefix = "/admin";

export interface Category {
  cate_id: number;
  cate_name: string;
  create_time: string;
  update_time: string;
}

/**
 * 获取分类
 */
export function reqSelectCategory() {
  return request({
    url: `${prefix}/category`,
    method: "get"
  });
}

/**
 * 新增分类
 */
export function reqInsertCategory(data: Pick<Category, "cate_name">) {
  return request({
    url: `${prefix}/category`,
    method: "post",
    data
  });
}

/**
 * 修改分类
 */
export function reqUpdateCategory(data: Omit<Category, "create_time" | "update_time">) {
  return request({
    url: `${prefix}/category`,
    method: "put",
    data
  });
}

/**
 * 删除分类
 */
export function reqDeleteCategory(data: { ids: number[] }) {
  return request({
    url: `${prefix}/category`,
    method: "delete",
    data
  });
}
