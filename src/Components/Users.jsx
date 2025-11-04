import { useContext, useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  TextInput,
  Select,
  Group,
  Input,
  Pagination,
} from "@mantine/core";
import { getUsers, deleteUser, updateUser, getCourses } from "../api/api"; // You need to have updateUser API
import SideBarLayout from "../layout/SideBarLayout";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const { auth } = useContext(AuthContext);

  console.log(auth);

  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(5);
  const [opened, setOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [findUser, setFindUser] = useState("");
  const [courses, setCourses] = useState([]);
  const [userCourseID, setuserCourseID] = useState("");

  console.log(currentPage);

  const getUsersData = async () => {
    const queryParms = new URLSearchParams();

    if (selectedRole) queryParms.append("selectedRole", selectedRole);

    if (selectedGender) queryParms.append("selectedGender", selectedGender);

    if (findUser) queryParms.append("findUser", findUser);

    if (currentPage) queryParms.append("currentPage", currentPage);

    if (dataLimit) queryParms.append("dataLimit", dataLimit);

    const response = await getUsers(queryParms);
    setUsers(response.data.allUsers);
    setTotalCount(response.data.count);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await deleteUser(id);
      getUsersData();
    }
  };

  const handleEditClick = async (user) => {
    try {
      const courses = await getCourses();
      setCourses(courses.data.getCourses);
    } catch (error) {
      console.log(error.message);
    }

    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setGender(user.gender);
    setRole(user.role);
    setOpened(true);
    console.log(user.gender);
  };

  const handleUpdateSubmit = async () => {
    const updatedData = {
      name,
      email,
      gender,
      role,
      userCourseID,
    };
    await updateUser(selectedUser._id, updatedData);
    setOpened(false);
    getUsersData();
  };

  useEffect(() => {
    getUsersData();
  }, [selectedRole, selectedGender, findUser, currentPage, dataLimit]);

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
      {auth.user.role === "SUPER_ADMIN" && element._id !== auth.user._id && (
        <Table.Td>
          <div className="flex gap-x-2">
            <Button
              variant="filled"
              color="red"
              size="sm"
              radius="md"
              onClick={() => handleDelete(element._id)}
            >
              Delete
            </Button>
            <Button
              variant="filled"
              color="indigo"
              size="sm"
              radius="md"
              onClick={() => handleEditClick(element)}
            >
              Edit
            </Button>
          </div>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <SideBarLayout>
      <div className=" bg-gray-800 text-white py-3 px-3">All User Data</div>
      <div className=" bg-gray-800 text-white pb-3 px-3">
        ToTal Users {totalCount}
      </div>
      <div className="flex flex-col justify-center  ">
        <div className="flex gap-2 items-center">
          <Select
            className="w-1/3 mt-5"
            label="Select User Role"
            placeholder="Pick value"
            data={["USER", "ADMIN", "SUPER_ADMIN"]}
            onChange={(e) => setSelectedRole(e)}
            defaultValue="React"
            clearable
          />
          <Select
            className="w-1/3 mt-5"
            label="Select Gender"
            placeholder="Pick value"
            data={["male", "female"]}
            onChange={(e) => setSelectedGender(e)}
            defaultValue="React"
            clearable
          />
          <Input.Wrapper label="Search" className="w-1/3 mt-5">
            <Input
              placeholder="Enter name or email to search"
              onChange={(e) => setFindUser(e.target.value)}
            />
          </Input.Wrapper>
        </div>
        <div className="max-h-120 w-full overflow-y-scroll mt-10">
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
                {auth.user.role === "SUPER_ADMIN" && (
                  <Table.Th>Actions</Table.Th>
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <Pagination
            total={Math.ceil(totalCount / dataLimit)}
            onChange={(e) => setCurrentPage(e)}
          />
          <Select
            label="Set Limit"
            placeholder="Pick Limit"
            defaultValue="5"
            allowDeselect={false}
            data={["5", "10", "15", "20"]}
            onChange={(e) => setDataLimit(e)}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit User"
        centered
      >
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          withAsterisk
        />
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          withAsterisk
          mt="md"
        />
        <Select
          label="Gender"
          value={gender}
          onChange={setGender}
          data={["male", "female"]}
          withAsterisk
          mt="md"
        />
        <Select
          label="Role"
          value={role}
          onChange={setRole}
          data={["ADMIN", "USER"]}
          withAsterisk
          mt="md"
        />
        <Select
          label="Course"
          value={userCourseID}
          onChange={(val) => {
            setuserCourseID(val);
          }}
          data={courses.map((ele) => {
            return { value: ele?._id, label: ele?.courseName };
          })}
          withAsterisk
          mt="md"
        />

        <Group mt="xl" position="right">
          <Button onClick={handleUpdateSubmit}>Update</Button>
        </Group>
      </Modal>
    </SideBarLayout>
  );
};

export default Users;
