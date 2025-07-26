import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import TextInput from './TextInput';
import { LoaderCircleIcon, PenIcon, Search, SortAscIcon, TrashIcon } from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { AppContext } from '@/context/ContextProvider';
import axios from 'axios';
import SelectInput from './SelectInput';
import DateInput from './DateInput';

export default function DataTable({ filters = [], onFilterChange, tableid, dataurl, columns, rows, action }) {

    const [loading, setLoading] = useState(false)

    const { reloadDT, setReloadDT } = useContext(AppContext)

    const initialParameters = JSON.parse(localStorage.getItem(tableid))?.parameters;
    const initialFilters = initialParameters?.filter || {};
    const initialPage = initialParameters?.page;
    const initialPerPage = initialParameters?.perpage;

    // Initialize parameters.filter with keys from filters prop
    const initialParametersFilter = filters ? filters.reduce((acc, filter) => {
        const key = filter.name;
        acc[key] = initialFilters[key] || '';
        return acc;
    }, {}) : {};

    // Remove keys from initialFilters that are not in filters prop
    filters && Object.keys(initialFilters).forEach(key => {
        if (!filters.some(filter => filter.name === key)) {
            delete initialParametersFilter[key];
        }
    });

    const [data, setdata] = useState(null)
    let index = data?.pagination?.from || 1;
    const [parameters, setParameters] = useState({
        page: initialPage || 1,
        perpage: initialPerPage || 10,
        filter: {
            search: '',
            ...initialParametersFilter
        },
        sort: []
    })

    const initialVisibleColumns = JSON.parse(localStorage.getItem(tableid))?.columns || [...columns, 'action'];
    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

    const toggleColumnVisibility = (column) => {
        const newColumns = visibleColumns.includes(column)
            ? visibleColumns.filter(c => c !== column)
            : [...visibleColumns, column];
        setVisibleColumns(newColumns);
        localStorage.setItem(tableid, JSON.stringify({ columns: newColumns }));
    };

    const fetchdata = async (e) => {
        setdata()
        setLoading(true)
        try {
            const response = await axios.get((dataurl), { params: parameters });
            setdata(response.data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleSortChange = (sortField) => {
        const currentSort = parameters.sort;
        const newSort = currentSort === sortField ? `-${sortField}` : sortField;
        setParameters({
            ...parameters,
            sort: newSort,
            page: 1
        });
    };

    const handleFilterChange = (filterKey, value) => {
        onFilterChange && onFilterChange(filterKey, value)
        setParameters((prevParameters) => ({
            ...prevParameters,
            filter: {
                ...prevParameters.filter,
                [filterKey]: value == 0 ? '' : value,
            },
        }));
    };

    useEffect(() => {
        localStorage.setItem(tableid, JSON.stringify({ columns: visibleColumns, parameters: parameters }));
    }, [visibleColumns, parameters]);

    useEffect(() => {
        fetchdata()
    }, [parameters])

    useEffect(() => {
        if (reloadDT) {
            fetchdata();
        }
        setReloadDT(false)
    }, [reloadDT]);

    const resetcolumn = () => {
        setVisibleColumns([...columns, 'action']);
        localStorage.setItem(tableid.columns, JSON.stringify([...columns, 'action']));

        const resetFilter = filters.reduce((value, filter) => {
            const filterKey = filter.name;
            value[filterKey] = '';
            return value;
        }, {});

        setParameters((prevParameters) => ({
            ...prevParameters,
            filter: resetFilter,
        }));
    };

    return (
        <div className="grid gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-card text-card-foreground rounded-sm">
                {/* Search and Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    <TextInput
                        type="text"
                        placeholder="Search..."
                        className="h-7"
                        value={parameters.filter.search}
                        onChange={(e) => {
                            setParameters((prevParameters) => ({
                                ...prevParameters,
                                filter: { ...prevParameters.filter, search: e.target.value },
                            }));
                        }}
                    />

                    {filters && (
                        <div className="flex flex-wrap gap-3">
                            {filters.map((filter, index) => {
                                const filterKey = filter.name;
                                if (filter.type === "select") {
                                    const options = [
                                        {
                                            [filter.keys["valuekey"]]: 0,
                                            [filter.keys["titlekey"]]: "All",
                                        },
                                        ...filter.options,
                                    ];
                                    return (
                                        <SelectInput
                                            key={index}
                                            variable={filterKey}
                                            keys={filter.keys}
                                            placeholder={filter.title}
                                            options={options}
                                            value={parameters.filter?.[filterKey]?.toString()}
                                            onValueChange={(value) => handleFilterChange(filterKey, value)}
                                            triggerClasses="max-h-7"
                                        />
                                    );
                                } else if (filter.type === 'date') {
                                    return (
                                        <DateInput
                                            key={index}
                                            variable={filterKey}
                                            placeholder={filter.title}
                                            value={parameters.filter?.[filterKey]?.toString()}
                                            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                                            className="w-auto h-7 bg-[#f3f5f7] bg-gradient-to-b from-[#ffffff]"
                                        />
                                    )
                                } else {
                                    return (
                                        <TextInput
                                            key={index}
                                            type={filter.type}
                                            variable={filterKey}
                                            placeholder={filter.title}
                                            value={parameters.filter?.[filterKey]?.toString()}
                                            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                                            className="w-auto h-7 bg-[#f3f5f7] bg - gradient - to - b from - [#ffffff] to - [#f3f5f7] border - [#cfd7df] rounded - sm"
                                        />
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>

                {/* Per Page and Columns */}
                <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
                    <SelectInput
                        variable="perpage"
                        options={["10", "25", "50", "100"]}
                        value={parameters.perpage.toString()}
                        onValueChange={(value) => {
                            setParameters({ ...parameters, perpage: value });
                        }}
                        triggerClasses="w-auto max-h-7 bg-[#f3f5f7] bg-gradient-to-b from-[#ffffff] to-[#f3f5f7] border-[#cfd7df] rounded-sm"
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="w-auto h-7">
                            <Button variant="outline">Columns</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {[...columns, "action"].map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column}
                                    className="capitalize"
                                    checked={visibleColumns.includes(column)}
                                    onCheckedChange={() => toggleColumnVisibility(column)}
                                >
                                    {column}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={resetcolumn} className="w-auto h-7 rounded-sm">
                        Reset
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-sm">
                    <thead className="lg:table-header-group bg-gray-100">
                        <tr className="border-b">
                            {columns.map((column, index) => {
                                if (!visibleColumns.includes(column)) return null;
                                const row = rows.find((row) => row.accessorKey === column);
                                if (!row) return null;
                                const { sort } = row;
                                return (
                                    <th key={index} className="px-4 py-1 text-left font-semibold">
                                        <div className="flex items-center gap-2">
                                            {column}
                                            {sort && (
                                                <button onClick={() => handleSortChange(sort)} className="text-gray-500 hover:text-gray-800 transition">
                                                    <SortAscIcon className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                            {action && visibleColumns.includes('action') && (
                                <th className="px-4 py-1 text-right font-semibold">Action</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={visibleColumns.length + 1} className="py-6 px-4 text-center">
                                    <div className="flex items-center justify-center">
                                        <LoaderCircleIcon className="animate-spin text-blue-500 h-5 w-5" />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {data && data.items.length > 0 ? (
                            data.items.map((rowdata, rowIndex) => (
                                <tr key={rowIndex} className="lg:table-row border-b hover:bg-gray-50 transition">
                                    {rows.map((datakey, cellIndex) =>
                                        visibleColumns.includes(datakey.accessorKey) ? (
                                            <td key={cellIndex} className="px-4 py-1">
                                                {datakey.cell(rowdata)}
                                            </td>
                                        ) : null
                                    )}
                                    {action && visibleColumns.includes('action') && (
                                        <td className="px-4 py-1 text-right">
                                            <div className="flex gap-2 justify-end">
                                                {action.slot && action.slot(rowdata)}
                                                {action.edit && (
                                                    <Button
                                                        className="bg-blue-500 p-1 h-7 w-7"
                                                        onClick={() => {
                                                            action.edit(rowdata);
                                                        }}
                                                    >
                                                        <PenIcon size={13} />
                                                    </Button>
                                                )}
                                                {action.editlink && (
                                                    <Button className="bg-blue-500 p-1 h-7 w-7" asChild>
                                                        <Link href={action.editlink(rowdata.id)}>
                                                            <PenIcon size={18} />
                                                        </Link>
                                                    </Button>
                                                )}
                                                {action.delete && (
                                                    <Button
                                                        className="w-7 h-7 p-1 rounded-sm"
                                                        variant="destructive"
                                                        onClick={() => {
                                                            action.delete(rowdata.id);
                                                        }}
                                                    >
                                                        <TrashIcon size={16} />
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            !loading && (
                                <tr>
                                    <td colSpan={visibleColumns.length + 1} className="px-4 py-6 text-center text-gray-500">
                                        No matching data found
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {data?.pagination && <div className="flex items-center justify-end space-x-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {data.pagination.from} to {data.pagination.to} of {data.pagination.total}
                </div>
                <SelectInput
                    variable="pageno"
                    options={Array.from({ length: data.pagination.total_pages }, (_, index) => (
                        index + 1
                    ))}
                    value={parameters.page}
                    onValueChange={(value) => { setParameters({ ...parameters, page: value }) }}
                />
                <div className="space-x-2">
                    <Pagination>
                        <PaginationContent>
                            {data.pagination.prev_page && <PaginationItem>
                                <PaginationPrevious className="cursor-pointer" onClick={() => setParameters({ ...parameters, page: data.pagination.prev_page })} />
                            </PaginationItem>}

                            {data.pagination.prev_page && <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>}

                            {data.pagination.prev_page && <PaginationItem>
                                <PaginationLink className="cursor-pointer" onClick={() => setParameters({ ...parameters, page: data.pagination.prev_page })}>{data.pagination.prev_page}</PaginationLink>
                            </PaginationItem>}

                            {data.pagination.current_page && <PaginationItem>
                                <PaginationLink isActive className="bg-[#f3f5f7] bg-gradient-to-b from-[#ffffff] to-[#f3f5f7] border-[#cfd7df] rounded-sm">{data.pagination.current_page}</PaginationLink>
                            </PaginationItem>}

                            {data.pagination.next_page && <PaginationItem>
                                <PaginationLink className="cursor-pointer" onClick={() => setParameters({ ...parameters, page: data.pagination.next_page })}>{data.pagination.next_page}</PaginationLink>
                            </PaginationItem>}

                            {data.pagination.has_more_pages && <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>}

                            {data.pagination.next_page && <PaginationItem>
                                <PaginationNext className="cursor-pointer" onClick={() => setParameters({ ...parameters, page: data.pagination.next_page })} />
                            </PaginationItem>}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>}
        </div>
    );
}