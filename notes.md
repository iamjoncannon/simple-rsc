npx prisma init --datasource-provider sqlite
npx prisma migrate dev --name initialize

# jenius- genius and discogs with react server components

`benefits`

- reduced fullstack complexity
  - eliminates the need to manage front end querying- no react-query, rtk query, fetch etc. server component declares props and receives hydration without having to touch remote state
  - props create contract between ends of the stack- component can be treated like it has direct db access
- performance
  - reduced initial pageload
  - server component caches remote state
  - progressive loading- components hydrate separately

`limitations`

- stateless- server components have no access to hooks (useState, useEffect)
- interactivity is limited- anchor tag linking, etc

`when server components might be useful`

- stateless feature (no useEffect, useState, etc)
- app would benefit from progressive loading- lots of elements loading content separately with separate api calls
- 'dependency heavy' component- component requires large dependency to render

demo app

- content cards are hydrated separately- entire pageload happens with less than 20kb data from service
- we see stateful/stateless issue once we try to paginate the content- we have to track search results in the client host separate from hydration, because the server components cant make the host aware of the results after hydration
