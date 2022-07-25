const UpdateProfile = (props) => {
	return (
		<div>
		  <meta charSet="utf-8" />
		  <title>Chỉnh sửa hồ sơ</title>
		  <meta name="viewport" content="width=device-width, initial-scale=1" />
		  <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" rel="stylesheet" />
		  <div className="container">
			<div className="row gutters">
			  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
				<div className="card h-100">
				  <div className="card-body">
					<div className="account-settings">
					  <div className="user-profile">
						<div className="user-avatar">
						  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="HoangVi" />
						</div>
						<h5 className="user-name">Username: HoangVi</h5>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			  <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
				<div className="card h-100">
				  <div className="card-body">
					<div className="row gutters">
					  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<h6 className="mb-2 text-primary">Chi tiết người dùng:</h6>
					  </div>
					  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div className="form-group">
						  <label htmlFor="fullName">Tên dầy đủ:</label>
						  <input type="text" className="form-control" id="fullName" placeholder="Nhập đầy đủ họ tên" />
						</div>
					  </div>
					  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div className="form-group">
						  <label htmlFor="phone">Số điện thoại</label>
						  <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" />
						</div>
					  </div>
					  <div className="row gutters">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						  <h6 className="mt-3 mb-2 text-primary">Địa chỉ</h6>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						  <div className="form-group">
							<label htmlFor="Street">Đường</label>
							<input type="name" className="form-control" id="Street" placeholder="Nhập tên đường" />
						  </div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						  <div className="form-group">
							<label htmlFor="ward">Xã/Phường</label>
							<input type="text" className="form-control" id="ward" placeholder="Nhập tên xã" />
						  </div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						  <div className="form-group">
							<label htmlFor="district">Huyện/Quận</label>
							<input type="text" className="form-control" id="district" placeholder="Nhập tên huyện" />
						  </div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						  <div className="form-group">
							<label htmlFor="city">Tỉnh/Thành phố</label>
							<input type="name" className="form-control" id="ciTy" placeholder="Nhập tên thành phố" />
						  </div>
						</div>
					  </div>
					  <div className="row gutters">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						  <div className="text-right">
							<button type="button" id="cancel" name="submit" className="btn btn-secondary">Hủy</button>
							<button type="button" id="Update" name="submit" className="btn btn-primary">Cập nhật</button>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
			<style type="text/css" dangerouslySetInnerHTML={{__html: "\nbody {\n    margin: 0;\n    padding-top: 40px;\n    color: #2e323c;\n    background: #f5f6fa;\n    position: relative;\n    height: 100%;\n}\n.account-settings .user-profile {\n    margin: 0 0 1rem 0;\n    padding-bottom: 1rem;\n    text-align: center;\n}\n.account-settings .user-profile .user-avatar {\n    margin: 0 0 1rem 0;\n}\n.account-settings .user-profile .user-avatar img {\n    width: 90px;\n    height: 90px;\n    -webkit-border-radius: 100px;\n    -moz-border-radius: 100px;\n    border-radius: 100px;\n}\n.account-settings .user-profile h5.user-name {\n    margin: 0 0 0.5rem 0;\n}\n.account-settings .user-profile h6.user-email {\n    margin: 0;\n    font-size: 0.8rem;\n    font-weight: 400;\n    color: #9fa8b9;\n}\n.account-settings .about {\n    margin: 2rem 0 0 0;\n    text-align: center;\n}\n.account-settings .about h5 {\n    margin: 0 0 15px 0;\n    color: #007ae1;\n}\n.account-settings .about p {\n    font-size: 0.825rem;\n}\n.form-control {\n    border: 1px solid #cfd1d8;\n    -webkit-border-radius: 2px;\n    -moz-border-radius: 2px;\n    border-radius: 2px;\n    font-size: .825rem;\n    background: #ffffff;\n    color: #2e323c;\n}\n\n.card {\n    background: #ffffff;\n    -webkit-border-radius: 5px;\n    -moz-border-radius: 5px;\n    border-radius: 5px;\n    border: 0;\n    margin-bottom: 1rem;\n}\n\n\n" }} />
		  </div></div>
	  );
}
export default UpdateProfile;