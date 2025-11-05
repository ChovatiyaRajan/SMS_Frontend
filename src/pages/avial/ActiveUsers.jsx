import React, { useEffect, useState } from "react";
import SideBarLayout from "../../layout/SideBarLayout";
import { getActiveUsers, getCourses } from "../../api/api";
import { Select, Table } from "@mantine/core";

const ActiveUsers = () => {
  const [activeUser, setActiveUser] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCoures, setSelectedCoures] = useState();

  const findActivateUsers = async () => {
    try {
      const queryParms = new URLSearchParams();

      if (selectedCoures) queryParms.append("selectedCoures", selectedCoures);

      const response = await getActiveUsers(queryParms);

      console.log(response);
      setActiveUser(response.data.activeUsers);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllCourses = async () => {
    try {
      // const queryParms = new URLSearchParams();

      // if (selectedCoures) queryParms.append("selectedCoures", selectedCoures);

      const response = await getCourses();
      setAllCourses(response.data.getCourses);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    findActivateUsers();
    getAllCourses();
  }, [selectedCoures]);

  const rows = activeUser.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.DOB}</Table.Td>
      <Table.Td>{element.courseId.courseName}</Table.Td>
      <Table.Td>{element.courseId.courseTimeline}</Table.Td>
      {/* <Table.Td>
        <div className="flex gap-2">
          <Button
            variant="filled"
            color="indigo"
            size="md"
            radius="md"
            onClick={() => handelEdit(element)}
          >
            Update
          </Button>
          <Button
            variant="filled"
            color="red"
            size="md"
            radius="md"
            onClick={() => handelRemove(element._id)}
          >
            Remove
          </Button>
        </div>
      </Table.Td> */}
    </Table.Tr>
  ));
  return (
    <SideBarLayout>
      <div className=" bg-gray-800 text-white py-4 px-3 text-lg font-semibold">
        All Active Students
      </div>

      <Select
        className="w-1/3 mt-5"
        label="Select Corse Name"
        placeholder="Pick Corse Name"
        // value={}
        data={allCourses.map((ele, index) => ({
          value: `${ele?.courseName}-${index}`, // unique value becouse mantain avoid duplicate value
          label: ele?.courseName,
        }))}
        onChange={(val) => {
          if (val === null) {
            setSelectedCoures(null);
            return;
          }
          const courseName = val.split("-")[0]; // for remove index from value
          setSelectedCoures(courseName);
        }}
        defaultValue="React"
        clearable
      />

      <div className="overflow-x-auto mt-4">
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Date of Birth</Table.Th>
              <Table.Th>Corse Name</Table.Th>
              <Table.Th>Corse Timeline</Table.Th>
              {/* <Table.Th>Action</Table.Th> */}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </SideBarLayout>
  );
};

export default ActiveUsers;
