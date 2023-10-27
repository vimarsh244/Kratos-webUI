import ReactGridLayout from "./ReactGridLayout";
import React from "react";
import Connection from "./components/Connection";
import ToggleConnect from "./components/ToggleConnect";
import { ROS } from 'react-ros'
import EchoTopic from "./components/EchoTopic";
import UseDifferent from "./components/UseDifferent";
import ActualRosMsgSub from "./components/ActualRosMsgSub";

function App() {
  return (
    <div className="App">
      {/* <Connection /> */}

      <ROS>
        {/* <ToggleConnect /> */}
        {/* <EchoTopic /> */}
        {/* <ActualRosMsgSub /> */}
      

      <ReactGridLayout />

      {/* <UseDifferent /> */}
      </ROS>
    </div>
  );
}

export default App;
