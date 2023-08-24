// Code generated by sqlc-gen-ts-d1. DO NOT EDIT.
// versions:
//   sqlc v1.20.0
//   sqlc-gen-ts-d1 v0.0.0-a@9af07320cda61bba7e9ed9a216e0c87d9e5e49c1

import { D1Database, D1Result } from "@cloudflare/workers-types/experimental"

const listCommentsQuery = `-- name: ListComments :many
select id, author, body, post_slug
from comments
where post_slug = ?1`;

export type ListCommentsParams = {
  postSlug: string;
};

export type ListCommentsRow = {
  id: number;
  author: string;
  body: string;
  postSlug: string;
};

type RawListCommentsRow = {
  id: number;
  author: string;
  body: string;
  post_slug: string;
};

export async function listComments(
  d1: D1Database,
  args: ListCommentsParams
): Promise<D1Result<ListCommentsRow>> {
  return await d1
    .prepare(listCommentsQuery)
    .bind(args.postSlug)
    .all<RawListCommentsRow>()
    .then((r: D1Result<RawListCommentsRow>) => { return {
      ...r,
      results: r.results.map((raw: RawListCommentsRow) => { return {
        id: raw.id,
        author: raw.author,
        body: raw.body,
        postSlug: raw.post_slug,
      }}),
    }});
}

const createCommentQuery = `-- name: CreateComment :one
insert into comments 
(
    post_slug, author, body
) values (
    ?1, ?2, ?3
)
returning id, author, body, post_slug`;

export type CreateCommentParams = {
  postSlug: string;
  author: string;
  body: string;
};

export type CreateCommentRow = {
  id: number;
  author: string;
  body: string;
  postSlug: string;
};

type RawCreateCommentRow = {
  id: number;
  author: string;
  body: string;
  post_slug: string;
};

export async function createComment(
  d1: D1Database,
  args: CreateCommentParams
): Promise<CreateCommentRow | null> {
  return await d1
    .prepare(createCommentQuery)
    .bind(args.postSlug, args.author, args.body)
    .first<RawCreateCommentRow | null>()
    .then((raw: RawCreateCommentRow | null) => raw ? {
      id: raw.id,
      author: raw.author,
      body: raw.body,
      postSlug: raw.post_slug,
    } : null);
}
