import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

const WebSocketContext = createContext(null);
export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {

  const socketRef = useRef(null);
  const requestQueue = useRef([]);

  const [isConnected, setIsConnected] = useState(false);

  const [dataCenter, setDataCenter] = useState([]);
  const [dataCenter2, setDataCenter2] = useState([]);
  const [dataCenter3, setDataCenter3] = useState([]);
  const [dataCenter4, setDataCenter4] = useState([]);
const [menuCount, setMenuCount] = useState({
  complaint: 0,
  admin: 0,
  response: 0,
  summary: 0,
});
  const [load, setLoad] = useState(false);

  const WS_URL =
    `${import.meta.env.VITE_REACT_APP_API_BC_PREFIX}` +
    `${window.location.hostname}` +
    `${import.meta.env.VITE_REACT_APP_API_BC}`;
const connectingRef = useRef(false);

const connectWebSocket = useCallback(() => {

  if (socketRef.current || connectingRef.current) return;

  connectingRef.current = true;

  const ws = new WebSocket(WS_URL);
  socketRef.current = ws;

  ws.onopen = () => {
    console.log("✅ WebSocket connected");

    setIsConnected(true);
    connectingRef.current = false;

    // 🔥 ส่ง queue ที่ค้าง
    while (requestQueue.current.length > 0) {
      const req = requestQueue.current.shift();
      ws.send(JSON.stringify(req));
    }
  };

  ws.onclose = () => {
    console.log("❌ WebSocket closed");
    setIsConnected(false);
    socketRef.current = null;
    connectingRef.current = false;

    setTimeout(connectWebSocket, 2000);
  };

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "CENTER_DATA") {

        switch (message.requestType) {

          case "DATA1":
            setDataCenter(message.data);
            break;

          case "DATA2":
          setDataCenter2((prev) => {
    if (JSON.stringify(prev) === JSON.stringify(message.data)) {
      return prev;
    }
    return message.data;
  });
            break;

          case "DATA3":
            setDataCenter3(message.data);
            break;

          case "DATA4":
            setDataCenter4(message.data);
            break;

          default:
            break;
        }

      setLoad(false);
    }

    if (message.type === "COUNT_DATA") {

  setMenuCount(message.data);

  return;
}
  };

}, []);

  const requestData = useCallback((requestType, payload = {}) => {

   const request = {
    type: requestType === "COUNT" 
      ? "GET_COUNT" 
      : "GET_DATA",

    requestType,
    payload,
  };

    const ws = socketRef.current;

    setLoad(true);

    if (ws && ws.readyState === WebSocket.OPEN) {

      ws.send(JSON.stringify(request));

    } else {

      console.log("📦 queue request", requestType);
      requestQueue.current.push(request);

      if (!ws) {
        connectWebSocket();
      }

    }

  }, [connectWebSocket]);

  return (
    <WebSocketContext.Provider
      value={{
        connectWebSocket,
        requestData,
        isConnected,
        menuCount,

        dataCenter,
        dataCenter2,
        dataCenter3,
        dataCenter4,
        load,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};