import { useRef, useState } from "react";
import { toast } from "react-toastify";
import DataTable from "../../components/DataTable/DataTable.jsx";
import { bookingService } from "../../services/bookingService.js";
import { Button, Col, Form, FormSelect, Row } from "react-bootstrap";
import { BOOKING_STATUS, formatDate } from "../../constants/helper.js";

const componentsSearch = ({ filters, handleFilterChange, handleSearch }) => {
	return (
		<Form
			className="mb-3"
			// onSubmit={(e) => {
			// 	e.preventDefault();
			// 	handleSearch();
			// }}
		>
			<Row className="g-3 align-items-center">
				<Col md="3">
					<Form.Group>
						<Form.Label>Tên khách hàng</Form.Label>
						<Form.Control
							type="text"
							name="customerName"
							placeholder="Tên khách hàng"
							value={filters.customerName}
							onChange={handleFilterChange}
							size="lg"
						/>
					</Form.Group>
				</Col>
				<Col md="3">
					<Form.Group>
						<Form.Label>Trạng thái</Form.Label>
						<FormSelect
							name="status"
							value={filters.status}
							onChange={handleFilterChange}
							size="lg"
						>
							<option value="">Tất cả trạng thái</option>
							{BOOKING_STATUS.map((status) => (
								<option key={status.value} value={status.value}>
									{status.label}
								</option>
							))}
						</FormSelect>
					</Form.Group>
				</Col>
				<Col md="6">
					<Row>
						<Form.Label>Thời gian</Form.Label>
						<Col md="6">
							<Form.Group>
								<Form.Control
									type="date"
									name="fromDate"
									value={filters.fromDate || ""}
									onChange={handleFilterChange}
									size="lg"
									placeholder="Từ ngày"
								/>
							</Form.Group>
						</Col>
						<Col md="6">
							<Form.Group>
								<Form.Control
									type="date"
									name="toDate"
									value={filters.toDate || ""}
									onChange={handleFilterChange}
									size="lg"
									placeholder="Đến ngày"
								/>
							</Form.Group>
						</Col>
					</Row>
				</Col>

				{/* <Col md="12" className="d-flex justify-content-end">
					<Button variant="primary" type="submit" size="lg">
						Tìm kiếm
					</Button>
				</Col> */}
			</Row>
		</Form>
	);
};
export default function BookingPage() {
	const tableRef = useRef();

	const [filters, setFilters] = useState({
		status: "",
		customerName: "",
	});

	const columns = [
		{ key: "paymentInfo.bookingCode", label: "Mã thanh toán" },
		{ key: "userId.name", label: "Khách hàng" },
		{ key: "details.roomType", label: "Loại phòng" },
		{
			key: "details.checkInDate",
			label: "Check In",
			render: (v) => formatDate(v),
		},
		{
			key: "details.checkOutDate",
			label: "Check Out",
			render: (v) => formatDate(v),
		},
		{
			key: "totalPrice",
			label: "Tổng tiền",
			render: (v) => v.toLocaleString("vi-VN") + " đ",
		},
		{
			key: "createdAt",
			label: "Ngày đặt lịch",
			render: (v) => formatDate(v),
		},
		{ key: "status", label: "Trạng thái" },
	];

	const fetchData = async (page, limit, search) => {
		try {
			const res = await bookingService.listBookings(
				page,
				limit,
				search,
				filters
			);
			return {
				data: res.data,
				total: res.total,
			};
		} catch (error) {
			toast.error(error.message || "❌ Lỗi tải booking");
			return { data: [], total: 0 };
		}
	};

	const handleFilterChange = (e) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		setTimeout(() => {
			tableRef.current?.reload();
		}, 300);
	};

	const handleSearch = () => {
		
	};

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Quản lý Booking</h1>

			<DataTable
				ref={tableRef}
				columns={columns}
				fetchData={fetchData}
				componentsSearch={componentsSearch({
					filters,
					handleFilterChange,
					handleSearch,
				})}
			/>
		</div>
	);
}
