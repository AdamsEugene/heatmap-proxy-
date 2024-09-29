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
  Radio,
  RadioGroup,
  Pagination,
} from "@nextui-org/react";

import { EditIcon, DeleteIcon, EyeIcon } from "./icons";
import { PROXY_RESPONSE } from "@/types";

type ProxyItem = {
  key: string;
  name: string;
  status: "active" | "paused" | "vacation";
};

type PROPS = {
  proxyList: PROXY_RESPONSE;
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

export default function StyledTable({ proxyList }: PROPS) {
  const [selectionBehavior, setSelectionBehavior] = React.useState<
    "toggle" | "replace"
  >("replace");

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; // Changed to 10 items per page

  const Active: ProxyItem[] = Object.values(proxyList?.msg || {}).map(
    (proxy) => ({
      key: proxy,
      name: proxy,
      status: "active",
    })
  );

  const totalPages = Math.ceil(Active.length / itemsPerPage);

  const paginatedData = Active.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCell = React.useCallback((item: ProxyItem, columnKey: string) => {
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
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="View details">
              <span className="cursor-pointer text-default-400">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="cursor-pointer text-default-400">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="cursor-pointer text-danger">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue as string;
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Table
        isStriped
        aria-label="Styled table with dynamic content"
        selectionBehavior={selectionBehavior}
        selectionMode="multiple"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
            >
              <div
                className={`flex ${
                  column.key === "actions" ? "justify-center" : "justify-start"
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
                <TableCell align={columnKey === "actions" ? "center" : "left"}>
                  {renderCell(item, columnKey as string)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      <RadioGroup
        label="Selection Behavior"
        orientation="horizontal"
        value={selectionBehavior}
        onValueChange={(s) => {
          setSelectionBehavior(s as "toggle" | "replace");
        }}
      >
        <Radio value="toggle">Toggle</Radio>
        <Radio value="replace">Replace</Radio>
      </RadioGroup>
    </div>
  );
}
