
//     console.log('-------------------------')
//     console.log("round: ", round)
//     obj2.forEach(element => {
//         console.log(element.round0)
//     });
//     round++
//     console.log('-------------------------')
//     console.log("round: ", round)


//     obj2.forEach((elem) => {
//         let nextPlayerIndex = elem.ary[round]
//         console.log(obj2.find(elem2 => elem2.index === nextPlayerIndex).round0)
//     })

//     round++
//     console.log('-------------------------')
//     console.log("round: ", round)
//     obj2.forEach((elem, index) => {
//         let nextPlayerIndex = elem.ary[round]
//         console.log(obj2.find(elem2 => elem2.index === nextPlayerIndex).round0)
//     })
//     console.log('-------------------------')

//     const obj3 = obj2.map((elem, index) => { return { ...elem, round1: `hej${index}` } })

//     obj3.forEach((elem, index) => {
//         let nextPlayerIndex = elem.ary[round]
//         console.log(obj3.find(elem2 => elem2.index === nextPlayerIndex)[`round${1}`])
//     })
// }


const hej = (params) => {
    let len = params.length - 1
    let hej = params.sort((a, b) => (a.code > b.code) ? 1 : -1)
    hej.forEach((element, i) => {
        let ary = [...hej].reverse()
        for (let ii = 0; ii < i+1; ii++) {
            ary.unshift(ary.pop());
        }
        element.order = ary.map(elem => elem.code)
        element.ready = false
    });
    console.log(hej)

}

hej(
    [
        {
            "userName": "spelare-1",
            "code": 1,
        },
        {
            "userName": "spelare-3",
            "code": 3,
        },
        {
            "code": 2,
            "userName": "spelare-2",
        },

        {
            "userName": "spelare-4",
            "code": 4,

        },
        {
            "code": 5,
            "userName": "spelare-5",
        },

    ])



//         // {
//         //     "isHost": true,
//         //     "userName": "spelare-8308",
//         //     "code": 8308,
//         //     "index": 3
//         // },
//         // {
//         //     "isHost": true,
//         //     "userName": "spelare-8308",
//         //     "code": 1234,
//         //     "index": 4
//         // }


//     ])



// const hej2 = (params) => {
//     Object.keys(params).forEach((elem) => params[elem].hej = true)
// }

// hej2({ one: { hej: false }, two: { hej: false } })