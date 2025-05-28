import React from "react";
import { useGetUserStatsQuery } from "../slices/userApi";

function UserStats({ userId }) {
  const { data, error, isLoading } = useGetUserStatsQuery(userId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading stats</p>;

  return (
    <div>
      <p>Books rented: {data.rentedCount}</p>
      <p>Books bought: {data.boughtCount}</p>
    </div>
  );
}
export default UserStats;