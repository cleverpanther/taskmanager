import React from "react";
import { ContainerList, TaskItem, DotsIcon, Text } from "./styles";
import { Popover } from "../../../../components/ui";
import { HiDotsHorizontal } from "react-icons/hi";
import { useTemplateContext } from "../../../../contexts/templates";
import { ITask } from "../../../../types/task";

interface IProps {
  tasks: ITask[];
  color: string;
  openModalEdit: (task: ITask) => void;
}

const TasksList: React.FC<IProps> = (props) => {
  const { tasks, openModalEdit, ...rest } = props;

  const { deleteTask } = useTemplateContext();

  async function handleDeleteTask(taskId: string) {
    try {
      await deleteTask({ taskId });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <ContainerList>
      {tasks.map((task) => (
        <TaskItem key={task._id} {...rest}>
          <Text>{task.name}</Text>

          <Popover
            className="popover"
            position="left"
            content={<DotsIcon icon={<HiDotsHorizontal />} hoverBgColor={rest.color} />}
            options={[
              {
                content: "Edit",
                onClick: () => openModalEdit(task),
              },
              {
                content: "Delete",
                onClick: () => handleDeleteTask(task._id),
              },
            ]}
          />
        </TaskItem>
      ))}
    </ContainerList>
  );
};

export default TasksList;