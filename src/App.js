import './App.scss'

import {
  Link,
  Route,
  HashRouter as Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react'
import { changeCodeName, changeGameCode, changeName, isHost } from './actions'
import { useDispatch, useSelector } from 'react-redux'

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CanvasDraw from "react-canvas-draw";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { RouterRounded } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
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
            <Route exact path="/write">
              <WriteCard />
            </Route>
            <Route exact path="/draw">
              <DrawCard />
            </Route>
            <Route exact path="/done">
              <DoneCard />
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
  const location = useLocation()
  const [playerObj, setPlayerObj] = useState({})


  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)


  useEffect(() => {
    if (isHost) {
      db.set({})
    }
    db.update({
      [`players.${name.code}`]: { ...name, isHost: isHost },
      gameStarted: false
    })
  }, [])


  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('rooms')
      .doc(`${gameCode}`)
      .onSnapshot((snap) => {
        if (location.pathname === "/lobby") {
          if (snap?.data()) {
            console.log(snap?.data())
            setPlayers(Object.values(snap.data().players))
            setPlayerObj(snap.data().players)
            setGameStarted(snap.data().gameStarted)
          }
        }
      })
    return () => unsubscribe()
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
    db.update({ round: 0, rounds: len + 1, players: playerObject })
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
  const db = firebase.firestore().collection('rooms')
  const dispatch = useDispatch()
  const history = useHistory();
  const [error, setError] = useState(false)
  const joinGame = (params) => {
    if (joinCode === "")
      return

    db.doc(joinCode).get().then(
      doc => {
        if (doc.exists) {
          dispatch(changeGameCode(joinCode))
          history.push("/lobby")
        }
        else {
          setError(true)
        }
      }
    )
  }




  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Joina spel
        </Typography>
      </CardContent>
      <form onSubmit={e => {
        e.preventDefault();
        joinGame()
      }}>
        <CardActions >
          <TextField value={joinCode} id="outlined-basic" label="Anslutningskod" variant="outlined" onChange={(e) => setJoinCode(e.target.value)} />
        </CardActions>
        <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
          <Link to="/"><Button size="small" color="primary" onClick={() => {
          }}>Avbryt </Button></Link>
          <Button size="small" color="primary" type="submit" >
            Hitta spel </Button>
          <Snackbar open={error} autoHideDuration={6000} onClose={() => { setError(false) }}>
            <Alert severity="error">Hittade ingets spel</Alert>
          </Snackbar>
        </CardActions>
      </form>
    </Card >
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
  const location = useLocation()


  useEffect(() => {

    const unsubscribe = db.onSnapshot((snap) => {
      if (location.pathname === "/write") {
        if (snap.data()) {
          const tempPlayers = snap.data().players
          const tempRound = snap.data().round
          setPlayers(tempPlayers)
          setRound(tempRound)
          setNrOfReady(Object.values(tempPlayers).filter(elem => elem.ready).length)
          setNrOfPlayers(Object.values(tempPlayers).length)
        }
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

const DrawCard = () => {
  // skulle kunna sätta statet i local storage och ha som backup om man råkar uppdatera sidan
  const name = useSelector(state => state.name.code)
  const gameCode = useSelector(state => state.game.gameCode)
  const ref = useRef("")
  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)
  const [players, setPlayers] = useState([])
  const [word, setWord] = useState("")
  const [text, setText] = useState("")
  const [round, setRound] = useState(0)
  const [nrOfReady, setNrOfReady] = useState(0)
  const [nrOfPlayers, setNrOfPlayers] = useState(99)
  const [ready, setReady] = useState(false)
  const [resetRound, setResetRound] = useState(false)
  const [drawRound, setDrawRound] = useState()
  const history = useHistory();
  const location = useLocation()



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
    if (resetRound === true) {
      setReady(false)
    }
    const unsubscribe = db.onSnapshot((snap) => {
      if (location.pathname === "/draw") {
        if (snap.data()) {
          const tempPlayers = snap.data().players
          const tempRound = snap.data().round
          const tempNrOfPlayers = Object.values(tempPlayers).length
          if (tempRound === tempNrOfPlayers) {
            history.push('/done')
          }
          else {
            setPlayers(tempPlayers)
            setRound(tempRound)
            const tempDrawRound = !!(round % 2 === 0)
            setNrOfReady(Object.values(tempPlayers).filter(elem => elem.ready).length)
            setNrOfPlayers(Object.values(tempPlayers).length)
            const playerOfWord = tempPlayers[name].order[tempRound]
            setDrawRound(tempDrawRound)
            setWord(tempPlayers[playerOfWord][tempRound - 1])
          }
        }
      }
    })
    setResetRound(false)
    return () => unsubscribe()
  }, [resetRound])

  useEffect(() => {
    if (word) {
      if (drawRound) {
        ref.current.clear()
      }
      else {
        const playerOfWord = players[name].order[round]
        ref.current.loadSaveData(players[playerOfWord][round - 1], true)
      }
    }
  }, [drawRound])

  const handleDone = (e) => {
    e.preventDefault()

    if (text === "" && !drawRound) {
      return
    }
    setReady(true)
    const tempPlayer = players[name]
    tempPlayer.ready = true
    tempPlayer[round] = drawRound ? ref.current.getSaveData() : text
    var p = "players";
    var update = {};
    update[p + '.' + name] = tempPlayer;
    db.update(update)
  }

  useEffect(() => {
    if (nrOfReady === nrOfPlayers) {
      if (isHost) {
        db.update({ round: round + 1 })
        const tempPlayers = players
        Object.keys(players).forEach((elem) => tempPlayers[elem].ready = false)
        db.update({ round: round + 1, players: tempPlayers })
      }
      setResetRound(true)
    }
  }, [nrOfReady])

  return (
    <Container maxWidth="sm" className="container" >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center" }}>
          {drawRound && `Rita ${word}`}
        </Typography>

      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: 'space-around', justifyContent: 'center' }}>
        <CanvasDraw disabled={ready} ref={ref} />
      </CardActions>
      {!drawRound && <CardActions style={{ display: "flex", justifyContent: 'space-around', justifyContent: 'center' }}>
        <form onSubmit={(e) => handleDone(e)}> <TextField disabled={ready || drawRound} id="standard-basic" label="" value={text} onChange={(e) => { setText(e.target.value) }} /></form>
      </CardActions>
      }
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

const DoneCard = (props) => {
  const gameCode = useSelector(state => state.game.gameCode)
  const name = useSelector(state => state.name.code)

  const db = gameCode && firebase.firestore().collection('rooms').doc(`${gameCode}`)
  const [players, setPlayers] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    db.get().then(
      doc => {
        if (doc.exists) {
          setPlayers(doc.data().players);
        }
      }
    )
  }, [])

  return (
    <Container maxWidth="sm" className="container" >
      <CardContent>
        {players && <h2 style={{ textAlign: 'center' }}>{players[name].userName}</h2>}
      </CardContent>
      {players && Object.keys(players).map((elem, index) => <div>{index % 2 === 0 ? <h2 style={{ textAlign: "center" }}>{players[elem][index]}</h2> : <div style={{ display: "flex", justifyContent: 'space-around', justifyContent: 'center' }}> <CanvasDraw disabled={true} saveData={players[elem][index]} /></div>}</div>)
      }
      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Link to="/"> <Button size="small" color="primary" onClick={() => {
          if (db) {
            db.delete();
            dispatch(changeCodeName())
          }
        }
        }>Tillbaka</Button></Link>
      </CardActions>
    </Container >
  )
}


export default App;