import { Group, Circle, Text } from "react-konva";
import StateType from "../types/StateType";

interface StateProps {
  x: number;
  y: number;
  radius: number;
  name: string;
  type: StateType;
}

function State({ x, y, radius, name, type }: StateProps) {
  const colour = (type: StateType) => {
    if (type == StateType.Normal) {
      return "lightblue";
    } else if (type == StateType.Accept) {
      return "green";
    } else if (type == StateType.Start) {
      return "red";
    }
  };
  return (
    <Group x={x} y={y} draggable>
      <Text
        x={-radius}
        y={-radius / 2}
        width={radius * 2}
        align="center"
        text={name}
        fontSize={15}
      />
      <Circle x={0} y={0} radius={radius} fill={colour(type)} />
    </Group>
  );
}

export default State;
