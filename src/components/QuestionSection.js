import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@material-ui/core/Link';
import axios from 'axios';

function QuestionSection({answers, setAnswers, questions, customQuestions, section, showSection, setShowSection, sectionIndex}){
	const styleObj = {
	  textAlign: "left",
	  padding: "20px",
	  backgroundColor: '#00529b',
	  color: "white"
	};

	const questionObj = {
	  textAlign: "left",
	  padding: "10px"
	};
	const questionNumberObj = {
		marginLeft: "30px"
	}
	const centerObj = {
	  marginTop: "50px",
	  marginBottom: "50px",
	  alignItems: 'center',
	  justifyContent: 'center',
	};

	const buttonStyle = {
		marginTop: "5px",
    marginBottom: "5px"
    // marginRight: "50px",
    // marginLeft: "10px"
	};

 	const bottomButtonStyle = {
 		marginTop: "20px",
    marginBottom: "20px",
    marginRight: "50px",
    // marginLeft: "10px"
 	};

	// const [answers, setAnswers] = useGlobalState("answers");

	// let sectionAnswers = new Array(numberOfQuestions).fill([]);

	const verifyAnswer = (answer) => {
  	return answer.length > 0;
  };
  	if (customQuestions !== "" && customQuestions !== questions) {
  		questions = customQuestions
  	}
  	// console.log(customQuestions)
  	// console.log(questions)
	const sectionQuestions = questions.filter(q => q.category === section);
	const numberOfQuestions = sectionQuestions.length;
	const [sectionAnswers, setSectionAnswers] = React.useState(new Array(numberOfQuestions).fill([]));
	if (answers.every(verifyAnswer)){
		sectionQuestions.map((question, index) => (
			sectionAnswers[index] = answers[question.number-1]
		))
	}

	const [openDialog, setOpenDialog] = React.useState(new Array(questions.length).fill(false));

  const updateState = (index, newValue, questionNumber) => {
    let newSectionAnswers = [...sectionAnswers];
    let newAnswers =[...answers];

    if (typeof(newValue) === 'number'){
      newSectionAnswers[index] = [newValue];
      newAnswers[questionNumber-1] = [newValue];
    }
    else{
      newSectionAnswers[index] = newValue;
      newAnswers[questionNumber-1] = newValue;
    }

    // console.log(newSectionAnswers);
    // console.log(newAnswers);
		setSectionAnswers(newSectionAnswers);
		setAnswers(newAnswers);
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

  const handleDialogButtonOpen = (questionNumber) => {
  	let newOpenDialog = [...openDialog];
  	newOpenDialog[questionNumber] = true;
  	setOpenDialog(newOpenDialog);
  };

  const handleDialogButtonClose = (questionNumber) => {
  	let newOpenDialog = [...openDialog];
  	newOpenDialog[questionNumber] = false;
  	setOpenDialog(newOpenDialog);
  };

  // const verifyNumber = (selection) => {
  // 	// console.log(typeof(selection) === 'number')
  //   return typeof(selection) === 'number';
  // };
  

  const pushSectionResults = (event) => {
    // console.log(sectionAnswers);
    let peopleToAdd = new Set();
    if (sectionAnswers.every(verifyAnswer)){
    	// let newAnswers = [...answers];
    	// console.log(newAnswers)
    	let newShowSection = showSection;
    	newShowSection[sectionIndex] = false;
    	if (sectionIndex + 1 < showSection.length){
	    	newShowSection[sectionIndex+1] = true;
	    }

	    // newAnswers.push(...sectionAnswers)
	    // setSectionAnswers(newAnswers)
	    // console.log(sectionAnswers)
	    // setAnswers(newAnswers);
	    // console.log(answers)
	    // setAnswers(answers => answers.push(sectionAnswers))
    	// console.log(answers)
    	setAnswers([...answers]);
    	setShowSection(newShowSection);
    	window.scrollTo(0, 0);
	    // console.log(showSection)
      }
    else {
      alert('Please answer all questions.')
    }
  }

  const goToPrevSection = (event) => {
  	let newShowSection = [...showSection];
  	newShowSection[sectionIndex] = false;
  	if (sectionIndex > 0){
    	newShowSection[sectionIndex-1] = true;
    }
    setShowSection(newShowSection);
    window.scrollTo(0, 0);
  }

  return (
    <div className="QuestionSection">
    { showSection[sectionIndex] === true &&
	    <div>
	    <Typography variant="h2" style={styleObj}>
	      {section}
	    </Typography>
	    {sectionQuestions.map((question, index) => (
	      <div style={questionObj}>
	      	<Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start">
	      		<Grid item xs={1}>
	      			<Typography id={"input-slider-" + index} gutterBottom style={questionNumberObj}>
	      				{question.number}.
	      			</Typography>
	      			</Grid>
	      		<Grid item xs={10}>
			        <Typography gutterBottom>
			          {question.question}
			        </Typography>

			        <ToggleButtonGroup
			          exclusive={!question.allow_multiple}
			          value={sectionAnswers[index]}
			          // value={answers[sectionIndex][index]}
			          onChange={(event,value) => handleButton(index, event, value, question.number)}>
			          {question.choices && question.choices.map((choice, choice_index) => (
			            <ToggleButton 
			              variant="contained"
			              id={"q"+index+"_"+choice_index}
			              style={buttonStyle}
			              value={choice_index+1}>
			              {choice}
			            </ToggleButton>
			            )
			          )}
			          {question.range && [...Array(question.range)].map((choice, choice_index) => (
			            <ToggleButton 
			              variant="contained"
			              id={"q"+index+"_"+choice_index}
			              style={buttonStyle}
			              value={choice_index+1}>
			              {choice_index+1}
			            </ToggleButton>
			            )
			          )}
			        </ToggleButtonGroup>
			       </Grid>
			       <Grid item xs={1}>
			       	{question.remarks &&
			        <div>
			        	<IconButton variant="outlined" color="primary" onClick={(qN) => handleDialogButtonOpen(question.number-1)}>
					        <InfoIcon />
					      </IconButton>
				        <Dialog
					        open={openDialog[question.number-1]}
					        onClose={(qN) => handleDialogButtonClose(question.number-1)}
					      >
					      	<IconButton onClick={(qN) => handleDialogButtonClose(question.number-1)}>
					      		<CloseIcon />
					        </IconButton>
					      	<DialogContent>
					      		{question.remarks.split(":").length > 1 ?
					      		<div>
					      			{question.remarks.split(":").map((remark, index) => (
					      				(index % 2 == 0) ?
				      					<DialogContentText style={{ whiteSpace: "pre-wrap", fontWeight: "bold"}}>
				      						{remark+":"}
				      					</DialogContentText>
				      					:
				      					<DialogContentText style={{ whiteSpace: "pre-wrap"}}>
				      					  {remark}		  
				      					</DialogContentText>  	  				
					      				))}
						        </div>
						        :
					        	<DialogContentText style={{ whiteSpace: "pre-wrap"}}>
					        		{question.remarks}
						        </DialogContentText>
						      	}
						        {question.link && 
							        <Link href={question.link} target="_blank">
								        Link
								      </Link>
							    	}
		        			</DialogContent>
	        			</Dialog>
        			</div>
        			}
			       </Grid>

	        </Grid>
	      </div>
	      ))}
	    <ButtonGroup>
	    	{	sectionIndex > 0 && 
			    <Button variant="contained" onClick={goToPrevSection} style={bottomButtonStyle}>
			      Previous Section
			    </Button>
			  }
		    <Button variant="contained" onClick={pushSectionResults} style={bottomButtonStyle}>
		      {sectionIndex < showSection.length - 1 && "Next Section"}
		      {sectionIndex === showSection.length - 1 && "Review Answers"}
		    </Button>
		  </ButtonGroup>
	    </div>
	  }
    </div>

  );
}

export {QuestionSection};