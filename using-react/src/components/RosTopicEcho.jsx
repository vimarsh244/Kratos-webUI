import React, { useState, useEffect } from 'react';

const RosTopicEcho = () => {
  const [ros, setRos] = useState(null);
  const [ros_msg_value, setRosMsgValue] = useState(null);
  const [Connected, setConnected] = useState(false);
  const [linear_velocity, setLinearVelocity] = useState(0);
  const [angular_velocity, setAngularVelocity] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [apiData, setApiData] = useState('');

  const initConnection = () => {
    const newRos = new window.ROSLIB.Ros();
    setRos(newRos);

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
  };

  
  const getRobotState = () => {
    if (ros) {
      const subscriber = new window.ROSLIB.Topic({
        ros: ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });
  
      subscriber.subscribe((message) => {
        setRosMsgValue(JSON.stringify(message));
        console.log(ros_msg_value);
      });
    }
  };
  

  const handleButtonClick = () => {
    setTimeout(() => {
      setApiData(`Data from API for ${inputValue}`);
    }, 1000);
    console.log(apiData);
  };

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
      <p>{ros_msg_value}</p>
    </div>
  );
};

export default RosTopicEcho;
