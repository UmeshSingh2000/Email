import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formattedDate } from '../Utils/formatTime';
import { setFavorite } from '../Features/Emails/emailsSlice';
const EmailBody = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const data = useSelector((state) => state.allEmail.emails)
    const emailBody = data.find((item) => item.id === id);
    if (!emailBody) return <p>Loading Emails...</p>
    const formattedDateString = formattedDate(emailBody.date)
    return (
        <>
            <main>
                <article className='email-item'>
                    <header className='flex justify-between'>
                        <div className='flex gap-2'>
                            <figure className="profile">
                                <div className="image bg-accent flex w-10 h-10 justify-center items-center text-white rounded-full" aria-label="Profile Initial">{emailBody.from.name ? emailBody.from.name.slice(0, 1).toUpperCase() : '?'}</div>
                            </figure>
                            <div>
                                <h2 className="subject" aria-label="Email Subject">
                                    {emailBody.subject}
                                </h2>
                                <time className="time">{formattedDateString}</time>
                            </div>
                        </div>
                        <button className='favButton bg-accent rounded-full text-white text-sm px-3 h-9' onClick={()=>dispatch(setFavorite({id}))}>
                            {emailBody.favorite ? <i className="fa-solid fa-star"></i> : 'Mark as favorite'}
                        </button>
                    </header>
                    <section className='email-content my-3' dangerouslySetInnerHTML={{ __html: emailBody.body }}></section>
                </article>
            </main>
        </>
    )
}
export default EmailBody
