# TeuxDeux Api Clone

/workspaces/785437/todos - POST

```json
{
  "text": "teste",
  "currentDate": "2023-01-06",
  "done": false,
  "list_id": null
}
```

---

/workspaces/785437/todos/161202560/state - POST

```json
{
  "done": true
}
```

---

/workspaces/785437/todos/161202560 - DELETE

---

/workspaces/785437/todos/161240860 - PATCH

```json
{
  "text": "Add 'every day' to the end of a to-do and it will appear teste"
}
```

---

/workspaces/785437/recurring/964962 - PATCH

```json
{
  "text": "Add 'every week'"
}
```

---

/workspaces/785437/recurring/964962 - DELETE

---

/workspaces/785437/search?q=teste - GET

```json
{
  "recurring_todos": [],
  "todos": [
    {
      "currentDate": "2023-01-06",
      "done": false,
      "id": 161241030,
      "list": null,
      "position": 0,
      "text": "teste",
      "workspace_id": 785437
    },
    {
      "currentDate": "2023-01-07",
      "done": false,
      "id": 161240860,
      "list": null,
      "position": 0,
      "text": "Add 'every day' to the end of a to-do and it will appear teste",
      "workspace_id": 785437
    },
    {
      "currentDate": "2023-01-13",
      "done": false,
      "id": 161202690,
      "list": null,
      "position": 0,
      "text": "teste",
      "workspace_id": 785437
    }
  ]
}
```

---

/workspaces/785437/todos?since=2023-01-25&until=2023-01-28 - GET

```json
[
  {
    "cid": null,
    "column_updated_at": null,
    "created_at": "2023-01-07T00:56:50",
    "currentDate": "2023-01-25",
    "deleted_at": null,
    "done": false,
    "done_updated_at": null,
    "id": 161240878,
    "list_id": null,
    "position": 0,
    "position_updated_at": null,
    "recurring_todo": {
      "created_at": "2023-01-07T00:56:50",
      "deleted_at": null,
      "id": 964962,
      "recurrence_rule": "DTSTART:20230107T000000\nRRULE:FREQ=DAILY;UNTIL=20230428T000000",
      "start_date": "2023-01-07",
      "text": "Add 'every day' to the end of a to-do and it will appear",
      "updated_at": "2023-01-07T00:56:50",
      "uuid": "d82fd6dd-3759-4187-be9f-d5615196a35d",
      "workspace_id": 785437
    },
    "recurring_todo_id": 964962,
    "text": "Add 'every day' to the end of a to-do and it will appear",
    "text_updated_at": null,
    "updated_at": "2023-01-07T00:56:50",
    "uuid": "b307c507-0e6c-4bac-b6e9-9f6e0b2a8452",
    "workspace_id": 785437
  },
  {
    "cid": null,
    "column_updated_at": null,
    "created_at": "2023-01-07T00:56:50",
    "currentDate": "2023-01-26",
    "deleted_at": null,
    "done": false,
    "done_updated_at": null,
    "id": 161240879,
    "list_id": null,
    "position": 0,
    "position_updated_at": null,
    "recurring_todo": {
      "created_at": "2023-01-07T00:56:50",
      "deleted_at": null,
      "id": 964962,
      "recurrence_rule": "DTSTART:20230107T000000\nRRULE:FREQ=DAILY;UNTIL=20230428T000000",
      "start_date": "2023-01-07",
      "text": "Add 'every day' to the end of a to-do and it will appear",
      "updated_at": "2023-01-07T00:56:50",
      "uuid": "d82fd6dd-3759-4187-be9f-d5615196a35d",
      "workspace_id": 785437
    },
    "recurring_todo_id": 964962,
    "text": "Add 'every day' to the end of a to-do and it will appear",
    "text_updated_at": null,
    "updated_at": "2023-01-07T00:56:50",
    "uuid": "4d073ae3-45db-4290-ba09-1512cd9aa0f3",
    "workspace_id": 785437
  },
  {
    "cid": null,
    "column_updated_at": null,
    "created_at": "2023-01-07T00:56:50",
    "currentDate": "2023-01-27",
    "deleted_at": null,
    "done": false,
    "done_updated_at": null,
    "id": 161240880,
    "list_id": null,
    "position": 0,
    "position_updated_at": null,
    "recurring_todo": {
      "created_at": "2023-01-07T00:56:50",
      "deleted_at": null,
      "id": 964962,
      "recurrence_rule": "DTSTART:20230107T000000\nRRULE:FREQ=DAILY;UNTIL=20230428T000000",
      "start_date": "2023-01-07",
      "text": "Add 'every day' to the end of a to-do and it will appear",
      "updated_at": "2023-01-07T00:56:50",
      "uuid": "d82fd6dd-3759-4187-be9f-d5615196a35d",
      "workspace_id": 785437
    },
    "recurring_todo_id": 964962,
    "text": "Add 'every day' to the end of a to-do and it will appear",
    "text_updated_at": null,
    "updated_at": "2023-01-07T00:56:50",
    "uuid": "c23d679a-f3af-440e-9d19-5aa2d864ccea",
    "workspace_id": 785437
  },
  {
    "cid": null,
    "column_updated_at": null,
    "created_at": "2023-01-07T00:56:50",
    "currentDate": "2023-01-28",
    "deleted_at": null,
    "done": false,
    "done_updated_at": null,
    "id": 161240881,
    "list_id": null,
    "position": 0,
    "position_updated_at": null,
    "recurring_todo": {
      "created_at": "2023-01-07T00:56:50",
      "deleted_at": null,
      "id": 964962,
      "recurrence_rule": "DTSTART:20230107T000000\nRRULE:FREQ=DAILY;UNTIL=20230428T000000",
      "start_date": "2023-01-07",
      "text": "Add 'every day' to the end of a to-do and it will appear",
      "updated_at": "2023-01-07T00:56:50",
      "uuid": "d82fd6dd-3759-4187-be9f-d5615196a35d",
      "workspace_id": 785437
    },
    "recurring_todo_id": 964962,
    "text": "Add 'every day' to the end of a to-do and it will appear",
    "text_updated_at": null,
    "updated_at": "2023-01-07T00:56:50",
    "uuid": "1743dab5-973b-4de3-a43f-f1fe401fdbb5",
    "workspace_id": 785437
  }
]
```
