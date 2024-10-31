import React, { memo, useState } from "react";
import { CalendarIcon, GripVertical, Plus, MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUpdateTableCell, useUpdateStatus, useTableOperations } from "./utils/canvas-objects-utils";
import { Socket } from "socket.io-client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const defaultStatuses = [
    { label: 'To do', color: 'bg-blue-100 text-blue-700' },
    { label: 'In progress', color: 'bg-purple-100 text-purple-700' },
    { label: 'Done', color: 'bg-green-100 text-green-700' },
    { label: "Won't do", color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Blocked', color: 'bg-red-100 text-red-700' },
];

const colorOptions = [
    {
        bg: 'bg-pink-100 text-pink-700',
        display: 'bg-[#FF1493]'
    },
    {
        bg: 'bg-red-100 text-red-700',
        display: 'bg-[#FF0000]'
    },
    {
        bg: 'bg-orange-100 text-orange-700',
        display: 'bg-[#FF8C00]'
    },
    {
        bg: 'bg-yellow-100 text-yellow-700',
        display: 'bg-[#FFD700]'
    },
    {
        bg: 'bg-green-100 text-green-700',
        display: 'bg-[#32CD32]'
    },
    {
        bg: 'bg-cyan-100 text-cyan-700',
        display: 'bg-[#00CED1]'
    },
    {
        bg: 'bg-sky-100 text-sky-700',
        display: 'bg-[#00BFFF]'
    },
    {
        bg: 'bg-blue-100 text-blue-700',
        display: 'bg-[#0000FF]'
    },
    {
        bg: 'bg-violet-100 text-violet-700',
        display: 'bg-[#8A2BE2]'
    },
    {
        bg: 'bg-gray-50 text-gray-700 border border-gray-200',
        display: 'bg-[#FFFFFF] border border-gray-200'
    }
];

export enum TableColumnType {
    Text = 'text',
    Number = 'number',
    Checkbox = 'checkbox',
    Date = 'date',
    Person = 'person',
    Tag = 'tag',
    Link = 'link'
}

export type TableColumn = {
    type: TableColumnType;
    key: string;
    title: string;
}

// Make TableRow dynamic based on column keys
export type TableRow = {
    [key: string]: any;
};

interface TableProps {
    x: number;
    y: number;
    width: number;
    height: number;
    data: TableRow[];
    columns: TableColumn[];
    orgTeammates: any;
    boardId: string;
    layerId: string;
    layer: any;
    expired: boolean;
    socket: Socket | null;
    forceUpdateLayerLocalLayerState: (layerId: string, updatedLayer: any) => void;
}

interface TableCellProps {
    type: TableColumnType;
    value: any;
    handleChange: (rowIndex: number, columnKey: string, value: any) => void;
    orgTeammates: any;
    rowIndex: number;
    columnKey: string;
    layer: any;
    boardId: string;
    layerId: string;
    expired: boolean;
    socket: Socket | null;
    forceUpdateLayerLocalLayerState: (layerId: string, updatedLayer: any) => void;
}

