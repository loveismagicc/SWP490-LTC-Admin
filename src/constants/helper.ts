export const BOOKING_STATUS = [
    { value: 'pending', label: 'Chờ duyệt' },
    { value: "approved", label: 'Đã duyệt' },
    { value: "completed", label: 'Hoàn thành' },
    { value: "rejected", label: 'Từ chối' }
];

export const formatDate = (dateString, format = 'DD/MM/yyyy') => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString('vi-VN', options);
}