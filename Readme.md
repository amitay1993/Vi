## Setup 🔧

##### Install dependencies:

```console
1.cd ./server
2.yarn install
```

##### Start server:
```console
yarn dev
```
##### create .env file in root directory:
  1.API_BASE_URL="https://api.themoviedb.org/3"
  2.API_KEY_NAME="api_key"
  3.API_KEY_VALUE=[YOUR_API_KEY]


Make requests and see response:

Postman:
  1.make *GET* request with the following urls to see results.

```
    1.localhost:3001/api//moviesPerActor
    2.localhost:3001/api/charactersWithMultipleActors
    3.localhost:3001/api/actorsWithMultipleCharacters
```
Browser
  1.copy and paste the following urls in URL search 
  ```
    1.localhost:3001/api//moviesPerActor
    2.localhost:3001/api/charactersWithMultipleActors
    3.localhost:3001/api/actorsWithMultipleCharacters
  ```  
