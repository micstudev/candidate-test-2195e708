import { Provider } from "react-redux";
import { navStore } from "./store";
import { Navigation } from "./components/Navigation";
import { WEB_SOCKET_URL } from "../constants";

export const NavigationApp = () => {
  const webSocket = new WebSocket(WEB_SOCKET_URL);
  return (
    <Provider store={navStore}>
      <Navigation webSocket={webSocket} />
    </Provider>
  );
};
