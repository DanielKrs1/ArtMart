SELECT
*
FROM
      transaction_history
WHERE
      user_from_id = ? OR user_to_id = ?;