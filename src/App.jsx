import { useState } from 'react';
import './App.css';

const careerImages = {
  'Astronaut': '/public/Astronaut.webp',
  'Astrophysicist': '/public/Astrophysicist.webp',
  'Satellite Engineer': '/public/Satellite Engineer.webp',
  'Mission Control Specialist': '/public/Mission Control Specialist.webp',
  'Space Robotics Engineer': '/public/Space Robotics Engineer.webp',
  'Space Weather Scientist': '/public/Space Weather Scientist.webp',
  'Aerospace Engineer': '/public/Aerospace Engineer.webp',
  'Planetary Geologist': '/public/Planetary Geologist.webp',
  'Space Policy Analyst': '/public/Space Policy Analyst.webp'
};

const careerDescriptions = {
  'Astronaut': 'Trains for and travels into space to conduct missions, experiments, and maintenance on spacecraft.',
  'Astrophysicist': 'Studies celestial bodies and the universe using physics to understand the nature of space and time.',
  'Satellite Engineer': 'Designs, develops, and tests satellites for communication, observation, and research purposes.',
  'Mission Control Specialist': 'Coordinates and monitors space missions from Earth-based stations.',
  'Space Robotics Engineer': 'Builds robotic systems used in space exploration and spacecraft maintenance.',
  'Space Weather Scientist': 'Studies solar activity and space weather effects on Earth and satellites.',
  'Aerospace Engineer': 'Designs and tests aircraft, spacecraft, and related systems and equipment.',
  'Planetary Geologist': 'Analyzes the structure, composition, and history of planets and moons.',
  'Space Policy Analyst': 'Researches and develops policies regarding space exploration and international cooperation.'
};

const spaceCareers = Object.keys(careerImages);

const interestOptions = [
  'Engineering', 'Astronomy', 'Physics', 'Space Medicine', 'AI & Robotics', 'Satellite Technology', 'Astrobiology'
];

const questions = [
  "Do you enjoy working in a team or independently?",
  "Do you prefer hands-on work or theoretical research?",
  "Are you more interested in human space exploration or robotic missions?",
  "Do you enjoy coding and working with AI?",
  "Would you like to study planets and celestial bodies?"
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    fieldOfInterest: interestOptions[0],
    responses: Array(questions.length).fill('')
  });
  const [career, setCareer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    const updatedResponses = [...formData.responses];
    updatedResponses[currentQuestion - 1] = value;
    setFormData({ ...formData, responses: updatedResponses });

    setTimeout(() => {
      if (currentQuestion < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmit();
      }
    }, 500);
  };

  const handleSubmit = () => {
    const matchedCareer = spaceCareers[Math.floor(Math.random() * spaceCareers.length)];
    setCareer(matchedCareer);
  };

  return (
    <div className="app">
      <h1>Find Your Space Career</h1>
      {!career ? (
        <form onSubmit={(e) => e.preventDefault()}>
          {currentQuestion === 0 && (
            <>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
              
              <label>Age:</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your age" />
              
              <label>Field of Interest:</label>
              <select name="fieldOfInterest" value={formData.fieldOfInterest} onChange={handleChange}>
                {interestOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <button type="button" onClick={() => setCurrentQuestion(1)}>Next</button>
            </>
          )}

          {currentQuestion > 0 && currentQuestion <= questions.length && (
            <div>
              <label>{questions[currentQuestion - 1]}</label>
              <select value={formData.responses[currentQuestion - 1]} onChange={handleQuestionChange}>
                <option value="">Select an answer</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          )}
        </form>
      ) : (
        <div className="result">
          <h2>Your Recommended Space Career:</h2>
          <p>Click on an image to learn more about each career.</p>
          <img
            src={careerImages[career]}
            alt={career}
            style={{ width: '300px', borderRadius: '10px', cursor: 'pointer' }}
            onClick={() => setShowInfo(!showInfo)}
          />
          <p>{career}</p>

          {showInfo && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              textAlign: 'left',
              color: '#fff'
            }}>
              <h3>About the {career}:</h3>
              <p>{careerDescriptions[career]}</p>
            </div>
          )}<button
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#ffffff',
            color: '#000',
            fontSize: '16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          onClick={() => {
            setFormData({
              name: '',
              age: '',
              fieldOfInterest: interestOptions[0],
              responses: Array(questions.length).fill('')
            });
            setCareer(null);
            setCurrentQuestion(0);
            setShowInfo(false);
          }}
        >
          Try Again
        </button>
        
        </div>
      )}
    </div>
  );
}

export default App;
