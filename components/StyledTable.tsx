"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
  Button,
} from "@nextui-org/react";

import { DeleteIcon } from "./icons";
import StyledHeader from "./StyledHeader";

import { removeProxy } from "@/app/api/apiGet";
import { useAppStore } from "@/app/store/AppStoreProvider";

type ProxyItem = {
  key: string;
  name: string;
  status: "active" | "paused" | "vacation";
};

type PROPS = {
  proxyList: string[] | false;
  pageTitle: string;
};

const columns = [
  { key: "name", label: "NAME" },
  { key: "status", label: "STATUS" },
  { key: "actions", label: "ACTIONS" },
];

const statusColorMap: {
  [key in ProxyItem["status"]]: "success" | "danger" | "warning";
} = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function StyledTable({ proxyList, pageTitle }: PROPS) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const setAllData = useAppStore((state) => state.setAllData);
  const filteredData = useAppStore((state) => state.filteredData);
  const removeItem = useAppStore((state) => state.removeItem);

  const Active = React.useMemo(() => {
    if (!filteredData || !Array.isArray(filteredData)) {
      return [];
    }

    return filteredData.map((proxy) => ({
      key: proxy,
      name: proxy,
      status: "active",
    }));
  }, [filteredData]) as ProxyItem[];

  const totalPages = Math.ceil((Active?.length || 0) / itemsPerPage);

  const paginatedData =
    Active?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  React.useEffect(() => {
    if (Array.isArray(filteredData) && filteredData.length <= 10) {
      setCurrentPage(1);
    }
  }, [filteredData]);

  React.useEffect(() => {
    // Handle the case when proxyList is false or not an array
    if (proxyList && Array.isArray(proxyList)) {
      setAllData(proxyList);
    } else {
      // Set empty array if no valid data
      setAllData([]);
    }
  }, [setAllData, proxyList]);

  const renderCell = React.useCallback(
    (item: ProxyItem, columnKey: string) => {
      const cellValue = item[columnKey as keyof ProxyItem];

      switch (columnKey) {
        case "name":
          return <span>{cellValue as string}</span>;
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[item.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex items-center justify-end gap-2 mr-10">
              <Tooltip color="danger" content="Delete">
                <Button
                  isIconOnly
                  className="cursor-pointer text-danger"
                  variant="light"
                  onClick={async () => {
                    const res = await removeProxy({
                      proxy: item.name,
                      type:
                        pageTitle === "SPAs"
                          ? "spa"
                          : pageTitle === "Proxy4"
                          ? "proxy4"
                          : pageTitle === "Proxy5"
                          ? "proxy5"
                          : pageTitle === "Proxy6"
                          ? "proxy6"
                          : "website",
                    });

                    if (res) removeItem(item.name);
                  }}
                >
                  <DeleteIcon className="text-xl" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue as string;
      }
    },
    [removeItem, pageTitle]
  );

  return (
    <div className="flex flex-col w-full gap-8">
      <StyledHeader pageTitle={pageTitle} />

      <div className="flex flex-col w-full gap-4">
        <Table isStriped aria-label="Styled table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={column.key === "actions" ? "end" : "start"}
              >
                <div
                  className={`flex ${
                    column.key === "actions"
                      ? "justify-end mr-8"
                      : "justify-start"
                  }`}
                >
                  {column.label}
                </div>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={paginatedData}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell
                    align={columnKey === "actions" ? "center" : "left"}
                  >
                    {renderCell(item, columnKey as string)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        {Active?.length > itemsPerPage && (
          <div className="flex justify-center mt-4">
            <Pagination
              color="secondary"
              initialPage={1}
              page={currentPage}
              total={totalPages}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
