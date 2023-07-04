/**
 * 自定义指令
 * 按钮权限校验
 */

import useUserStore from "@/store/modules/user";
import { Directive, DirectiveBinding } from "vue";

export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const userStore = useUserStore();
    const roles = userStore.userInfo.roles;
    // [超级管理员] 拥有所有的权限
    if (roles.includes("ROOT")) {
      return true;
    }
    // [其他角色] 按钮权限校验
    const { value } = binding;
    if (value) {
      const requiredPerms = value; // DOM绑定需要的按钮权限标识(传递给指令的值)
      // 遍历用户的权限按钮集合,查看是否含有该权限按钮
      const hasPerm = userStore.userInfo.perms.some((perm) =>
        requiredPerms.includes(perm)
      );
      if (!hasPerm) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("指令格式应为: v-has-perm='['sys:user:add']'");
    }
  },
};
