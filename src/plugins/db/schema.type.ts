import { type Generated, type ColumnType } from "kysely";
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Post = {
  id: Generated<number>;
  /**
   * 文章标题
   */
  title: string;
  /**
   * 文章内容
   */
  content: string | null;
  /**
   * 是否已发布
   */
  published: Generated<boolean>;
  /**
   * 创建时间
   */
  createdAt: Generated<Timestamp>;
  /**
   * 更新时间
   */
  updatedAt: Timestamp | null;
};
export interface Database {
  Post: Post;
}
