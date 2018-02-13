Method: GET
Path: /posts/{post_id}/tags
Description: Get a list of all tags associate to a specific post
Params: post_id (int)
Payload:
Headers:
Response:
```js
{
  codeStatus: 200,
  data: [
    {
      "id": "1",
      "tag_name": "Végétarien"
    },
    {
      "id": "2",
      "tag_name": "Gros fragile"
    }
  ]
}
```