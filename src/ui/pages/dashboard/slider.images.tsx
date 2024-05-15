import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "firebase/storage";
import "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { useSelector } from "react-redux";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  deleteSlider,
  fetchSlider,
} from "../../../services/firebase/getslider";
import { addAlert } from "../../components/alert/push.alert";

const SliderImages: any = () => {
  const getslider = useSelector((state: any) => state.getslider).data;
  const [image, setImage] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<any>("");

  useEffect(() => {
    fetchSlider();
  }, []);

  const cropperRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCrop = () => {
    if (cropperRef && cropperRef.current) {
      const cropper: any = (cropperRef as any).current.cropper;
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleSubmit = async () => {
    if (!croppedImage || !title) {
      addAlert("danger", "Please select an image and provide a title!");
      return;
    }

    setLoading(true);

    const storageRef = ref(storage, `slider_images/${title}`);

    // Convert the cropped image to Base64
    const blob = await fetch(croppedImage).then((res) => res.blob());
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      uploadBytes(storageRef, blob)
        .then(async () => {
          await addDoc(collection(db, "slider_images"), {
            title: title,
            bannerURL: title,
          });
          addAlert("success", "Slider Image has been saved!");
          setTitle("");
          setImage(null);
          setLoading(false);
          window.location.reload();
        })
        .catch(() => {
          addAlert(
            "danger",
            "Error! While adding a Subitem, Check you internet connnection and Try Again later."
          );
          setLoading(false);
        });
    };
  };

  return (
    <>
      <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10 px-5">
        <div className="w-100 d-flex justify-content-between">
          <h3>Slider Images</h3>
          <button
            className="btn btn-dark btn-sm rounded-0"
            data-bs-toggle="modal"
            data-bs-target="#addSliderModal"
          >
            + Add New
          </button>
        </div>
        <hr />
        <div className="overflow-auto mt-3" style={{ height: "500px" }}>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="top-0 position-sticky bg-dark text-white border-1 border-dark"
                >
                  Sr. No.
                </th>
                <th
                  scope="col"
                  className="top-0 position-sticky bg-dark text-white border-1 border-dark"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="top-0 position-sticky bg-dark text-white border-1 border-dark"
                >
                  Banner
                </th>
                <th
                  scope="col"
                  className="top-0 position-sticky bg-dark text-white border-1 border-dark"
                  style={{ zIndex: "999" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {getslider?.map((item: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td style={{ width: "fit-content" }}>
                      <Link target="_blank" to={item.bannerURL}>
                        <img
                          className="rounded-2"
                          src={item.bannerURL}
                          alt=""
                          width="500px"
                        />
                      </Link>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle btn-sm"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Action
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <button
                              className="dropdown-item text-shade2"
                              onClick={() => deleteSlider(item._id)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!getslider.length && (
            <>
              <div className="w-100 text-center">
                <h3 className="fw-bold text-shade2">Not Found!</h3>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className="modal fade"
        id="addSliderModal"
        tabIndex={-1}
        aria-labelledby={`addSliderModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content rounded-0 border-none">
            <div className="modal-header">
              <h5 className="modal-title" id={`addSliderModalLabel`}>
                Add Slider Image
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
                <div className="mb-2">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="title"
                    placeholder="Type Here.."
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    value={title}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="date" className="form-label">
                    Banner Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="banner_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                  <div className="my-2">
                    <Cropper
                      src={image}
                      ref={cropperRef}
                      aspectRatio={16 / 9}
                      guides={true}
                      crop={handleCrop}
                    />
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
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    />
                    Please Wait..
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderImages;
