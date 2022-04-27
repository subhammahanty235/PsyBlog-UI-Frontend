import React from "react";

const Toast = () => {
    return (
        <>
            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="..." className="rounded me-2" alt="..."/>
                        <strong className="me-auto">PsyBlog</strong>
                        <small className="text-muted">Just Now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Successfull
                </div>
            </div>
        </>
    )
}
export default Toast;