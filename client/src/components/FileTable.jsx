/* eslint-disable react/prop-types */

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { dateFormat } from "../functions/dateFormat";

function FileTable({ files }) {
  return (
    <TableContainer
      sx={{ backgroundColor: "#132043" }}
      component={Paper}
      elevation={2}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files?.map((file) => (
            <TableRow key={file._id}>
              <TableCell component="th" scope="row">
                {file.name}
              </TableCell>
              <TableCell>{dateFormat(file?.createdAt)}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/${file._id}/view`}
                  variant="outlined"
                  sx={{ marginRight: "1rem" }}>
                  View
                </Button>
                <Button
                  component={Link}
                  to={`/${file._id}/extract`}
                  variant="outlined">
                  Extract
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FileTable;
