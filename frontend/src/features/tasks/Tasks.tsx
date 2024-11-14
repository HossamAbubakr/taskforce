import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTasks } from "@hooks/useTask";
import TaskList from "./TaskList";
import CreateTaskForm from "./CreateTaskForm";

function Tasks() {
  const { tasks, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    let filtered = tasks;

    if (filter !== "all") {
      filtered = filtered.filter((task) => task.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.includes(searchTerm) ||
          task.description.includes(searchTerm)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filter, searchTerm]);

  return (
    <Container>
      <Title>Task Management</Title>
      <CreateTaskForm createTask={createTask} />
      <FilterContainer>
        <Input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </Select>
      </FilterContainer>
      <TasksContainer>
        <TaskList
          tasks={filteredTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </TasksContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const TasksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export default Tasks;
