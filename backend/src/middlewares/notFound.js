import {StatusCodes} from "http-status-codes"

export const notFound = (req, res) => res.status(StatusCodes.NOT_FOUND).send("Route does not exists");