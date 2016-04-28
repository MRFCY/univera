import fetch from 'fetch';

export const parseToJSON = response => response.json();

export const endpoint = 'http://gateway.marvel.com/v1/public';
export const apikey = '5f6c4928bc09049a0a89098a2fe3803f';

export const FETCH_EVENTS = '读取－事件';
export const fetchEvents = () => ({
  type: FETCH_EVENTS,
  payload: fetch(
    `${endpoint}/events?characters=1009368&limit=12&apikey=${apikey}`
  ).then(parseToJSON)
});
