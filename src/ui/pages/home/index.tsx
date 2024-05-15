import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/navbar";
import Landing from "./landing";
import Footer from "../../components/footer";
import Peoples from "../peoples";
import Publications from "./publications";
import Datasets from "../datasets";
import ResearchAreas from "../research/areas";
import ResearchAreasDetails from "../research/areas.details";
import ContactUs from "../contact";
import Projects from "../projects";
import { Helmet } from "react-helmet";
import News from "../news";
import Gallery_ from "../gallery";

const WEBSITE_CONTENT: any = () => {
  return (
    <>
      <Helmet>
        <title>Welcome </title>
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/news" element={<News />} />
        <Route path="/gallery" element={<Gallery_ />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/research-areas" element={<ResearchAreas />} />
        <Route path="/research-areas/:id" element={<ResearchAreasDetails />} />
        <Route path="/publications" element={<Publications ref_={false} />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
};

export default WEBSITE_CONTENT;
