import React from "react";
// import "./styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageContainer from "./components/PageContainer";

// pages
// import Portfolio from "./pages/Portfolio";
// import Home from "./pages/Home";

let httpLink;

if (process.env.NODE_ENV === 'production') {
  httpLink = new HttpLink({ uri: "/graphql" });
} else {
  httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });
}

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  // link: concat(authMiddleware, httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PageContainer/>
    </ApolloProvider>
  );
}

export default App;

// return (
//   <ApolloProvider client={client}>
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/portfolio" element= {<Portfolio/>}/>
//         <Route path="/resume" element={<Resume />}/>
//         <Route path="/aboutMe" element={<AboutMe/>}/>
//       </Routes>
//       <Footer />
//     </Router>
//   </ApolloProvider>
// );