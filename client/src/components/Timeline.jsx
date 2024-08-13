import React from 'react';

const Timeline = ({ projects, timelineTitle }) => (
  <section className="timeline">
    <h2>{timelineTitle}</h2>
    <div className="timeline-container">
      {projects.map((project, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-content">
            <h3>{project.year} : {project.title}</h3>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Timeline;