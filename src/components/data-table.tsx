import * as React from "react";
import { IoSearch } from "react-icons/io5";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import CardWrapper from "./card-wrapper";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchPlaceholder?: string;
  searchKey?: keyof TData;
  itemsPerPage?: number;
  noDataMessage?: string;
  headerExtra?: React.ReactNode;
  heading?: string;
  headerSameLine?: boolean;
  showPagination?: boolean;
  extraComps?: React.ReactNode;
}

export function DataTable<TData>({
  data,
  columns,
  heading,
  searchPlaceholder = "Search…",
  searchKey,
  itemsPerPage = 5,
  noDataMessage = "No results found. Try adjusting your search or filters.",
  headerExtra,
  headerSameLine = false,
  showPagination = false,
  extraComps,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: itemsPerPage,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      globalFilter,
      columnFilters,
      pagination,
    },
    globalFilterFn: searchKey
      ? (row, _, filterValue) => {
          const val = row.getValue(searchKey as string);
          return String(val)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase());
        }
      : "includesString",
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <div className="w-full flex flex-col gap-5   ">
      {headerSameLine ? (
        <></>
      ) : (
        <h1 className="font-bold text-lg  text-slate-50">{heading}</h1>
      )}

      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        {headerSameLine ? (
          <h1 className="font-bold text-lg  text-slate-50">{heading}</h1>
        ) : (
          searchKey && (
            <div className="relative w-full md:max-w-[300px]">
              <IoSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                  table.setPageIndex(0);
                }}
                className="w-full pl-10 pr-4 py-5 bg-slate-900/60 placeholder:font-medium placeholder:tracking-wide placeholder:text-sm text-sm text-slate-100 rounded-sm"
              />
            </div>
          )
        )}

        {/*If there are extra components like dropdown or select filters */}
        {headerExtra && (
          <div className="flex w-full md:w-auto md:justify-end">
            {headerExtra}
          </div>
        )}
      </div>

      {/* ----- Table ----- */}
      <div className="w-full overflow-x-auto rounded-xs border border-border">
        <Table className="min-w-[800px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-[#131313] hover:bg-[#131313]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-medium text-center text-sm md:text-base   py-3 md:py-4 px-3 md:px-5"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="bg-[#0A0A0A]">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="font-medium py-3 md:py-4 text-center text-[#AFAFAF] max-w-[150px] truncate whitespace-nowrap overflow-hidden"
                      title={String(
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    >
                      <div className="truncate">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 md:py-8 text-sm  font-normal text-[#AFAFAF]"
                >
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ----- Pagination ----- */}
      {showPagination && (
        <div className="flex w-full items-center justify-center md:justify-end">
          <div className="flex items-center gap-3 md:gap-6">
            <Button
              variant="link"
              className="text-sm "
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <LuChevronLeft />
              Previous
            </Button>

            <div className="flex items-center gap-2 md:gap-3 font-medium text-sm ">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "text-slate-50 px-4 py-2 border-border rounded-lg bg-muted border-2"
                        : "text-muted-foreground"
                    }
                    onClick={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <Button
              variant="link"
              className="text-sm "
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <LuChevronRight />
            </Button>
          </div>
        </div>
      )}

      {extraComps && <>{extraComps}</>}
    </div>
  );
}
