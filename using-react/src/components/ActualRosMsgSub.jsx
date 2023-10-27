import React, { useState, useEffect } from 'react'
import { useROS } from 'react-ros'

import ReactJson from 'react-json-view';


var listener = null;
function ActualRosMsgSub() {
  const { createListener, topics } = useROS();
  const [ topic, setTopic ] = useState('/');
  const [ queue, setQueue ] = useState(0);
  const [ compression, setCompression ] = useState('none');

  const [RosMsgGot, setRosMsgGot] = useState('');

  useEffect(() => {
    handleTopic(topic);
  });
  const unsubscribe = () => {
    if (listener) {
      console.log("Unsubscribing");
      listener.unsubscribe();
    }
  }
  const handleTopic = (topicInput) => {
    if (topic !== topicInput) {
      setTopic(topicInput);
      unsubscribe();
      return;
    }
    // unsubscribe();
    listener = null;
    for (var i in topics) {
      if (topics[i].path == topicInput) {
        listener = createListener( topics[i].path,
                                   topics[i].msgType,
                                   Number(queue),
                                   compression);
        break;
      }
    }
    if (listener) {
      console.log("Subscribing to messages...");
      listener.subscribe(handleMsg);
    } else {
      console.log("Topic '" + topic + "' not found...make sure to input the full topic path - including the leading '/'");
    }
  }
  const handleQueue = (queueInput) => {
    setQueue(queueInput);
  }
  const handleCompression = (compInput) => {
    setCompression(compInput);
  }
  const handleMsg = (msg) => {
    // setRosMsgGot(JSON.stringify(msg));
    setRosMsgGot(msg);
    // console.log();
  

  }
  return (
    <div>
      {/* <b>Message Queue Length:  </b><input name="queueInput" defaultValue={ queue } onChange={event => handleQueue(event.target.value)} />  <br /> */}
      {/* <b>Compression:  </b><input name="compInput" defaultValue={ compression } onChange={event => handleCompression(event.target.value)} />  <br /> */}
      <b>Topic to echo:  </b><input name="topicInput" defaultValue={ topic } onChange={event => handleTopic(event.target.value)} />  <br />
      <div>
    <b>Data:  </b>
    {/* <p>{JSON.stringify(RosMsgGot)}</p> */}
    <ReactJson src={RosMsgGot} theme="dark" name={false} collapseStringsAfterLength={4} collapsed={true}  groupArraysAfterLength={3} enableClipboard={false} />
  </div>
    </div>
  );
}
export default ActualRosMsgSub;
