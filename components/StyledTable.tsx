"use client";

import React from "react";
import { TbTrash } from "react-icons/tb";

import StyledHeader from "./StyledHeader";

import { removeProxy } from "@/app/api/apiGet";
import { useAppStore } from "@/app/store/AppStoreProvider";
import { Card, CardSurface } from "@/components/product/card";
import {
  DataTable,
  sortRows,
  type DataColumn,
  type SortState,
} from "@/components/product/data-table";
import { StatusBadge } from "@/components/product/status-badge";
import { TablePager } from "@/components/product/table-pager";
import { PortalIconButton } from "@/components/portal/portal-icon-button";
import { pageTitleToProxyType } from "@/lib/proxy-page-title";
import { TablerIcon } from "@/lib/tabler-icon";

type ProxyItem = {
  id: string;
  name: string;
  status: "active";
};

type PROPS = {
  proxyList: string[] | false;
  pageTitle: string;
};

const ITEMS_PER_PAGE = 10;

export default function StyledTable({ proxyList, pageTitle }: PROPS) {
  const [page, setPage] = React.useState(0);
  const [sort, setSort] = React.useState<SortState>({
    key: "name",
    dir: "asc",
  });

  const setAllData = useAppStore((state) => state.setAllData);
  const filteredData = useAppStore((state) => state.filteredData);
  const removeItem = useAppStore((state) => state.removeItem);

  const rows = React.useMemo((): ProxyItem[] => {
    if (!filteredData || !Array.isArray(filteredData)) {
      return [];
    }

    return filteredData.map((name) => ({
      id: name,
      name,
      status: "active",
    }));
  }, [filteredData]);

  const sorted = React.useMemo(
    () =>
      sortRows(rows, sort, (row, key) =>
        key === "name" ? row.name : row.status,
      ),
    [rows, sort],
  );

  const pages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paged = sorted.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  React.useEffect(() => {
    if (page > pages - 1) {
      setPage(Math.max(0, pages - 1));
    }
  }, [page, pages]);

  React.useEffect(() => {
    if (proxyList && Array.isArray(proxyList)) {
      setAllData(proxyList);
    } else {
      setAllData([]);
    }
  }, [proxyList, setAllData]);

  const columns = React.useMemo((): DataColumn<ProxyItem>[] => {
    return [
      {
        key: "name",
        header: "Name",
        sortable: true,
        width: "50%",
        cell: (row) => (
          <span className="block truncate font-medium" title={row.name}>
            {row.name}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        width: 140,
        align: "center",
        sortable: true,
        cell: () => (
          <StatusBadge dot={false} size="sm" tone="success">
            Active
          </StatusBadge>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        width: 88,
        align: "right",
        cell: (row) => (
          <div className="flex justify-end">
            <PortalIconButton
              className="text-destructive hover:text-destructive"
              label={`Remove ${row.name}`}
              type="button"
              onClick={async () => {
                const res = await removeProxy({
                  proxy: row.name,
                  type: pageTitleToProxyType(pageTitle),
                });

                if (res) removeItem(row.name);
              }}
            >
              <TablerIcon aria-hidden className="size-4" icon={TbTrash} />
            </PortalIconButton>
          </div>
        ),
      },
    ];
  }, [pageTitle, removeItem]);

  return (
    <div className="flex w-full flex-col gap-6">
      <StyledHeader pageTitle={pageTitle} />

      <Card data-hm-card>
        <CardSurface className="gap-0" padded={false}>
          <DataTable
            columns={columns}
            empty={
              <span className="text-sm text-muted-foreground">
                No origins yet. Add one with <strong>Add origin</strong>.
              </span>
            }
            rowKey={(row) => row.id}
            rows={paged}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePager page={page} pages={pages} onPageChange={setPage} />
        </CardSurface>
      </Card>
    </div>
  );
}
