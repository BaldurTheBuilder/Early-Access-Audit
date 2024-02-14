import React, {useState} from 'react';

// import header and footer
import AlternateHeader from "./Header/alternateHeader";
import Footer from "./Footer";

// import pages
import Home from "../pages/Home";

const PageContainer = () => {
    // const [currentPage, setCurrentPage] = useState('#');
    // const handlePageChange = (page) => setCurrentPage(page);

    // this is where we build the current page.
    // const renderPage = () => {
    //     switch(currentPage) {
    //         case "Home": return <Home/>;
    //         default: return <Home/>;
    //     };
    //  };
    
  return ( 
  <div> 
    {/*<AlternateHeader currentPage={currentPage} handlePageChange={handlePageChange}/>
    {renderPage()}
  <Footer/>*/}
  <Home/>
  </div>
  );
};

export default PageContainer;