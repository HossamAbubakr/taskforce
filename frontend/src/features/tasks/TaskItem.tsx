import React, { useState } from "react";
import styled from "styled-components";
import { Status, Task } from "@customTypes/apiTypes";

interface TaskItemProps {
  task: Task;
  updateTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
}

function TaskItem({ task, updateTask, deleteTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <TaskWrapper>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            required
          />
          <StyledButton variant="edit" type="submit">
            Save
          </StyledButton>
        </form>
      ) : (
        <>
          <TaskTitle status={task.status}>{task.title}</TaskTitle>
          <div>
            <StyledButton variant="edit" onClick={() => setIsEditing(true)}>
              Edit
            </StyledButton>
            <StyledButton variant="delete" onClick={() => deleteTask(task.id)}>
              Delete
            </StyledButton>
            <StyledButton
              variant="toggle"
              onClick={() =>
                updateTask(task.id, {
                  ...task,
                  status:
                    task.status === Status.OPEN ? Status.CLOSED : Status.OPEN,
                })
              }
            >
              {task.status === "OPEN" ? "CLOSED" : "OPEN"}
            </StyledButton>
          </div>
        </>
      )}
    </TaskWrapper>
  );
}

const TaskWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.body};
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

interface TaskTitleProps {
  status: string;
}

const TaskTitle = styled.span.attrs<TaskTitleProps>((props) => ({
  status: props.status,
}))<TaskTitleProps>`
  color: ${({ theme }) => theme.text};
  text-decoration: ${({ status }) =>
    status === "closed" ? "line-through" : "none"};
`;

const StyledButton = styled.button<{ variant: string }>`
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme, variant }) =>
    variant === "edit" ? theme.secondary : theme.primary};
  color: #fff;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "edit" ? theme.primary : theme.secondary};
  }
`;
export default TaskItem;
