import './App.scss'

import {
  Link,
  Route,
  HashRouter as Router,
  Switch,
  useHistory
} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'
import { changeGameCode, changeName, isHost, setNrOfPlayers } from './actions'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button';
import CanvasDraw from "react-canvas-draw";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  const name = useSelector(state => state.name)
  const isHost = useSelector(state => state.game.isHost)
  const gameCode = useSelector(state => state.game.gameCode)
  const [players, setPlayers] = useState([])
  const [customName, setCustomName] = useState(name.userName)
  const [gameStarted, setGameStarted] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()
  const [playerObj, setPlayerObj] = useState({})


  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)






  useEffect(() => {
    async function getPlayers() {
      const unsubscribe = firebase
        .firestore()
        .collection('rooms')
        .doc(`${gameCode}`)
        .onSnapshot((snap) => {
          if (snap.data()) {
            setPlayers(Object.values(snap.data().players))
            setPlayerObj(snap.data().players)
          }
          setGameStarted(snap.data().gameStarted)
        })
      return () => unsubscribe()
    }

    if (gameCode === "") {
      history.push("/");
    }
    else {
      if (isHost) {
        db.set({})
      }
      db.update({
        [`players.${name.code}`]: { ...name, isHost: isHost },
        gameStarted: false
      }).then(() => getPlayers());
      ;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let newName = customName !== "" ? customName : `player-${name.code}`
      dispatch(changeName(newName))
      try {
        db.update({
          [`players.${name.code}`]: { ...name, userName: newName, isHost: isHost },
          gameStarted: false
        })
      } catch {
      }
    };
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customName]);

  const setUpGameQueue = () => {

    let len = players.length - 1
    let playerObject = playerObj

    players.forEach((elem, i) => {
      playerObject[elem.code].order = players.map((_, ii) => players[(i + ii > len ? ii + i - len - 1 : i + ii)].code)
      playerObject[elem.code].ready = false

    })

    // dispatch(setNrOfPlayers(len + 1))

    db.update({ round: 0, rounds: len + 1, players: playerObject })


    /**
     * 
     * [ 1 , 2, 3, 4 ]
     * 
     * 1->2->3->4
     * 2->-3-4->1
     * 3->4->1->2
     * 4->1->2->3
     */
  }


  useEffect(() => {
    if (gameStarted) {

      history.push("/write")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted])

  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Lobby {gameCode}
        </Typography>
        <h3>{!gameStarted ? "Väntar" : "Startad"}</h3>
        <ul>
          {players.map((elem) => <li key={elem.code}>{elem.userName}</li>)}
        </ul>
      </CardContent>
      <CardActions >
      </CardActions>

      <TextField value={customName} id="outlined-basic" label="Namn" variant="outlined" onChange={(e) => {
        setCustomName(e.target.value)
      }} />
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Link to="/">   <Button size="small" color="primary" onClick={() => {
        }}>Avbryt </Button></Link>
        {isHost && <Button size="small" color="primary" onClick={() => {
          setUpGameQueue()
          db.update({ gameStarted: true })
        }}> Starta  </Button>
        }
      </CardActions>
    </Card>
  )
}
const JoinCard = (props) => {
  const [joinCode, setJoinCode] = useState('')
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
  // skulle kunna sätta statet i local storage och ha som backup om man råkar uppdatera sidan
  const name = useSelector(state => state.name.code)
  // const nrOfPlayers = useSelector(state => state.game.nrOfPlayers)
  const gameCode = useSelector(state => state.game.gameCode)

  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)
  const [nrOfPlayers, setNrOfPlayers] = useState(99)
  const [players, setPlayers] = useState([])
  const [text, setText] = useState("")
  const [round, setRound] = useState(0)
  const [nrOfReady, setNrOfReady] = useState(0)
  const [ready, setReady] = useState(false)
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = db.onSnapshot((snap) => {
      if (snap.data()) {

        const tempPlayers = snap.data().players
        const tempRound = snap.data().round

        setPlayers(tempPlayers)
        setRound(tempRound)
        setNrOfReady(Object.values(tempPlayers).filter(elem => elem.ready).length)
        setNrOfPlayers(Object.values(tempPlayers).length)
      }
    })
    return () => unsubscribe()
  }, [])

  const handleDone = (e) => {
    e.preventDefault()
    if (text === "") {
      return
    }
    setReady(true)
    const tempPlayer = players[name]
    tempPlayer.ready = true
    tempPlayer[round] = text
    var p = "players";
    var update = {};
    update[p + '.' + name] = tempPlayer;
    db.update(update)
  }

  useEffect(() => {
    console.log("nrOfReady", nrOfReady)
    console.log("nrOfPlayers", nrOfPlayers)
    if (nrOfReady === nrOfPlayers) {
      if (isHost) {
        const tempPlayers = players
        Object.keys(players).forEach((elem) => tempPlayers[elem].ready = false)
        db.update({ round: round + 1, players: tempPlayers })
      }
      history.push("/draw")
    }
  }, [nrOfReady])

  return (
    <Container maxWidth="sm" className="container" >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3" style={{ marginBottom: 0, textAlign: "center" }}>
          Skriv ditt ord:
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: 'space-around', justifyContent: 'center' }}>
        <form onSubmit={(e) => handleDone(e)}> <TextField disabled={ready} id="standard-basic" label="" value={text} onChange={(e) => { setText(e.target.value) }} /></form>
        <br />
      </CardActions>
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ready}
              onChange={(e) => handleDone(e)}
              name="checkedB"
              color="primary"
              disabled={ready}
            />
          }
          label={`Redo (${nrOfReady})`}
        />
      </CardActions>
    </Container>
  )
}

