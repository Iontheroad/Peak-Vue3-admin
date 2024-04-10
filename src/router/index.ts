import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
import { useUserStore } from "@/store/modules/user";
import { usePermissionStore } from "@/store/modules/permission"; // 权限
import { staticRoute, errorRoute } from "./modules/static-router";
import { initDynamicRoute } from "./modules/dynamic-router"; // 添加异步路由

// 进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});

/**
 * @description 路由参数配置
 * @param path ==> 路径
 * @param name ==> 路由别名
 * @param redirect ==> 重定向 // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * @param component ==> 对应组件
 * @param children ==> 子路由
 * @param meta ==> 路由元信息
 * @param meta.title ==> 菜单标题
 * @param meta.icon ==> 菜单图标
 * @param meta.roles ==> 进入该路由的权限,['admin', 'editor']
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单 比如：一个文章的列表页路由为：/article/list ,点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行设置
 * @param meta.isHidden ==>(默认false) 是否隐藏该路由, 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * @param meta.isLink ==>(默认false) 是否外链(点击跳转)
 * @param meta.isFull ==>(默认false) 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==>(默认false) 是否固定在 tabs nav
 * @param meta.isKeepAlive ==>(默认false) 是否缓存,如果设置为true，则不会被 <keep-alive> 缓存
 * @param meta.isBreadcrumbHidden ==>(默认false)是否隐藏面包屑 如果设置为true，则不会在breadcrumb面包屑中显示
 * @param meta.isAlwaysShow ==>(默认false)是否一直显示该路由; 当你一个路由下面的 children 声明的子路由大于1个时，自动会变成嵌套的模式, 只有一个时会将那个子路由当做根路由显示在侧边栏--如引导页面, 若你想不管路由下面的 children 声明的个数都显示你的根路由, 你可以设置true，这样它就会忽略之前定义的规则，一直显示根路由.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoute, ...errorRoute],
  scrollBehavior: () => ({ left: 0, top: 0 })
});

const ROUTE_WHITE_LIST = ["/", "/home", "/500"]; // 白名单

/**
 * @description 路由拦截，登录拦截
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 1.NProgress 开始
  NProgress.start();

  // 2.动态标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE; // 路由标题
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 3.是否访问的登录页
  if (to.path.toLocaleLowerCase().startsWith("/login")) {
    // 有Token就在当前页
    if (userStore.authorization) return next(from.fullPath);
    // 没有token重定向到登录页,
    // 清空路由
    return next();
  }

  // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if (ROUTE_WHITE_LIST.includes(to.path)) return next();

  // 5.判断是否有Token , 没有重定向到登录页
  if (!userStore.authorization) return next({ path: "/login", replace: true });

  // 6.判断是否有菜单列表，没有重新请求菜单
  const permissionStore = usePermissionStore();
  if (!permissionStore.menubarList_getters.length) {
    await initDynamicRoute(); // 添加路由
    return next({ ...to, replace: true });
  }

  // 7.正常访问页面
  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 全局后置守卫
 */
router.afterEach(() => {
  NProgress.done();
});

export default router;
