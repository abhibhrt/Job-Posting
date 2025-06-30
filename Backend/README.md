/auth
  POST   /login           -- Admin login
  POST   /change-password -- Admin changes password

/jobs
  POST   /                -- Admin creates a job
  GET    /                -- Get all jobs
  GET    /:id             -- Get single job details
  DELETE /:id             -- Admin deletes job
  PUT    /:id             -- Admin edits job

/candidates
  POST   /apply/:jobId    -- Candidate applies for a job
  GET    /job/:jobId      -- Admin gets candidates for a job

/reviews
  POST   /                -- Candidate posts review
  GET    /                -- Get all reviews
