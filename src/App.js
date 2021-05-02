import './App.scss'

import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DialpadIcon from '@material-ui/icons/Dialpad';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Switch from "@material-ui/core/Switch";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import firebase from './config'
import temp from './assets/img/temp.jpg'

// After
function App() {
  const [state, setState] = useState([])
  const [checked, setChecked] = useState(false);
  const [joining, setJoining] = useState(false)
  const [hosting, setHosting] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('rooms')
      .onSnapshot((snap) => {
        const temp = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setState(temp)
      })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <Paper elevation={4} >
          <svg >
            <polygon points="0,100 50,00, 100,100" />
          </svg>
        </Paper>
      </Slide>
      <div className="wapper">
        {!joining && !hosting &&
          <StartCard setHosting={setHosting} setJoining={setJoining} />
        }
        {joining && <JoinCard setHosting={setHosting} setJoining={setJoining} />}
        {hosting && <LobbyCard setHosting={setHosting} setJoining={setJoining} state={state} />}
      </div>
    </>

  );


}
const LobbyCard = (props) => {
const {state} = props
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('rooms').add({ code: "hej", players: [{ name: "host" }] })
    return () =>
      unsubscribe()

  }, [])

  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Lobby 12345
      </Typography>
        <ul>
          {state.map(elem => <li>elem</li>)}
        </ul>
      </CardContent>
      <CardActions >
      </CardActions>

      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>

        <Button size="small" color="primary" onClick={() => {
          props.setJoining(false)
          props.setHosting(false)
        }}>
          Avbryt
      </Button>
        <Button size="small" color="primary" disabled={true}>
          Starta Spel
    </Button>
      </CardActions>
    </Card>
  )
}
const JoinCard = (props) => {
  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Kod:
        </Typography>

      </CardContent>
      <CardActions >

        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </CardActions>

      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Button size="small" color="primary" onClick={() => {
          props.setJoining(false)
          props.setHosting(false)
        }}>
          Avbryt
      </Button>
        <Button size="small" color="primary">
          Hitta lobby
      </Button>
      </CardActions>
    </Card>
  )
}

const StartCard = (props) => {
  return (
    <Card className="card-class">
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={temp}
        title="tmep"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Ritleken
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe non rem inventore repellendus est exercitationem nihil earum consequatur libero corrupti?
        </Typography>
      </CardContent>

      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Button size="small" color="primary" onClick={() => {
          props.setJoining(true)
        }}>
          Joina spel
      </Button>
        <Button size="small" color="primary" onClick={() =>
          props.setHosting(true)
        }>
          Skapa rum
      </Button>
      </CardActions>
    </Card>
  )
}

export default App;