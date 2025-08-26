import { Button, Input, Modal, Select, Table } from "@mantine/core";
import SideBarLayout from "../layout/SideBarLayout";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const Courses = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCourses, setSelectedCourses] = useState("");
  const [totalCourses, setTotalCourses] = useState([]);

  const handaleAddCourses = () => {
    if (!selectedCourses) return;

    if (totalCourses.includes(selectedCourses))
      return alert("Course already added");

    setTotalCourses([...totalCourses, selectedCourses]);
    setSelectedCourses(null);
  };
  console.log(totalCourses);

  return (
    <SideBarLayout>
      <Modal opened={opened} onClose={close} title="Add Courses" size="xl">
        <div className="flex">
          <Select
            label="Add Courses"
            placeholder="Select a course"
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
          />
          <Input.Wrapper label="Enter Course Code">
            <Input placeholder="Input inside Input.Wrapper" />
          </Input.Wrapper>
        </div>
        <Button
          className="sm:!w-[35%] mt-4"
          variant="filled"
          color="rgba(0, 0, 0, 1)"
          onClick={handaleAddCourses}
        >
          Add Courses
        </Button>
      </Modal>
      <div className=" flex flex-col gap-y-3 bg-gray-800 text-white py-3 px-3">
        <p>All Courses</p>
        <Button
          className="sm:!w-[20%]"
          variant="filled"
          color="rgba(87, 87, 87, 0.47)"
          onClick={open}
        >
          Add Courses
        </Button>
      </div>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        {/* {...rows} */}
      </Table>
    </SideBarLayout>
  );
};

export default Courses;
