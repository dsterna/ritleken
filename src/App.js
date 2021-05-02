import './App.scss'

import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import firebase from './config'
import temp from './assets/img/temp.jpg'

// After
function App() {


  const [joining, setJoining] = useState(false)
  const [hosting, setHosting] = useState(false)
  const [gameJoined, setGameJoined] = useState(false)

  const [joinCode, setJoinCode] = useState(1234)
  const [hostCode, setHostcode] = useState(Math.floor(1000 + Math.random() * 9000))

  console.log(hostCode)
  return (
    <>
      <div className="wapper">
        {!joining && !hosting && !gameJoined &&
          <StartCard setHosting={setHosting} setJoining={setJoining} />
        }
        {joining && <JoinCard setHosting={setHosting} setJoinCode={setJoinCode} setJoining={setJoining} setGameJoined={setGameJoined} />}
        {(hosting === true || gameJoined == true) && <LobbyCard hosting={hosting} setHosting={setHosting} setJoining={setJoining} hostCode={gameJoined ? joinCode : hostCode} setGameJoined={setGameJoined}/>}
      </div>
    </>

  );


}
const LobbyCard = (props) => {
  const { joinCode, hosting, setGameJoined, setJoining, setHosting, hostCode } = props
  const [state, setState] = useState([])
  useEffect(() => {




    firebase
      .firestore()
      .collection('rooms').doc(`${hostCode}`).set({ players: [{ name: "host2" }] }, { merge: true })

    const unsubscribe = firebase
      .firestore()
      .collection('rooms')
      .doc(`${hostCode}`)
      .onSnapshot((snap) => {
        if (snap.docs?.length) {

          const temp = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setState(temp)
        }
      })
    return () => unsubscribe()

  }, [])
  // useEffect(() => {

  //   // .collection('rooms').add({ code: "hej", players: [{ name: "host" }] })
  //   //   washingtonRef.update({
  //   //     regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
  //   // });


  // }, [])

  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Lobby {hostCode}
        </Typography>
        <ul>
          {state.map(elem => <li>elem</li>)}
        </ul>
      </CardContent>
      <CardActions >
      </CardActions>

      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>

        <Button size="small" color="primary" onClick={() => {
          setJoining(false)
          setHosting(false)
          setGameJoined(false)
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
  const { joinCode, setJoinCode, setJoining, setHosting, setGameJoined } = props


  return (
    <Card className="card-class" style={{ padding: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Joinsa spel
        </Typography>

      </CardContent>
      <CardActions >

        <TextField value={joinCode} id="outlined-basic" label="Anslutningskod" variant="outlined" onChange={(e) => setJoinCode(e.target.value)} />
      </CardActions>

      <CardActions style={{ display: "flex", justifyContent: 'space-around' }}>
        <Button size="small" color="primary" onClick={() => {
          setJoining(false)
          setHosting(false)
        }}>
          Avbryt
      </Button>
        <Button size="small" color="primary" onClick={() =>  {
        setJoining(false)
          setHosting(false)
          setGameJoined(true)}}>
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