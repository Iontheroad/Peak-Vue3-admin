/**
 * @name 角色api
 */
import request from "@/utils/request.ts";
const local_prefix = "/admin";

/**
 * 查询角色
 * @param data
 */
export function reqSelectRoleList(data: any) {
  return request({
    url: `${local_prefix}/role`,
    method: "get",
    params: data
  });
}

/**
 * 新增角色
 * @param data
 */
export function reqInsertRole(data: any) {
  return request({
    url: `${local_prefix}/role`,
    method: "post",
    data
  });
}

/**
 * 修改角色
 * @param data
 */
export function reqUpdateRole(data: any) {
  return request({
    url: `${local_prefix}/role`,
    method: "put",
    data
  });
}

/**
 * 删除角色
 * @param data
 */
export function reqDeleteRole(data: any) {
  return request({
    url: `${local_prefix}/role`,
    method: "delete",
    data
  });
}
