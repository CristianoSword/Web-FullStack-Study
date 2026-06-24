const allowedStatus = ["todo", "doing", "done"];

function validateTaskPayload(req, res, next) {
  const { title, status, owner } = req.body;

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(422).json({ message: "Title must have at least 3 characters" });
  }

  if (!owner || typeof owner !== "string" || owner.trim().length < 2) {
    return res.status(422).json({ message: "Owner must have at least 2 characters" });
  }

  if (!allowedStatus.includes(status)) {
    return res.status(422).json({ message: "Status must be todo, doing or done" });
  }

  return next();
}

function validateTaskId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Task id must be a positive integer" });
  }

  req.taskId = id;
  return next();
}

module.exports = {
  validateTaskPayload,
  validateTaskId,
};
