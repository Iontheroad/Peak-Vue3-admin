/**
 * dynamic 异步动态路由
 *     添加动态路由菜单
 */
import router from "@/router";
import { usePermissionStore } from "@/store/modules/permission";
import { useUserStore } from "@/store/modules/user"; // 用户状态仓库
import { RouteRecordRaw } from "vue-router";

/**
 * 初始化 添加异步路由信息
 * @param roles  用户角色信息集合
 */
export const initDynamicRoute = async () => {
  const permissionStore = usePermissionStore();
  const userStore = useUserStore();

  try {
    // 1.获取异步路由菜单
    await permissionStore.getListRoutes_action();

    // // 2.动态路由添加-扁平添加
    // const modules = import.meta.glob("@/views/**/*.vue");
    // permissionStore.flatMenubarList_getters.forEach((item) => {
    //   item?.children && delete item.children;
    //   if (item.component && typeof item.component == "string") {
    //     item.component = modules["/src/views" + item.component + ".vue"];
    //   }
    //   if (item?.meta?.isFull) {
    //     router.addRoute(item as unknown as RouteRecordRaw);
    //   } else {
    //     router.addRoute("Layout", item as unknown as RouteRecordRaw);
    //   }
    // });

    // 2.动态路由添加-树形添加
    permissionStore.treeMenuList_getters.forEach((item) => {
      if (item?.meta?.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw);
      } else {
        router.addRoute("Layout", item as unknown as RouteRecordRaw);
      }
    });
  } catch (error) {
    //  当菜单请求出错时，重定向到登陆页
    userStore.resetUser();
    router.replace("/login");
    return Promise.reject(error);
  }
};
