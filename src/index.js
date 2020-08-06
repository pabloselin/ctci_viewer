import { render, useState, useMemo } from "@wordpress/element";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = (props) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const pdfFile = useMemo(() => ({ url: props.pdfurl }), []);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}

	return (
		<>
			<Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
				<Page scale={2} pageNumber={pageNumber} />
			</Document>
			<div>
				<p>
					Page {pageNumber || (numPages ? 1 : "--")} of{" "}
					{numPages || "--"}
				</p>
				<button
					type="button"
					disabled={pageNumber <= 1}
					onClick={previousPage}
				>
					Previous
				</button>
				<button
					type="button"
					disabled={pageNumber >= numPages}
					onClick={nextPage}
				>
					Next
				</button>
			</div>
		</>
	);
};

const App = () => {
	return <Viewer pdfurl={window.docinfo.pdfurl} />;
};

render(<App />, document.getElementById("ctci_viewer"));
