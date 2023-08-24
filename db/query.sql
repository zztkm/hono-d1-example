-- name: ListComments :many
select *
from comments
where post_slug = @post_slug;

-- name: CreateComment :one
insert into comments 
(
    post_slug, author, body
) values (
    @post_slug, @author, @body
)
returning *;