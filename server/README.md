# server

Server-side directory

- routes: Control layer, invoking service
- service: Service Layer, for Control Layer Call
- models: mongoose model & Schema. (File names need to correspond to collection names)

Test routes:

- curl. eg: `curl -X GET http://localhost:3000/geo/getPosition`
- Postman etc.
