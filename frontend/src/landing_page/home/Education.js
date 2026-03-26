import React from "react";

function Education() {
    return (
    <div className="container p-5 mt-5">
        <div className="row">
            <div className="col-6">
                <img src="media\images\education.svg" style={{width:"70%"}}></img>
            </div>
            <div className="col-6 p-5">
                <h1 className="fs-3">Free and open market education</h1>
                <p className="mt-4">Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                 <a href='' style={{textDecoration:"none"}}>Try Kite demo <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>

                <p className="mt-4">TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                 <a href='' style={{textDecoration:"none"}}>TradingQ&A <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>
    );
}

export default Education;