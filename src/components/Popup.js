import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function Popup({pdfFile, pageNumber}){
	const styleObj = {
	  textAlign: "left",
	  padding: "20px"
	};
	return (
	<DialogContent>
	    <Document
	    file={pdfFile}
	    externalLinkTarget="_blank"
	    style={styleObj}
	    >
	    <Page pageNumber={pageNumber} scale="1.2" />
	    </Document>
    </DialogContent>
    );
}

export {Popup};