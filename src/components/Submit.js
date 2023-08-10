import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

function Submit({answers, questions, showSection,
	q1Results, setq1Results,
	q2Results, setq2Results,
	q3Results, setq3Results, 
	q4Results, setq4Results,
	showResults, setShowLoading,
	setShowResults, setShowSection,
  showHeading, surveyId,
  heading, customQuestions, customTools, customPersons,
  toolsToUse, peopleToInvite}) {

	const centerObj = {
	  paddingTop: "50px",
	  paddingBottom: "50px",
	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: '#00529b',
	  color: 'white'
	};
	const bottomButtonStyle = {
 		marginTop: "20px",
    marginBottom: "20px",
    marginRight: "50px",
    // marginLeft: "10px"
 };
	const styleObj = {
	  textAlign: "left",
	  paddingLeft: "20px",
	  paddingTop: "5px",
	  paddingBottom: "5px",
	  paddingRight: "20px",
	};
	const questionNumberObj = {
		marginLeft: "30px"
	};
	const answerObj = {
	  textAlign: "left",
	  paddingLeft: "10px"
	};

	const criticalQuestions = [4,5,6,7,8,9,14,15,20,24];

	const q1TotalWeight = () => {
    return questions.map((question, i) => (question.q1Weight))
             .reduce((a,b) => a + (b || 0), 0)
  };
  const q4TotalWeight = () => {
    return questions.map((question, i) => (question.q4Weight))
             .reduce((a,b) => a + (b || 0), 0)
  };
  // var toolsToUse, peopleToInvite;

  if (customQuestions !== "" && customQuestions != questions) {
  		questions = customQuestions
  	}
  // console.log(customTools)
  if (customTools && customTools !== null){
  	toolsToUse = customTools;
  	// console.log("customTools")
  }
  // else {
  // 	toolsToUse = {
		// 	1: "Assets Information Systems",
		// 	2: "Utility Mapping",
		// 	3: "ROW Mapping",
		// 	4: "Information Management System",
		// 	5: "GIS-based Tools",
		// 	6: "Interactive Traffic Micro-simulation",
		// 	7: "Site Mapping (LIDAR, GPS, RTS, RTN, or UAVs)",
		// 	8: "Inventory Mapping (GIS Databases, GPS, LIDAR, Aerial Imagery)",
		// 	9: "Traffic Management Simulation",
		// 	10: "Web-based Design Coordination",
		// 	11: "Asset Management Tools"
		// }
  // }
  if (customPersons && customPersons !== null){
  	peopleToInvite = customPersons;
  	// console.log("customPersons")
  }
  // else {
  // 	peopleToInvite = {
	 //  1: "Representative from the District Bituminous Office or a concrete expert, as applicable",
	 //  2: "Representative from the District Structures Office",
	 //  3: "Representative from the District Materials Lab with expertise in concrete",
	 //  4: "Representative from the District Traffic Operations Office",
	 //  5: "Representative from our Project Delivery Group",
	 //  6: "Representative from local MPO",
	 //  7: "Representative with decision-making authority from municipality and county that encompasses the project",
	 //  8: "Representative from municipality and county that encompasses the project",
	 //  9: "Representative from In-house District Environmental Compliance Office that has decision-making authority",
	 //  10: "Outsourced experts in the area of interest, if necessary",
	 //  11: "Utility Companies with potential conflicts",
	 //  12: "Leader of In-house Utility Group",
	 //  13: "Resident (Area) Construction Engineer (in person, not delegate)",
	 //  14: "Representative from In-house Utility Group",
	 //  15: "Leader of In-house ROW Group",
	 //  16: "Representative from In-house ROW Group",
	 //  17: "District Maintenance Engineer (in person, not delegate)",
	 //  18: "Subject matter expert in the area of concern",
	 //  19: "Representative from District Maintenance Office",
	 //  20: "Subject matter expert in whatever is causing the lack of space",
	 //  21: "Subject matter expert in new or unfamiliar work type or technology",
	 //  22: "District Geotechnical Engineer (in person, not delegate)",
	 //  23: "Consultant subject matter experts as needed",
	 //  24: "Representative from the District Materials office with knowledge of Geotechnical matters",
	 //  25: "Representative from In-house Railroad unit",
	 //  26: "Young engineers needing experience in constructability, as desired or needed",
	 //  27: "Representatives from In-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is likely",
	 //  28: "Consultant that can help with a particular agency, as needed",
	 //  29: "Representatives from In-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is possible",
	 //  30: "Representatives from the State Emergency Management Office",
	 //  31: "Representatives from affected Emergency Management Organizations",
	 //  32: "Representatives from affected Hospitals",
	 //  33: "Representatives from affected Independent Emergency Rooms",
	 //  34: "Representative from any public school district that currently runs a bus or busses through the proposed project sight",
	 //  35: "Representative from any private school that runs a bus or busses through the proposed project sight",
	 //  36: "Representative from In-house Public Relations unit, or consultant Public Relations firm",
	 //  37: "Representative from the Location Studies unit",
	 //  38: "A consultant that can do a 404 Review",
	 //  39: "Person with expertise in MOT",
	 //  40: "A project scheduler knowledgeable about work sequencing."
		// } 
  // }
	const q1Decision = (q1Score, answers) => {
		if (typeof(q1Score) === 'number') {
			if (q1Score >= 1.0 && q1Score < 1.5) {
				for (var question_index = 0; question_index < answers.length; question_index ++) {
					if (criticalQuestions.includes(question_index + 1) && answers[question_index][0] == 5) {
					  return "It is recommended that this project receive an informal Constructability Review Process."
				  }
				  if (question_index + 1 == 15 && answers[question_index][0] == 3) {
					  return "It is recommended that this project receive an informal Constructability Review Process."
				  }
				}
				return "It is recommended that this project receive no Constructability Review Process.";
			}
			if (q1Score >= 1.5 && q1Score < 2.0) return "It is recommended that this project receive an informal Constructability Review Process.";
		  if (q1Score >= 2.0 && q1Score < 3.0) return "It is recommended that this project receive a semi-formal Constructability Review Process.";
			if (q1Score >= 3.0 && q1Score <= 5.0) return "It is recommended that this project receive a formal Constructability Review Process.";
			if (q1Score < 1.5) {
					
				}
		}
		return null;
	};

	const q4Decision = (q1Score, q4Score, answers) => {
		console.log(q1Score, q4Score)
		if (typeof(q1Score) === 'number' && typeof(q4Score) === 'number') {
			if (q1Score < 1.5) {
				for (var question_index = 0; question_index < answers.length; question_index ++) {
					if (criticalQuestions.includes(question_index + 1) && answers[question_index][0] == 5) {
					  return "Commence the Constructability Review Process for this project at 30% Plans Review; meet at 60%, 90% and 100% Plans Reviews."
				  }
				  if (question_index + 1 == 15 && answers[question_index][0] == 3) {
					  return "Commence the Constructability Review Process for this project at 30% Plans Review; meet at 60%, 90% and 100% Plans Reviews."
				  }
				}
				return "N/A";
			};
			if (q1Score >= 1.5 && q1Score < 2.0) {
				if (q4Score >= 1.0 && q4Score < 5.0) return "Commence the Constructability Review Process for this project at 30% Plans Review; meet at 60%, 90% and 100% Plans Reviews.";
			}
			if (q1Score >= 2.0 && q1Score < 3.0) {
				if (q4Score >= 1.0 && q4Score < 2.8) return "Commence the Constructability Review Process for this project at 30% Plans Review; meet at 60%, 90% and 100% Plans Reviews.";
				if (q4Score > 2.8 && q4Score <= 5.0) return "Commence the Constructability Review Process for this project at conclusion of Planning Phase; meet monthly.";
			}
			if (q1Score >= 3.0 && q1Score <= 5.0) {
				if (q4Score >= 1.0 && q4Score < 3.1) return "Commence the Constructability Review Process for this project at conclusion of Planning Phase; meet monthly.";
				if (q4Score >= 3.1 && q4Score < 3.4) return "Commence the Constructability Review Process for this project with NEPA and Environmental Permitting Process; meet monthly.";
				if (q4Score >= 3.4 && q4Score < 3.9) return "Commence the Constructability Review Process for this project at project conception; meet bi-weekly.";
				if (q4Score >= 3.9 && q4Score <= 5.0) return "Commence the Constructability Review Process for this project at project conception; meet weekly.";
			}
		}
		return null;
	};

	const updateResults = (newq1Results, newTools, newPeople, newq4Results) => {
		let newq2Results = [...q2Results];
    let newq3Results = [...q3Results];
    // console.log(newResults);
    newq2Results.push(...newTools);
    newq3Results.push(...newPeople);
    // console.log(newResults);
    setq1Results(newq1Results);
    setq2Results(newq2Results);
    setq3Results(newq3Results);
    setq4Results(newq4Results);
    const results = {"q1":newq1Results,"q2":newq2Results,"q3":newq3Results,"q4":newq4Results};
    console.log(results)
   //  axios.put("https://ssanywfvja.execute-api.us-east-2.amazonaws.com/crp_results", {
  	// 	id: surveyId,
  	// 	title: heading,
  	// 	result: results
  	// }).then(function (response) {

  	// }).catch(function (error) {
  	// 	console.log(error)
  	// });;
  };

	const verifyNumber = (selection) => {
    return typeof(selection) === 'number';
  };
  const verifyAnswer = (answer) => {
    if (answer){
      return answer.every(verifyNumber);
    }
    else{
      return false;
    }
  };

  const backToStart = (event) => {
  	let newShowSection = [...showSection];
  	newShowSection[0] = true;
  	setShowSection(newShowSection);
  	window.scrollTo(0, 0);
  };

	const analyzeResults = (event) => {
	  // console.log(answers);
	  console.log(peopleToInvite)
	  console.log(toolsToUse)
	  let q1Score = 0.0;
	  let peopleToAdd = new Set();
	  let toolsToAdd = new Set();
	  let q4Score = 0.0;
	  const q1Total = q1TotalWeight();
	  const q4Total = q4TotalWeight();
	  if (answers.every(verifyAnswer)){
	  	console.log(answers)
	    answers.forEach((answer, question_index) => {
	      // console.log((questions[question_index].suggestions)[answer])
	      answer.forEach((selection, selection_index) => {
	      	// assume only single-choice questions for q1 and q4
	      	const q1QuestionWeight = questions[question_index].q1Weight && 
	      													 (questions[question_index].q1Weight / q1Total).toFixed(4);
	      	// q1QuestionWeight && console.log(q1QuestionWeight)
	      	if (q1QuestionWeight) {
	      		const q1CustomValue = (questions[question_index].suggestions)[selection] && 
	        												(questions[question_index].suggestions)[selection].q1;
	        	if (q1CustomValue) {
	        		// console.log("Custom Value: " + q1CustomValue)
	        		q1Score += q1QuestionWeight * q1CustomValue;
	        	}
	        	else {
	        		q1Score += q1QuestionWeight * parseInt(selection);
	        	}
	        	// console.log(q1Score)
	      	}

	      	const q4QuestionWeight = questions[question_index].q4Weight && 
	      													 (questions[question_index].q4Weight / q4Total).toFixed(4);
	      	// q4QuestionWeight && console.log(q4QuestionWeight)
	      	if (q4QuestionWeight) {
	      		const q4CustomValue = (questions[question_index].suggestions)[selection] && 
	        												(questions[question_index].suggestions)[selection].q4;
	        	if (q4CustomValue) {
	        		// console.log("Custom Value: " + q4CustomValue)
	        		q4Score += q4QuestionWeight * q4CustomValue;
	        	}
	        	else {
	        		q4Score += q4QuestionWeight * parseInt(selection);
	        	}
	        	// console.log(q4Score)
	      	}
	      	// console.log((questions[question_index].suggestions)[selection]);	        

	        const toolsCodes = (questions[question_index].suggestions)[selection] && 
	        										(questions[question_index].suggestions)[selection].q2;
	        if (toolsCodes) {
	          toolsCodes.forEach((code, i) => {
	            toolsToAdd.add(toolsToUse[code]);
	          });
	        }

	        const peopleCodes = (questions[question_index].suggestions)[selection] && 
	        										(questions[question_index].suggestions)[selection].q3;
	        // console.log(peopleCodes);
	        if (peopleCodes) {
	          peopleCodes.forEach((code, i) => {
	            peopleToAdd.add(peopleToInvite[code]);
	            // console.log(peopleToAdd)
	          });
	        }
	      })
	    })
	    // console.log(q1Decision(0.3),q1Decision(1),q1Decision(2),q1Decision(3.4),q1Decision(4.2))
	    // console.log(showResults)
	    // Save Answers
	    // console.log(answers)
	    // console.log(heading)
	   //remove for standalone  axios.put("https://ssanywfvja.execute-api.us-east-2.amazonaws.com/crp_responses", {
	  	// 	id: surveyId,
	  	// 	title: heading,
	  	// 	response: answers
	  	// }).then(function (response) {console.log(response)}).catch(function (error) {
	  	// 	console.log(error)
	  	// });
	    updateResults(q1Decision(q1Score, answers), toolsToAdd, peopleToAdd, q4Decision(q1Score, q4Score, answers));
	    setShowLoading(true);
	    window.scrollTo(0, 0);
	    setTimeout(() => {
	      setShowResults(true);
	      setShowLoading(false);
	    }, 3000);
	  }
	};

	const printAnswers = (event) => {
		window.print();
	};

	return (
		<div hidden={showHeading === true || !showSection.every(s => s === false)}>
			<Typography variant="h3" style={centerObj}>
        Review your answers
      </Typography>
      { questions && questions.map((question, i) => (
	      	<div style={styleObj}> 	  
	      		<Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start">
		      		<Grid item xs={1}>
			      		<Typography variant="subtitle2" style={questionNumberObj}>
			      	  	{question.number}. 
		      	  	</Typography>
		      	  </Grid>
		      	  <Grid item xs={11}>
			      	  <Typography variant="subtitle2">
			      	  	{question.question}
			      	  </Typography>
		      	  	{question.type === "mc" && answers[i] && answers[i].map(a => (
		      	  		<Typography variant="body2" color="error">
		      	    		{question.choices[a - 1]}
		      	    	</Typography>
		      	    ))}
			      	  <Typography variant="body2" color="error">
			      			{question.type === "rank" && answers[i]}
			      		</Typography>
			      	</Grid>
		      	</Grid>

      	  </div>
      	))}
	    <ButtonGroup>
	      	<Button variant="contained" onClick={backToStart} style={bottomButtonStyle}>
	      		Edit Answers
	      	</Button>
	      	<Button variant="contained" onClick={printAnswers} style={bottomButtonStyle}>
	      		Print Answers
	      	</Button>
		    <Button variant="contained" onClick={analyzeResults} style={bottomButtonStyle}>
		      Submit Answers
		    </Button>
	    </ButtonGroup>
	  </div>
  )
};

export {Submit};