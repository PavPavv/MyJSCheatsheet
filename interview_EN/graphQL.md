# GraphQL

>In order to use GraphQL in your React application, the backend service you’re communicating with needs to be built following GraphQL specifications.

This is a GraphQL query:

```graphql
query {
  user(login: "moontahoe") {
    idlogin
    name
    location
    avatarUrl
  }
}
```

returns:

```javascript
{
  "data": {
  "user": {
    "id": "MDQ6VXNlcjU5NTIwODI=",
    "login": "MoonTahoe",
    "name": "Alex Banks",
    "location": "Tahoe City, CA",
    "avatarUrl": "https://github.com/moontahoe.png"
    }
  }
}
```

We can formalize this GraphQL query into a reusable operation named:

```graphql
query findRepos($login: String!) {
  user(login: $login) {
    loginname
    location
    avatar_url: avatarUrl
    repositories(first: 100) {
    totalCount
    nodes {
    name
    }
  }
}

```

A GraphQL request is an HTTP request that contains a query in the body of the request. You can use fetch to make a GraphQL request. There are also a number of libraries and frameworks that can handle the details of making these types of requests for you.

>GraphQL is not restricted to HTTP. It’s a specification of how data requests should be made over a network. It can technically work with any network protocol. Additionally, GraphQL is language-agnostic.

```javascript
const query = `
  query findRepos($login:String!) {
    user(login:$login) {
      login
      name
      location
      avatar_url: avatarUrl
      repositories(first:100) {
        totalCount
        nodes {
          name
        }
      }
    }
  }
`;

const client = new GraphQLClient(
  "https://api.github.com/graphql",
  {
  headers: {
      Authorization: `Bearer <PERSONAL_ACCESS_TOKEN>`
    }
  }
);

client
  .request(query, { login: "moontahoe" })
  .then(results => JSON.stringify(results, null, 2))
  .then(console.log)
  .catch(console.error);
```
In order to make a GraphQL request, we’ll need a query. The query is simply a string that contains the GraphQL query from above. Just like **fetch**, _client.request_ returns a **promise**.

```javascript
export default function App() {
  const [login, setLogin] = useState("moontahoe");
  const [userData, setUserData] = useState();

  if (!userData) return <p>loading...</p>;

  useEffect(() => {
    client
      .request(query, { login })
      .then(({ user }) => user)
      .then(setUserData)
      .catch(console.error);
  }, [client, query, login]);

  return (
    <>
      <SearchForm value={login} onSearch={setLogin} />
      <UserDetails {...userData} />
      <p>{userData.repositories.totalCount} - repos</p>
      <List
        data={userData.repositories.nodes}
        renderItem={repo => <span>{repo.name}</span>}
      />
    </>
  );
}
```
