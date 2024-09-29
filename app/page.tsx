import { getAllProxyList } from "./api/apiGet";

import StyledTable from "@/components/StyledTable";

export default async function Home() {
  const proxyList = await getAllProxyList({ type: "origin" });

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-2">
      <StyledTable pageTitle="Origins" proxyList={proxyList} />
    </section>
  );
}
