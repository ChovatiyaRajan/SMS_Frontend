import React, { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { Table } from "@mantine/core";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsersData = async () => {
    const response = await getUsers();

    setUsers(response.data.allUsers);
  };

  console.log(users);

  useEffect(() => {
    getUsersData();
  }, []);

  const rows = users.map((element) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.role}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>
        {(() => {
          const date = new Date(element.DOB);
          const day = date.getDate();
          const month = date.toLocaleString("en-US", { month: "long" });
          const year = date.getFullYear();
          return `${day} ${month}, ${year}`;
        })()}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="flex justify-center">
      <div className="max-h-80 overflow-y-scroll w-[50%] mt-10">
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          className="w-full"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User Role</Table.Th>
              <Table.Th>User name</Table.Th>
              <Table.Th>User Email</Table.Th>
              <Table.Th>User gender</Table.Th>
              <Table.Th>User DOB</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
