# locker-api
# Métodos

## Estado de los lockers

``` http
GET /status
```

### Response
```
{
  "lockers": [
    {
      "id": 1,
      "state": "closed"
    },
    {
      "id": 2,
      "state": "closed"
    },
    {
      "id": 3,
      "state": "closed"
    },
    {
      "id": 4,
      "state": "open"
    },
    {
      "id": 5,
      "state": "open"
    },
    {
      "id": 6,
      "state": "open"
    },
    {
      "id": 7,
      "state": "open"
    },
    {
      "id": 8,
      "state": "open"
    },
    {
      "id": 9,
      "state": "open"
    },
    {
      "id": 10,
      "state": "open"
    },
    {
      "id": 11,
      "state": "open"
    },
    {
      "id": 12,
      "state": "open"
    },
    {
      "id": 13,
      "state": "open"
    },
    {
      "id": 14,
      "state": "open"
    },
    {
      "id": 15,
      "state": "open"
    },
    {
      "id": 16,
      "state": "open"
    },
    {
      "id": 17,
      "state": "open"
    },
    {
      "id": 18,
      "state": "open"
    },
    {
      "id": 19,
      "state": "open"
    },
    {
      "id": 20,
      "state": "open"
    }
  ]
}
```

## Estado de un sólo locker

``` http
GET /status/<lockerId>
```
### Response

```
{
  "id": 20,
  "state": "open"
}
```

## Abrir un locker

``` http
POST /open
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `int` | **Required**. Del 1 al 20 |

### Response
`200 OK`

