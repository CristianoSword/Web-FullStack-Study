# Search Playbook

1. Conecte em `mongodb://localhost:27023/places_directory`.
2. Abra a collection `venues`.
3. Rode `queries/text-search.mongodb.js` para buscar por termos e ordenar por relevancia.
4. Rode `queries/geolocation.mongodb.js` para localizar venues proximos de Sao Paulo usando `$near`.
5. Rode `queries/verification.mongodb.js` para conferir dataset e indices ativos.
