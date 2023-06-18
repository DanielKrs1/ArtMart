UPDATE art
SET owner_id = ?
WHERE
    owner_id = ? AND
    art_id = ?;