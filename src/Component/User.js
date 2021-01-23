import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

function User() {
  const [userId, setUserId] = useState(1);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id: userId,
    },
  });
  const getAllUsers = useQuery(GET_ALL_USERS);

  const inputHandler = (e) => {
    e.preventDefault();
    setUserId(e.target.value);
    console.log("userID", userId);
  };
  return (
    <div>
      {error && <p>Error</p>}
      {loading && <p>Loading</p>}
      {data && data.user !== null ? (
        <p>
          ID : - {data.user.id} Username: - {data.user.name}
        </p>
      ) : (
        <p>User Not Found</p>
      )}

      <input type="text" value={userId} onChange={inputHandler} />
      <hr />
      {getAllUsers.error && <p>Error for frtching data</p>}
      {getAllUsers.loading ? (
        <p>Loading</p>
      ) : (
        getAllUsers.data.users.map((user) => <h5 key={user.id}>{user.name}</h5>)
      )}
    </div>
  );
}

const GET_USER = gql`
  query getUserData($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

const GET_ALL_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default User;
