import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

interface SearchBoxProps {
  placeholder?: string;
  onSubmit: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

    const searchBoxStyles = {
      backgroundColor: '#C3C3C3',
      borderRadius: '9px',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      width: '350px',
      marginTop: '10px',
      marginLeft: '30px'
    };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(searchQuery);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <Box sx={searchBoxStyles} component="form" onSubmit={handleSubmit}>
      <IconButton type="submit" aria-label="search">
        <MoreVertIcon />
      </IconButton>
      <InputBase
        placeholder={placeholder || "Search anything"}
        value={searchQuery}
        onChange={handleInputChange}
        sx={{ flex: 1, borderRadius: '4px' }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBox;


//Initial code

// @ -0,0 +1,92 @@
// import React, { useState } from 'react';
// import { Box, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
// import { Search as SearchIcon, Close as CloseIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

// const searchBoxStyles = {
//   backgroundColor: '#C3C3C3',
//   borderRadius: '9px',
//   padding: '4px',
//   display: 'flex',
//   alignItems: 'center',
//   width: '350px',
//   marginTop: '10px',
//   marginLeft: '30px'
// };

// const Search = () => {
//   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const options = ['Category 1', 'Category 2', 'Category 3'];

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (option: string) => {
//     setSearchQuery(option);
//     handleClose();
//   };

//   return (
//     <>
//       <Box sx={searchBoxStyles}>
//         <InputBase
//           placeholder="Search anything"
//           sx={{ flex: 1, borderRadius: '4px' }}
//         />
//         <IconButton type="submit" aria-label="search">
//           <SearchIcon />
//         </IconButton>
//       </Box>

//       <Box sx={searchBoxStyles}>
//         <IconButton type="submit" aria-label="search">
//           <MoreVertIcon />
//         </IconButton>
//         <InputBase
//           placeholder="Search anything"
//           sx={{ flex: 1, borderRadius: '4px' }}
//         />
//         <IconButton type="submit" aria-label="search">
//           <SearchIcon />
//         </IconButton>
//       </Box>

//       <Box sx={searchBoxStyles}>
//         <IconButton onClick={() => setSearchQuery('')} aria-label="clear-search">
//           <CloseIcon />
//         </IconButton>
//         <InputBase
//           placeholder="Search anything"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           sx={{ flex: 1, borderRadius: '4px' }}
//         />
//         <IconButton onClick={handleClick} aria-label="search-options">
//           <SearchIcon />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//         >
//           {options.map((option) => (
//             <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
//               {option}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>
//     </>
//   );
// };
    <Box sx={searchBoxStyles} component="form" onSubmit={handleSubmit}>
      <IconButton type="submit" aria-label="search">
        <MoreVertIcon />
      </IconButton>
      <InputBase
        placeholder={placeholder || "Search anything"}
        value={searchQuery}
        onChange={handleInputChange}
        sx={{ flex: 1, borderRadius: '4px' }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBox;


//Initial code

// @ -0,0 +1,92 @@
// import React, { useState } from 'react';
// import { Box, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
// import { Search as SearchIcon, Close as CloseIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

// const searchBoxStyles = {
//   backgroundColor: '#C3C3C3',
//   borderRadius: '9px',
//   padding: '4px',
//   display: 'flex',
//   alignItems: 'center',
//   width: '350px',
//   marginTop: '10px',
//   marginLeft: '30px'
// };

// const Search = () => {
//   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const options = ['Category 1', 'Category 2', 'Category 3'];

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (option: string) => {
//     setSearchQuery(option);
//     handleClose();
//   };

//   return (
//     <>
//       <Box sx={searchBoxStyles}>
//         <InputBase
//           placeholder="Search anything"
//           sx={{ flex: 1, borderRadius: '4px' }}
//         />
//         <IconButton type="submit" aria-label="search">
//           <SearchIcon />
//         </IconButton>
//       </Box>

//       <Box sx={searchBoxStyles}>
//         <IconButton type="submit" aria-label="search">
//           <MoreVertIcon />
//         </IconButton>
//         <InputBase
//           placeholder="Search anything"
//           sx={{ flex: 1, borderRadius: '4px' }}
//         />
//         <IconButton type="submit" aria-label="search">
//           <SearchIcon />
//         </IconButton>
//       </Box>

//       <Box sx={searchBoxStyles}>
//         <IconButton onClick={() => setSearchQuery('')} aria-label="clear-search">
//           <CloseIcon />
//         </IconButton>
//         <InputBase
//           placeholder="Search anything"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           sx={{ flex: 1, borderRadius: '4px' }}
//         />
//         <IconButton onClick={handleClick} aria-label="search-options">
//           <SearchIcon />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//         >
//           {options.map((option) => (
//             <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
//               {option}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>
//     </>
//   );
// };

// // export default Search;