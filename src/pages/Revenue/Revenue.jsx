import React, { useRef, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { revenueService } from "../../services/revenueService.js";
import "./Revenue.scss";
import moment from "moment/moment.js";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const revenueStatusMap = {
	paid: "Đã thanh toán",
	pending: "Chờ thanh toán",
	refunded: "Đã hoàn tiền",
};

const Revenue = () => {
	const tableRef = useRef();
	const [dateRange, setDateRange] = useState({
		start: moment().subtract(30, "days").toISOString().slice(0, 10),
		end: moment().toISOString().slice(0, 10),
	});

	const columns = [
		{ key: "bookingCode", label: "Mã booking" },
		{ key: "partnerName", label: "Đối tác" },
		{ key: "hotelName", label: "Khách sạn" },
		{
			key: "amount",
			label: "Số tiền (VND)",
			render: (val) => val?.toLocaleString(),
		},
		{ key: "date", label: "Ngày thanh toán" },
		{
			key: "status",
			label: "Trạng thái",
			render: (value) => revenueStatusMap[value] || value,
			filterOptions: Object.keys(revenueStatusMap).map(
				(k) => revenueStatusMap[k]
			),
			filterOptionsMap: revenueStatusMap,
		},
	];

	const fetchData = async (page, limit, search, filters = {}) => {
		const resolvedFilters = {};

		if (filters.status) {
			resolvedFilters.status = Object.keys(revenueStatusMap).filter((k) =>
				filters.status.includes(revenueStatusMap[k])
			);
		}

		// luôn gửi start/end date hiện tại
		if (dateRange.start && dateRange.end) {
			resolvedFilters.startDate = dateRange.start;
			resolvedFilters.endDate = dateRange.end;
		}

		const res = await revenueService.getRevenues(
			page,
			limit,
			search,
			resolvedFilters
		);
		return {
			data: res.data,
			total: res.total,
		};
	};

	const handleDateChange = (key, value) => {
		setDateRange((prev) => {
			const newRange = { ...prev, [key]: value };
			// reload khi cả 2 giá trị đều có
			if (newRange.start && newRange.end) {
				tableRef.current?.reload({
					startDate: newRange.start,
					endDate: newRange.end,
				});
			}
			return newRange;
		});
	};

	const handleExportExcel = async () => {
		try {
			const res = await revenueService.exportReport({
				startDate: dateRange.start,
				endDate: dateRange.end,
			});
			// Tạo blob và tải file về
			const blob = new Blob([res], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "doanh-thu.xlsx");
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Export Excel error", error);
		}
	};

	return (
		<div>
			<div className="table-header">
				<h2>Quản lý Doanh thu</h2>
			</div>
			<Card className="data-table mb-4" style={{borderRadius: "12px"}}>
				<Card.Body>
					<Form>
						<Row>
							<Col md={9}>
								<Form.Group className="d-flex align-items-center gap-3">
									<Form.Label className="text-nowrap">Từ ngày</Form.Label>
									<Form.Control
										className="form-control form-control-lg"
										type="date"
										value={dateRange.start}
										onChange={(e) =>
											handleDateChange(
												"start",
												e.target.value
											)
										}
									></Form.Control>
									<Form.Label className="text-nowrap">Từ ngày</Form.Label>
									<Form.Control
										className="form-control form-control-lg"
										type="date"
										value={dateRange.end}
										onChange={(e) =>
											handleDateChange(
												"end",
												e.target.value
											)
										}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={3} className="d-flex align-items-center justify-content-center">
								<Button
									className="btn btn-primary"
									type="button"
									size="lg"
									onClick={handleExportExcel}
								>
									Xuất Excel
								</Button>
							</Col>
						</Row>
					</Form>
					<div className="header-actions d-flex">
						
					</div>
				</Card.Body>
			</Card>

			<DataTable ref={tableRef} columns={columns} fetchData={fetchData} />
		</div>
	);
};

export default Revenue;
