"use client";
type TableFooter_TP = {
    dense: boolean;
    onDenseToggle: (val: boolean) => void;
    rowsPerPage: number;
    onRowsPerPageChange: (val: number) => void;
    totalRows: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    rowsPerPageOptions?: number[];
};

export const TableFooter = ({
    dense,
    onDenseToggle,
    rowsPerPage,
    onRowsPerPageChange,
    totalRows,
    currentPage,
    onPageChange,
    rowsPerPageOptions = [5, 10, 25],
}: TableFooter_TP) => {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const from = (currentPage - 1) * rowsPerPage + 1;
    const to = Math.min(currentPage * rowsPerPage, totalRows);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 px-1">

            {/* Dense Toggle */}
            <DenseToggle value={dense} onChange={onDenseToggle} />

            {/* Pagination */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="shrink-0">Rows per page:</span>

                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        onRowsPerPageChange(Number(e.target.value));
                        onPageChange(1);
                    }}
                    className="text-sm text-gray-700 bg-white border border-gray-200 rounded-md px-2 py-1 outline-none cursor-pointer hover:border-gray-400 transition-colors"
                >
                    {rowsPerPageOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <span className="text-gray-500 shrink-0">
                    {from}–{to} of {totalRows}
                </span>

                <div className="flex items-center gap-1">
                    <PageBtn
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        direction="prev"
                    />
                    <PageBtn
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        direction="next"
                    />
                </div>
            </div>
        </div>
    );
};

export const DenseToggle = ({ value, onChange }: { value: boolean; onChange: (val: boolean) => void }) => (
    <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className="flex items-center gap-2 group w-fit"
    >
        <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${value ? "bg-[#e28576]" : "bg-gray-300"}`}>
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? "translate-x-4" : "translate-x-0"}`} />
        </div>
        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Dense</span>
    </button>
);

const PageBtn = ({ onClick, disabled, direction }: { onClick: () => void; disabled: boolean; direction: "prev" | "next" }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
    >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {direction === "prev"
                ? <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                : <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            }
        </svg>
    </button>
);