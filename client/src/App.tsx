import React from 'react';
import EventCard from './components/EventCard';
import { event } from './interfaces';

const App : React.FC = () => {
  const eventData: event = {
    name: 'saif',
    description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
    img: 'https://cdn.discordapp.com/attachments/956865613425410078/1029018892019974265/pexels-kseniya-budko-9485465_1.png',
    status: 'closed',
    startTime: '12/10/2022',
    profileImage: 'https://cdn.discordapp.com/attachments/956865613425410078/1029018892019974265/pexels-kseniya-budko-9485465_1.png',
    username: 'saif',
  };
  return (

    <div className="App">
      <EventCard eventData={eventData} />
    </div>

  );
};

export default App;
