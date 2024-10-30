import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addEmailsBody, toggleBody } from '../Features/Emails/emailsSlice';
import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../Utils/formatTime';
import './emailBoxStyle.css';

const EmailBox = ({ from, subject, short_description, date, id, isSelected, onClick }) => {
    const bodyVisible = useSelector((state) => state.allEmail.bodyCollapse);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const fetchEmailBody = async () => {
        const response = await axios.get(`https://flipkart-email-mock.vercel.app/?id=${id}`)
        const body = response.data;
        dispatch(addEmailsBody(body))
        dispatch(toggleBody(true));
        navigate(`/${id}`);
        onClick();
    }
    const formattedDateString = formattedDate(date);
    return (
        <>
            <main className={`emailBox flex ${isSelected ? 'clicked' : ''} gap-6 border-borderColor border bg-white duration-200 cursor-pointer hover:bg-readBackground px-4 py-2 rounded-lg md:flex-col lg:flex-row`} onClick={fetchEmailBody}>
                <aside className=''>
                    <div className={`image bg-accent flex w-10 h-10 justify-center items-center text-white rounded-full text-sm`}>{from.name ? from.name.slice(0, 1).toUpperCase() : '?'}</div>
                </aside>
                <article>
                    <header>
                        <div className="from flex flex-col gap-1 xl:flex-row xl:items-center">
                            <div className="name text-sm sm:text-base flex">From: <span className='font-medium'>{from.name}</span></div>
                            <div className="email font-medium text-sm">{`<${from.email}>`}</div>
                        </div>
                        <div className="subject text-sm">Subject : <span className='font-medium text-sm'>{subject}</span></div>
                    </header>
                    <section className='text-sm'>{bodyVisible ? short_description.slice(0, 30) + '...' : short_description}</section>
                    <footer className='emailBox_footer flex gap-3'>
                        <div className="date text-sm">{formattedDateString}</div>
                        <div className={`text-accent font-medium fav`}>Favorite</div>
                    </footer>
                </article>
            </main>
        </>
    )
}
export default EmailBox
