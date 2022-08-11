import React, { useState } from 'react';
import { ElementContainer, getDisplayMessage } from '../utils';
import {
  Button,
  Intent,
  Spinner,
  InputGroup,
} from '@blueprintjs/core';
import "./MainPage.css";
import config from "../../config";


const MainPage = () => {
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isDisplayingResults, setIsDisplayingResults] = useState(false);
  const [results, setResults] = useState([]);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  
  const searchClickHandler = async () => {
    setIsLoadingResults(true);

    const promiseResponse = await fetch(
      config.endpoints.DISTANCE_REQUEST,
      {
        method: "POST",
        body: JSON.stringify({
          origin: originInput,
          destination: destinationInput
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    const {
      success,
      result: {distance},
      errorMessages: {originLength, destinationLength}
    } = await promiseResponse.json();
    
    setIsDisplayingResults(true);
    const newResults = [];
    if (success) {
      newResults.push(<p key="success">
        The distance between <b>{originInput}</b> and <b>{destinationInput}</b> is {distance} kilometers.
      </p>)
    } else {
      if (originLength !== 1 ) {
        newResults.push(<p key="origin-error">
          {getDisplayMessage(originLength)} <b>{originInput}</b>.
        </p>)
      } if (destinationLength !== 1) {
        newResults.push(<p key="destination-error">
          {getDisplayMessage(destinationLength)} <b>{destinationInput}</b>.
        </p>)
      }
    }
    setResults(newResults);
    setIsLoadingResults(false);
  };
  
  return (
    <div className='principal-container'>
      <ElementContainer
        child={
          <div className='element-row-container'>
              Enter two addresses to get their distance:
          </div>
        }
      />
      <ElementContainer
        child={
          <div className='element-column-container'>
            <div className='text-input-container'>
              <InputGroup
                placeholder="origin address..."
                onChange={event => {
                  setOriginInput(event.target.value)
                }}
              />
            </div>
            <div className='text-input-container'>
            <InputGroup
              placeholder="destination address..."
              onChange={event => {
                setDestinationInput(event.target.value)
              }}
            />
            </div>
          </div>
        }
      />
      <ElementContainer
        child={( isLoadingResults ? <Spinner></Spinner> :
          <Button
            intent={Intent.PRIMARY}
            style={{width: "30%"}}
            onClick={searchClickHandler}
          >
            Search
          </Button>
        )
      }
      />
      <ElementContainer
        child={( isDisplayingResults ?
          <ul>{results.map(el => <li key={`${results.indexOf(el)}`}>{el}</li>)}</ul>
          : null
        )}
      />  
    </div>
  )
}

export default MainPage;