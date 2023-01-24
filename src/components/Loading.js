import React from 'react'

const Loading = ({ subTitle }) => {
    let circleCommonClasses = 'h-4 w-4 ml-1 bg-current rounded-full';

    return (
        <div className='flex-col justify-self-center mt-44  items-center w-fit h-fit text-center'>
            <h1 className='text-white text-2xl my-12 text-center'>{subTitle}</h1>
            <div className='flex justify-center px-2 m-auto mb-2 bg-amber-400 w-fit rounded-xl'>
                <div className='flex items-center content-center  '>
                    <h1 className='text-2xl mr-1'>Loading</h1>
                    <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                    <div
                        className={`${circleCommonClasses} mr-1 animate-bounce`}
                    ></div>
                    <div className={`${circleCommonClasses} animate-bounce`}></div>
                </div>
            </div>
        </div>
    )
}

export default Loading