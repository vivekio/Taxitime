import React, { useEffect, useState } from "react";
import MainCard from "../../layout/PartnerDashboardCard.js";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import { FaFileAlt, FaUpload } from "react-icons/fa";
import "./PartnerAcceptRides.css";
import { ApiUser } from "../../ApiUser.js";
import { toast, ToastContainer } from "react-toastify";

const PartnerDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaddocument, setUploadDocument] = useState([]);
  console.log("this is upload document", uploaddocument);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  console.log("this is selected document", selectedDocument);

  useEffect(() => {
    getDocuments();
    providergetdocument();
  }, []);

  const getDocuments = async () => {
    try {
      const response = await fetch(`${ApiUser}/getdocuments`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      // console.log(data)
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      setUploadStatus("Failed to load documents");
    }
  };
  const providergetdocument = async () => {
    try {
      const response = await fetch(`${ApiUser}/providergetdocument`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log(data);
      setUploadDocument(data.result);
      // setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      setUploadStatus("Failed to load documents");
    }
  };
  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setSelectedFile(null);
    setUploadStatus("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) {
        setSelectedFile(file);
        setUploadStatus("");
      } else {
        setUploadStatus("File size exceeds 5MB limit");
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedDocument) {
      setUploadStatus("Please select a document and file");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile); // the actual file
    formData.append("documentID", selectedDocument.id); // any metadata

    try {
      const response = await fetch(`${ApiUser}/PartnerDocument`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok)
        throw new Error(`Upload failed! Status: ${response.status}`);

      toast.success("Document uploaded successfully");
      setTimeout(() => {
        window.location.reload();
        setSelectedFile(null);
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Failed to upload document");
    }
  };

  const uploadedDoc =
    Array.isArray(uploaddocument) && selectedDocument?.id
      ? uploaddocument.find(
          (doc) => Number(doc.document_id) === Number(selectedDocument.id)
        )
      : null;
  return (
    <MainCard>
      <ToastContainer />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="text-start mb-4">
              <h1 className="mb-2">
                <span style={{ color: "red" }}>D</span>ocument{" "}
                <span style={{ color: "red" }}>V</span>erification
              </h1>
              <p className="text-muted">
                Upload your documents for verification to complete your driver
                profile
              </p>
            </div>

            <Row>
              <Col md={5} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h3 className="mb-3">
                      <span style={{ color: "red" }}>R</span>equired{" "}
                      <span style={{ color: "red" }}>D</span>ocuments
                    </h3>
                    <p className="text-muted small mb-4">
                      All documents must be verified before you can start
                      driving
                    </p>
                    <div className="document-list">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className={`document-item d-flex align-items-center mb-3 ${
                            selectedDocument?.id === doc.id ? "bg-light" : ""
                          }`}
                          onClick={() => handleDocumentSelect(doc)}
                          style={{
                            cursor: "pointer",
                            borderRadius: "5px",
                            padding: "10px",
                            border: "1px solid #ddd",
                          }}
                        >
                          <div className="icon-wrapper me-3">
                            <FaFileAlt />
                          </div>
                          <div>
                            <span className="d-block">{doc.name}</span>
                            <small className="text-muted">{doc.status}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={7} className="mb-4">
                <Card className="h-100 shadow-sm">
                  {/* <Card.Body>
                    {selectedDocument ? (
                     
                      <>
                       {uploaddocument && uploaddocument.map((doc) => {
                      if (doc.document_id === selectedDocument.id) {
                        return ( <div>this is uploded </div>)}
                      
                        <h3 className="mb-3">{selectedDocument.name}</h3>
                        <p className="text-muted small mb-4">
                          Please upload a clear, readable copy of your document
                        </p>
                        <div className="upload-area p-4 mb-3 border rounded">
                          <div className="row align-items-start">
                            <div className="col-md-6 text-center text-md-start">
                              {!selectedFile ? (
                                <>
                                  <div className="upload-icon mb-3">
                                    <FaUpload size={30} className="text-secondary" />
                                  </div>
                                  <h5>Upload your {selectedDocument.name}</h5>
                                  <p className="text-muted small">
                                    Drag and drop your file here, or click to browse
                                  </p>
                                  <Form.Group id="formFile1" className="mt-3">
                                    <Form.Control
                                      type="file"
                                      className="d-none"
                                      id="formFile"
                                      onChange={handleFileChange}
                                      accept=".jpg,.jpeg,.png,.pdf"
                                    />
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() => document.getElementById("formFile").click()}
                                    >
                                      Select File
                                    </Button>
                                  </Form.Group>
                                </>
                              ) : (
                                <Form.Group id="formFileHidden1" className="d-none">
                                  <Form.Control
                                    type="file"
                                    id="formFileHidden"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf"
                                  />
                                </Form.Group>
                              )}
                              <div className="mt-3 small text-muted">
                                Supported formats: JPEG, PNG, PDF (Max 5MB)
                              </div>
                            </div>

                            {selectedFile && (
                              <div className="col-md-6 text-center mt-4 mt-md-0">
                                <h6 className="mb-3">Preview:</h6>
                                {selectedFile.type.startsWith("image/") ? (
                                  <Image
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Preview"
                                    className="mb-3"
                                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                                    fluid
                                  />
                                ) : (
                                  <p className="mb-3">{selectedFile.name}</p>
                                )}
                                <div className="d-flex justify-content-center gap-2 mt-2">
                                  <Button
                                    variant="outline-secondary"
                                    onClick={() => document.getElementById("formFileHidden").click()}
                                  >
                                    Change File
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={handleUpload}
                                    disabled={selectedDocument.status === "ACTIVE"}
                                  >
                                    Upload
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {uploadStatus && (
                          <p className={`text-center ${uploadStatus.includes("Failed") ? "text-danger" : "text-success"}`}>
                            {uploadStatus}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">
                          Please select a document from the left panel to upload
                        </p>
                      </div>
                    )}
                    <div className="text-center">
                      <Button variant="outline-dark" className="px-4">
                        Back to Dashboard
                      </Button>
                    </div>
                  </Card.Body> */}
                  <Card.Body>
                    {selectedDocument ? (
                      <>
                        {uploadedDoc ? (
                          <>
                            <Container className="my-4">
                              <Row className="justify-content-center align-items-center">
                                <Col md={8} lg={12}>
                                  <Card className="text-center shadow-sm">
                                    <Card.Body>
                                      <h4 className="mb-3">
                                        {selectedDocument.name}
                                      </h4>
                                      <Card.Text className="mb-3">
                                        document is already uploaded.
                                      </Card.Text>

                                      <Button variant="outline-dark">
                                        {uploadedDoc.status === "ASSESSING"
                                          ? "Under Review"
                                          : "Approved"}
                                      </Button>
                                      <Button
                                        variant="success"
                                        className="mb-2 w-100 mt-3"
                                        onClick={() =>
                                          window.open(
                                            `http://localhost:8000/uploads/${uploadedDoc.url}`,
                                            "_blank"
                                          )
                                        }
                                      >
                                        View Document
                                      </Button>
                                      <Form.Group
                                        id="formFile1"
                                        className="mt-3"
                                      >
                                        <Form.Control
                                          type="file"
                                          className="d-none"
                                          id="formFile"
                                          onChange={handleFileChange}
                                          accept=".jpg,.jpeg,.png,.pdf"
                                        />
                                        <Button
                                          variant="outline-dark"
                                          onClick={() =>
                                            document
                                              .getElementById("formFile")
                                              .click()
                                          }
                                          className={uploadedDoc.status === "ACTIVE" ? "not-allowed !important" : ""}
                                          disabled={uploadedDoc.status === "ACTIVE"}
                                        >
                                          update document
                                        </Button>
                                        
                                      </Form.Group>
                                      {selectedFile && (
                                        <div className="col-md-12 align-items-center justify-content-center mt-4 ">
                                          <h6 className="mb-3">Preview</h6>
                                          {selectedFile.type.startsWith(
                                            "image/"
                                          ) ? (
                                            <Image
                                              src={URL.createObjectURL(
                                                selectedFile
                                              )}
                                              alt="Preview"
                                              className="mb-3"
                                              style={{
                                                maxWidth: "100%",
                                                maxHeight: "200px",
                                              }}
                                              fluid
                                            />
                                          ) : (
                                            <p className="mb-3">
                                              {selectedFile.name}
                                            </p>
                                          )}
                                          <div className="d-flex justify-content-center gap-2 mt-2">
                                           
                                            <Button
                                              variant="dark"
                                              onClick={handleUpload}
                                              disabled={
                                                selectedDocument.status ===
                                                "ACTIVE"
                                              }
                                            >
                                              Upload
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </Card.Body>
                                  </Card>
                                </Col>
                              </Row>
                            </Container>
                          </>
                        ) : (
                          <>
                            <h3 className="mb-3">{selectedDocument.name}</h3>
                            <p className="text-muted small mb-4">
                              Please upload a clear, readable copy of your
                              document
                            </p>

                            <div className="upload-area p-4 mb-3 border rounded">
                              <div className="row align-items-start">
                                <div className="col-md-6 text-center text-md-start">
                                  {!selectedFile ? (
                                    <>
                                      <div className="upload-icon mb-3">
                                        <FaUpload
                                          size={30}
                                          className="text-secondary"
                                        />
                                      </div>
                                      <h5>
                                        Upload your {selectedDocument.name}
                                      </h5>
                                      <p className="text-muted small">
                                        Drag and drop your file here, or click
                                        to browse
                                      </p>
                                      <Form.Group
                                        id="formFile1"
                                        className="mt-3"
                                      >
                                        <Form.Control
                                          type="file"
                                          className="d-none"
                                          id="formFile"
                                          onChange={handleFileChange}
                                          accept=".jpg,.jpeg,.png,.pdf"
                                        />
                                        <Button
                                          variant="outline-secondary"
                                          onClick={() =>
                                            document
                                              .getElementById("formFile")
                                              .click()
                                          }
                                        >
                                          Select File
                                        </Button>
                                      </Form.Group>
                                    </>
                                  ) : (
                                    <Form.Group
                                      id="formFileHidden1"
                                      className="d-none"
                                    >
                                      <Form.Control
                                        type="file"
                                        id="formFileHidden"
                                        onChange={handleFileChange}
                                        accept=".jpg,.jpeg,.png,.pdf"
                                      />
                                    </Form.Group>
                                  )}

                                  <div className="mt-3 small text-muted">
                                    Supported formats: JPEG, PNG, PDF (Max 5MB)
                                  </div>
                                </div>

                                {selectedFile && (
                                  <div className="col-md-6 text-center mt-4 mt-md-0">
                                    <h6 className="mb-3">Preview:</h6>
                                    {selectedFile.type.startsWith("image/") ? (
                                      <Image
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        className="mb-3"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "200px",
                                        }}
                                        fluid
                                      />
                                    ) : (
                                      <p className="mb-3">
                                        {selectedFile.name}
                                      </p>
                                    )}
                                    <div className="d-flex justify-content-center gap-2 mt-2">
                                      <Button
                                        variant="outline-secondary"
                                        onClick={() =>
                                          document
                                            .getElementById("formFileHidden")
                                            .click()
                                        }
                                      >
                                        Change File
                                      </Button>
                                      <Button
                                        variant="primary"
                                        onClick={handleUpload}
                                        disabled={
                                          selectedDocument.status === "ACTIVE"
                                        }
                                      >
                                        Upload
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            {uploadStatus && (
                              <p
                                className={`text-center ${
                                  uploadStatus.includes("Failed")
                                    ? "text-danger"
                                    : "text-success"
                                }`}
                              >
                                {uploadStatus}
                              </p>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">
                          Please select a document from the left panel to upload
                        </p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </MainCard>
  );
};

export default PartnerDocument;

// import React, { useEffect, useState } from "react";
// import MainCard from "../../layout/PartnerDashboardCard.js";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Image,
// } from "react-bootstrap";
// import { FaFileAlt, FaUpload } from "react-icons/fa";
// import "./PartnerAcceptRides.css";
// import { ApiUser } from "../../ApiUser.js";

// const PartnerDocument = () => {
//   const [documents, setDocuments] = useState([]);
//   const [uploadedDocs, setUploadedDocs] = useState([]);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState("");

//   useEffect(() => {
//     getDocuments();
//     getUploadedDocuments();
//   }, []);

//   const getDocuments = async () => {
//     try {
//       const response = await fetch(`${ApiUser}/getdocuments`, {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error("Failed to fetch documents");
//       const data = await response.json();
//       setDocuments(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getUploadedDocuments = async () => {
//     try {
//       const response = await fetch(`${ApiUser}/providergetdocument`, {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error("Failed to fetch uploaded documents");
//       const data = await response.json();
//       console.log(data)
//       setUploadedDocs(data.result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDocumentSelect = (doc) => {
//     setSelectedDocument(doc);
//     setSelectedFile(null);
//     setUploadStatus("");
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size <= 5 * 1024 * 1024) {
//         setSelectedFile(file);
//         setUploadStatus("");
//       } else {
//         setUploadStatus("File size exceeds 5MB");
//       }
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile || !selectedDocument) {
//       setUploadStatus("Please select both file and document");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("document", selectedFile);
//     formData.append("documentID", selectedDocument.id);

//     try {
//       const response = await fetch(`${ApiUser}/PartnerDocument`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       if (!response.ok) throw new Error("Upload failed");

//       const result = await response.json();
//       setUploadStatus("Document uploaded successfully");

//       setUploadedDocs((prev) => [
//         ...prev,
//         {
//           document_id: selectedDocument.id,
//           url: result.url,
//           status: "ASSESSING",
//         },
//       ]);

//       setSelectedFile(null);
//     } catch (error) {
//       console.error(error);
//       setUploadStatus("Failed to upload document");
//     }
//   };

//   const getUploadedInfo = (docId) => {
//     return uploadedDocs.find((doc) => doc.document_id === docId);
//   };

//   return (
//     <MainCard>
//       <Container className="py-5">
//         <Row className="justify-content-center">
//           <Col md={10} lg={8}>
//             <div className="text-start mb-4">
//               <h1 className="mb-2">
//                 <span style={{ color: "red" }}>D</span>ocument{" "}
//                 <span style={{ color: "red" }}>V</span>erification
//               </h1>
//               <p className="text-muted">
//                 Upload your documents for verification to complete your driver profile
//               </p>
//             </div>

//             <Row>
//               <Col md={5}>
//                 <Card className="shadow-sm mb-4">
//                   <Card.Body>
//                     <h3 className="mb-3">
//                       <span style={{ color: "red" }}>R</span>equired{" "}
//                       <span style={{ color: "red" }}>D</span>ocuments
//                     </h3>
//                     <div className="document-list">
//                       {documents.map((doc) => {
//                         const uploaded = getUploadedInfo(doc.id);
//                         return (
//                           <div
//                             key={doc.id}
//                             className={`document-item d-flex align-items-center mb-3 ${
//                               selectedDocument?.id === doc.id ? "bg-light" : ""
//                             }`}
//                             onClick={() => handleDocumentSelect(doc)}
//                             style={{
//                               cursor: "pointer",
//                               borderRadius: "5px",
//                               padding: "10px",
//                               border: "1px solid #ddd",
//                             }}
//                           >
//                             <div className="icon-wrapper me-3">
//                               <FaFileAlt />
//                             </div>
//                             <div>
//                               <span className="d-block">{doc.name}</span>
//                               <small className="text-muted">
//                                 {uploaded ? uploaded.status : doc.status}
//                               </small>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>

//               <Col md={7}>
//                 <Card className="shadow-sm mb-4">
//                   <Card.Body>
//                     {selectedDocument ? (
//                       <>

//                         <h4 className="mb-3">{selectedDocument.name}</h4>
//                         <p className="text-muted small mb-4">
//                           Please upload a clear and readable copy
//                         </p>

//                         <div className="upload-area p-4 mb-3 border rounded">
//                           {(() => {
//                             const uploaded = getUploadedInfo(selectedDocument.id);

//                             if (uploaded && uploaded.url) {
//                               return (
//                                 <div className="text-center">
//                                   <p className="mb-2">
//                                     Already uploaded document:
//                                   </p>
//                                   {uploaded.url.endsWith(".pdf") ? (
//                                     <a
//                                       href={uploaded.url}
//                                       target="_blank"
//                                       rel="noopener noreferrer"
//                                     >
//                                       View PDF
//                                     </a>
//                                   ) : (
//                                     <Image
//                                       src={uploaded.url}
//                                       alt="Uploaded"
//                                       fluid
//                                       style={{ maxHeight: "200px" }}
//                                     />
//                                   )}
//                                   <p className="text-muted mt-2">
//                                     Status: {uploaded.status}
//                                   </p>
//                                 </div>
//                               );
//                             }

//                             return (
//                               <>
//                                 {!selectedFile ? (
//                                   <div className="text-center">
//                                     <FaUpload size={30} className="text-secondary mb-2" />
//                                     <h6>Select File to Upload</h6>
//                                     <Form.Group>
//                                       <Form.Control
//                                         type="file"
//                                         className="d-none"
//                                         id="fileInput"
//                                         accept=".jpg,.jpeg,.png,.pdf"
//                                         onChange={handleFileChange}
//                                       />
//                                       <Button
//                                         variant="outline-secondary"
//                                         onClick={() =>
//                                           document.getElementById("fileInput").click()
//                                         }
//                                       >
//                                         Select File
//                                       </Button>
//                                     </Form.Group>
//                                     <div className="mt-2 small text-muted">
//                                       Supported: JPG, PNG, PDF (max 5MB)
//                                     </div>
//                                   </div>
//                                 ) : (
//                                   <div className="text-center">
//                                     <h6>Preview:</h6>
//                                     {selectedFile.type.startsWith("image/") ? (
//                                       <Image
//                                         src={URL.createObjectURL(selectedFile)}
//                                         alt="Preview"
//                                         style={{
//                                           maxWidth: "100%",
//                                           maxHeight: "200px",
//                                         }}
//                                         fluid
//                                       />
//                                     ) : (
//                                       <p>{selectedFile.name}</p>
//                                     )}
//                                     <div className="mt-3 d-flex justify-content-center gap-2">
//                                       <Button
//                                         variant="outline-secondary"
//                                         onClick={() =>
//                                           document.getElementById("fileInput").click()
//                                         }
//                                       >
//                                         Change File
//                                       </Button>
//                                       <Button variant="primary" onClick={handleUpload}>
//                                         Upload
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 )}
//                               </>
//                             );
//                           })()}
//                         </div>

//                         {uploadStatus && (
//                           <p
//                             className={`text-center ${
//                               uploadStatus.includes("Failed")
//                                 ? "text-danger"
//                                 : "text-success"
//                             }`}
//                           >
//                             {uploadStatus}
//                           </p>
//                         )}
//                       </>
//                     ) : (
//                       <p className="text-center py-5 text-muted">
//                         Select a document from the left panel to upload
//                       </p>
//                     )}
//                     <div className="text-center mt-4">
//                       <Button variant="outline-dark">Back to Dashboard</Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </MainCard>
//   );
// };

// export default PartnerDocument;
