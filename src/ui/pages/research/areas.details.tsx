import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchResearchArea } from "../../../services/firebase/getresearcharea";
import { fetchSubAreas } from "../../../services/firebase/getsubareas";
import { Link, useParams } from "react-router-dom";
import { fetchProjectsItems } from "../../../services/firebase/getprojectitems";

const ResearchAreasDetails: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true); // Set initial loading state to true
  const getResearchArea = useSelector(
    (state: any) => state.getresearcharea?.data
  );
  const getsubareas1 = useSelector((state: any) => state.getsubareas).data;
  const getProjects = useSelector((state: any) => state.getprojectitems?.data);

  useEffect(() => {
    const initPage = async () => {
      await fetchResearchArea();
      await fetchSubAreas();
      await fetchProjectsItems();
      setLoading(false); // Set loading state to false after data is fetched
    };
    initPage();
  }, []);

  if (loading) {
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1>Please Wait..</h1>
      </div>
    );
  }

  // Find research item
  const research_item = getResearchArea.find((v: any) => v._id === id);
  if (!research_item) {
    window.location.href = "/research-areas";
  }

  // Filter subareas
  const subareasArray = research_item?.subareas || [];
  const getsubareas = getsubareas1?.filter((item: any) =>
    subareasArray.some((subarea: any) => subarea.stringValue === item?._id)
  );
  return (
    <>
      <div className="container my-5 ">
        <div className="col-sm-12 text-start w-100">
          <button
            className="btn btn-dark btn-sm mb-4 d-flex justify-content-center align-items-center"
            onClick={() => window.history.back()}
          >
            <i className="bx bx-arrow-back me-2"></i> Back
          </button>
        </div>
        <h1 className="fw-bold mb-3 text-danger text-center text-lg-start">
          {research_item?.title}
          <hr />
        </h1>
        <div className="col-sm-12">
          <div className="card p-3">
            <img src={research_item?.bannerURL} alt="Banner URL" />
          </div>
        </div>
        <div className="col-sm-12 my-4">
          {getsubareas?.map((item__: any, key__: any) => {
            return (
              <div className="card p-3 mb-4" key={key__}>
                <h1>
                  <strong className="fw-bold text-danger">{key__ + 1}. </strong>
                  {item__?.title}
                </h1>
                <hr />
                <p>{item__?.description}</p>
                <h3 className="fw-bold text-danger mb-3">Related Projects</h3>
                <div className="col-sm-12">
                  {item__?.projects?.map((item: any, i_: any) => {
                    const __item = getProjects?.find(
                      (pro: any) => pro?._id == item?.stringValue
                    );
                    return (
                      <div className="card p-2 mb-4">
                        <h6>
                          {" "}
                          <strong className="fw-bold text-danger">
                            {i_ + 1}.{" "}
                          </strong>
                          {__item?.title}({" "}
                          <Link
                            className="btn-primary"
                            style={{ textDecoration: "none" }}
                            to={__item?.pdfLink}
                            target="_blank"
                          >
                            PDF Link
                          </Link>{" "}
                          |{" "}
                          <Link
                            to={__item?.pptLink}
                            target="_blank"
                            className="btn-primary"
                            style={{ textDecoration: "none" }}
                          >
                            PPT Link
                          </Link>
                          )
                        </h6>
                        <div className="p-3">
                          <img
                            className="w-100"
                            src={__item?.bannerURL}
                            alt="Banner Image"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResearchAreasDetails;
