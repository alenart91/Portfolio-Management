import React , {useContext, useState} from 'react';
import { TokenContext, TokenConsumer } from '../context/TokenContext.js';


const Test = () => {

const myContext = useContext(TokenContext);
const [ myState , setMyState ] = useState(myContext);


console.log(myState);
  return (
    <p>hello</p>
  );
}

export default Test
