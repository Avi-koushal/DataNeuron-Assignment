import React from "react";
import '../App.css';
import Splitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import { NavLink ,useNavigate } from "react-router-dom";

function Resizeable() {

  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps
  } = useResizable({
    axis: "y",
    initial: 250,
    min: 50,
    reverse: true
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps
  } = useResizable({
    axis: "x",
    initial: 400,
    min: 50
  });
  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true
  });

  const cn = (...args) => args.filter(Boolean).join(' ');

  return (
    <>
      <div
        className={
          "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
        }
      >
        <div className={"flex grow"}>
          <div
            className={cn("shrink-0 contents", isFileDragging && "dragging")}
            style={{ width: fileW }}
          >
          Task 1
            <img src={"/logo.png"} alt="Logo" />
          </div>
          <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
          <div className={"flex grow"}>
            <div className={"grow bg-darker contents"}>WELCOME</div>
          </div>
        </div>
        <Splitter
          dir={"horizontal"}
          isDragging={isTerminalDragging}
          {...terminalDragBarProps}
        />
        <div
          className={cn(
            "shrink-0 bg-darker contents",
            isTerminalDragging && "dragging"
          )}
          style={{ height: terminalH }}
        >
          <NavLink className="btn btn-secondary"  to="/List">Task 2 to Link Here</NavLink>
        </div>
      </div>
    </>
  );
}

export default Resizeable;
