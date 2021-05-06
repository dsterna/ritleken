const hej = (params) => {
    let len = params.length - 1
    const hej = params.map((elem, i) =>
        params.map((_, ii) => i + ii > len ? ii + i - len - 1 : i + ii)
    )

    let round = 0

    hej.forEach(element => {
        console.log(element)
    });

}
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

hej(
    [
        {
            "userName": "spelare-1119",
            "isHost": false,
            "code": 1119,
            "index": 0
        },
        {
            "code": 2981,
            "isHost": false,
            "userName": "spelare-2981",
            "index": 1
        },
        {
            "userName": "spelare-8042",
            "code": 8042,
            "isHost": false,
            "index": 2
        },
        // {
        //     "isHost": true,
        //     "userName": "spelare-8308",
        //     "code": 8308,
        //     "index": 3
        // },
        // {
        //     "isHost": true,
        //     "userName": "spelare-8308",
        //     "code": 1234,
        //     "index": 4
        // }


    ])