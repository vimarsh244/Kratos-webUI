import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from "react-bootstrap";
import Config from "../config/config";

function RosTopicEcho() {
  const [apiData, setApiData] = useState('');
  let ros_msg = "/";
  let ros_subscribed_data = "";
  const [inputValue, setInputValue] = useState('');
  const [ros, setRos] = useState(null);
  const [connected, setConnected] = useState(false);

  const initConnection = () => {
    const newRos = new window.ROSLIB.Ros();
    newRos.on("connection", () => {
      console.log("Connection established");
      setConnected(true);
    });
    newRos.on("close", () => {
      console.log("Connection is closed");
      setConnected(false);
      setTimeout(() => {
        try {
          newRos.connect(`ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`);
        } catch (error) {
          console.log("Connection problem");
        }
      }, Config.RECONNECTION_TIMER);
    });
    try {
      newRos.connect(`ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`);
    } catch (error) {
      console.log("Connection problem");
    }
    setRos(newRos);
  }

  const getRobotState = () => {
    if (ros) {
      const subscriber = new window.ROSLIB.Topic({
        ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });
      subscriber.subscribe((message) => {
        ros_subscribed_data = JSON.stringify(message);        
        setApiData(ros_subscribed_data);
        console.log(ros_subscribed_data);

      });
    }
  }

  const handleButtonClick = () => {
    // Make an API request here using fetch or Axios
    // For this example, I'll just simulate a delay and set some data.
    ros_msg = {inputValue}.inputValue;
    console.log(ros_msg);
  }

  useEffect(() => {
    initConnection();
    getRobotState();
  }, []);
  
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter something"
      />
      <button onClick={handleButtonClick}>Fetch Data</button>
      <p>{apiData}</p>
    </div>
  );
}

export default RosTopicEcho;
