import React, { useEffect, useState } from "react";
import SideBarLayout from "../../layout/SideBarLayout";
import { getActiveUsers, getCourses } from "../../api/api";
import { Select, Table } from "@mantine/core";
import DateFormatter from "../../Components/DateFormatter";

const ActiveUsers = () => {
  const [activeUser, setActiveUser] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCoures, setSelectedCoures] = useState();
  const [selectedTimeline, setSelectedTimeline] = useState();

  const findActivateUsers = async () => {
    try {
      const queryParms = new URLSearchParams();

      if (selectedCoures) queryParms.append("selectedCoures", selectedCoures);

      if (selectedTimeline)
        queryParms.append("selectedTimeline", selectedTimeline);

      const response = await getActiveUsers(queryParms);

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
  }, [selectedCoures, selectedTimeline]);

  const rows = activeUser.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{<DateFormatter date={element.DOB} />}</Table.Td>
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

      <div className="flex gap-x-5">
        <Select
          className="w-1/3 mt-5"
          label="Select Corse Name"
          placeholder="Pick Corse Name"
          // value={}
          data={allCourses.map((ele, index) => ({
            value: ele?._id,
            label: ele?.courseName,
          }))}
          onChange={(val) => setSelectedCoures(val)}
          defaultValue="React"
          clearable
        />
        <Select
          className="w-1/3 mt-5"
          label="Select Corse Timeline"
          placeholder="Pick Corse Timeline"
          // value={}
          data={allCourses.map((ele, index) => ({
            value: ele?.courseTimeline,
            label: ele?.courseTimeline,
          }))}
          onChange={(val) => setSelectedTimeline(val)}
          defaultValue="React"
          clearable
        />
      </div>

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
