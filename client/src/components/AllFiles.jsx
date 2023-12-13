import { useFetch } from "../hooks/useFetch";
import FileTable from "./FileTable";

function AllFiles() {
  const { data } = useFetch("/pdf/all");

  return (
    <div style={{ marginTop: "5rem" }}>
      <FileTable files={data?.pdfFiles}></FileTable>
    </div>
  );
}

export default AllFiles;
