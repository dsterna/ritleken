import './App.scss'

import {
  Link,
  Route,
  HashRouter as Router,
  Switch,
  useHistory
} from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { changeGameCode, changeName, isHost } from './actions'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button';
import CanvasDraw from "react-canvas-draw";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import firebase from './config'
import temp from './assets/img/temp.jpg'

function App() {


  return (
    <div >
      <Router>
        <div className="wapper">
          <Switch>
            <Route exact path="/lobby">
              <LobbyCard />
            </Route>
            <Route exact path="/join">
              <JoinCard />
            </Route>
            <Route exact path="/draw">
              <DrawCard />
            </Route>
            <Route exact path="/write">
              <WriteCard />
            </Route>
            <Route path="/">
              <StartCard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );


}


const StartCard = (props) => {
  const name = useSelector(state => state.name)
  const dispatch = useDispatch()

  return (
    <Container maxWidth="sm" className="container" >
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

        <Link to="/join"><Button size="small" color="primary" onClick={() => {
          dispatch(isHost(false))

        }}>Joina spel  </Button></Link>




        <Link to="/lobby"> <Button size="small" color="primary" onClick={() => {

          dispatch(isHost(true))
          dispatch(changeGameCode(name.code))

        }
        }>Skapa rum</Button></Link>

      </CardActions>
    </Container>
  )
}

const LobbyCard = (props) => {
  const [players, setPlayers] = useState([])
  const name = useSelector(state => state.name)
  const isHost = useSelector(state => state.game.isHost)
  const gameCode = useSelector(state => state.game.gameCode)
  const history = useHistory();
  const [customName, setCustomName] = useState(name.userName)
  const dispatch = useDispatch()

  useEffect(() => {
    function getPlayers() {
      const unsubscribe = firebase
        .firestore()
        .collection('rooms')
        .doc(`${gameCode}`)
        .onSnapshot((snap) => {
          if (snap.data())
            setPlayers(Object.values(snap.data()))
        })
      return () => unsubscribe()
    }

    if (gameCode === "") {
      history.push("/");
    }
    else {
      firebase
        .firestore()
        .collection('rooms').doc(`${gameCode}`).set({ [name.code]: { ...name, isHost: true } }, { merge: true })
        .then(() => getPlayers())
    }


  }, [gameCode, history, name])

  const handleNameChange = (e) => {
    e.preventDefault()
    dispatch(changeName(customName))
    firebase
      .firestore()
      .collection('rooms').doc(`${gameCode}`).update({ [name.code]: { ...name, userName: customName } })
  }

  return (

    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Lobby {gameCode}
        </Typography>
        <ul>
          {players.map(elem => <li key={elem.code}>{elem.userName}</li>)}
        </ul>
      </CardContent>
      <CardActions >
      </CardActions>
      <form onSubmit={(e) => handleNameChange(e)}>
        <TextField value={customName} id="outlined-basic" label="Namn" variant="outlined" onChange={(e) => setCustomName(e.target.value)} />
        {/* <Button size="small" type="submit">Spara Namn</Button> */}
      </form>
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>

        <Link to="/">   <Button size="small" color="primary" onClick={() => {

        }}>Avbryt </Button></Link>
        {isHost && <Link to="/write"><Button size="small" color="primary" onClick={() => {
        }}> Starta  </Button>
        </Link>}
      </CardActions>
    </Card>
  )
}
const JoinCard = (props) => {
  const [joinCode, setJoinCode] = useState(1234)
  const dispatch = useDispatch()
  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Joina spel
        </Typography>

      </CardContent>
      <CardActions >
        <TextField value={joinCode} id="outlined-basic" label="Anslutningskod" variant="outlined" onChange={(e) => setJoinCode(e.target.value)} />
      </CardActions>

      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>

        <Link to="/"><Button size="small" color="primary" onClick={() => {

        }}>Avbryt </Button></Link>


        <Link to="/lobby"><Button size="small" color="primary" onClick={() => {
          // todo: kör en find och kolla om spelet finns, om nej, redirecta inte 
          dispatch(changeGameCode(joinCode))
        }
        }>Hitta spel </Button></Link>

      </CardActions>
    </Card>
  )
}


const WriteCard = (props) => {
  const handleDone = (e) => {
    e.precentDefault()
  }

  return (
    <Container maxWidth="sm" className="container" >

      <CardContent>
        <Typography gutterBottom variant="h5" component="h3" style={{ marginBottom: 0 }}>
          Skriv ditt ord:
        </Typography>

      </CardContent>
      <CardActions>
        <form onSubmit={() => handleDone()}> <TextField id="standard-basic" label="" /></form>
      </CardActions>
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>




        <Link to="/draw">
          <Button size="small" color="primary" onClick={() => {

          }
          }>Redo</Button> </Link>

      </CardActions>
    </Container>
  )
}

const DrawCard = (props) => {
  const name = useSelector(state => state.name)
  const dispatch = useDispatch()

  return (
    <Container maxWidth="sm" className="container" >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {`Rita en ${''}`}
        </Typography>

      </CardContent>
      <CardActions > <CanvasDraw /></CardActions>
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Link to="/write"><Button size="small" color="primary" onClick={() => {
          dispatch(isHost(false))
        }}>Redo  </Button></Link>
      </CardActions>
    </Container>
  )
}

export default App;