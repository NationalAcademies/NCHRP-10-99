import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import RinkerLogo from "../images/rinker_logo.png";
import KansasLogo from "../images/kansas_logo.png";
import NCHRPLogo from "../images/nchrp_logo.png";
import Link from '@material-ui/core/Link';
import axios from 'axios';
import { useFilePicker } from 'use-file-picker';
import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

function Heading({showSection, setShowSection, showHeading, setShowHeading, setShowResults, heading, setHeading, surveyId,
									setSurveyId, answers, setAnswers, setShowLoading, setq1Results, setq2Results, setq3Results, setq4Results,
									setCustomQuestions, customQuestions, setCustomTools, setCustomPersons}){
	const styleObj = {
	  textAlign: "left",
	  padding: "20px"
	};

	const questionObj = {
	  textAlign: "left",
	  padding: "10px"
	};
	const questionNumberObj = {
		marginLeft: "30px"
	}
	const centerObj = {
	  marginTop: "30px",
	  marginBottom: "30px",
	  alignItems: 'center',
	  justifyContent: 'center',
	};
	const logoObj = {
	  marginTop: "30px",
	  // alignItems: 'center',
	  // justifyContent: 'center',
	  maxWidth: "200px",
	  maxHeight: "200px",
	  width: "auto",
	  height: "auto",
	  marginLeft: "10px",
	  marginRight: "10px",
	  // height: "300px",
	  // width: "300px",
	};
	const logoBlockObj = {
		marginTop: "30px",
	  alignItems: 'center',
	  justifyContent: 'center',
	  maxWidth: "200px",
	  width: "auto",
	  height: "auto",
	  marginLeft: "10px",
	  marginRight: "10px",
	  marginBottom: "50px"
	  // transform: "translate(0,-50px)"
	}
	// const centerObj = {
	//   marginTop: "50px",
	//   marginBottom: "50px",
	//   alignItems: 'center',
	//   justifyContent: 'center',
	// };
	const textFieldObj ={
		marginRight: "50px",
		marginLeft: "50px",
		marginBottom: "10px"
	}
	const buttonStyle = {
			marginTop: "5px",
	    marginBottom: "5px"
	    // marginRight: "50px",
	    // marginLeft: "10px"
	 };

 	const bottomButtonStyle = {
 		marginTop: "20px",
    marginBottom: "20px",
    // marginRight: "50px",
    // marginLeft: "10px"
 };
 const [importedCustomFile, setImportedCustomFile] = useState(false);
 const [crpQuestions, setCrpQuestions] = useState("");
 const [crpTools, setCrpTools] = useState("");
 const [crpPersons, setCrpPersons] = useState("");
 // var importedCustomFile = false;
 var crp_questions = "";
 var crp_tools = "";
 var crp_persons = "";
 const [openFileSelector, { filesContent, loading, errors, plainFiles }] = useFilePicker({
    multiple: true,
    readAs: 'Text', // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
    // accept: '.ics,.pdf',
    accept: ['.json', '.js'],
    limitFilesConfig: { min: 1, max: 3 },
    // minFileSize: 1, // in megabytes
    // maxFileSize: 1,
    // maxImageHeight: 1024, // in pixels
    // minImageHeight: 1024,
    // maxImageWidth: 768,
    // minImageWidth: 768
    // readFilesContent: false, // ignores file content
  });
 // useEffect(()=>{
 //    if (!!filesContent.length) {
	//  	crp_questions = JSON.parse(filesContent[0].content).questions;
	//  	// axios.get("https://ssanywfvja.execute-api.us-east-2.amazonaws.com/crp_responses/1").then(res => {
	//  	// 	setCustomQuestions(crp_questions);
	//  	// 	importedCustomFile = true;
	//  	// })
	//  	console.log(crp_questions)
	//  	setCrpQuestions(crp_questions)
	//  	console.log(crpQuestions)
	//  	setImportedCustomFile(true)
	//  }
 //  },[crp_questions])
	 if (!!filesContent.length && !importedCustomFile) {
	 	const crpCustomItems = JSON.parse(filesContent[0].content);
	 	crp_questions = crpCustomItems.questions;
	 	crp_tools = crpCustomItems.tools;
	 	crp_persons = crpCustomItems.persons;
	 	
	 	console.log(crp_questions)
	 	console.log(crp_tools)
	 	setCrpQuestions(crp_questions);
	 	setCrpTools(crp_tools);
	 	setCrpPersons(crp_persons);
	 	axios.get("./index.json").then(res => {
	 		setCustomQuestions(crp_questions);
	 		setCustomTools(crp_tools);
		    setCustomPersons(crp_persons);
	 		// console.log("setCustomQuestions")
	 		// importedCustomFile = true;
	 	}).catch(function (error) {
		    // handle error
		    console.log(error);
		    setCustomQuestions(crp_questions);
		    setCustomTools(crp_tools);
		    setCustomPersons(crp_persons);
	 			console.log("setCustomQuestions")
		  });
	 	// setCustomQuestions(crp_questions)
	 	console.log(crp_questions)
	 	setImportedCustomFile(true);
	 }
  if (errors.length) {
    return (
      <div>
        <button onClick={() => openFileSelector()}>Something went wrong, retry! </button>
        {errors[0].fileSizeTooSmall && 'File size is too small!'}
        {errors[0].fileSizeToolarge && 'File size is too large!'}
        {errors[0].readerError && 'Problem occured while reading file!'}
        {errors[0].maxLimitExceeded && 'Too many files'}
        {errors[0].minLimitNotReached && 'Not enought files'}
      </div>
    );
  }

	// const [answers, setAnswers] = useGlobalState("answers");

	// let sectionAnswers = new Array(numberOfQuestions).fill([]);

  const updateState = (index, newValue, questionNumber) => {
  //   let newSectionAnswers = [...sectionAnswers];
  //   let newAnswers =[...answers];
  //   // console.log(newSectionAnswers)
  //   if (typeof(newValue) === 'number'){
  //     newSectionAnswers[index] = [newValue];
  //     newAnswers[questionNumber-1] = [newValue];
  //   }
  //   else{
  //     newSectionAnswers[index] = newValue;
  //     newAnswers[questionNumber-1] = newValue;
  //   }

  //   // console.log(newSectionAnswers);
  //   // console.log(newAnswers);
		// setSectionAnswers(newSectionAnswers);
		// setAnswers(newAnswers);
		// setAnswers(answers => answers[questionNumber-1] = newAnswers[index])
		// console.log(answers)
		// setSectionAnswers(sectionAnswers => sectionAnswers[index])
    // setAnswers(newAnswers)
    // section_answers.push(newValue);
    // setSumOfSliders(newSliders.reduce(sum))
  };

  const handleButton = (index, event, newValue, questionNumber) => {
    updateState(index, newValue, questionNumber)
  };

  // const verifyNumber = (selection) => {
  // 	// console.log(typeof(selection) === 'number')
  //   return typeof(selection) === 'number';
  // };
  const verifyAnswer = (answer) => {
  	return answer.length > 0;
  };

  const loadCustomCrp = (event) => {
  	setImportedCustomFile(false)
  	console.log(importedCustomFile)
  	openFileSelector();
  	console.log(crp_questions)
  	// setCustomQuestions(crp_questions)
  	// console.log(customQuestions)
  	// setCustomTools(crp_tools)

  }

  const loadSavedResponse = (event) => {
    // console.log(sectionAnswers);
    let peopleToAdd = new Set();
    // if (sectionAnswers.every(verifyAnswer)){
    // 	// let newAnswers = [...answers];
    // 	// console.log(newAnswers)
    if (surveyId && surveyId != "") {
    	axios.get("https://ssanywfvja.execute-api.us-east-2.amazonaws.com/crp_responses/"+surveyId)
      .then(res => {
      	const answers = res.data.Item.response;
      	const title = res.data.Item.title;
      	// console.log(answers)
      	setAnswers(answers);
      	setHeading(title);
      	let newShowSection = showSection;
      	setShowSection(newShowSection);
	   		setShowHeading(false);
	   		setShowResults(false);
	    	window.scrollTo(0, 0);
      }).catch(function (error) {
		    // handle error
		    console.log(error);
		    alert('A saved response with this Meeting Room Number or Survey ID does not exist.');
		  });
    }
    else {
    	alert('Please enter a valid Meeting Room Number or Survey ID.');
    }
  }

  const loadSavedOutput = (event) => {
    // console.log(sectionAnswers);
    let peopleToAdd = new Set();
    // if (sectionAnswers.every(verifyAnswer)){
    // 	// let newAnswers = [...answers];
    // 	// console.log(newAnswers)
    if (surveyId && surveyId != "") {
    	axios.get("https://ssanywfvja.execute-api.us-east-2.amazonaws.com/crp_results/"+surveyId)
      .then(res => {
      	const output = res.data.Item.result;
      	const title = res.data.Item.title;
      	console.log(output)
      	setq1Results(output.q1);
      	setq2Results(output.q2);
      	setq3Results(output.q3);
      	setq4Results(output.q4);
      	setHeading(title);
      	setShowHeading(false);
	   		setShowLoading(true);
	    	window.scrollTo(0, 0);
	    	setTimeout(() => {
		      setShowResults(true);
		      setShowLoading(false);
		    }, 3000);
      }).catch(function (error) {
		    // handle error
		    console.log(error);
		    alert('A saved result with this Meeting Room Number or Survey ID does not exist.');
		  });
    	// let newShowSection = showSection;
   		// newShowSection[0] = true;
   		// setShowSection(newShowSection);

    }
    else {
    	alert('Please enter a valid Meeting Room Number or Survey ID.');
    }
  }

  const pushHeading = (event) => {
    // console.log(sectionAnswers);
    let peopleToAdd = new Set();
    // if (sectionAnswers.every(verifyAnswer)){
    // 	// let newAnswers = [...answers];
    // 	// console.log(newAnswers)
    if (heading) {
    	let newShowSection = showSection;
   		newShowSection[0] = true;
   		setHeading(heading.trim())
   		setShowSection(newShowSection);
   		setShowHeading(false);
    	window.scrollTo(0, 0);
    }

    // 	if (sectionIndex + 1 < showSection.length){
	   //  	newShowSection[sectionIndex+1] = true;
	   //  }

	   //  // newAnswers.push(...sectionAnswers)
	   //  // setSectionAnswers(newAnswers)
	   //  // console.log(sectionAnswers)
	   //  // setAnswers(newAnswers);
	   //  // console.log(answers)
	   //  // setAnswers(answers => answers.push(sectionAnswers))
    // 	// console.log(answers)
    // 	setAnswers([...answers]);

	   //  // console.log(showSection)
    //   }
    // else {
    //   alert('Please answer all questions.')
    // }
  }

  const handleChange = (event) => {
  	setHeading(event.target.value)
  	// let newShowSection = [...showSection];
  	// newShowSection[sectionIndex] = false;
  	// if (sectionIndex > 0){
   //  	newShowSection[sectionIndex-1] = true;
   //  }
   //  setShowSection(newShowSection);
   //  window.scrollTo(0, 0);
  }

  const handleIdChange = (event) => {
  	setSurveyId(event.target.value)
  	// let newShowSection = [...showSection];
  	// newShowSection[sectionIndex] = false;
  	// if (sectionIndex > 0){
   //  	newShowSection[sectionIndex-1] = true;
   //  }
   //  setShowSection(newShowSection);
   //  window.scrollTo(0, 0);
  }

  return (
    <div className="Heading">
    { showHeading === true &&
    	<div>
    	  <div >
    		<Grid container spacing={1} direction="row" justify="center" alignItems="center" style={{backgroundColor: '#00529b'}}>
    			<Grid item xs={3}>
	    			<img style={logoObj} src={RinkerLogo} />
	    		</Grid>
	    		<Grid item xs={3}>
	    			<img style={logoObj} src={NCHRPLogo} />
	    		</Grid>
	    		<Grid item xs={3}>
	    			<img style={logoObj} src={KansasLogo} />
	    		</Grid>
    		</Grid>
    		</div>
	    	<Typography variant="h2" style={centerObj}>
		      NCHRP 10-99
		    </Typography>
		    <Typography variant="h2" style={centerObj}>
		      Decision-making Matrix for the Constructability Review Process
		    </Typography>
		    <Typography variant="h4" style={centerObj}>
		      Project Description:
		    </Typography>
		    <div style={textFieldObj}>
			    <TextField
			    	id="projectDescription"
			    	placeholder="Please enter the Project Description"
			    	multiline
			    	rows="2"
			    	rowsMax="2"
			    	fullWidth
			    	variant="outlined"
	          inputProps={{
						  style: {fontSize: 30, lineHeight: 1, textAlign: "center"} 
						}}
						value={heading}
						onChange={handleChange}
			    />
		    </div>
		    {/*<Typography variant="h4" style={centerObj}>
		      Meeting Room Number / Survey ID:
		    </Typography>
		    <div style={textFieldObj}>
			    <TextField
			    	id="surveyId"
			    	variant="outlined"
	          inputProps={{
						  style: {fontSize: 30, lineHeight: 1, textAlign: "center"} 
						}}
						value={surveyId}
						onChange={handleIdChange}
			    />
		    </div>*/}
		    <div>
		    <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
		    	<Grid item>
			      <Button variant="contained" onClick={loadCustomCrp} style={bottomButtonStyle}>
				    	Load Custom CRP File
				    </Button>
			    </Grid>
		      {/*<Grid item>
			      <Button variant="contained" onClick={loadSavedResponse} style={bottomButtonStyle}>
				    	Load Saved Response
				    </Button>
			    </Grid>
			    <Grid item>
			      <Button variant="contained" onClick={loadSavedOutput} style={bottomButtonStyle}>
				    	Load Saved Output
				    </Button>
			    </Grid>*/}
			    <Grid item>
				    <Button variant="contained" onClick={pushHeading} style={bottomButtonStyle}>
				    	Continue
				   	</Button>
			   	</Grid>
			  </Grid>
			  <br />
		      Number of selected files:
		      {plainFiles.length}
		      <br />
		      <Link href={"objectives.pdf"} target="_blank">
		        More Information About The Model
		      </Link>
		    </div>
	    </div>
	  }
    </div>

  );
}

export {Heading};