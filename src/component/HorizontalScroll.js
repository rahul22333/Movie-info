import { Paper, Container } from '@mui/material';
function HorizontalScroll(props) {
  return (<>
    <Container>
      <Paper
        style={{
          display: 'flex',
          overflow: 'auto', // Hide the scrollbar
          whiteSpace: 'nowrap', // Display cards in a single line
          padding: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            // Add some margin to the right to separate cards
            marginRight: '-10px',
          }}
        >
          {props.children}
        </div>
      </Paper>
    </Container>
  </>);
}

export default HorizontalScroll;

/* we can use this also 
<div className="horizontal-scroll-container">{props.children}</div>
 */