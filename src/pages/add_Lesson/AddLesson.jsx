import React, { useEffect, useState } from "react";
import SideBarLayout from "../../layout/SideBarLayout";
import {
  Button,
  Input,
  Modal,
  NumberInput,
  Select,
  Table,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  addLesson,
  getCourses,
  getLessonsByCourse,
  removeLesson,
} from "../../api/api";

const AddLesson = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [courses, setCourses] = useState([]); // list of courses
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [lessonOrder, setLessonOrder] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data.getCourses || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLessons = async () => {
    if (!selectedCourse) return; // prevents invalid requests
    try {
      setLoading(true);
      const response = await getLessonsByCourse(selectedCourse);
      setLessons(response.data.lessons || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLesson = async () => {
    if (!selectedCourse || !lessonTitle || !videoUrl) {
      return alert("Please fill Course, Title and Video URL");
    }

    try {
      const payload = {
        courseId: selectedCourse,
        title: lessonTitle,
        description: lessonDescription,
        videoUrl,
        order: lessonOrder,
      };

      console.log(payload);

      await addLesson(payload);
      await fetchLessons();
    } catch (error) {
      console.log(error.message);
    }
    setLessonTitle("");
    setLessonDescription("");
    setVideoUrl("");
    setLessonOrder(0);

    close();
  };

  const handleRemoveLesson = async (lessonId) => {
    const confiomDelete = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (!confiomDelete) return;
    try {
      await removeLesson(lessonId);
      await fetchLessons();
    } catch (error) {
      console.log(error.message);
    }
  };

  const rows = lessons.map((lesson, idx) => (
    <Table.Tr key={lesson._id}>
      <Table.Td>{idx + 1}</Table.Td>
      <Table.Td>{lesson.title}</Table.Td>
      <Table.Td className="truncate max-w-[240px]">
        {lesson.description}
      </Table.Td>
      <Table.Td>
        <a
          href={lesson.videoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          View
        </a>
      </Table.Td>
      <Table.Td>{lesson.order}</Table.Td>
      <Table.Td>
        <Button
          variant="filled"
          color="red"
          size="xs"
          onClick={() => handleRemoveLesson(lesson._id)}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    fetchCourses();
    if (selectedCourse) {
      fetchLessons();
    } else {
      setLessons([]);
    }
  }, [selectedCourse]);

  console.log(lessons);

  return (
    <SideBarLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 bg-gray-800 text-white py-3 px-3">
        <p className="text-lg font-semibold">Add Lessons to Courses</p>
        <Button
          className="w-full sm:w-1/5"
          variant="filled"
          color="rgba(87, 87, 87, 0.47)"
          onClick={open}
        >
          Add Lesson
        </Button>
      </div>

      <div className="p-4">
        <Select
          label="Select Course"
          placeholder="Choose a course"
          value={selectedCourse}
          onChange={(val) => setSelectedCourse(val)}
          data={courses.map((c) => ({ value: c._id, label: c.courseName }))}
          className="w-full sm:w-1/2"
        />
      </div>

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Video</Table.Th>
            <Table.Th>Order</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={6} className="text-center text-gray-500">
                Loading lessons...
              </Table.Td>
            </Table.Tr>
          ) : lessons.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={6} className="text-center text-gray-500">
                {selectedCourse
                  ? "No lessons for this course."
                  : "Select a course to view lessons."}
              </Table.Td>
            </Table.Tr>
          ) : (
            rows
          )}
        </Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={close} title="Add Lesson" size="xl">
        <div className="flex flex-col gap-4">
          <Select
            label="Select Course"
            placeholder="Pick a course"
            value={selectedCourse}
            onChange={(val) => setSelectedCourse(val)}
            data={courses.map((c) => ({ value: c._id, label: c.courseName }))}
            required
          />

          <Input.Wrapper label="Lesson Title">
            <Input
              placeholder="Enter lesson title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              required
            />
          </Input.Wrapper>

          <Textarea
            label="Lesson Description"
            placeholder="Short description"
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
          />

          <Input.Wrapper label="Video URL">
            <Input
              placeholder="https://example.com/video.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </Input.Wrapper>

          <NumberInput
            label="Lesson Order"
            placeholder="1"
            value={lessonOrder}
            onChange={setLessonOrder}
            min={0}
          />

          <Button
            className="w-full sm:w-1/3 mt-4"
            variant="filled"
            color="rgba(0, 0, 0, 1)"
            onClick={handleAddLesson}
          >
            Add Lesson
          </Button>
        </div>
      </Modal>
    </SideBarLayout>
  );
};

export default AddLesson;
