import { Group, Text, Arrow } from "react-konva";

interface TransitionProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  label: string;
}

function Transition({ fromX, fromY, toX, toY, label }: TransitionProps) {
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  return (
    <Group>
      <Arrow
        points={[fromX, fromY, toX, toY]}
        stroke="black"
        strokeWidth={2}
        fill="black"
      />
      <Text x={midX} y={midY} text={label} fontSize={15} />
    </Group>
  );
}

export default Transition;
