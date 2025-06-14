import React, { useEffect, useState } from "react";
import "./DataTable.scss";

const DataTable = ({ columns, fetchData, onEdit, onDelete, onRowClick }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const loadData = async () => {
            const res = await fetchData(currentPage, limit, search);
            setData(res.data);
            setTotalPages(Math.ceil(res.total / limit));
        };
        loadData();
    }, [fetchData, currentPage, limit, search]);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortKey) return 0;
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

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
                        <option key={l} value={l}>{l} bản ghi/trang</option>
                    ))}
                </select>
            </div>

            <div className="data-table__scroll">
                <table className="data-table__table">
                    <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} onClick={() => handleSort(col.key)}>
                                {col.label} {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                        ))}
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedData.map((row) => (
                        <tr key={row.id} onClick={() => onRowClick?.(row)}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                            <td>
                                <button
                                    className="btn btn-edit"
                                    onClick={(e) => { e.stopPropagation(); onEdit?.(row.id); }}
                                >
                                    ✏️ Sửa
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={(e) => { e.stopPropagation(); onDelete?.(row.id); }}
                                >
                                    🗑️ Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
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
                <span>Trang {currentPage} / {totalPages}</span>
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
};

export default DataTable;