import React from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';

function Poem(props) {
  return (
    <div>
      <h1>React Accordion</h1>
      <Accordion atomic={true}>
        <AccordionSummary title="Title 1">
        <Typography variant='h5'>Collapsible Group Item #1</Typography>
        </AccordionSummary>  
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion atomic={true}>
        <AccordionSummary title="Title 1">
        <Typography variant='h5'>Collapsible Group Item #1</Typography>
        </AccordionSummary>  
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion atomic={true}>
        <AccordionSummary title="Title 1">
        <Typography variant='h5'>Collapsible Group Item #1</Typography>
        </AccordionSummary>  
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
  </div>
  )
};

export default Poem;