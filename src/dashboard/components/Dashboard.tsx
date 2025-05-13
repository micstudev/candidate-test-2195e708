import { Provider } from "react-redux";
import { dashboardStore } from "../store";
import { WorkStatusCard } from "./WorkStatusCard";
import { StatsSummary } from "./StatsSummary";
import { RecentJobs } from "./RecentJobs";
import { WEB_SOCKET_URL } from "../../constants";

export const Dashboard = ({}) => {
  const webSocket = new WebSocket(WEB_SOCKET_URL);

  return (
    <Provider store={dashboardStore}>
      <div className="px-2 py-8 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl mb-2">Welcome to your Dashboard</h1>
          <p className="text-base text-gray-700">Track your freelance business at a glance</p>
        </header>

        <StatsSummary />

        <div className="grid grid-cols-1 gap-y-6 lg:gap-6 lg:grid-cols-3">
          <WorkStatusCard webSocket={webSocket} className="h-full" />
          <RecentJobs className="col-span-2 h-full" />
        </div>
      </div>
    </Provider>
  );
};
