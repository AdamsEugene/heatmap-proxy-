import { getAllProxyList } from "../api/apiGet";

import StyledTable from "@/components/StyledTable";

export default async function Home() {
  const proxyList = await getAllProxyList({ type: "spa" });

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-2">
      {proxyList && <StyledTable pageTitle="SPAs" proxyList={proxyList} />}
      {!proxyList && (
        <div className="w-full" style={{ height: "calc(100vh - 150px)" }}>
          <div className="h-full flex items-center justify-center">
            <p className="text-3xl font-bold">Sorry, no data found.</p>
          </div>
        </div>
      )}
    </section>
  );
}
