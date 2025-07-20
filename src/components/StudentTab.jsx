import React, { useState } from 'react';
import { Play, CheckCircle, Clock, BookOpen, Code, FileText, Star } from 'lucide-react';

const StudentTab = ({ course }) => {
  const [completedLessons, setCompletedLessons] = useState([1, 2]);

  const lessons = [
    { id: 1, title: 'Introduction to React', duration: '15 min', type: 'video' },
    { id: 2, title: 'Setting up Your Environment', duration: '20 min', type: 'video' },
    { id: 3, title: 'Your First Component', duration: '25 min', type: 'video' },
    { id: 4, title: 'Props and State', duration: '30 min', type: 'video' },
    { id: 5, title: 'Event Handling', duration: '22 min', type: 'video' },
    { id: 6, title: 'Conditional Rendering', duration: '18 min', type: 'video' },
  ];

  const assignments = [
    { id: 1, title: 'Build a Todo App', dueDate: '2025-01-25', status: 'pending', points: 100 },
    { id: 2, title: 'React Component Library', dueDate: '2025-02-01', status: 'not started', points: 80 }
  ];

  return (
    <div className="student-tab">
      <h2>Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            {completedLessons.includes(lesson.id) ? <CheckCircle color="green" /> : <Play />}
            {lesson.title} - {lesson.duration}
          </li>
        ))}
      </ul>

      <h2>Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <BookOpen /> {assignment.title} — Due: {assignment.dueDate} — Status: {assignment.status} — Points: {assignment.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentTab;
