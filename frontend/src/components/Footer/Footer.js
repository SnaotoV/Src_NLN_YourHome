let Footer = () => {
    return (
        <div className='footer-block bg-dark text-white row p-4'>
            <div className="col-3">
                <div className='row p-2 fs-1 px-4'>MyHome</div>
                <div className='row fs-4 px-4'>Tìm kiếm nơi ở nhanh và ít tốn kém</div>
            </div>
            <div className="col-9 row">
                <div className="col-4 row">
                    <div className="col-12 row">
                        <p><b>SĐT hỗ trợ:</b></p>
                        <p className="fs-5">035-xxx-xxxx</p>
                    </div>
                    <div className="col-12 row">
                        <p>Địa chỉ: Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                    </div>
                </div>
                <div className="col-4">
                    <p><b>Liên kết:</b></p>
                    <div className="fs-1 p-4"><i class="fab fa-facebook-square m-2"></i><i class="fab fa-twitter m-2"></i><i class="fab fa-instagram m-2"></i><i class="fab fa-youtube m-2"></i></div>
                </div>
                <div className="col-4">
                    <p><b>Hỗ trợ khách hàng:</b></p>
                    <p>Trang Chủ</p>
                    <p>Dãy Trọ</p>
                    <p>Cá nhân</p>
                </div>
            </div>
        </div>
    )
}

export default Footer