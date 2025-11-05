import {
  Button,
  Input,
  Modal,
  NumberInput,
  Select,
  Table,
} from "@mantine/core";
import "@mantine/dates/styles.css";
import SideBarLayout from "../layout/SideBarLayout";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DatePicker } from "@mantine/dates";
import {
  addCourse,
  getCourses,
  removeCourse,
  updateCourse,
} from "../api/api.js";

const Courses = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCourses, setSelectedCourses] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseTimeline, setCourseTimeline] = useState([]);
  const [courseFee, setCourseFee] = useState();
  const [courseDetails, setcourseDetails] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courseID, setCourseId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!opened) {
      setIsUpdate(false);
    }
  }, [opened]);

  const handaleAddCourses = async () => {
    if (!selectedCourses) return alert("Please fill all the fields");
    if (courseCode === "" && courseDescription === "" && courseTimeline === "")
      return alert("Please fill all the fields");
    if (courseDetails.includes(selectedCourses))
      return alert("Course already added");

    const newCourse = {
      courseName: selectedCourses,
      courseCode: courseCode,
      courseDescription: courseDescription,
      courseTimeline: courseTimeline,
      courseFee: courseFee,
    };

    try {
      await addCourse(newCourse);
      fetxhCourses();
    } catch (error) {
      console.log(error.message || "error while passing newCourse");
    }

    setcourseDetails([...courseDetails, selectedCourses]);
    setSelectedCourses(null);
    setCourseCode("");
    setCourseDescription("");
    setCourseTimeline("");
    setCourseFee("");
    close();
  };

  const fetxhCourses = async () => {
    try {
      const response = await getCourses();
      setAvailableCourses(response.data.getCourses);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetxhCourses();
  }, []);

  const handelRemove = async (id) => {
    try {
      console.log("index", id);
      await removeCourse(id);
      fetxhCourses();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelEdit = (ele) => {
    setIsUpdate(true);
    open();
    setSelectedCourses(ele.courseName);
    setCourseCode(ele.courseCode);
    setCourseDescription(ele.courseDescription);
    setCourseTimeline(ele.courseTimeline);
    setCourseFee(ele.courseFee);
    setcourseDetails(ele.courseCode);
    setCourseId(ele._id);
  };

  const handelUpdate = async () => {
    try {
      const updatedCourse = {
        courseName: selectedCourses,
        courseCode: courseCode,
        courseDescription: courseDescription,
        courseTimeline: courseTimeline,
        courseFee: courseFee,
        courseId: courseID,
      };
      console.log(updatedCourse);

      await updateCourse(updatedCourse);

      close();
      fetxhCourses();
      setIsUpdate(false);
      setCourseId(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const rows = availableCourses.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.courseName}</Table.Td>
      <Table.Td>{element.courseCode}</Table.Td>
      <Table.Td>$ {element.courseFee}</Table.Td>
      <Table.Td>{element.courseTimeline}</Table.Td>
      <Table.Td>{element.courseDescription}</Table.Td>
      <Table.Td>
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
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <SideBarLayout>
      <Modal opened={opened} onClose={close} title="Add Courses" size="xl">
        <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-3">
          <Select
            label="Add Courses"
            placeholder="Select a course"
            className="w-full sm:w-1/2"
            searchable
            autoSelectOnBlur
            value={selectedCourses}
            onChange={(e) => setSelectedCourses(e)}
            data={[
              {
                group: "Frontend",
                items: [
                  "React",
                  "Angular",
                  "Vue",
                  "Svelte",
                  "JavaScript",
                  "TypeScript",
                  "HTML",
                  "CSS",
                  "TailwindCSS",
                  "Bootstrap",
                  "MaterialUI",
                  "ChakraUI",
                ],
              },
              {
                group: "State Management",
                items: ["Redux", "MobX", "Recoil", "Zustand"],
              },
              {
                group: "Backend",
                items: ["NodeJs", "ExpressJs", "NextJs", "MongoDB"],
              },
              {
                group: "Testing",
                items: ["Jest", "Cypress", "Playwright", "Puppeteer"],
              },
              {
                group: "Design Tools",
                items: ["Figma", "AdobeXD", "Sketch", "InVision"],
              },
            ]}
            required
          />

          <Input.Wrapper label="Enter Course Code" className="w-full sm:w-1/2">
            <Input
              placeholder="Input Course Code"
              onChange={(e) => setCourseCode(e.target.value)}
              value={courseCode}
              required
            />
          </Input.Wrapper>
        </div>

        <div className="mt-4">
          <Input.Wrapper label="Enter Course Description" className="w-full">
            <Input
              placeholder="Input Course Description"
              onChange={(e) => setCourseDescription(e.target.value)}
              value={courseDescription}
              required
            />
          </Input.Wrapper>
        </div>
        <div className="flex justify-between">
          <div className="mt-4">
            <Select
              label="Select Course Timeline"
              placeholder="Pick duration"
              searchable
              autoSelectOnBlur
              value={courseTimeline}
              onChange={(value) => setCourseTimeline(value)}
              data={[
                "1 Month",
                "2 Months",
                "3 Months",
                "4 Months",
                "5 Months",
                "6 Months",
                "7 Months",
                "8 Months",
                "9 Months",
                "10 Months",
                "11 Months",
                "1 Year",
                "2 Years",
                "3 Years",
                "4 Years",
                "5 Years",
              ]}
            />
          </div>
        </div>

        <div className="mt-4">
          <NumberInput
            label="Course Fee"
            placeholder="Enter course fee"
            onChange={(e) => setCourseFee(e)}
            value={courseFee}
            required
          />
        </div>

        {isUpdate ? (
          <Button
            className="w-full sm:w-1/3 mt-6"
            variant="filled"
            color="rgba(0, 0, 0, 1)"
            onClick={handelUpdate}
          >
            Update Courses
          </Button>
        ) : (
          <Button
            className="w-full sm:w-1/3 mt-6"
            variant="filled"
            color="rgba(0, 0, 0, 1)"
            onClick={handaleAddCourses}
          >
            Add Courses
          </Button>
        )}
      </Modal>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 bg-gray-800 text-white py-3 px-3">
        <p className="text-lg font-semibold">All Courses</p>
        <Button
          className="w-full sm:w-1/5"
          variant="filled"
          color="rgba(87, 87, 87, 0.47)"
          onClick={open}
        >
          Add Courses
        </Button>
      </div>

      <div className="overflow-x-auto mt-4">
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Corse Name</Table.Th>
              <Table.Th>Corse Code</Table.Th>
              <Table.Th>Corse Fee</Table.Th>
              <Table.Th>Corse Timeline</Table.Th>
              <Table.Th>Corse Decription</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </SideBarLayout>
  );
};

export default Courses;
