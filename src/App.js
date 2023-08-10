import React from 'react';
import logo from './logo.svg';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';
import {QuestionSection} from './components/QuestionSection.js';
import {Submit} from './components/Submit.js';
import {Heading} from './components/Heading.js';
import {Popup} from './components/Popup.js';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';
import {lod_pdf} from "./images/optimized_lod.pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { save } from 'save-file';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

// const initialState = {
//   answers: []
// }
// const { useGlobalState } = createGlobalState(initialState);

const styleObj = {
  textAlign: "left",
  padding: "20px"
};
const blueStyleObj = {
  textAlign: "left",
  padding: "20px",
  color: "blue"
};
const redStyleObj = {
  textAlign: "left",
  padding: "20px",
  color: "red"
};
const titleObj = {
  textAlign: "left",
  padding: "20px",
  backgroundColor: '#00529b',
  color: 'white'
};
const questionObj = {
    textAlign: "left",
    marginRight: "20px"
  };
const questionNumberObj = {
    marginLeft: "30px"
  };
const inHouseQuestionObj = {
    textAlign: "left",
    marginRight: "20px",
    color: "blue"
  };
const inHouseQuestionNumberObj = {
    marginLeft: "30px",
    color: "blue"
  };
const outHouseQuestionObj = {
    textAlign: "left",
    marginRight: "20px",
    color: "red"
  };
const outHouseQuestionNumberObj = {
    marginLeft: "30px",
    color: "red"
  };
const coreGroupObj = {
    textAlign: "left",
    marginRight: "20px"
  };
