import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { isHost } from './actions';

export const CircularProgressWithLabel = (props) => {
  const normalise = value => (value - 0) * 100 / (props.max - 0);

  const [toggleEnd, setToggleEnd] = useState(false)

  return (

    <div style={{


    }}  >
      <Box position="relative" display="inline-flex" onClick={() => props.isHost && setToggleEnd(!toggleEnd)}>
        <CircularProgress variant="determinate" value={normalise(props.value)} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}`}</Typography>
        </Box>
      </Box>
      {toggleEnd && <div style={{ width: "100%", }}>
        Avsluta runda?
        <br />
        <Button size="small" color="primary" onClick={() =>
          props.setNrOfReady(props.nrOfPlayers)}
        >Ja</Button><Button onClick={() => setToggleEnd(false)}>Nej</Button></div>}
    </div>

  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};