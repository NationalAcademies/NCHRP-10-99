import React from 'react';
import logo from './logo.svg';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Hidden from '@material-ui/core/Hidden';
import './App.css';

const styleObj = {
  textAlign: "left",
  padding: "20px"
};
const centerObj = {
  marginTop: "50px",
  marginBottom: "50px",
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonStyle = {
  marginBottom: "10px"
  // marginRight: "10px",
  // marginLeft: "10px"
};

const numberOfQuestions = 5;

const questions = [
  {
    question: "What is the project type? (Select all that apply)",
    category: "general",
    type: "mc",
    choices: ["Paving", "Bridge", "Intersection", "New Const.", "Signalization", "RRR"],
    number: 1,
    suggestions: { 1: [1],
                   2: [2,3],
                   5: [4]
                 },
    allow_multiple: true
  },
  {
    question: "What delivery system will be used to build the project",
    category: "general",
    type: "mc",
    choices: ["DBB", "D-B", "CM/GC", "3P", "PD-B"],
    number: 2,
    suggestions: { 2: [5],
                   3: [5],
                   4: [5],
                   5: [5],
                 }
  },
  {
    question: "Rate the political sensitivity of the project (5-highest; 1-lowest)",
    category: "general",
    type: "rank",
    range: 5,
    number: 3,
    suggestions: {
                   3: [8],
                   4: [6,7],
                   5: [6,7],
                 }
  },
  {
    question: "Rate the environmental sensitivity of the project (5-highest; 1-lowest)",
    category: "general",
    type: "rank",
    range: 5,
    number: 4,
    suggestions: {
                   4: [9],
                   5: [9],
                 }
  },
  {
    question: "Rate the historic sensitivity of the project (5-highest; 1-lowest)",
    category: "general",
    type: "rank",
    range: 5,
    number: 5,
    suggestions: {
                   3: [10],
                   4: [10],
                   5: [10],
                 }
  },
];

const coreGroup = [
  "Area (Resident) Construction Engineer, or designee",
  "Construction Project Manager",
  "Design Lead",
  "Environmental Coordinator"
]

const peopleToInvite = {
  1: "Representative from the District Bituminous Office or a concrete expert, as applicable",
  2: "Representative from the District Structures Office",
  3: "Representative from the District Materials Lab with expertise in concrete",
  4: "Representative from the District Traffic Operations Office",
  5: "Representative from our Project Delivery Group",
  6: "Representative from local MPO",
  7: "Representative with decision-making authority from municipality and county that encompasses the project",
  8: "Representative from municipality and county that encompasses the project",
  9: "Representative from In-house District Environmental Complicance Office that has decision-making authority",
  10: "Outsourced experts in the area of interest, if necessary",
  11: "Utility Companies with potential conflicts",
  12: "Leader of In-house Utility Group",
  13: "Resident (Area) Construction Engineer (in person, not delegate)",
  14: "Representative from In-house Utility Group",
  15: "Leader of In-house ROW Group",
  16: "Representative from In-house ROW Group",
  17: "District Maintenance Engineer (in person, not delegate)",
  18: "Subject matter expert in the area of concern",
  19: "Representative from District Maintenance Office",
  20: "Subject matter expert in whatever is causing the lack of space",
  21: "Subject matter expert in new or unfamiliar work type or technology",
  22: "District Geotechnical Engineer (in person, not delegate)",
  23: "Consultant subject matter experts as needed",
  24: "Representative from the District Materials office with knowledge of Geotechnical matters",
  25: "Representative from In-house Railroad unit",
  26: "Young engineers needing experience in constructability, as desired or needed",
  27: "Representatives from In-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is likely",
  28: "Consultant that can help with a particular agency, as needed",
  29: "Representatives from in-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is possible",
  30: "Representatives from the State Emergency Management Office",
  31: "Representatives from the Emergency Management Organizations that will be affected",
  32: "Representatives from the Hospitals that will be affected",
  33: "Representatives from the Independent Emergency Rooms that will be affected",
  34: "Representative from any public school district that currently runs a bus or busses through the proposed project sight",
  35: "Representative from any private school that runs a bus or busses through the proposed project sight",
  36: "Representative from in-house Public Relations unit, or consultant Public Relations firm",
  37: "Representative from the Location Studies unit",
  38: "A consultant that can do a 404 Review"
} 


function App() {

  const [answers, setAnswers] = React.useState(new Array(numberOfQuestions).fill([]));
  const [showLoading, setShowLoading] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [results, setResults] = React.useState(coreGroup);
  // const [invitedList, setInvitedList] = React.useState(coreGroup)

  const updateState = (index, newValue) => {
    let newAnswers = [...answers];
    console.log(newAnswers)
    if (typeof(newValue) === 'number'){
      newAnswers[index] = [newValue];
    }
    else{
      newAnswers[index] = newValue;
    }
    console.log(newAnswers)
    setAnswers(newAnswers)
    // setSumOfSliders(newSliders.reduce(sum))
  }

  const updateResults = (newPeople) => {
    let newResults = [...results];
    console.log(newResults);
    newResults.push(...newPeople);
    console.log(newResults);
    setResults(newResults);
  };

  const startNew = (event) => {
    setResults(coreGroup);
    setAnswers(new Array(numberOfQuestions).fill([]));
    setShowResults(false);
    setShowLoading(false);
  };

  const handleButton = (index, event, newValue) => {
    updateState(index, newValue)
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

  const analyzeResults = (event) => {
    console.log(answers);
    let peopleToAdd = new Set();
    if (answers.every(verifyAnswer)){
      answers.forEach((answer, question_index) => {
        // console.log((questions[question_index].suggestions)[answer])
        answer.forEach((selection, selection_index) => {
          const peopleCodes = (questions[question_index].suggestions)[selection];
          console.log(peopleCodes);
          if (peopleCodes) {
            peopleCodes.forEach((code, i) => {
              peopleToAdd.add(peopleToInvite[code]);
              console.log(peopleToAdd)
            });
          }
        })
      })
      console.log(showResults)
      updateResults(peopleToAdd);
      // setResults("HAHAHAHA");
      setShowLoading(true);
      // setShowResults(true);
      setTimeout(() => {
        setShowResults(true);
        setShowLoading(false);
      }, 3000);

      // console.log(results);
    }
    else {
      alert('Please answer all questions.')
    }
  }

  return (
    
    <div className="App">
      { (showLoading === false && showResults === false) ?
        <div>
        <Typography variant="h2" style={styleObj}>
          General
        </Typography>
        {questions.map((question, index) => (
          <div style={styleObj}>
            <Typography id={"input-slider-" + index} gutterBottom>
              {question.number}. {question.question}
            </Typography>
            <ToggleButtonGroup
              exclusive={!question.allow_multiple} 
              value={answers[index]}
              onChange={(event,value) => handleButton(index, event, value)}>
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
          </div>
          ))}
        <Button variant="contained" onClick={analyzeResults}>
          Submit
        </Button>
        </div>
        : ( 
            <div>
              <div hidden={!showResults}>
                <Typography variant="h2" style={styleObj}>
                  What people should be involved in the CRP on this project?
                </Typography>
                {results.map((person, i) => (
                  <Typography style={styleObj}>
                    {person}
                  </Typography>
                ))}
                <Button variant="contained" onClick={startNew} style={buttonStyle}>
                  Start Over
                </Button>
              </div>
              <Typography hidden={!showLoading} variant="h2" style={centerObj}> Analyzing your responses</Typography>
              <div hidden={!showLoading}><CircularProgress  /></div>
            </div>
          )
          
      }
    </div>

  );
}

export default App;
