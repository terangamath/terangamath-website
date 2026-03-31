import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Programs from './components/programs/Programs';
import Evenements from './components/events/events';
import Blog from './components/blog/Blog';
import NosActions from './components/Actions/Actions';
import Gallery from './components/gallery/Gallery';
import Partenaires from './components/partners/Partners';
import FloatingSoutenir from './components/FloatingSoutenir';
import BlogPost from './components/blog/Blogpost';
import Presse from './components/presse/Presse';
import ScrollToTop from './ScrollToTop';
import DocumentsOfficiels from './components/documents/Documents';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Evenements />} />
          <Route path="/actualite/blog/:slug" element={<BlogPost />} />
          <Route path="/actualite/blog" element={<Blog />} />
          <Route path="/actualite/presse" element={<Presse />} />
          <Route path="/actions" element={<NosActions />} />
          <Route path="/partners" element={<Partenaires />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/documents" element={<DocumentsOfficiels />} />
      </Routes>
      <FloatingSoutenir />
    </Router>
  )
}

export default App
