/**
 * 响应参数
 */
export interface ResResult {
  code: number;
  msg: string;
}
/**
 * 响应参数（包含data）
 */
export interface ResResultData<T> extends ResResult {
  data: T;
}

/**
 * 分页响应参数
 */
export interface ResPage<T> extends ResResult {
  currentPage: number;
  pageSize: number;
  total: number;
  data: T[];
}
/**
 * 分页请求参数
 */
export interface ReqPage {
  currentPage: number;
  pageSize: number;
}
