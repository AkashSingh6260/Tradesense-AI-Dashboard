import React from 'react';

function Hero() {
    return (
        <div className='container p-5 mb-10'>
            <div className='row text-center'>
                <img src='media\images\homeHero.png' className='mb-5'>
                </img>
                <h1 className='mt-5'>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
                <button className="mt-5 p-2 btn btn-primary fs-5" style={{width:"20%" , margin:"0 auto"}}>SignUp now</button>
            </div>
        </div>
    );
}

export default Hero;