const DrawCard = (props) => {
  // skulle kunna sätta statet i local storage och ha som backup om man råkar uppdatera sidan
  const name = useSelector(state => state.name.code)
  const gameCode = useSelector(state => state.game.gameCode)
  const ref = useRef("")
  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)
  const [players, setPlayers] = useState([])
  const [word, setWord] = useState("")
  
  const [round, setRound] = useState(0)
  const [nrOfReady, setNrOfReady] = useState(0)
  const [nrOfPlayers, setNrOfPlayers] = useState(99)
  const [ready, setReady] = useState(false)
  const history = useHistory();
 

/**
 * Have bool DrawRound that is rounds % 2 to get if Draw/write
 * 
 * On each allReady, check if rounds ==== nrOfPlayers
 * 
 * Remove word if !DrawRound
 * ShowTextEdit if Drawround
 * host sets reday status and increments rounds
 */

  useEffect(() => {
    const unsubscribe = db.onSnapshot((snap) => {
      if (snap.data()) {
        const tempPlayers = snap.data().players
        const tempRound = snap.data().round
        setPlayers(tempPlayers)
        setRound(tempRound)
        setNrOfReady(Object.values(tempPlayers).filter(elem => elem.ready).length)
        setNrOfPlayers(Object.values(tempPlayers).length)

        const playerOfWord = tempPlayers[name].order[tempRound]
        // console.log(tempPlayers)
        // console.log(tempRound)
        // console.log(playerOfWord)
        // console.log(tempPlayers[playerOfWord][tempRound - 1])
        setWord(tempPlayers[playerOfWord][tempRound - 1])
      }
    })
    return () => unsubscribe()
  }, [])

  const handleDone = (e) => {
    e.preventDefault()
    setReady(true)
    const tempPlayer = players[name]
    tempPlayer.ready = true
    tempPlayer[round] = ref.current.getSaveData()
    var p = "players";
    var update = {};
    update[p + '.' + name] = tempPlayer;
    db.update(update)
  }

  useEffect(() => {
    console.log("nrOfReady", nrOfReady)
    console.log("nrOfPlayers", nrOfPlayers)
    if (nrOfReady === nrOfPlayers) {
      console.log(ref.current)
      console.log(ref.current.getSaveData())

      if (isHost) {
        db.update({ round: round + 1 })
      }
      history.push("/draw")
    }
  }, [nrOfReady])

  return (
    <Container maxWidth="sm" className="container" >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>
          {`Rita ${word}`}
        </Typography>

      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: 'space-around', justifyContent: 'center' }}>
        <CanvasDraw disabled={ready} ref={ref} />
      </CardActions>
      <br></br>
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ready}
              onClick={(e) => handleDone(e)}
              name="checkedB"
              color="primary"
              disabled={ready}
            />
          }
          label={`Redo (${nrOfReady})`}
        />
      </CardActions>
    </Container>
  )
}

export default App;