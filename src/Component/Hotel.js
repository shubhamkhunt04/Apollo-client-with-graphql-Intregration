import React from "react";
import { useQuery, gql } from "@apollo/client";

const Hotel = () => {
  const { loading, error, data } = useQuery(GET_ALL_HOTELS);

  return (
    <div>
      <table border="2px" cellSpacing="0px" cellPadding="5px">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rooms</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Website</th>
            <th>Description</th>
          </tr>
        </thead>

        {error && <p>Error</p>}
        {loading ? (
          <tr>Loading</tr>
        ) : (
          data.hotels.map((hotel) => {
            return (
              <tbody key={hotel.id}>
                <tr>
                  <td>{hotel.name}</td>
                  <td>{hotel.rooms}</td>
                  <td>{hotel.phone}</td>
                  <td>{hotel.status}</td>
                  <td>{hotel.website ? hotel.website : "-"}</td>
                  <td>{hotel.description}</td>
                </tr>
              </tbody>
            );
          })
        )}
      </table>
    </div>
  );
};

const GET_ALL_HOTELS = gql`
  query {
    hotels {
      status
      name
      description
      rooms
      phone
      website
    }
  }
`;

export default Hotel;
