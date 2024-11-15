import React from 'react'
import { ThreeDots } from 'react-loader-spinner'


export default function Loader({ loading }) {
    return (
        <>
            {
                loading ?
                    <div className="flex justify-center items-center">
                        <ThreeDots
                            visible={true}
                            height={10}
                            width="40"
                            color="#fff"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                        />
                    </div>
                    : ""
            }

        </>
    )
}
