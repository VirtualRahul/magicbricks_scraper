"use client";
import Loader from '@/components/Loader';
import Table from '@/components/Table';
import { getSavedProperties, saveAllProperties } from '@/services/CommonService';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";


export default function Scraper() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);
    const [properties, setProperties] = useState(false);
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    useEffect(() => {
        getSavedProperties(response => {
            if (response.success) {
                setProperties(response.data)
            }
        })
    }, [response])


    const isValidUrl = (input) => {
        const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlPattern.test(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        setSuccess('')
        if (!isValidUrl(url)) {
            setError("Please enter a valid URL.");
            return;
        }
        setUrl('')
        setLoading(true)
        saveAllProperties({ url }, (response) => {
            if (response.success) {
                setLoading(false)
                setResponse(response)
                setSuccess(response.message)
            } else {
                setLoading(false)
                setResponse(response)
                setError(response.message)
            }
        })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded-md flex flex-col gap-8"> {/* Adjusted to have equal width and gap between form and table */}

                {success && <Message message={success} setMessage={setSuccess} status={true} />
                }
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Scrape Property Data</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-600">Enter URL:</label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                        {error && <Message message={error} setMessage={setError} status={false} />}
                    </div>
                    <button
                        type="submit"
                        className={`text-center w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'py-4' : ''}`}
                    >
                        {loading ? <Loader loading={loading} /> : 'Scrape'}
                    </button>
                </form>

                {/* Table with Horizontal Scroll */}
                {properties.length > 0 && (
                    <div className="overflow-x-auto w-full">
                        <Table
                            properties={properties}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>


    );
}


function Message({ message, setMessage, status }) {

    const handleClose = () => {
        setMessage(null);
    };

    return (
        <div>
            {message && (
                <p className={clsx(
                    'border-2 p-2 text-base mt-1 flex items-center justify-between rounded-lg',
                    status ? 'bg-green-100 text-green-800 border-green-800' : 'bg-red-100 text-red-800 border-red-800'
                )}>
                    <span className="flex-1 text-left">{message}</span>
                    <button
                        onClick={handleClose}
                        className={clsx(
                            'ml-2 hover:opacity-80 focus:outline-none',
                            status ? 'text-green-800 hover:text-green-600' : 'text-red-800 hover:text-red-600'
                        )}
                    >
                        <RxCrossCircled className="h-5 w-5" />
                    </button>
                </p>
            )}
        </div>
    );
}

