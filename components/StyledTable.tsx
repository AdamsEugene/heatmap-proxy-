"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

import { PROXY_RESPONSE } from "@/types";

type PROPS = {
  proxyList: PROXY_RESPONSE;
};

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function StyledTable({ proxyList }: PROPS) {
  const [selectionBehavior, setSelectionBehavior] = React.useState<
    "toggle" | "replace"
  >("replace");

  const Active = proxyList.msg.map((proxy) => ({
    key: proxy,
    name: proxy,
    status: "Active",
  }));

  return (
    <div className="flex flex-col gap-3 w-full">
      <Table
        isStriped
        aria-label="Rows actions table example with dynamic content"
        selectionBehavior={selectionBehavior}
        selectionMode="multiple"
        onRowAction={(key) => alert(`Opening item ${key}...`)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={Active}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RadioGroup
        label="Selection Behavior"
        orientation="horizontal"
        value={selectionBehavior}
        onValueChange={(s: any) => setSelectionBehavior(s)}
      >
        <Radio value="toggle">Toggle</Radio>
        <Radio value="replace">Replace</Radio>
      </RadioGroup>
    </div>
  );
}
