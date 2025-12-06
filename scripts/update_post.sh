# curl -X PUT http://127.0.0.1:8282/posts/3 \
#     -H "Content-Type: application/json" \
#     -d '{"title": "EMacs", "content": "Too slow lul."}'

curl -X PUT http://127.0.0.1:8282/posts/3 \
    -H "Content-Type: application/json" \
    -d '{"content": "Too fast lul."}'
