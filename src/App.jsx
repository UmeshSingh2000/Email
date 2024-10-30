import React, { useEffect, useState } from 'react';
import EmailBox from './Component/EmailBox';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addEmails, toggleBody } from './Features/Emails/emailsSlice';
import EmailBody from './Component/EmailBody';
import Loader from './Component/Loader/Loader';
import Pages from './Component/Pages';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [currentPage, setCurrentPage] = useState(1); // Move page state here
  const dispatch = useDispatch();

  const bodyVisible = useSelector((state) => state.allEmail.bodyCollapse);
  const emails = useSelector((state) => state.allEmail.emails);

  useEffect(() => {
    const fetchMail = async (page = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`https://flipkart-email-mock.vercel.app/?page=${page}`);
        dispatch(addEmails(response.data.list));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMail(currentPage); // Fetch data for the current page
  }, [currentPage, dispatch]);

  // Check for screen resizing to adjust layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update page state to trigger data fetch for the selected page
  };

  if (loading) return <Loader />;

  return (
    <main className="p-10 flex gap-4 max-h-screen overflow-hidden">
      <div>
        {bodyVisible && (
          <i
            className="fa-solid fa-circle-xmark absolute top-4 right-4 text-2xl cursor-pointer"
            onClick={() => dispatch(toggleBody(!bodyVisible))}
          ></i>
        )}
      </div>
      <article
        className={`flex ${bodyVisible && isMobileView ? 'hidden' : bodyVisible ? 'w-1/3' : 'w-full'} overflow-auto flex-col gap-2`}
      >
        <div className='flex gap-3 items-center'>
          <h1>Filter By: </h1>
          <ul className='flex items-center gap-2'>
            <li className='cursor-pointer font-medium hover:bg-borderColor p-2 rounded-full'>Unread</li>
            <li className='cursor-pointer font-medium hover:bg-borderColor p-2 rounded-full'>Read</li>
            <li className='cursor-pointer font-medium hover:bg-borderColor p-2 rounded-full'>Favorites</li>
          </ul>
        </div>
        {emails.map((mail) => (
          <EmailBox
            key={mail.id}
            id={mail.id}
            from={mail.from}
            subject={mail.subject}
            short_description={mail.short_description}
            date={mail.date}
            isSelected={mail.id === selectedId}
            onClick={() => setSelectedId(mail.id)}
          />
        ))}
        <footer className="w-full items-center flex">
          <Pages currentPage={currentPage} onPageChange={handlePageChange} />
        </footer>
      </article>
      <aside
        className={`${bodyVisible ? (isMobileView ? 'w-full' : 'w-2/3') : 'hidden'} overflow-auto border-borderColor border bg-white p-4 rounded-lg`}
      >
        <EmailBody />
      </aside>
    </main>
  );
};

export default App;
