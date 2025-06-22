import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useCallback,
} from "react";
import "./DataTable.scss";

const DataTable = forwardRef(({ columns, fetchData, actions = [], onRowClick }, ref) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    // Hàm tải dữ liệu có thể tái sử dụng
    const loadData = useCallback(async (page = currentPage, lim = limit, keyword = search) => {
        setLoading(true);
        try {
            const res = await fetchData(page, lim, keyword);
            setData(res.data);
            setTotalPages(Math.ceil(res.total / lim));
        } catch (error) {
            console.error("Lỗi khi load data:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchData, currentPage, limit, search]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Cho phép gọi từ bên ngoài thông qua ref
    useImperativeHandle(ref, () => ({
        reload: () => loadData(),
        reset: () => {
            setSearch("");
            setCurrentPage(1);
            setSortKey(null);
            setSortOrder("asc");
            loadData(1, limit, "");
        },
    }));

    const handleSort = (key, sortable = true) => {
        if (!sortable) return;
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const sortedData = sortKey
        ? [...data].sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        })
        : data;

    return (
        <div className="data-table">
            <div className="data-table__header">
                <input
                    type="text"
                    className="data-table__search"
                    placeholder="🔍 Tìm kiếm..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <select
                    className="data-table__limit"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                >
                    {[10, 20, 50].map((l) => (
                        <option key={`limit-${l}`} value={l}>
                            {l} bản ghi/trang
                        </option>
                    ))}
                </select>
            </div>

            <div className="data-table__scroll">
                <table className="data-table__table">
                    <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={`header-${col.key}`}
                                onClick={() => handleSort(col.key, col.sortable !== false)}
                            >
                                {col.label}{" "}
                                {sortKey === col.key
                                    ? sortOrder === "asc"
                                        ? "▲"
                                        : "▼"
                                    : ""}
                            </th>
                        ))}
                        {(typeof actions === "function" || actions.length > 0) && (
                            <th>Hành động</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="data-table__loading">
                                Đang tải dữ liệu...
                            </td>
                        </tr>
                    ) : sortedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="data-table__empty">
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((row, idx) => {
                            const rowActions = typeof actions === "function" ? actions(row) : actions;
                            return (
                                <tr
                                    key={`row-${row.id || row._id || idx}`}
                                    onClick={() => onRowClick?.(row)}
                                >
                                    {columns.map((col) => (
                                        <td key={`cell-${idx}-${col.key}`}>
                                            {col.render
                                                ? col.render(row[col.key], row)
                                                : row[col.key]}
                                        </td>
                                    ))}
                                    {rowActions?.length > 0 && (
                                        <td>
                                            {rowActions.map((act, i) => (
                                                <button
                                                    key={`action-${idx}-${i}`}
                                                    className={`btn ${act.className || ""}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        act.action(row);
                                                    }}
                                                    title={act.label}
                                                >
                                                    {act.icon || act.label}
                                                </button>
                                            ))}
                                        </td>
                                    )}
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            <div className="data-table__pagination">
                <button
                    className="btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    ← Trước
                </button>
                <span>
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    className="btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Sau →
                </button>
            </div>
        </div>
    );
});

export default DataTable;
