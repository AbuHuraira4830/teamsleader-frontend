import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const UsePusher = (channelName, eventName, apiKey, cluster) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(apiKey, {
      cluster: cluster,
      encrypted: true,
    });

    // Subscribe to the specified channel
    const channel = pusher.subscribe(channelName);

    // Bind to the specified event on the channel
    channel.bind(eventName, data => {
      // Update the state with the new message
      setMessages(prevMessages => [...prevMessages, data]);
    });

    // Cleanup on unmount: unbind from all events and unsubscribe from the channel
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [channelName, eventName, apiKey, cluster]);

  return messages;
};

export default UsePusher;
