const Job = require("../models/Job");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllJobs = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const jobs = await Job.find({ createdBy: userId }).select("company position");

  res.json({ msg: "success", total: jobs.length, jobs });
};

const createJob = async (req, res) => {
  const {
    user,
    body: { company, position },
  } = req;

  if (!company || !position) {
    throw new BadRequestError("Kindly provide company and position");
  }

  const job = await Job.create({ company, position, createdBy: user.userId });

  res.status(201).json({ msg: "success", job });
};

const updateJob = async (req, res) => {
  res.json({ msg: "working!!!" });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  let job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new UnauthenticatedError("No job found");
  }

  res.status(204).json();
};

const getSingleJob = async (req, res) => {
  res.json({ msg: "working!!!" });
};

module.exports = { getAllJobs, getSingleJob, deleteJob, updateJob, createJob };
