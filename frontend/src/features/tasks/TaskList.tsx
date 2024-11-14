import styled from "styled-components";
import TaskItem from "./TaskItem";
import { Task as TaskType } from "@customTypes/apiTypes";

interface TaskListProps {
  tasks: TaskType[];
  updateTask: (id: number, updatedTask: TaskType) => void;
  deleteTask: (id: number) => void;
}

function TaskList({ tasks, updateTask, deleteTask }: TaskListProps) {
  return (
    <List>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))
      ) : (
        <Title>Nothing here yet, start by adding a task 🥰</Title>
      )}
    </List>
  );
}

const List = styled.div`
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

export default TaskList;
