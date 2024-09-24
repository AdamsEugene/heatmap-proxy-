import { getAllProxyList } from "./api/apiGet";

import StyledHeader from "@/components/StyledHeader";
import StyledTable from "@/components/StyledTable";

export default async function Home() {
  const proxyList = await getAllProxyList({ type: "origin" });

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-2">
      <StyledHeader pageTitle="Origins" />
      <StyledTable proxyList={proxyList} />
    </section>
  );
}
