import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { fetchProjectsMain } from "../../../services/firebase/getprojects.main";
import { fetchProjectsItems } from "../../../services/firebase/getprojectitems";
import { fetchDatasets } from "../../../services/firebase/getdatasets";
import { Link } from "react-router-dom";
import { fetchProjectsImages } from "../../../services/firebase/getprojectimages";
import { getVideoURL } from "../../../services/firebase/getresume";
import { addAlert } from "../../components/alert/push.alert";

const Projects: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const getProjects = useSelector((state: any) => state.getprojectitems?.data);
  const getdatasets = useSelector((state: any) => state.getdatasets?.data);
  const getprojectsimages = useSelector(
    (state: any) => state.getprojectsimages?.data
  );
  const getProjectsMain = useSelector(
    (state: any) => state.getprojectsmain?.data
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      fetchProjectsMain();
      setLoading(false);
      fetchProjectsImages();
      fetchProjectsItems();
      fetchDatasets();
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div
        className="d-flex w-100 justify-content-center align-items-center flex-column flex-wrap"
        style={{ height: "100vh" }}
      >
        <h4>Please Wait..</h4>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Projects </title>
      </Helmet>
      <div className="container my-5 ">
        <h1 className="fw-bold mb-3 text-shade2 text-center text-lg-start">
          Research Projects
          <hr />
        </h1>
        {getProjectsMain?.map((item: any, index: any) => {
          return (
            <div className="col-sm-12 card p-3 mb-3" key={index}>
              <h3>
                <strong className="text-shade2">{index + 1}. </strong>
                {item?.title?.stringValue}
              </h3>
              <div className="col-sm-12 d-flex flex-column flex-md-row flex-lg-row gap-3 pe-2 mt-2">
                <div className="col-sm-12 col-lg-4 col-md-4">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          <h5 className="fw-bold mt-2">Project Details</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-bold mt-2">
                            <strong className="text-shade2">1. </strong>
                            Project Video
                          </h6>
                        </td>
                        <td>
                          {item?.video?.mapValue?.fields?.timestamp
                            ?.timestampValue ? (
                            <button
                              className="btn btn-success d-flex align-items-center"
                              onClick={async () => {
                                try {
                                  const res: any = await getVideoURL(item?._id);
                                  const newWindow = window.open(
                                    res,
                                    "_blank",
                                    "width=550,height=700"
                                  );
                                  if (newWindow) {
                                    newWindow.focus();
                                  }
                                } catch {
                                  addAlert("warning", "Video Not Found!");
                                }
                              }}
                            >
                              <i className="bx bx-video me-1"></i> Watch Now
                            </button>
                          ) : (
                            "Not Available"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-bold mt-2">
                            <strong className="text-shade2">2. </strong>
                            Funding Agency
                          </h6>
                        </td>
                        <td>{item?.funding_agency?.stringValue}</td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-bold mt-2">
                            <strong className="text-shade2">3. </strong>
                            Total Fund
                          </h6>
                        </td>
                        <td>Rs. {item?.total_fund?.stringValue}</td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-bold mt-2">
                            <strong className="text-shade2">4. </strong>
                            Project Investigators
                          </h6>
                        </td>
                        <td>{item?.pis?.stringValue}</td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-bold mt-2">
                            <strong className="text-shade2">5. </strong>
                            Co-Project Investigators
                          </h6>
                        </td>
                        <td>{item?.copis?.stringValue}</td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-bold mt-2">
                            <strong className="text-shade2">6. </strong>
                            Ph.D./JRF Students
                          </h6>
                        </td>
                        <td>{item?.jrf_phd_scholar?.stringValue}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-sm-12 col-lg-8 col-md-8  card px-2 rounded-0">
                  <h4 className="fw-bold text-shade2 mt-2">Introduction</h4>
                  <hr className="mx-1 mt-0 mb-2" />
                  <p className="">{item?.description?.stringValue}</p>
                  <div className="px-1 mb-3">
                    <h6 className="fw-bold mt-2">Project Images</h6>
                    <div className="d-flex flex-column flex-wrap">
                      <div
                        id={"carouselExampleCaptions" + index}
                        className="carousel slide"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-indicators">
                          <button
                            type="button"
                            data-bs-target={"#carouselExampleCaptions" + index}
                            data-bs-slide-to={0}
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                          />
                          <button
                            type="button"
                            data-bs-target={"#carouselExampleCaptions" + index}
                            data-bs-slide-to={1}
                            aria-label="Slide 2"
                          />
                          <button
                            type="button"
                            data-bs-target={"#carouselExampleCaptions" + index}
                            data-bs-slide-to={2}
                            aria-label="Slide 3"
                          />
                        </div>
                        <div className="carousel-inner">
                          {getprojectsimages
                            ?.filter((v_: any) => v_?.project == item?._id)
                            ?.map((__item: any, i_: any) => {
                              return (
                                <div
                                  className={
                                    i_ === 0
                                      ? "carousel-item active"
                                      : "carousel-item"
                                  }
                                  key={i_}
                                >
                                  <img
                                    src={__item?.bannerURL}
                                    className="d-block w-100"
                                    alt="banner image"
                                  />
                                  <div className="carousel-caption d-none d-md-block">
                                    <h3 className="fw-bold text-primary">
                                      {__item?.title}
                                    </h3>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <button
                          className="carousel-control-prev btn btn-dark"
                          type="button"
                          data-bs-target={"#carouselExampleCaptions" + index}
                          data-bs-slide="prev"
                          style={{ transition: "0.3s ease all" }}
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next btn btn-dark"
                          type="button"
                          data-bs-target={"#carouselExampleCaptions" + index}
                          data-bs-slide="next"
                          style={{ transition: "0.3s ease all" }}
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                    <h6 className="fw-bold mt-2">Related Datasets</h6>
                    <div className="d-flex flex-column flex-wrap">
                      {item?.related_datasets?.arrayValue?.values?.map(
                        (item: any, i_: any) => {
                          const __item = getdatasets?.find(
                            (pro: any) => pro?._id == item?.stringValue
                          );
                          return (
                            <div key={i_}>
                              {i_ + 1}. {__item?.title} (
                              <Link
                                to={"#"}
                                className="text-primary"
                                style={{ textDecoration: "none" }}
                                data-bs-toggle="modal"
                                data-bs-target={"#" + __item?._id + "Modal"}
                              >
                                Open
                              </Link>
                              )
                              <div
                                className="modal fade"
                                id={__item?._id + "Modal"}
                                tabIndex={-1}
                                aria-labelledby={__item?._id + "ModalLabel"}
                                aria-hidden="true"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                              >
                                <div className="modal-dialog modal-xl">
                                  <div className="modal-content rounded-0 border-none">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id={__item?._id + "ModalLabel"}
                                      >
                                        {__item?.title}
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div className="modal-body">
                                      <>
                                        <div className="">
                                          <p>{__item?.description}</p>
                                          <div className="card p-3">
                                            <div
                                              id={
                                                "carouselExampleControls" +
                                                index
                                              }
                                              className="carousel slide"
                                              data-bs-ride="carousel"
                                            >
                                              <div className="carousel-inner">
                                                {__item?.images.map(
                                                  (
                                                    image__: any,
                                                    key: number
                                                  ) => {
                                                    return (
                                                      <div
                                                        className={`carousel-item ${
                                                          key === 0 && "active"
                                                        }`}
                                                        key={key}
                                                      >
                                                        <img
                                                          src={image__?.url}
                                                          className="d-block w-100"
                                                          alt={"This is image"}
                                                        />
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                              <button
                                                className="carousel-control-prev btn btn-dark"
                                                type="button"
                                                data-bs-target={
                                                  "#carouselExampleControls" +
                                                  index
                                                }
                                                data-bs-slide="prev"
                                              >
                                                <span
                                                  className="carousel-control-prev-icon"
                                                  aria-hidden="true"
                                                />
                                                <span className="visually-hidden">
                                                  Previous
                                                </span>
                                              </button>
                                              <button
                                                className="carousel-control-next  btn btn-dark"
                                                type="button"
                                                data-bs-target={
                                                  "#carouselExampleControls" +
                                                  index
                                                }
                                                data-bs-slide="next"
                                              >
                                                <span
                                                  className="carousel-control-next-icon"
                                                  aria-hidden="true"
                                                />
                                                <span className="visually-hidden">
                                                  Next
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <h6 className="fw-bold mt-2">Related Projects</h6>
                    <div className="d-flex flex-column flex-wrap">
                      {item?.related_projectitems?.arrayValue?.values?.map(
                        (item: any, i_: any) => {
                          const __item = getProjects?.find(
                            (pro: any) => pro?._id == item?.stringValue
                          );
                          return (
                            <div key={i_}>
                              {i_ + 1}. {__item?.title} (
                              <Link
                                to={"#"}
                                className="text-primary"
                                style={{ textDecoration: "none" }}
                                data-bs-toggle="modal"
                                data-bs-target={"#" + __item?._id + "Modal"}
                              >
                                Open
                              </Link>
                              )
                              <div
                                className="modal fade"
                                id={__item?._id + "Modal"}
                                tabIndex={-1}
                                aria-labelledby={__item?._id + "ModalLabel"}
                                aria-hidden="true"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                              >
                                <div className="modal-dialog modal-xl">
                                  <div className="modal-content rounded-0 border-none">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id={__item?._id + "ModalLabel"}
                                      >
                                        {__item?.title}({" "}
                                        <Link
                                          className="btn-primary"
                                          style={{
                                            textDecoration: "none",
                                          }}
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
                                          style={{
                                            textDecoration: "none",
                                          }}
                                        >
                                          PPT Link
                                        </Link>
                                        ) |{" "}
                                        <Link
                                          to={__item?.githubLink}
                                          target="_blank"
                                          className="btn-primary"
                                          style={{
                                            textDecoration: "none",
                                          }}
                                        >
                                          Github Link
                                        </Link>
                                        )
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div className="modal-body">
                                      <>
                                        {__item?.description}
                                        <div className="p-3">
                                          <img
                                            className="w-100"
                                            src={__item?.bannerURL}
                                            alt="Banner Image"
                                          />
                                        </div>
                                      </>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Projects;
