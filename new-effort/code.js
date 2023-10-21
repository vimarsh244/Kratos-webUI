var ros = new ROSLIB.Ros({
  url: "ws://localhost:9090",
});

var public_linear_imu_x = 0;

ros.on("connection", function () {
  document.getElementById("status").innerHTML = "Connected";
});

ros.on("error", function (error) {
  document.getElementById("status").innerHTML = "Error";
});

ros.on("close", function () {
  document.getElementById("status").innerHTML = "Closed";
});

var txt_listener = new ROSLIB.Topic({
  ros: ros,
  name: "/txt_msg",
  messageType: "std_msgs/String",
});

txt_listener.subscribe(function (m) {
  document.getElementById("msg").innerHTML = m.data;
//   move(1, 0);
});
//================


var imu_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/imu",
    messageType: "sensor_msgs/Imu",
  });
  
  

//   imu_listener.subscribe(function (m) {
//     // console.log(m);
//     public_linear_imu_x = m.orientation.z
//     document.getElementById("subodom").innerHTML = public_linear_imu_x;

//     // Update the global data array with new data.
//     data.push(public_linear_imu_x);

//     // Limit the number of data points displayed (e.g., keep the last 50 data points).
//     if (data.length > 500) {
//         data.shift();
//     }

//     // Update the chart with the new data.
//     chart.update();

// });
// it lags if so many updates


var odom_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/odom",
    messageType: "nav_msgs/Odometry",
  });
  
  odom_listener.subscribe(function (m) {
    // console.log(m);
    public_linear_imu_x = m.pose.pose.position.x
    document.getElementById("subodom").innerHTML = public_linear_imu_x;

    // Update the global data array with new data.
    sub_data.push(public_linear_imu_x);
    console.log(sub_data);

    // Limit the number of data points displayed (e.g., keep the last 50 data points).
    if (sub_data.length > 5000) {
        sub_data.shift();
    }
    Plotly.update(chart, {
        x: [sub_data.map((_, index) => index)], // X-axis data (time)
        y: [sub_data], // Y-axis data
    });

});








// =================

cmd_vel_listener = new ROSLIB.Topic({
  ros: ros,
  name: "/cmd_vel",
  messageType: "geometry_msgs/Twist",
});

move = function (linear, angular) {
  var twist = new ROSLIB.Message({
    linear: {
      x: linear,
      y: 0,
      z: 0,
    },
    angular: {
      x: 0,
      y: 0,
      z: angular,
    },
  });
  cmd_vel_listener.publish(twist);
};

createJoystick = function () {
  var options = {
    zone: document.getElementById("zone_joystick"),
    threshold: 0.1,
    position: { left: 50 + "%" },
    mode: "static",
    size: 150,
    color: "#000000",
  };
  manager = nipplejs.create(options);

  linear_speed = 0;
  angular_speed = 0;

  manager.on("start", function (event, nipple) {
    timer = setInterval(function () {
      move(linear_speed, angular_speed);
    }, 25);
  });

  manager.on("move", function (event, nipple) {
    max_linear = 0.22; // m/s
    max_angular = 1.5; // rad/s
    max_distance = 75.0; // pixels;
    linear_speed =
      (Math.sin(nipple.angle.radian) * max_linear * nipple.distance) /
      max_distance;
    angular_speed =
      (-Math.cos(nipple.angle.radian) * max_angular * nipple.distance) /
      max_distance;
  });

  manager.on("end", function () {
    if (timer) {
      clearInterval(timer);
    }
    self.move(0, 0);
  });
};

window.onload = function () {
  createJoystick();
};
