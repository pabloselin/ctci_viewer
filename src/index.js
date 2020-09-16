import { render, useState, useMemo } from "@wordpress/element";
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "react-loader-spinner";
import ScrollContainer from "react-indiana-drag-scroll";
import Previous from "./icons/chevron-left.svg";
import Next from "./icons/chevron-right.svg";
import Plus from "./icons/plus.svg";
import Minus from "./icons/minus.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = (props) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const pdfFile = useMemo(() => ({ url: props.pdfurl }), []);
	const [zoom, setZoom] = useState(2);
	const minZoom = 1;
	const maxZoom = 3;

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

	const zoomIn = () => {
		if (zoom <= maxZoom) {
			setZoom(zoom + 0.5);
			console.log(zoom);
		}
	};
	const zoomOut = () => {
		if (zoom >= minZoom) {
			setZoom(zoom - 0.5);
			console.log(zoom);
		}
	};

	return (
		<>
			<div className="ctciv_controls">
				<div className="pageNav">
					Página{" "}
					<strong>{pageNumber || (numPages ? 1 : "--")}</strong> de{" "}
					<strong>{numPages || "--"}</strong>
				</div>
				<button
					type="button"
					disabled={pageNumber <= 1}
					onClick={previousPage}
				>
					<img src={Previous} alt="Anterior" />
				</button>
				<button
					type="button"
					disabled={pageNumber >= numPages}
					onClick={nextPage}
				>
					<img src={Next} alt="Siguiente" />
				</button>
				<button type="button" onClick={zoomIn}>
					<img src={Plus} alt="Zoom In" />
				</button>
				<button type="button" onClick={zoomOut}>
					<img src={Minus} alt="Zoom Out" />
				</button>
			</div>
			<ScrollContainer className="ctciv_document">
				<Document
					//className="ctciv_document"
					file={pdfFile}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={
						<div className="docloadingzone">
							<Loader
								type="Grid"
								color="#000000"
								height={100}
								width={100}
							/>
						</div>
					}
				>
					<Page
						renderTextLayer={false}
						scale={zoom}
						pageNumber={pageNumber}
						loading={
							<div className="docloadingzone">
								<Loader
									type="Grid"
									color="#000000"
									height={100}
									width={100}
								/>
							</div>
						}
					/>
				</Document>
			</ScrollContainer>
		</>
	);
};

const App = () => {
	return <Viewer pdfurl={window.docinfo.pdfurl} />;
};

render(<App />, document.getElementById("ctci_viewer"));
