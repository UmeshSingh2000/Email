import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { toggleBody } from '../Features/Emails/emailsSlice';

const Pages = ({ currentPage, onPageChange }) => {
    const dispatch = useDispatch();
  const handlePageChange = (event, value) => {
    onPageChange(value); // Call parent function with the selected page
    dispatch(toggleBody(false));
  };

  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={2}
          page={currentPage} // Use prop from parent for controlled component
          onChange={handlePageChange}
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

export default Pages;
