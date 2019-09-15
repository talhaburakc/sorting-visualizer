const Styles = theme => ({
    button: {
      display: 'inline-block',
      backgroundColor: '#3f51b5',
      color: 'white',
      margin: 10,
      '&:hover': {
        backgroundColor: '#5f71d4',
      }
    },
    historySlider: {
      width: 80 + '%',
      display: 'block',
      margin: 'auto',
      marginTop: 20
    },
    topSlider: {
      display: 'inline-block',
      width: 40 + '%'
    }
  });

 export default Styles;