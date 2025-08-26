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
import { addCourse, getCourses } from "../api/api";

const Courses = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCourses, setSelectedCourses] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseStartingDate, setCourseStartingDate] = useState([]);
  const [courseEndingDate, setCourseEndingDate] = useState([]);
  const [courseFee, setCourseFee] = useState();
  const [courseDetails, setcourseDetails] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  const handaleAddCourses = async () => {
    if (!selectedCourses) return alert("Please fill all the fields");
    if (courseCode === "" && courseDescription === "")
      return alert("Please fill all the fields");
    if (courseDetails.includes(selectedCourses))
      return alert("Course already added");

    const newCourse = {
      courseName: selectedCourses,
      courseCode: courseCode,
      courseDescription: courseDescription,
      courseStartingDate: courseStartingDate,
      courseEndingDate: courseEndingDate,
      courseFee: courseFee,
    };

    try {
      await addCourse(newCourse);
    } catch (error) {
      console.log(error.message || "error while passing newCourse");
    }

    console.log(newCourse);

    setcourseDetails([...courseDetails, selectedCourses]);
    setSelectedCourses(null);
  };

  const fetxhCourses = async () => {
    try {
      const response = await getCourses();
      setAvailableCourses(response.data.getCourses)
      console.log(response.data.getCourses)

    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetxhCourses();
  }, []);

  const rows = availableCourses.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.courseName}</Table.Td>
      <Table.Td>{element.courseCode}</Table.Td>
      <Table.Td>{element.courseFee}</Table.Td>
      <Table.Td>{element.courseStartingDate}</Table.Td>
      <Table.Td>{element.courseEndingDate}</Table.Td>
      <Table.Td>{element.courseDescription}</Table.Td>
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
              required
            />
          </Input.Wrapper>
        </div>

        <div className="mt-4">
          <Input.Wrapper label="Enter Course Description" className="w-full">
            <Input
              placeholder="Input Course Description"
              onChange={(e) => setCourseDescription(e.target.value)}
              required
            />
          </Input.Wrapper>
        </div>
        <div className="flex justify-between px-4">
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Select Starting Date</p>
            <DatePicker
              value={courseStartingDate}
              onChange={setCourseStartingDate}
              required
            />
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Select Ending Date</p>
            <DatePicker
              value={courseEndingDate}
              onChange={setCourseEndingDate}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <NumberInput
            label="Course Fee"
            placeholder="Enter course fee"
            min={0}
            step={100}
            parser={(value) => value.replace(/\₹\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "₹ "
            }
            onChange={(e) => setCourseFee(e)}
            required
          />
        </div>

        <Button
          className="w-full sm:w-1/3 mt-6"
          variant="filled"
          color="rgba(0, 0, 0, 1)"
          onClick={handaleAddCourses}
        >
          Add Courses
        </Button>
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
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
        >
          {rows}
        </Table>
      </div>
    </SideBarLayout>
  );
};

export default Courses;
