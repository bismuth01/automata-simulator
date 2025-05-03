import { Stage, Layer } from "react-konva";

function CanvasStage({ shapes }) {
  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer></Layer>
      </Stage>
    </>
  );
}

export default CanvasStage;
