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
    const [filters, setFilters] = useState({});
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchData(currentPage, limit, search, filters);
            setData(res.data);
            setTotalPages(Math.ceil(res.total / limit));
        } catch (error) {
            console.error("Lỗi khi load data:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, search, JSON.stringify(filters), fetchData]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await fetchData(currentPage, limit, search, filters);
                setData(res.data);
                setTotalPages(Math.ceil(res.total / limit));
            } catch (error) {
                console.error("Lỗi khi load data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [currentPage, limit, search, filters]);

    useImperativeHandle(ref, () => ({
        reload: () => loadData(),
        reset: () => {
            setSearch("");
            setCurrentPage(1);
            setSortKey(null);
            setSortOrder("asc");
            setFilters({});
        },
    }));

    const handleSort = (key, sortable = true) => {
        if (!sortable) return;
        if (sortKey === key) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
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

    const handleFilterChange = (key, value, checked) => {
        setFilters((prev) => {
            const current = prev[key] || [];
            const updated = checked
                ? [...current, value]
                : current.filter((v) => v !== value);
            return {
                ...prev,
                [key]: updated,
            };
        });
        setCurrentPage(1);
    };

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
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    {[10, 20, 50].map((l) => (
                        <option key={`limit-${l}`} value={l}>
                            {l} bản ghi/trang
                        </option>
                    ))}
                </select>
            </div>

            <div className="data-table__filters">
                {columns.map((col) =>
                    col.filterOptions ? (
                        <div key={`filter-${col.key}`} className="filter-group">
                            <strong>{col.label}</strong>
                            {col.filterOptions.map((opt) => (
                                <label key={opt} className="checkbox-option">
                                    <input
                                        type="checkbox"
                                        checked={filters[col.key]?.includes(opt) || false}
                                        onChange={(e) =>
                                            handleFilterChange(col.key, opt, e.target.checked)
                                        }
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    ) : null
                )}
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
                        {(typeof actions === "function" || actions.length > 0) && <th>Hành động</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + 1}>Đang tải dữ liệu...</td>
                        </tr>
                    ) : sortedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1}>Không có dữ liệu</td>
                        </tr>
                    ) : (
                        sortedData.map((row, idx) => {
                            const rowActions = typeof actions === "function" ? actions(row) : actions;
                            return (
                                <tr
                                    key={`row-${row._id || row.id || idx}`}
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
                                                    key={`action-${i}`}
                                                    className={`btn ${act.className || ""}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        act.action(row);
                                                    }}
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
