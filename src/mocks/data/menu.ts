/**
 * 菜单mock
 */
import { MockMethod } from "vite-plugin-mock";
import { errorResponse, successResponse } from "../util";
export const menuList = [
  {
    path: "/home/index",
    name: "Home",
    component: "/home/index",
    meta: {
      title: "首页",
      icon: "menu-home",
      roles: ["admin", "common"],
      activeMenu: "/home/index",
      isHidden: false,
      isLink: false,
      isFull: false,
      isAffix: true,
      isKeepAlive: false,
      isBreadcrumbHidden: false,
      isAlwaysShow: false
    }
  },
  {
    path: "/system",
    name: "System",
    redirect: "/system/user",
    meta: {
      title: "系统管理",
      icon: "menu-system",
      roles: ["admin"],
      isHidden: false,
      isLink: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: false,
      isBreadcrumbHidden: false,
      isAlwaysShow: false
    },
    children: [
      {
        path: "/system/role",
        name: "Role",
        component: "/system/role/index",
        meta: {
          title: "角色管理",
          icon: "menu-system-role",
          roles: ["admin"],
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        }
      },
      {
        path: "/system/user",
        name: "User",
        component: "/system/user/index",
        meta: {
          title: "用户管理",
          icon: "menu-system-user",
          roles: ["admin"],
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        }
      },
      {
        path: "/system/menu",
        name: "Menu",
        component: "/system/menu/index",
        meta: {
          title: "菜单管理",
          icon: "menu-system-menu",
          roles: ["admin"],
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        }
      }
    ]
  },
  {
    path: "/nested",
    name: "Nested",
    redirect: "/nested/menu2",
    meta: {
      title: "多级菜单",
      icon: "menu-multi-menu",
      roles: ["admin"],
      isHidden: false,
      isLink: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: false,
      isBreadcrumbHidden: false,
      isAlwaysShow: false
    },
    children: [
      {
        path: "/nested/menu1",
        name: "Menu1",
        component: "/nested/menu1/index",
        redirect: "/nested/menu1/menu11",
        meta: {
          title: "menu1",
          icon: "menu-multi-menu",
          roles: ["admin"],
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        },
        children: [
          {
            path: "/nested/menu1/menu11",
            name: "Menu11",
            component: "/nested/menu1/menu11/index",
            meta: {
              title: "menu11",
              icon: "menu-multi-menu",
              roles: ["admin"],
              isHidden: false,
              isLink: false,
              isFull: false,
              isAffix: false,
              isKeepAlive: false,
              isBreadcrumbHidden: false,
              isAlwaysShow: false
            }
          },
          {
            path: "/nested/menu1/menu12",
            name: "Menu12",
            component: "/nested/menu1/menu12/index",
            redirect: "/nested/menu1/menu12/menu121",
            meta: {
              title: "menu12",
              icon: "menu-multi-menu",
              roles: ["admin"],
              isHidden: false,
              isLink: false,
              isFull: false,
              isAffix: false,
              isKeepAlive: false,
              isBreadcrumbHidden: false,
              isAlwaysShow: false
            },
            children: [
              {
                path: "/nested/menu1/menu12/menu121",
                name: "Menu121",
                component: "/nested/menu1/menu12/menu121/index",
                meta: {
                  title: "menu121",
                  icon: "menu-multi-menu",
                  roles: ["admin"],
                  isHidden: false,
                  isLink: false,
                  isFull: false,
                  isAffix: false,
                  isKeepAlive: false,
                  isBreadcrumbHidden: false,
                  isAlwaysShow: false
                }
              },
              {
                path: "/nested/menu1/menu12/menu122",
                name: "Menu122",
                component: "/nested/menu1/menu12/menu122/index",
                meta: {
                  activeMenu: "/nested/menu2",
                  title: "menu122",
                  icon: "menu-multi-menu",
                  roles: ["admin"],
                  isHidden: true,
                  isLink: false,
                  isFull: false,
                  isAffix: false,
                  isKeepAlive: false,
                  isBreadcrumbHidden: false,
                  isAlwaysShow: false
                }
              }
            ]
          }
        ]
      },
      {
        path: "/nested/menu2",
        name: "Menu2",
        component: "/nested/menu2/index",
        meta: {
          title: "menu2",
          icon: "menu-multi-menu",
          roles: ["admin"],
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        }
      }
    ]
  },
  {
    path: "/func",
    name: "Func",
    redirect: "/func/three",
    meta: {
      title: "功能组件",
      icon: "menu-function",
      roles: ["admin", "common"],
      activeMenu: "/func",
      isHidden: false,
      isLink: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: false,
      isBreadcrumbHidden: false,
      isAlwaysShow: false
    },
    children: [
      {
        path: "/func/three",
        name: "three",
        component: "/func/three/index",
        meta: {
          title: "Three",
          icon: "menu-function",
          roles: ["admin", "common"],
          activeMenu: "/func/three",
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        }
      },
      {
        path: "dragTask",
        name: "DragTask",
        component: "/func/dragTask/index",
        meta: {
          title: "拖拽任务",
          icon: "menu-function-move",
          roles: ["admin", "common"],
          activeMenu: "/func/three",
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        }
      }
    ]
  },
  {
    path: "/panorama",
    name: "Panorama",
    redirect: "/panorama/photo-sphere-viewer",
    meta: {
      title: "全景图",
      icon: "menu-panorama",
      roles: ["admin", "common"],
      activeMenu: "/panorama",
      isHidden: false,
      isLink: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: false,
      isBreadcrumbHidden: false,
      isAlwaysShow: false
    },
    children: [
      {
        path: "/panorama/photo-sphere-viewer",
        name: "photo-sphere-viewer",
        component: "/panorama/photo-sphere-viewer/index",
        meta: {
          title: "PhotoSphereViewer",
          icon: "menu-panorama",
          roles: ["admin", "common"],
          activeMenu: "/panorama/photo-sphere-viewer",
          isHidden: false,
          isLink: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: false,
          isBreadcrumbHidden: false,
          isAlwaysShow: false
        }
      }
    ]
  }
];
export default [
  /**
   * 获取权限菜单接口
   */
  {
    url: `/mock/menus/tree`,
    method: "get",
    timeout: 300,
    response: ({ headers }) => {
      if (!headers?.authorization) return errorResponse(null, "请先登录", 401);
      return successResponse(menuList, "请求成功", 200);
    }
  }
] as MockMethod[];