const coreGroupNumberObj = {
    marginLeft: "30px"
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
const bottomButtonStyle = {
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "50px",
    // marginLeft: "10px"
 };
const infoButtonStyle = {
  width: "10px",
  height: "10px",
  alignItems: 'center',
  // justifyContent: 'center',
  padding: "20px"
};




const numberOfQuestions = 5;

const categories = ["General", "Physical characteristics", "Intangibles", "Local circumstances", "Agency decisions/capabilities"]

const questions = [
  {
    question: "What is the project type? (Select all that apply)",
    category: "General",
    type: "mc",
    choices: ["Paving", "Bridge", "Intersection", "New Const.", "Signalization", "RRR", "Drainage", "Other"],
    number: 1,
    suggestions: { 1: {"q3": [1]},
                   2: {"q3": [2,3]},
                   5: {"q3": [4]}
                 },
    allow_multiple: true,
    remarks: "RRR:Resurfacing, Restoration and Rehabilitation :New Construction:Construction that runs through property that hitherto has had no construction. Not a project to add width to an existing structure. Can add length (no widening project, but an extension project OK)"
  },
  {
    question: "What delivery system will be used to build the project?",
    category: "General",
    type: "mc",
    choices: ["DBB", "D-B", "CM/GC", "P3", "Progressive D-B", "Other", "Unknown"],
    number: 2,
    suggestions: { 2: {"q3": [5]},
                   3: {"q3": [5]},
                   4: {"q3": [5]},
                   5: {"q3": [5]},
                 }
  },
  {
    question: "What is the estimated cost of this project? ($millions)",
    category: "General",
    type: "mc",
    choices: ["0-15", "15+ - 50", "50+ - 100", "100+ - 500", "500+"],
    number: 3,
    q1Weight: 0.0373,
    q4Weight: 0.0211,
    suggestions: {}
  },
  {
    question: "Rate the political sensitivity of the project (5-highest; 1-lowest)",
    category: "General",
    type: "rank",
    range: 5,
    number: 4,
    q1Weight: 0.0632,
    q4Weight: 0.0464,
    suggestions: {
                   3: {"q3": [8,36]},
                   4: {"q2": [1,2,3,4,5,6], "q3": [6,7,36,41]},
                   5: {"q2": [1,2,3,4,5,6], "q3": [6,7,36,41,42]},
                 },
    remarks: `When rating the political sensitivity of a project, the project team should consider:

• Proximity of the project to centers of political, economic, or cultural influence

• Involvement of elected officials

• Need for the project completion to accommodate a particular event or dates of increased traffic, such as a surge in travel around a holiday or special event

• Press coverage of the project`
  },
  {
    question: "Rate the environmental sensitivity of the project (5-highest; 1-lowest)",
    category: "General",
    type: "rank",
    range: 5,
    number: 5,
    q1Weight: 0.0655,
    q4Weight: 0.0464,
    suggestions: {
                   3: {"q2": [5]},
                   4: {"q2": [1,2,3,4,5], "q3": [9,41]},
                   5: {"q2": [1,2,3,4,5], "q3": [9,41,42]},
                 },
    remarks: `When rating the environmental sensitivity of a project, the project team should consider:

• Potential for work within wetlands or waterways

• Potential for noise pollution, particularly if the construction area is near residential areas or occupied buildings

• Need to protect private property from runoff

• Need to maintain existing storm drains

• Potential for flooding

• Potential for discovery, during construction, of hazardous materials such as gasoline, or a landfill beneath the surface of the ground

• Proximity of the project to sinkholes and/or caverns`
  },
  {
    question: "Rate the historic sensitivity of the project (5-highest; 1-lowest)",
    category: "General",
    type: "rank",
    range: 5,
    number: 6,
    q1Weight: 0.0644,
    q4Weight: 0.0464,
    suggestions: {
                   3: {"q3": [10]},
                   4: {"q2": [1,2,3,4,5,7,8], "q3": [10,41]},
                   5: {"q2": [1,2,3,4,5,7,8], "q3": [10,41,42]},
                 },
    remarks: `When rating the historic sensitivity of a project, the project team should consider the following:

• Proximity of the project to locations or structures of historical significance

• Proximity of the project to graveyards or native burial grounds

• Other related issue`
  },
  {
    question: "Rate the level of potential underground and overhead utility conflicts on the project (5-high; 1-low)",
    category: "Physical characteristics",
    type: "rank",
    range: 5,
    number: 7,
    q1Weight: 0.0711,
    q4Weight: 0.0464,
    suggestions: {
                   3: {"q2": [2], "q3": [11,14]},
                   4: {"q2": [1,2,3,4,5,7], "q3": [11,12,13,41,42]},
                   5: {"q2": [1,2,3,4,5,7], "q3": [11,12,13,41,42]}
                 },
    remarks: `When rating the level of potential utility conflicts, the project team should consider:

• The impact of utilities on construction phasing and scheduled completion

• A number of utilities present—the more utilities, the higher the probability of a conflict

• The utilities present on the project, and the track record for timely utility relocation of the companies involved`
  },
  {
    question: "Rate the level of potential ROW conflicts on the project (5-high; 1-low)",
    category: "Physical characteristics",
    type: "rank",
    range: 5,
    number: 8,
    q1Weight: 0.0655,
    q4Weight: 0.0464,
    suggestions: {
                   3: {"q2": [3], "q3": [16]},
                   4: {"q2": [1,2,3,4,5,7], "q3": [13,15]},
                   5: {"q2": [1,2,3,4,5,7], "q3": [13,15]}
                 },
    remarks: `When rating the potential ROW conflicts, the project team should consider:

• The need for ROW to accommodate access to work areas (demolition, construction and maintenance activities); staging areas; detours; and equipment, material and hazardous waste storage

• Potential opportunities and availability of options for avoiding costly access, easement, and other real estate issues

• How the processes of ROW acquisition, easement establishment, and other related issues have gone in the location of the project in the past`
  },
  {
    question: "Rate the potential level of difficulty for MOT on the project (5-most difficult; 1-least difficult)",
    category: "Physical characteristics",
    type: "rank",
    range: 5,
    number: 9,
    q1Weight: 0.0711,
    q4Weight: 0.0422,
    suggestions: {
                   4: {"q2": [1,2,3,4,5,6,7,9], "q3": [13,41,42]},
                   5: {"q2": [1,2,3,4,5,6,7,9], "q3": [13,41,42]}
                 },
    remarks: `When rating the potential level of difficulty for MOT on a project, the project team should consider:

• Current traffic conditions (traffic loads, congestion, etc.)

• Ability to implement staged construction, alternating 2-way traffic pattern, night work, etc.

• Impact of staging plans on driveways, side streets, pedestrians, etc.

• Need to accommodate special venues or operations (e.g., schools, hospitals, fire/police stations, churches, and railroads).`
  },
  {
    question: "Rate the ease of access to the project and the accessibility for material deliveries and haul routes within, or adjacent to, project limits (5-most difficult access/least accessibility; 1-easiest access/greatest accessibility)",
    category: "Physical characteristics",
    type: "rank",
    range: 5,
    number: 10,
    q1Weight: 0.0598,
    q4Weight: 0.0412,
    suggestions: {
                   3: {"q2": [3], "q3": [18,19]},
                   4: {"q2": [1,2,3,4,5,7], "q3": [17,18,41]},
                   5: {"q2": [1,2,3,4,5,7], "q3": [17,18,41]}
                 },
    remarks: `When rating the ease of access to the project and the accessibility for material deliveries on a project, the project team should consider:

• Current traffic conditions (traffic loads, congestion, etc.)

• Travelling distance from material sources.

• Whether there is room for the delivery vehicles to easily proceed from flowing traffic into the work zone or staging area, and back into traffic.`             
  },
  {
    question: "Rate the ease of equipment movement (room, obstacles, etc.) on this project, and the space available within, or adjacent to, project limits to stockpile material and park equipment (5-most constricted/least space; 1-greatest freedom of movement)",
    category: "Physical characteristics",
    type: "rank",
    range: 5,
    number: 11,
    q1Weight: 0.0576,
    q4Weight: 0.0309,
    suggestions: {
                   4: {"q2": [1,2,3,4,5,7], "q3": [20,41]},
                   5: {"q2": [1,2,3,4,5,7], "q3": [20,41]}
                 }
  },
  {
    question: "Rate the likelihood that design refinements may trigger an environmental reevaluation",
    category: "Physical characteristics",
    type: "mc",
    choices: ["No chance", "Unlikely", "Neither Likely nor Unlikely", "Likely", "Extremely Likely"],
    number: 12,
    q1Weight: 0.0598,
    q4Weight: 0.0453,
    suggestions: { 
                   5: {"q2": [1,2,3,4,5,7]},
                 },
    remarks: `When rating the design refinements on a project, the project team should:

• Consider whether or not the design change will cause a change of 5% or greater to the existing design.

• Check NEPA Guide Book for other “triggers” for a NEPA Re-evaluation`,
    link: "https://www.environment.fhwa.dot.gov/nepa/nepa_projDev.aspx"
  },
  {
    question: "Is the work to be performed on this project typical for this area of the state; and will the work be accomplished using traditional technologies used to build this type of project in this area? (5-new kind of project, to be built using new technology; 1-typical project that can be built using traditional equipment and methods)",
    category: "Physical characteristics",
    type: "rank",
    range: 5,
    number: 13,
    q1Weight: 0.0598,
    q4Weight: 0.0338,
    suggestions: {
                   4: {"q2": [1,2,3,4,5,7], "q3": [13,21,41,42]},
                   5: {"q2": [1,2,3,4,5,7], "q3": [13,21,41,42]}
                 }
  },
  {
    question: "Rate the known geotechnical conditions and the probability for unforeseen troublesome site conditions on the project site (5-worst/highest; 1-best/lowest)",
    category: "Physical characteristics",
    type: "rank",
    range: 5,
    number: 14,
    q1Weight: 0.0644,
    q4Weight: 0.0422,
    suggestions: {
                   3: {"q3": [24]},
                   4: {"q2": [1,2,3,4,5,7], "q3": [22,23,41,42]},
                   5: {"q2": [1,2,3,4,5,7], "q3": [22,23,41,42]}
                 }
  },
  {
    question: "Is there a railroad within, or adjacent to, the project limits?",
    category: "Physical characteristics",
    type: "mc",
    choices: ["No railroad", "Railroad adjacent to project", "Railroad within project"],
    number: 15,
    q1Weight: 0.0768,
    q4Weight: 0.0506,
    suggestions: {
                   2: {"q1": 4, "q2": [1,2,3,4,5], "q3": [25], "q4": 4},
                   3: {"q1": 5, "q2": [1,2,3,4,5], "q3": [25], "q4": 5}
                 }
  },
  {
    question: "Rate the need to include people in the Constructability Review Process not for their potential input, but solely to increase their knowledge/experience/training in constructability (5-highest; 1-lowest)",
    category: "Intangibles",
    type: "rank",
    range: 5,
    number: 16,
    suggestions: {
                   3: {"q3": [26]},
                   4: {"q3": [26]},
                   5: {"q3": [26]}
                 },
    remarks: "Experience has shown that inclusion in CR sessions can be a valuable training and knowledge transfer exercise."
  },
  {
    question: "Rate the probability that staged construction will be necessary (5-highest probability; 1-lowest probability)",
    category: "Intangibles",
    type: "rank",
    range: 5,
    number: 17,
    q1Weight: 0.0598,
    q4Weight: 0.0506,
    suggestions: {
                   3: {"q3": [39,40]},
                   4: {"q2": [1,2,3,4,5,7], "q3": [39,40,41]},
                   5: {"q2": [1,2,3,4,5,7], "q3": [39,40,41]}
                 },
    remarks: `Staged construction can increase complexity. When rating the impact of staged construction on a project, the project team should consider:

• Safety considerations

• Maintenance of traffic considerations

• Adequacy (width, height) of work zones and traffic lanes

• Special temporary conditions (e.g., issues with drainage, stability, structural adequacy, etc.)`
  },
  {
    question: "How familiar is the design professional with the project site/how accessible is the design professional?",
    category: "Intangibles",
    type: "mc",
    choices: ["Most familiar/Most accessible", "Very familiar/Very accessible", "Fairly familiar/Fairly accessible", "Not very familiar/Not very accessible", "Not very familiar/Not very accessible"],
    number: 18,
    suggestions: {
                   4: {"q2": [1,5]},
                   5: {"q2": [1,5]}
                 },
    remarks: `There are issues that arise during the course of construction where there is no substitute for “eyes on” analysis by the designer. Consider how accessible the designer appears to the other parties to the contract, and to the project site.`
  },
  {
    question: "Does the number of permitting agencies, or any of the individual permitting agencies involved, cause particular angst regarding the ease of the environmental permitting process? (5-Either the high number of agencies, or one or more of the agencies involved are of great concern; 1-Neither the number of agencies, nor any of the agencies involved are cause for concern)",
    category: "Intangibles",
    type: "rank",
    range: 5,
    number: 19,
    q4Weight: 0.0464,
    suggestions: {
                   3: {"q3": [29]},
                   4: {"q3": [27,28]},
                   5: {"q3": [27,28]}
                 },
    remarks: `Experience has shown that major late design changes can be driven by environmental procedures, issues, and permits.

Consider the current working relationships between your agency and the permitting agencies pertinent to this project.`
  },
  {
    question: "Rate the probability for long-term maintenance problems on the project (5-highest; 1-lowest)",
    category: "Intangibles",
    type: "rank",
    range: 5,
    number: 20,
    suggestions: {
                   3: {"q3": [18,19]},
                   4: {"q2": [1,2,3,4,5,10,11], "q3": [18,19]},
                   5: {"q2": [1,2,3,4,5,10,11], "q3": [17,18]}
                 }
  },
  {
    question: "Rate the need for emergency vehicles to pass through the project limits during construction; and the difficulty for emergency vehicles to pass through the project limits during construction (5-multiple passes/day & extreme difficulty for the vehicles to pass through;  3-average number of passes/day & average difficulty for the vehicles to pass through; 1-very few passes (1-2 times/month during project duration & no problem with vehicles passing through)",
    category: "Local circumstances",
    type: "rank",
    range: 5,
    number: 21,
    suggestions: {
                   3: {"q3": [30,31,32,33]},
                   4: {"q3": [30,31,32,33]},
                   5: {"q3": [30,31,32,33]}
                 }
  },
  {
    question: "Rate the need for school busses to pass through the project limits during construction; and the difficulty for school busses to pass through the project limits during construction (5-multiple passes/day & extreme difficulty for the busses to pass through;  3-average number of passes/day & average difficulty for the busses to pass through; 1-very few passes (1-2 times/month during project duration & no problem with busses passing through)",
    category: "Local circumstances",
    type: "rank",
    range: 5,
    number: 22,
    suggestions: {
                   3: {"q3": [34,35]},
                   4: {"q3": [34,35]},
                   5: {"q3": [34,35]}
                 }
  },
  {
    question: "Rate the availability of skilled labor, unskilled labor, and trucking capacity in the economy local to the project site (5-extreme shortage of workers / truckers; 1- plenty of workers / truckers)",
    category: "Local circumstances",
    type: "rank",
    range: 5,
    number: 23,
    q1Weight: 0.0644,
    q4Weight: 0.0338,
    suggestions: {
                   4: {"q3": [41,42]},
                   5: {"q3": [41,42]}
                 }
  },
  {
    question: "Rate the likelihood of organized opposition to the project (5-highest probability; 1-low probability)",
    category: "Local circumstances",
    type: "rank",
    range: 5,
    number: 24,
    suggestions: {
                   2: {"q3": [36]},
                   3: {"q3": [36]},
                   4: {"q3": [36]},
                   5: {"q3": [36]}
                 },
    remarks: `When answering this question, the project team should consider the following:

• Are any environmental or political groups known to be opposed to this project on principle?

• Is there a sector of the public that will be directly affected by the construction and completion of the project? Remember that problems and opposition can arise both when large numbers and small numbers of the public are greatly impacted by a project.

• If there are such groups, are they organized, or known
to be organizing?`
  },
  {
    question: "Can the NEPA, and the Environmental Permitting Processes on this project be accomplished concurrently?",
    category: "Agency decisions/capabilities",
    type: "mc",
    choices: ["yes", "no"],
    number: 25,
    q4Weight: 0.0506,
    suggestions: {
                   1: {"q3": [37]}
                 }
  },
  {
    question: "Can the Constructability Review Process be conducted concurrently with the NEPA, and the Environmental Permitting Processes on this project?",
    category: "Agency decisions/capabilities",
    type: "mc",
    choices: ["yes", "no"],
    number: 26,
    q4Weight: 0.0506,
    suggestions: {
                   1: {"q3": [37]}
                 }
  },
  {
    question: "Does your agency have the capacity to perform a “404 Review”?",
    category: "Agency decisions/capabilities",
    type: "mc",
    choices: ["yes", "no"],
    number: 27,
    q4Weight: 0.0338,
    suggestions: {
                   2: {"q2": [1], "q3": [38]}
                 },
    remarks: `The project team should consider the following:

‘404 Review’ refers to the requirements under Section 404 of the Clean Water Act, which regulates the discharge of dredged or fill material into waters of the United States, including wetlands.

For potentially significant activities, individual permits are reviewed by the US Army Corps of Engineers, which evaluates applications under a public interest review, as well as the environmental criteria set forth in the CWA Section 404(b)(1) Guidelines, regulations promulgated by EPA.
Some states have assumed this permitting authority and regulate these activities.

Since all public transportation agencies are required to perform 404 Reviews, the question relates to whether your agency currently has to the capacity to perform a complete and comprehensive 404 Review on this project.`
  },
  {
    question: "Does your agency have the freedom to optimize the Limits of Disturbance on this project?",
    category: "Agency decisions/capabilities",
    type: "mc",
    choices: ["yes", "no"],
    number: 28,
    q4Weight: 0.0338,
    suggestions: {
                   1: {"q3": [37]},
                   2: {"q2": [1,2,3,4,5,7]}
                 },
    remarks: `Most agencies try to make the Limits of Disturbance footprint that they submit to FHWA as small as possible.

Some agencies have found that it works better to enlarge their Limits of Disturbance to the point where any conceivable need to enlarge the project’s
footprint is covered. This is called the “Optimum Limits of Disturbance.”

The question relates to whether your agency has the statutory authority to use
the Optimum Limits of Disturbance.`,
    link: "optimized_lod.pdf"
  },
  {
    question: "Does your state have the ability to engage the construction industry in performing constructability reviews for the project under consideration?",
    category: "Agency decisions/capabilities",
    type: "mc",
    choices: ["yes", "no"],
    number: 29,
    q4Weight: 0.0338,
    suggestions: {},
    remarks: `Some state agencies have had great success in involving contractors in the
Constructability Review Process before the letting. Does your agency have the
statutory authority to involve contractors in this way?`,
    link: "https://www.udot.utah.gov/connect/"
  }
];

const toolsToUse = {
			1: "Assets Information Systems",
			2: "Utility Mapping", //
			3: "ROW Mapping", //
			4: "Information Management System",
			5: "GIS-based Tools",
			6: "Interactive Traffic Micro-simulation",
			7: "Site Mapping (LIDAR, GPS, RTS, RTN, or UAVs)", //
			8: "Inventory Mapping (GIS Databases, GPS, LIDAR, Aerial Imagery)",
			9: "Traffic Management Simulation", // Traffic Management - Interactive Traffic Micro-simulation
			10: "Web-based Design Coordination", // bim
			11: "Asset Management Tools" // asset management
		};
const inHouse = [
  "Representative from the District Bituminous Office or a concrete expert, as applicable",
  "Representative from the District Structures Office",
  "Representative from the District Materials Lab with expertise in concrete",
  "Representative from the District Traffic Operations Office",
  "Representative from our Project Delivery Group",
  "Representative from In-house District Environmental Compliance Office that has decision-making authority",
  "Leader of In-house Utility Group",
  "Representative from In-house Utility Group",
  "Leader of In-house ROW Group",
  "Representative from In-house ROW Group",
  "District Maintenance Engineer (in person, not delegate)",
  "Representative from District Maintenance Office",
  "District Geotechnical Engineer (in person, not delegate)",
  "Representative from the District Materials office with knowledge of Geotechnical matters",
  "Representative from In-house Railroad unit",
  "Young engineers needing experience in constructability, as desired or needed",
  "Representatives from In-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is likely",
  "Representatives from In-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is possible",
  "Representative from the Location Studies unit",
  "Constructability Coordinator",
  "Environmental Coordinator"
];
const outHouse = [
  "Representative from local MPO",
  "Representative with decision-making authority from municipality and county that encompass the project",
  "Representative from municipality and county that encompass the project",
  "Outsourced experts in the area of interest, if necessary",
  "Utility Companies with potential conflicts",
  "Consultant subject matter experts as needed",
  "Consultant that can help with a particular agency, as needed",
  "Representatives from affected Emergency Management Organizations", 
  "Representatives from affected Hospitals",
  "Representatives from affected Independent Emergency Rooms",
  "Representative from any public school district that currently runs a bus or busses through the proposed project site",
  "Representative from any private school that runs a bus or busses through the proposed project site",
  "A consultant that can do a 404 Review",
  "Prime Contractor or Bidders",
  "Key Sub-contractors"
];
const peopleToInvite = {
	  1: "Representative from the District Bituminous Office or a concrete expert, as applicable",
	  2: "Representative from the District Structures Office",
	  3: "Representative from the District Materials Lab with expertise in concrete",
	  4: "Representative from the District Traffic Operations Office",
	  5: "Representative from our Project Delivery Group",
	  6: "Representative from local MPO", 
	  7: "Representative with decision-making authority from municipality and county that encompass the project",
	  8: "Representative from municipality and county that encompass the project",
	  9: "Representative from In-house District Environmental Compliance Office that has decision-making authority",
	  10: "Outsourced experts in the area of interest, if necessary",
	  11: "Utility Companies with potential conflicts",
	  12: "Leader of In-house Utility Group",
	  13: "Resident (Area) Construction Engineer (in person, not delegate)", //depends on if using consultant
	  14: "Representative from In-house Utility Group",
	  15: "Leader of In-house ROW Group",
	  16: "Representative from In-house ROW Group",
	  17: "District Maintenance Engineer (in person, not delegate)",
	  18: "Subject matter expert in the area of concern",  //depends on if using consultant or in-house
	  19: "Representative from District Maintenance Office",
	  20: "Subject matter expert in whatever is causing the lack of space", //depends on if using consultant
	  21: "Subject matter expert in new or unfamiliar work type or technology", //depends on if using consultant
	  22: "District Geotechnical Engineer (in person, not delegate)",
	  23: "Consultant subject matter experts as needed", //
	  24: "Representative from the District Materials office with knowledge of Geotechnical matters",
	  25: "Representative from In-house Railroad unit",
	  26: "Young engineers needing experience in constructability, as desired or needed",
	  27: "Representatives from In-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is likely",
	  28: "Consultant that can help with a particular agency, as needed",
	  29: "Representatives from In-house Environmental Unit that have a good working relationship with each permitting agency with whom a problem is possible",
	  30: "Representatives from the State Emergency Management Office",
	  31: "Representatives from affected Emergency Management Organizations", 
	  32: "Representatives from affected Hospitals",
	  33: "Representatives from affected Independent Emergency Rooms",
	  34: "Representative from any public school district that currently runs a bus or busses through the proposed project site",
	  35: "Representative from any private school that runs a bus or busses through the proposed project site",
	  36: "Representative from In-house Public Relations unit, or consultant Public Relations firm", //
	  37: "Representative from the Location Studies unit",
	  38: "A consultant that can do a 404 Review",
	  39: "Person with expertise in MOT",//depends on if using consultant
	  40: "A project scheduler knowledgeable about work sequencing.",//depends on if using consultant
    41: "Prime Contractor / CM / Bidders",
    42: "Appropriate Subcontractors"
		};
const q2CoreGroup = [
  "Checklist",
  "2-D and 3-D digital design" //3d engineered models
];

const q3CoreGroup = [
  "Constructability Coordinator", //inhouse
  "Area (Resident) Construction Engineer, or designee",
  "Construction Project Manager",
  "Design Lead",
  "Environmental Coordinator" //inhouse
];

const toolPdf = {
  "Checklist": "checklists.pdf",
  "2-D and 3-D digital design": "3d_model.pdf", //3d engineered models
  "Assets Information Systems": "asset_management.pdf",
  "Utility Mapping": "utility_mapping.pdf", //
  "ROW Mapping": "row_mapping.pdf", //
  "Interactive Traffic Micro-simulation": "traffic_management.pdf",
  "Site Mapping (LIDAR, GPS, RTS, RTN, or UAVs)": "site_mapping.pdf", //
  "Inventory Mapping (GIS Databases, GPS, LIDAR, Aerial Imagery)": "site_mapping.pdf",
  "Traffic Management Simulation": "traffic_management.pdf", // Traffic Management - Interactive Traffic Micro-simulation
  "Web-based Design Coordination": "web-based_design_coordination.pdf", // bim
  "Asset Management Tools": "asset_management.pdf" // asset management
}

const testToolPdf = ["Checklist", "2-D and 3-D digital design", "Assets Information Systems", "Utility Mapping", "ROW Mapping",
                     "Interactive Traffic Micro-simulation", "Site Mapping (LIDAR, GPS, RTS, RTN, or UAVs)",
                     "Inventory Mapping (GIS Databases, GPS, LIDAR, Aerial Imagery)",
                     "Traffic Management Simulation", "Web-based Design Coordination", "Asset Management Tools"]
function App() {

  const initShowSection = () => {
    const initShowSection = new Array(categories.length).fill(false);
    // initShowSection[0] = true;
    return initShowSection;
  }
  // const initShowSection = new Array(categories.length).fill(false);
  // initShowSection[0] = true;
  // const [answers, setAnswers] = useGlobalState('answers');
  const [customQuestions, setCustomQuestions] = React.useState(questions);
  const [customTools, setCustomTools] = React.useState(null);
  const [customPersons, setCustomPersons] = React.useState(null);
  const [answers, setAnswers] = React.useState(new Array(questions.length).fill([]));
  const [heading, setHeading] = React.useState("");
  const [surveyId, setSurveyId] = React.useState("");
  const [showHeading, setShowHeading] = React.useState(true);
  const [showLoading, setShowLoading] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  // const [showSection, setShowSection] = React.useState(initShowSection)//[true, false, false, false, false]);
  const [q1Results, setq1Results] = React.useState("");
  const [q2Results, setq2Results] = React.useState([]);
  const [q3Results, setq3Results] = React.useState([]);
  const [q4Results, setq4Results] = React.useState("");
  const [showSection, setShowSection] = React.useState(initShowSection);
  const [openQ1Dialog, setOpenQ1Dialog] = React.useState(false);
  const [openQ2Dialog, setOpenQ2Dialog] = React.useState(false);
  const [openQ2PopupDialogs, setOpenQ2PopupDialogs] = React.useState(new Array(toolPdf.length).fill(false));
  const [openQ3Dialog, setOpenQ3Dialog] = React.useState(false);
  const [openQ4Dialog, setOpenQ4Dialog] = React.useState(false);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  // console.log(questions.map((question, i) => (question.q1Weight))
  //                      .reduce((a,b) => a+(b || 0) , 0))
  function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
  }
  function onDocumentLoadError({ error }) {
    console.log(error)
  }

  initShowSection();

  // const updateResults = (newPeople) => {
  //   let newResults = [...results];
  //   // console.log(newResults);
  //   newResults.push(...newPeople);
  //   // console.log(newResults);
  //   setResults(newResults);
  // };

  const startNew = (event) => {
    setq1Results("");
    setq2Results([]);
    setq3Results([]);
    setq4Results("");
    setAnswers(new Array(questions.length).fill([]));
    setShowSection(initShowSection);
    setShowResults(false);
    setShowLoading(false);
    setShowResults(false);
    setShowHeading(true);
    setHeading("");
    setSurveyId("");
  };

  const printResults = (event) => {
    // save(q1Results, 'test.txt')
    window.print();
  }
  // const handleButton = (index, event, newValue) => {
  //   updateState(index, newValue)
  // };

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
  const determinePersonTypeNumber = (person) => {
    if (inHouse.indexOf(person) > -1){
      return inHouseQuestionNumberObj;
    } else if (outHouse.indexOf(person) > -1){
      return outHouseQuestionNumberObj;
    } else {
      return questionNumberObj;
    }
  };
  const determinePersonType = (person) => {
    if (inHouse.indexOf(person) > -1){
      return inHouseQuestionObj;
    } else if (outHouse.indexOf(person) > -1){
      return outHouseQuestionObj;
    } else {
      return questionObj
    }
  };

  const handleQ1PopupOpen = () => {
    setOpenQ1Dialog(true);
  };

  const handleQ1PopupClose = () => {
    setOpenQ1Dialog(false);
  };
  const handleQ2PopupOpen = (tool) => {
    console.log(tool)
    console.log(toolPdf[tool])
    // setOpenQ2Dialog(true);
    let newQ2PopupDialogs = [...openQ2PopupDialogs];
    newQ2PopupDialogs[testToolPdf.indexOf(tool)] = true;
    setOpenQ2PopupDialogs(newQ2PopupDialogs);
  };
  const handleQ2PopupClose = () => {
    // setOpenQ2Dialog(false);
    setOpenQ2PopupDialogs(new Array(toolPdf.length).fill(false));
  };
  const handleQ3PopupOpen = () => {
    setOpenQ3Dialog(true);
  };
  const handleQ3PopupClose = () => {
    setOpenQ3Dialog(false);
  };
  const handleQ4PopupOpen = () => {
    setOpenQ4Dialog(true);
  };
  const handleQ4PopupClose = () => {
    setOpenQ4Dialog(false);
  };


  return (
    
    <div className="App" style={{backgroundColor: 'white', display: 'inline'}}>
      { (showLoading === false && showResults === false) ?
        <div>
          <Heading
            showSection={showSection}
            setShowSection={setShowSection}
            showHeading={showHeading}
            setShowHeading={setShowHeading}
            setShowResults={setShowResults}
            heading={heading}
            setHeading={setHeading}
            surveyId={surveyId}
            setSurveyId={setSurveyId}
            answers={answers}
            setAnswers={setAnswers}
            setShowLoading={setShowLoading}
            setq1Results={setq1Results}
            setq2Results={setq2Results}
            setq3Results={setq3Results}
            setq4Results={setq4Results}
            setCustomQuestions={setCustomQuestions}
            setCustomTools={setCustomTools}
            setCustomPersons={setCustomPersons}>
          </Heading>
          {categories.map((category, i) => (
            <QuestionSection
              answers={answers}
              setAnswers={setAnswers}
              questions={questions}
              customQuestions={customQuestions}
              section={categories[i]}
              showSection={showSection}
              setShowSection={setShowSection}
              sectionIndex={i}>
            </QuestionSection>
          ))
          }
          <Submit
            answers={answers}
            questions={questions}
            showSection={showSection}
            q1Results={q1Results}
            setq1Results={setq1Results}
            q2Results={q2Results}
            setq2Results={setq2Results}
            q3Results={q3Results}
            setq3Results={setq3Results}
            showResults={showResults}
            q4Results={q4Results}
            setq4Results={setq4Results}
            setShowLoading={setShowLoading}
            setShowResults={setShowResults}
            setShowSection={setShowSection}
            showHeading={showHeading}
            surveyId={surveyId}
            heading={heading}
            toolsToUse={toolsToUse}
            peopleToInvite={peopleToInvite}
            customQuestions={customQuestions}
            customTools={customTools}
            customPersons={customPersons} />
        </div>
        : ( 
            <div>
              <div hidden={!showResults}>
                {/*<Document
                  file="asset_management.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>*/}
                <Typography variant="h4" style={titleObj}>
                  Recommendations for Executing the Constructability Review Process for "{heading}"
                </Typography>
                <div style={{display: "flex"}}>
                  <Typography variant="h4" style={styleObj}>
                    I. {q1Results}
                  </Typography>
                  {q1Results !== "It is recommended that this project receive no Constructability Review Process." &&
                    <IconButton variant="outlined" color="primary">
                      <InfoIcon onClick={() => window.open("output1_popup.pdf", "_blank")} />

                    </IconButton>
                  }
                  <Dialog
                    open={openQ1Dialog}
                    onClose={handleQ1PopupClose}
                    // fullScreen="true"
                    maxWidth="lg"
                  >
                    <IconButton onClick={handleQ1PopupClose}>
                      <CloseIcon />
                    </IconButton>
                    <DialogContent>
                      <Document
                      file="output1_popup.pdf"
                      onLoadSuccess={onDocumentLoadSuccess}
                      externalLinkTarget="_blank"
                      style={styleObj}
                      >
                      <Page pageNumber={pageNumber} scale="1.2" />
                      </Document>
                    </DialogContent>
                  </Dialog>
                </div>
                {q1Results !== "It is recommended that this project receive no Constructability Review Process." &&
                <div>
                <Typography variant="h4" style={styleObj}>
                  II. Recommended tools for use in this project's Constructability Review Process
                </Typography>
                {q2CoreGroup.concat(q2Results).map((tool, i) => (
                  <Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={1}>
                      <Typography variant="h6" style={questionNumberObj}>
                        {i+1}. 
                      </Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <div style={{display: "flex"}}>
                        <Typography variant="h6" style={coreGroupObj}>
                          {tool}
                        </Typography>
                        { tool in toolPdf &&
                          <IconButton style={infoButtonStyle} variant="outlined" color="primary" onClick={(t) => handleQ2PopupOpen(tool)}>
                            <InfoIcon />
                          </IconButton>
                        }
                        <Dialog
                          open={openQ2PopupDialogs[testToolPdf.indexOf(tool)]}
                          onClose={handleQ2PopupClose}
                          // fullScreen="true"
                          maxWidth="lg"
                        >
                          <IconButton onClick={handleQ2PopupClose}>
                            <CloseIcon />
                          </IconButton>
                          <DialogContent>
                            <Document
                            file={toolPdf[tool]}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            onSourceError={onDocumentLoadError}
                            externalLinkTarget="_blank"
                            style={styleObj}
                            >
                            <Page pageNumber={pageNumber} scale="1.2" />
                            </Document>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </Grid>
                  </Grid>

                ))}
                <div style={{display: "flex"}}>
                <Typography variant="h4" style={styleObj}>
                  III. Recommended people to include in this project's Constructability Review Process
                </Typography>
                <IconButton variant="outlined" color="primary" onClick={handleQ3PopupOpen}>
                  <InfoIcon />
                </IconButton>
                <Dialog
                  open={openQ3Dialog}
                  onClose={handleQ3PopupClose}
                  // fullScreen="true"
                  maxWidth="lg"
                >
                  <IconButton onClick={handleQ3PopupClose}>
                    <CloseIcon />
                  </IconButton>
                  <DialogContent>
                    <Document
                    file="output3_popup.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    externalLinkTarget="_blank"
                    style={styleObj}
                    >
                    <Page pageNumber={pageNumber} scale="1.2" />
                    </Document>
                  </DialogContent>
                </Dialog>
                </div>
                <div style={{display:"flex"}}>
                  <Typography variant="h6" style={blueStyleObj}>
                    Blue: In-house
                  </Typography>
                  <Typography variant="h6" style={redStyleObj}>
                    Red: Outsourced
                  </Typography>
                  <Typography variant="h6" style={styleObj}>
                    Black: Either In-house or Outsourced
                  </Typography>
                </div>
                <Typography variant="h6" style={styleObj}>
                  Core Group
                </Typography>
                {q3CoreGroup.map((person, i) => (
                  <Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={1}>
                      <Typography variant="h6" style={determinePersonTypeNumber(person)}>
                        {" - "} 
                      </Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography variant="h6" style={determinePersonType(person)}>
                        {person}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
                <Typography variant="h6" style={styleObj}>
                  Recommended People
                </Typography>
                {q3Results.map((person, i) => (
                  <Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={1}>
                      <Typography variant="h6" style={determinePersonTypeNumber(person)}>
                        {i+1}. 
                      </Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography variant="h6" style={determinePersonType(person)}>
                        {person}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}

                <div style={{display: "flex"}}>
                <Typography variant="h4" style={styleObj}>
                  IV. {q4Results}
                </Typography>
                <IconButton variant="outlined" color="primary" onClick={handleQ4PopupOpen}>
                  <InfoIcon />
                </IconButton>
                <Dialog
                  open={openQ4Dialog}
                  onClose={handleQ4PopupClose}
                  maxWidth="lg"
                >
                  <IconButton onClick={handleQ4PopupClose}>
                    <CloseIcon />
                  </IconButton>
                  <DialogContent>
                    <Document
                      file="output4_popup.pdf"
                      onLoadSuccess={onDocumentLoadSuccess}
                      externalLinkTarget="_blank"
                      style={styleObj}
                      >
                      <Page pageNumber={pageNumber} scale="1.2" />
                    </Document>
                  </DialogContent>
                </Dialog>
                </div>
                </div>
                }
                <Button variant="contained" onClick={startNew} style={bottomButtonStyle}>
                  Start Over
                </Button>
                <Button variant="contained" onClick={printResults} style={bottomButtonStyle}>
                  Print Results
                </Button>
              </div>
              <Typography hidden={!showLoading} variant="h2" style={centerObj}> Analyzing your responses</Typography>
              <div hidden={!showLoading}><CircularProgress /></div>
            </div>
          )
          
      }
    </div>

  );
}
export default App;
// export {useGlobalState};