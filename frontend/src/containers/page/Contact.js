import React, { useEffect, useState } from "react";
let Contact = () => {
    let [test, setTest] = useState({});
    let handle = (event, id) => {
        let testClone = test;
        testClone[id] = event.target.value;
        setTest(testClone);
    }
    useEffect(() => {
        let data = {
        }
        setTest(data)
    }, [])
    return (
        <>
            <input onChange={event => handle(event, 'test')} value={test.test} ></input>
            <div>{test.test}</div>
            <input onChange={event => handle(event, 'hello')} value={test.hello} ></input>
            <div>{test.hello}</div>
        </>
    )
}
// class Contact extends React.Component {
//     state = {
//         test: 'HELLO'
//     }
//     handle = (event) => {
//         let { test } = this.state;
//         test = event.target.value;
//         this.setState({ test: test })
//     }
//     render() {
//         return (
//             <>
//                 <input onChange={event => this.handle(event)} value={this.state.test} ></input>
//                 <div>{this.state.test}</div>
//             </>
//         )
//     }
// }
export default Contact;