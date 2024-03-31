import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionChart from "./QuestionChart";

import {
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import Container from "../../Container";
const FacultyRatingshow = () => {
  const { facultyId } = useParams();
  console.log("hello mf ", facultyId);
  const [ratinglist, setratinglist] = useState([]);
  const totalrating = {
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
  };
  useEffect(() => {
    const fetch = async () => {
      const fetchedrating = await axios.get(
        `https://studentfeedback-backend.onrender.com/fetchfacultyratings/${facultyId}`
      );
      console.log("hello fy", fetchedrating.data[0].ratings);
      setratinglist(fetchedrating.data[0].ratings);
      console.log("tori vega", ratinglist);
    };
    fetch();
  }, []);
  const questionLabels = {
    question1: "How would you rate the Faculty content?",
    question2: "How would you rate the instructor's teaching style?",
    question3: "How would you rate the Faculty difficulty?",
    question4: "How would you rate the Faculty workload?",
    question5: "How would you rate the overall Faculty experience?",
  };
  const question = [
    "How would you rate the Faculty content?",
    "How would you rate the instructor's teaching style?",
    "How would you rate the Faculty difficulty?",
    "How would you rate the Faculty workload?",
    "How would you rate the overall Faculty experience?",
  ];
  console.log(ratinglist);
  ratinglist.forEach((student) => {
    for (let question in student) {
      if (question.startsWith("question")) {
        totalrating[question] += student[question];
      }
    }
  });
  console.log(totalrating);
  const numberOfStudents = ratinglist.length;

  let averageRatings = {};
  for (let question in totalrating) {
    averageRatings[question] = (
      totalrating[question] / numberOfStudents
    ).toFixed(1);
  }
  console.log(averageRatings);

  //preparing data
  const chartData = Object.keys(averageRatings).map((questionKey) => ({
    name: questionLabels[questionKey], // Use the actual question text
    averageRating: averageRatings[questionKey],
  }));
  console.log(chartData);

  return (
    <Container>
      <div className="container mt-3 mb-3 ">
        <div className="row">
          <div className="col-md-12 ">
            <div className="card border border-secondary rounded">
              <div className="card-header">
                <h3>Faculty Ratings</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="chart-container">
                      <BarChart
                        width={600}
                        height={300}
                        data={chartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          label={{
                            value: "Average Rating",
                            angle: -90,
                            position: "insideLeft",
                          }}
                          domain={[0, 5]}
                          ticks={[1, 2, 3, 4, 5]}
                          tickFormatter={(tickValue) =>
                            parseFloat(tickValue).toFixed(1)
                          }
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageRating" fill="green" />
                      </BarChart>
                    </div>
                  </div>
                  <div className="col-md-6 border border-dark rounded">
                    <h1>Rating Based On Questions</h1>
                    <div className=" mt-5">
                      <ul>
                        <li>
                          {" "}
                          <h5> How would you rate the Faculty content?</h5>
                        </li>
                        <li>
                          {" "}
                          <h5>
                            How would you rate the instructor's teaching style?
                          </h5>
                        </li>
                        <li>
                          {" "}
                          <h5> How would you rate the Faculty difficulty?</h5>
                        </li>
                        <li>
                          {" "}
                          <h5> How would you rate the Faculty workload?</h5>
                        </li>
                        <li>
                          {" "}
                          <h5>
                            {" "}
                            How would you rate the overall Faculty experience?
                          </h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <center>
                  <h1 className="mt-4 mb-4   pt-4 pb-4 rounded bg-info">
                    OverAll Rating
                  </h1>
                </center>
                <div className="row">
                  {Object.keys(averageRatings).map((questionKey, index) => {
                    const questionText = questionLabels[questionKey];
                    const averageRating = averageRatings[questionKey];
                    return (
                      <div className="col-md-6" key={index}>
                        <QuestionChart
                          questionText={questionText}
                          abridgedRating={averageRating}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FacultyRatingshow;
