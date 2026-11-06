import { getAllProxyList } from "../api/apiGet";

import StyledTable from "@/components/StyledTable";
import { EmptyProxyState } from "@/components/empty-proxy-state";

export default async function Home() {
  const proxyList = await getAllProxyList({ type: "proxy6" });

  return (
    <section className="flex flex-col gap-6">
      <StyledTable pageTitle="Proxy6" proxyList={proxyList} />
      {!proxyList && <EmptyProxyState />}
    </section>
  );
}
