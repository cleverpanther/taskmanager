import React, { useState } from "react";
import { StyledForm } from "./styles";
import { useTaskContext } from "../../../../contexts/tasks";
import { ICreateTaskPayload, ITaskStatus } from "../../../../types/task";
import { Button, TextArea } from "../../../../components/ui";
import { useKanbanContext } from "../../../../contexts/kanban";

interface IProps extends React.HTMLAttributes<HTMLFormElement> {
  status: ITaskStatus;
  visibility: boolean;
  hideForm: () => void;
}

const FormCreateTask: React.FC<IProps> = (props) => {
  const { hideForm, status, visibility } = props;
  const { currentTemplate } = useKanbanContext();

  const { createTask } = useTaskContext();
  const [newTask, setNewTask] = useState<ICreateTaskPayload>({
    name: "",
    status,
    templateId: currentTemplate._id,
  });

  async function handleCreateTask() {
    if (!newTask.name) return;

    try {
      await createTask(newTask);
      setNewTask((prev) => ({ ...prev, name: "" }));
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <StyledForm onSubmit={handleCreateTask} style={{ display: visibility ? "unset" : "none" }}>
      <TextArea
        rows={2}
        marginBottom={0.5}
        placeholder="Enter a task"
        autoResizeY
        focused
        onChange={(e) => setNewTask((prev) => ({ ...prev, name: e.target.value }))}
        value={newTask.name}
      />

      <div className="btn-group">
        <Button variant="rounded" size="sm" color="gray" onClick={hideForm}>
          Cancel
        </Button>
        <Button type="submit" variant="rounded" size="sm" disabled={!newTask.name}>
          Add
        </Button>
      </div>
    </StyledForm>
  );
};

export default FormCreateTask;
