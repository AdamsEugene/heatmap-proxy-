"use client";

import { usePathname } from "next/navigation";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

import { Logo } from "@/components/icons";
import { TablerIcon } from "@/lib/tabler-icon";
import { NavItem } from "@/components/portal/nav-item";
import { ProxyPageNav } from "@/components/portal/proxy-page-nav";
import { siteConfig } from "@/config/site";

type Props = {
  children: React.ReactNode;
};

export function PortalFrame({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="hm-ws">
      <aside className="hm-ws-col hm-ws-col--nav">
        <header className="hm-ws-col__hdr gap-2.5 pr-3 pl-4">
          <Logo className="shrink-0 text-primary" size={28} />
          <p className="hm-ws-col__title">{siteConfig.name}</p>
        </header>
        <div className="hm-ws-col__body">
          <p className="mb-2 px-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Admin
          </p>
          <nav aria-label="Admin" className="hm-ws-navlist">
            <NavItem
              current
              href="/"
              icon={
                <TablerIcon
                  aria-hidden
                  className="bp-navicon size-[18px]"
                  icon={TbAdjustmentsHorizontal}
                />
              }
            >
              Manage origins
            </NavItem>
          </nav>
        </div>
      </aside>

      <div className="hm-ws-col hm-ws-col--content">
        <div className="hm-ws-content-pane">
          <ProxyPageNav pathname={pathname} />
          <div className="hm-ws-content-scroll">
            <div className="hm-ws-content-inner">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
