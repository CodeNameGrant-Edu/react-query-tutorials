import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchUser = (id) => axios.get(`http://localhost:4000/users/${id}`);
const fetchChannel = (id) => axios.get(`http://localhost:4000/channels/${id}`);

export default function DependentQueries({ email }) {
  const { data: user } = useQuery(['users', email], () => fetchUser(email), {
    onSuccess: () => console.log('User Retrieved')
  });
  const channelId = user?.data.channelId;

  const { isSuccess, data: channel } = useQuery(
    ['channels', channelId],
    () => fetchChannel(channelId),
    {
      //only enable if data from the depending query exists
      enabled: !!channelId,

      onSuccess: () => console.log('Channel Received')
    }
  );

  return (
    <>
      <h4>Courses</h4>
      <ul>{isSuccess && channel.data.courses.map((item) => <li key={item}>{item}</li>)}</ul>
    </>
  );
}
