import { getAllProxyList } from "../api/apiGet";

import StyledTable from "@/components/StyledTable";
import StyledHeader from "@/components/StyledHeader";

export default async function Home() {
  const proxyList = await getAllProxyList({ type: "spa" });

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-2">
      <StyledHeader pageTitle="SPAs" />
      <StyledTable proxyList={proxyList} />
    </section>
  );
}
