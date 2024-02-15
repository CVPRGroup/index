import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchSupervisors } from "../../../services/firebase/getsupervisors";
import { fetchphd } from "../../../services/firebase/getphd";
import { fetchpgug } from "../../../services/firebase/getphug";
import { fetchvisinterns } from "../../../services/firebase/getvisinterns";

const Peoples: React.FC = () => {
  useEffect(() => {
    fetchSupervisors();
  }, []);
  const getsupervisors = useSelector((state: any) => state.getsupervisors.data);
  const getphd = useSelector((state: any) => state.getphdStudents.data);
  const getpgug = useSelector((state: any) => state.getpgugStudents.data);
  const getvisitorsandinterns = useSelector(
    (state: any) => state.getvisitorsandinterns.data
  );
  useEffect(() => {
    fetchphd();
    fetchpgug();
    fetchvisinterns();
  }, []);
  return (
    <>
      <div className="container my-5 ">
        <h1 className="fw-bold mb-3 text-danger text-center text-lg-start">
          Supervisor
          <hr />
        </h1>

        <div className="col-sm-12 d-flex justify-content-between px-lg-0 px-3 flex-row flex-wrap">
          <div className="col-sm-2 py-2 pe-2">
            <div className="card p-2">
              <img
                src={getsupervisors[0]?.profileImage}
                alt=""
                className="rounded-1"
              />
            </div>
          </div>
          <div className="col-sm-10">
            <h2 className="fw-bold text-dark">
              {getsupervisors[0]?.data?.name?.stringValue}
            </h2>
            <p className="text-muted">
              {getsupervisors[0]?.data?.email?.stringValue} | +91-
              {getsupervisors[0]?.data?.phone?.stringValue} |{" "}
              <a
                style={{ textDecoration: "none" }}
                href={getsupervisors[0]?.data?.googleScholarLink.stringValue}
                target="_blank"
              >
                Google Scholar
              </a>{" "}
              |{" "}
              <a
                style={{ textDecoration: "none" }}
                href={getsupervisors[0]?.data?.researchGateLink?.stringValue}
                target="_blank"
              >
                Researchgate
              </a>{" "}
              |{" "}
              <a
                style={{ textDecoration: "none" }}
                href={getsupervisors[0]?.data?.personalProfileLink?.stringValue}
                target="_blank"
              >
                Personal Profile
              </a>{" "}
              |{" "}
              <a
                style={{ textDecoration: "none" }}
                href={getsupervisors[0]?.data?.otherLink?.stringValue}
                target="_blank"
              >
                Other
              </a>
            </p>
            <hr />
            <h5>Research Interests</h5>
            <ul>
              {getsupervisors[0]?.data?.researchInterests?.stringValue
                ?.split(",")
                .map((item: any, key_: any) => {
                  return <li key={key_}>{item}</li>;
                })}
            </ul>
          </div>
        </div>
        <div className="col-sm-12 px-lg-0 px-3 ">
          <h3 className="fw-bold">Introduction</h3>
          <hr />
          <p>{getsupervisors[0]?.data?.introduction?.stringValue}</p>
        </div>
        <h1 className="fw-bold mb-2 mt-5 text-danger px-lg-0 px-3 ">
          Ph.D. Students
          <hr />
        </h1>
        <div className="d-flex justify-content-start  gap-3 align-items-start mb-4 flex-wrap overflow-auto px-lg-0 px-3 ">
          {getphd?.map((item: any, index: number) => {
            const { name, batch, isAlumni, email, mobile, researchInterests } =
              item?.data;
            if (isAlumni?.booleanValue) {
              return null;
            }
            return (
              <div
                className="card text-center p-1"
                key={index}
                style={{ width: "300px" }}
              >
                <div className="p-2">
                  <img
                    src={item?.profileImage}
                    alt="Profile Image"
                    style={{
                      height: "150px",
                      borderRadius: "50%",
                      border: "5px solid var(--bs-danger)",
                    }}
                  />
                </div>
                <div className="p-2">
                  <h3>{name?.stringValue}</h3>
                  <hr />
                  <small>
                    Email: {email?.stringValue || "N/A"}
                    <br />
                    Batch: {batch?.stringValue || "N/A"}
                    <br />
                    Mobile: {mobile?.stringValue}
                  </small>
                  <br />
                  <strong className="mt-2">
                    {researchInterests?.arrayValue?.values?.map(
                      (ri: any, i_: any) => {
                        return ri.stringValue + ",";
                      }
                    )}
                  </strong>
                  <br />
                  <button className="btn btn-danger btn-sm my-2">
                    Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="fw-bold mb-2 mt-5 text-danger px-lg-0 px-3 ">
          Ph.D. Alumni Students
          <hr />
        </h1>
        <div className="d-flex justify-content-start  gap-3 align-items-start mb-4 flex-wrap  overflow-auto px-lg-0 px-3 ">
          {getphd?.map((item: any, index: number) => {
            const { name, batch, isAlumni, email, mobile, researchInterests } =
              item?.data;
            if (!isAlumni?.booleanValue) {
              return null;
            }
            return (
              <div
                className="card text-center p-1"
                key={index}
                style={{ width: "300px" }}
              >
                <div className="p-2">
                  <img
                    src={item?.profileImage}
                    alt="Profile Image"
                    style={{
                      height: "150px",
                      borderRadius: "50%",
                      border: "5px solid var(--bs-danger)",
                    }}
                  />
                </div>
                <div className="p-2">
                  <h3>{name?.stringValue}</h3>
                  <hr />
                  <small>
                    Email: {email?.stringValue || "N/A"}
                    <br />
                    Batch: {batch?.stringValue || "N/A"}
                    <br />
                    Mobile: {mobile?.stringValue}
                  </small>
                  <br />
                  <strong className="mt-2">
                    {researchInterests?.arrayValue?.values?.map(
                      (ri: any, i_: any) => {
                        return ri.stringValue + ",";
                      }
                    )}
                  </strong>
                  <br />
                  <button className="btn btn-danger btn-sm my-2">
                    Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="fw-bold mb-2 mt-5 text-danger px-lg-0 px-3 ">
          Post Graduate and Undergraduate Students
          <hr />
        </h1>
        <div className="d-flex flex-wrap  overflow-auto gap-3 px-lg-0 px-3 ">
          {getpgug?.map((item: any, index: number) => {
            const {
              name,
              batch,
              isAlumni,
              email,
              mobile,
              degree,
              currentlyWorkingAt,
            } = item?.data;
            if (isAlumni.booleanValue) return null;
            return (
              <div
                className="card text-center p-1"
                key={item?._id}
                style={{ width: "300px" }}
              >
                <div className="p-2">
                  <h3>{name?.stringValue}</h3>
                  <small> {email?.stringValue || "N/A"}</small>
                  <br />
                  <small>+91-{mobile?.stringValue}</small>
                  {isAlumni.booleanValue && (
                    <>
                      <br />
                      <small className="fw-bold text-danger">(Alumni)</small>
                    </>
                  )}
                  <hr />
                  <small className="text-dark fw-bold">
                    {degree?.stringValue} student From{" "}
                    {batch?.stringValue || "N/A"} batch
                  </small>
                  <br />
                  <small>Currently Working at</small>
                  <br />
                  <strong className="mt-2">
                    {currentlyWorkingAt?.stringValue}
                  </strong>
                  <br />
                  {/* <button className="btn btn-primary btn-sm my-2">
                    Linkedin
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="fw-bold mb-2 mt-5 text-danger px-lg-0 px-3 ">
          PG and UG Alumnis
          <hr />
        </h1>
        <div className="d-flex flex-wrap  overflow-auto gap-3 px-lg-0 px-3 ">
          {getpgug?.map((item: any, index: number) => {
            const {
              name,
              batch,
              isAlumni,
              email,
              mobile,
              degree,
              currentlyWorkingAt,
            } = item?.data;
            if (!isAlumni.booleanValue) return null;
            return (
              <div
                className="card text-center p-1"
                key={item?._id}
                style={{ width: "300px" }}
              >
                <div className="p-2">
                  <h3>{name?.stringValue}</h3>
                  <small> {email?.stringValue || "N/A"}</small>
                  <br />
                  <small>+91-{mobile?.stringValue}</small>
                  {isAlumni.booleanValue && (
                    <>
                      <br />
                      <small className="fw-bold text-danger">(Alumni)</small>
                    </>
                  )}
                  <hr />
                  <small className="text-dark fw-bold">
                    {degree?.stringValue} student From{" "}
                    {batch?.stringValue || "N/A"} batch
                  </small>
                  <br />
                  <small>Currently Working at</small>
                  <br />
                  <strong className="mt-2">
                    {currentlyWorkingAt?.stringValue}
                  </strong>
                  <br />
                  {/* <button className="btn btn-primary btn-sm my-2">
                    Linkedin
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="fw-bold mb-2 mt-5 text-danger px-lg-0 px-3 ">
          Vistors and Inters
          <hr />
        </h1>
        <div className="d-flex flex-wrap  overflow-auto gap-3 px-lg-0 px-3 ">
          {getvisitorsandinterns?.map((item: any, index: number) => {
            const { name, collegeName } = item?.data;
            return (
              <div
                className="card text-center p-1"
                key={item?._id}
                style={{ width: "300px" }}
              >
                <div className="p-2">
                  <h4>{name?.stringValue}</h4>
                  <hr />
                  <p className="fw-bold text-dark">
                    {collegeName?.stringValue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Peoples;
