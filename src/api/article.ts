/**
 * @name 文章api
 */
import { ReqPage, ResResult } from "./interface";
import request from "@/utils/request";
const prefix = "/admin";

export namespace Article {
  export interface ArticleItem {
    article_id: number;
    article_title: string;
    article_digest: string;
    article_content: string;
    article_cover: string;
    article_type: 1 | 2; // 1原创 2转载
    category_id: string; // 分类id 1,2,3
    status: 1 | 2 | 3; // 文章状态 1审核中 2通过 3未通过
    noPass_reason?: string; // 未通过原因
    comment_status: 1 | 2; // 评论状态 1开启 2关闭
    create_by: string;
    create_id: number;
    create_time: string;
    update_by: string;
    update_id: number;
    update_time: string;
  }

  // 获取文章 列表参数
  export interface ReqSelectArticleList extends ReqPage {
    status: 1 | 2 | 3;
  }

  // 新增文章 请求参数
  export type ReqInsertArticle = Pick<
    ArticleItem,
    | "article_title"
    | "article_digest"
    | "article_cover"
    | "article_content"
    | "article_type"
    | "category_id"
    | "comment_status"
  >;

  // 修改文章 请求参数
  export interface ReqUpdateArticle extends ReqInsertArticle {
    article_id: number;
  }

  // 文章审核 请求参数
  export type ReqArticleReview = Pick<
    ArticleItem,
    "article_id" | "status" | "noPass_reason"
  >;
}

/**
 * 获取文章列表
 */
export function reqSelectArticleList(
  params: Article.ReqSelectArticleList
): Promise<{ data: Article.ArticleItem[]; total: number }> {
  return request({
    url: `${prefix}/article/list`,
    method: "get",
    params
  });
}

/**
 * 获取指定文章
 */
export function reqSelectArticle(params: { article_id: number }) {
  return request({
    url: `${prefix}/article/${params.article_id}`,
    method: "get"
  });
}

/**
 * 新增文章
 */
export function reqInsertArticle(data: Article.ReqInsertArticle): Promise<ResResult> {
  return request({
    url: `${prefix}/article`,
    method: "post",
    data
  });
}

/**
 * 修改文章
 */
export function reqUpdateArticle(data: Article.ReqUpdateArticle): Promise<ResResult> {
  return request({
    url: `${prefix}/article`,
    method: "put",
    data
  });
}

/**
 * 删除文章
 */
export function reqDeleteArticle(data: { ids: number[] }) {
  return request({
    url: `${prefix}/article`,
    method: "delete",
    data
  });
}

/**
 * 文章审核
 */
export function reqArticleReview(data: {
  article_id: number;
  status: 1 | 2;
  noPass_reason?: string;
}) {
  return request({
    url: `${prefix}/article/review`,
    method: "put",
    data
  });
}
