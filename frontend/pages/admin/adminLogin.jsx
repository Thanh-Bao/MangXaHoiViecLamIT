import React from 'react';

const adminLogin = () => {
    return (  
        <div className="container col-5 shadow-lg rounded p-5 mt-5">
            <h1 className="text-center mb-4">Login</h1>
            <div className="col-12 mb-4">
                <input
                    type='text'
                    className='form-control'
                    placeholder='Username'
                />
            </div>
            <div className="col-12 mb-4">
                <input
                    placeholder='Password'
                    type="password"
                    className='form-control'
                />
            </div>
            <div className="text-center d-grid gap-2 col-12 mx-auto">
                <button onClick={event =>  window.location.href='/admin/admin'}
                    className='btn btn-primary cursor-pointer'
                >
                    Login
                </button>
            </div>
        </div>
          
    );
};

export default adminLogin;