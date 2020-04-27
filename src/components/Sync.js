import React from "react";
import Peer from "peerjs";
import * as uuid from 'uuid'
import { useParams } from "react-router-dom";

export const Sync = () => {
  const { peer1, peer2 } = useParams()
  console.log({ peer1, peer2 })
  React.useEffect(() => {
    const peer = new Peer(peer1, {
      host: 'localhost',
      port: '9000',
      key: '123mudar',
      debug: 3,
    });
    peer.on('data', (data) => {
      console.log(data);
    });
    const conn = peer.connect(peer2);
    conn.on("open", () => {
      conn.send("hi!");
    });
    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
      });
      conn.on('open', () => {
        conn.send('hello!');
      });
    });
    const updateInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords
        conn.send({ at: new Date().toISOString(), from: peer1, lat, lng })
      }, console.error)
    }, 1000)
    return () => {
      clearInterval(updateInterval)
      peer.destroy()
    }
  });
  return (
    <pre>{JSON.stringify({ peer1, peer2}, null, 2)}</pre>
  );
};
