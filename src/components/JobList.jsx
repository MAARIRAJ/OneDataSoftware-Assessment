import React, { useEffect, useState } from "react";
import jobsData from "../data/jobs.json";
import { Modal, Button, Badge, Form, InputGroup } from "react-bootstrap";
import ApplicationForm from "./ApplicationForm";
import ErrorBoundary from "./ErrorBoundary";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import { useSelector } from "react-redux";


export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [showAppModal, setShowAppModal] = useState(false);

  
  const applications = useSelector((state) => state.jobs.applications);

  const { isLoggedIn } = useSelector((state) => state.user);

  const jobsPerPage = 5;

  useEffect(() => {
    setJobs(jobsData);
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
  );

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);

  const handleModal = (job) => setSelectedJob(job);

 
  const handleJobApplied = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, applied: true } : job
      )
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Job Listings</h3>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by title, company, or skill"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {currentJobs.map((job) => (
        <div key={job.id} className="border p-3 mb-3 rounded">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img src={job.logo} alt="logo" width="50" className="me-3" />
              <span
                className="fw-bold text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => handleModal(job)}
              >
                {job.title}
              </span>
              <div className="text-muted">{job.company}</div>
              <div>
                {job.skills.map((skill, idx) => (
                  <Badge key={idx} bg="info" className="me-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {job.applied ? (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  const app = applications.find((a) => a.jobId === job.id);
                  setApplicationData(app);
                  setShowAppModal(true);
                }}
              >
                Applied
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={() => {
                  if (!isLoggedIn) {
                    alert("Please login to apply.");
                  } else {
                    setSelectedJobId(job.id);
                    setShowForm(true);
                  }
                }}
              >
                Apply for Job
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* /* Pagination */ }
      <div className="d-flex justify-content-between mb-3 mt-4">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={indexOfLast >= filteredJobs.length}
        >
          Next
        </Button>
      </div>

      {/* Job Details Modal */}
      <Modal show={!!selectedJob} onHide={() => setSelectedJob(null)}>
        {selectedJob && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedJob.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Company:</strong> {selectedJob.company}
              </p>
              <p>
                <strong>Experience Required:</strong> {selectedJob.experience}{" "}
                yrs
              </p>
              <p>
                <strong>Skills:</strong>{" "}
                {selectedJob.skills.map((s, i) => (
                  <Badge key={i} bg="secondary" className="me-1">
                    {s}
                  </Badge>
                ))}
              </p>
              <p>
                <strong>Descriptions:</strong> {selectedJob.description}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedJob(null)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Application Form Modal */}
      {showForm && (
        <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Apply for Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ErrorBoundary>
              <ApplicationForm
                jobId={selectedJobId}
                onClose={() => setShowForm(false)}
                onApplySuccess={handleJobApplied}
              />
            </ErrorBoundary>
          </Modal.Body>
        </Modal>
      )}

      {/* Application Details Modal */}
      {applicationData && (
        <ApplicationDetailsModal
          show={showAppModal}
          onHide={() => setShowAppModal(false)}
          application={applicationData}
        />
      )}
    </div>
  );
}
