import React from 'react';
const Section = ({ id, title, children }) => (
    <section id={id}>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
  
  export default Section;