const TableCell = ({
    type,
    value,
    handleChange,
    orgTeammates = [],
    rowIndex,
    columnKey,
    layer,
    boardId,
    layerId,
    expired,
    socket,
    forceUpdateLayerLocalLayerState
}: TableCellProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editedName, setEditedName] = useState("");
    const [statuses, setStatuses] = useState(layer.availableStatuses || defaultStatuses);
    const updateStatus = useUpdateStatus();

    switch (type) {
        case TableColumnType.Person:
            const authorName = value?.name || "Anonymous";
            const authorInitial = authorName[0]?.toUpperCase() || "?";

            const filteredTeammates = orgTeammates?.filter((user: any) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="w-full h-full text-left min-h-[32px]">
                            {value && (
                                <div className="flex items-center space-x-1">
                                    <Avatar className="h-8 w-8 border-2 border-zinc-300 dark:border-zinc-700">
                                        <AvatarImage src={value?.picture} alt={value?.name} />
                                        <AvatarFallback>{authorInitial}</AvatarFallback>
                                    </Avatar>
                                    <span>{authorName}</span>
                                </div>
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-2" align="start">
                        <input
                            type="text"
                            placeholder="Search people..."
                            className="w-full px-2 py-1 text-sm border rounded-md mb-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <ScrollArea className="space-y-1 flex-1 flex flex-col max-h-[220px]" onWheel={(e) => e.stopPropagation()}>
                            <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer border-b"
                                onClick={() => {
                                    handleChange(rowIndex, columnKey, null); // Updated
                                    setSearchQuery("");
                                }}
                            >
                                <div className="h-8 w-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <span className="text-gray-400">-</span>
                                </div>
                                <span className="text-sm text-gray-600">None</span>
                            </div>
                            {filteredTeammates?.map((user: any) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer w-full truncate"
                                    onClick={() => {
                                        handleChange(rowIndex, columnKey, {
                                            userId: user.id,
                                            name: user.name,
                                            picture: user.image
                                        });
                                        setSearchQuery("");
                                    }}
                                >
                                    <Avatar className="h-8 w-8 border-2 border-zinc-300 dark:border-zinc-700">
                                        <AvatarImage src={user?.image} />
                                        <AvatarFallback>{user?.name[0].toUpperCase() || "?"}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{user?.name}</span>
                                </div>
                            ))}
                            {filteredTeammates?.length === 0 && searchQuery && (
                                <div className="text-sm text-gray-500 text-center py-2">
                                    No matches found
                                </div>
                            )}
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            );

        case TableColumnType.Date:
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="flex items-center gap-1 w-full min-h-[24px]">
                            {value && (
                                <>
                                    <CalendarIcon className="h-4 w-4" />
                                    {value}
                                </>
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={value ? new Date(value) : undefined}
                            onSelect={(date) => {
                                handleChange(
                                    rowIndex,
                                    columnKey,
                                    date ? format(date, 'MMM d') : null
                                );
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            );

        case TableColumnType.Tag:
            const handleStatusUpdate = (newValue: string | null, newStatuses?: typeof statuses) => {
                const updatedStatuses = updateStatus(
                    boardId,
                    layerId,
                    layer,
                    rowIndex,
                    columnKey,
                    newValue,
                    newStatuses || statuses,
                    expired,
                    socket,
                    forceUpdateLayerLocalLayerState
                );
                setStatuses(updatedStatuses);
            };

            const handleUpdateStatusName = (oldName: string, newName: string) => {
                if (newName.trim() && newName !== oldName) {
                    const updatedStatuses = statuses.map((s: { label: string, color: string }) =>
                        s.label === oldName
                            ? { ...s, label: newName.trim() }
                            : s
                    );
                    handleStatusUpdate(newName.trim(), updatedStatuses);
                }
            };

            const handleUpdateStatusColor = (statusLabel: string, newColor: string) => {
                const updatedStatuses = statuses.map((s: { label: string, color: string }) =>
                    s.label === statusLabel
                        ? { ...s, color: newColor }
                        : s
                );
                handleStatusUpdate(statusLabel, updatedStatuses);
            };

            const handleDeleteStatus = (statusLabel: string) => {
                const updatedStatuses = statuses.filter((s: { label: string, color: string }) => s.label !== statusLabel);
                handleStatusUpdate(null, updatedStatuses);
            };

            const filteredStatuses = statuses.filter((status: { label: string, color: string }) =>
                status.label.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="w-full h-full text-left min-h-[32px]">
                            {value && (
                                <span className={cn(
                                    "px-2 py-1 rounded-md text-sm font-medium",
                                    statuses.find((s: { label: string, color: string }) => s.label === value)?.color || 'bg-gray-100 text-gray-700'
                                )}>
                                    {value}
                                </span>
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[230px] p-2" align="start">
                        <input
                            type="text"
                            placeholder="Search or create status..."
                            className="w-full px-2 py-1 text-sm border rounded-md mb-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    handleStatusUpdate(searchQuery);
                                }
                            }}
                            autoFocus
                        />
                        <ScrollArea
                            className="space-y-1 flex-1 flex flex-col max-h-[220px] pr-2"
                            onWheel={(e) => e.stopPropagation()}
                            onPointerUp={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer border-b"
                                onClick={() => handleStatusUpdate(null)}
                            >
                                <div className="h-8 w-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <span className="text-gray-400">-</span>
                                </div>
                                <span className="text-sm text-gray-600">No status</span>
                            </div>
                            {filteredStatuses.map((status: { label: string, color: string }) => {
                                const isCustomStatus = !defaultStatuses.find(s => s.label === status.label);

                                return (
                                    <div
                                        key={status.label}
                                        className="group relative flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                    >
                                        {isCustomStatus && (
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button
                                                            className="p-1 hover:bg-gray-200 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        side="right"
                                                        align="center"
                                                        className="w-[180px] p-3 space-y-2"
                                                    >
                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">
                                                                Label
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={editedName}
                                                                onChange={(e) => setEditedName(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        handleUpdateStatusName(status.label, editedName);
                                                                    }
                                                                }}
                                                                onBlur={() => {
                                                                    handleUpdateStatusName(status.label, editedName);
                                                                }}
                                                                className="w-full px-2 py-1.5 text-sm border rounded-md"
                                                                placeholder="Status label"
                                                            />
                                                        </div>

                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">
                                                                Colors
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                {colorOptions.map((color) => (
                                                                    <button
                                                                        key={color.bg}
                                                                        className={cn(
                                                                            "h-6 w-6 rounded-full transition-transform hover:scale-110",
                                                                            color.display,
                                                                            status.color === color.bg && "ring-2 ring-offset-1 ring-black"
                                                                        )}
                                                                        onClick={() => handleUpdateStatusColor(status.label, color.bg)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <DropdownMenuItem
                                                            className="w-full text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                                                            onClick={() => handleDeleteStatus(status.label)}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Trash2 className="h-4 w-4" />
                                                                <span>Delete status</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        )}
                                        <div
                                            className="flex-1"
                                            onClick={() => handleStatusUpdate(status.label)}
                                        >
                                            <div className={cn(
                                                "px-2 py-1 rounded-md text-sm font-medium w-full",
                                                status.color
                                            )}>
                                                {status.label}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {filteredStatuses.length === 0 && searchQuery && (
                                <div className="text-sm text-gray-500 text-center py-2">
                                    Press Enter to create &quot;{searchQuery}&quot;
                                </div>
                            )}
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            );

        default:
            return isEditing ? (
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleChange(rowIndex, columnKey, e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsEditing(false);
                        }
                    }}
                    className="w-full bg-transparent outline-none"
                    autoFocus
                />
            ) : (
                <div
                    onClick={() => setIsEditing(true)}
                    className="cursor-text min-h-[24px]"
                >
                    {value || ''}
                </div>
            );
    }
};

export const Table = memo(({
    x,
    y,
    width,
    height,
    data = [],
    columns = [],
    orgTeammates = [],
    boardId,
    layerId,
    layer,
    expired,
    socket,
    forceUpdateLayerLocalLayerState
}: TableProps) => {
    // Calculate available height for rows after accounting for header and add button
    const rowHeight = height / data.length;
    const scale = rowHeight / 70;
    const baseWidth = width / scale;

    const { addRow, addColumn } = useTableOperations();
    const updateTableCell = useUpdateTableCell();

    const handleCellChange = (rowIndex: number, columnKey: string, value: any) => {
        updateTableCell(
            boardId,
            layerId,
            layer,
            rowIndex,
            columnKey,
            value,
            expired,
            socket,
            forceUpdateLayerLocalLayerState,
        );
    };

    return (
        <g transform={`translate(${x}, ${y})`}>
            <foreignObject width={width} height={height} pointerEvents="auto">
                <div
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        height: height / scale,
                        minWidth: baseWidth,
                        width: baseWidth
                    }}
                    className="relative"
                >
                    <div className="bg-white rounded-xl shadow-sm p-4 h-full flex flex-col absolute inset-0">
                        <header className="flex-none flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-sm font-medium">Table</span>
                                <button className="p-1 hover:bg-gray-100 rounded-md">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="px-3 py-1.5 text-sm bg-gray-50 rounded-md outline-none border border-gray-200"
                                />
                                <button className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md">Filter by</button>
                                <button className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md">Sort by</button>
                                <button className="px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md">Group by</button>
                                <button className="p-1.5 hover:bg-gray-100 rounded-md">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>
                        </header>
                        <div className="flex-1 min-h-0 overflow-auto">
                            <table className="border-collapse font-sans text-sm w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        {columns?.map((column, index) => (
                                            <th
                                                key={column.key}
                                                className={cn(
                                                    "p-3 text-left font-medium bg-gray-50 group relative border-r border-gray-200",
                                                    index === columns.length - 1 && "border-r-0"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <GripVertical className="h-4 w-4 opacity-0 group-hover:opacity-100 cursor-move text-gray-500" />
                                                    {column.title}
                                                </div>
                                            </th>
                                        ))}
                                        <th className="w-10 p-3 bg-gray-50">
                                            <Plus className="h-4 w-4 text-gray-500" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b border-gray-200">
                                            {columns.map((column, colIndex) => (
                                                <td
                                                    key={column.key}
                                                    className={cn(
                                                        "p-3 bg-white hover:bg-gray-50 border-r border-gray-200",
                                                        colIndex === columns.length - 1 && "border-r-0"
                                                    )}
                                                >
                                                    <TableCell
                                                        type={column.type}
                                                        value={row[column.key as keyof TableRow]}
                                                        handleChange={handleCellChange}
                                                        orgTeammates={orgTeammates}
                                                        rowIndex={rowIndex}
                                                        columnKey={column.key}
                                                        layer={layer}
                                                        boardId={boardId}
                                                        layerId={layerId}
                                                        expired={expired}
                                                        socket={socket}
                                                        forceUpdateLayerLocalLayerState={forceUpdateLayerLocalLayerState}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={() => addRow(boardId, layerId, layer, expired, socket, rowHeight, forceUpdateLayerLocalLayerState)}
                                className="w-full py-2 hover:bg-gray-50 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add row</span>
                            </button>
                        </div>
                    </div>
                </div>
            </foreignObject>
        </g>
    );
});

Table.displayName = 'Table';

