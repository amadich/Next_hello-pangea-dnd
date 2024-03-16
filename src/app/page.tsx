"use client"
import { useEffect, useState } from "react";
import Chars from "@/api/characters.json";
import Chars2 from "@/api/characters2.json";
import Chars3 from "@/api/characters3.json";
import {  DragDropContext , Droppable , Draggable } from "@hello-pangea/dnd";

export default function Home() {
  const [characters, updateCharacters] = useState(Chars);
  const [otherCharacters, setOtherCharacters] = useState(Chars2);
  const [thirdCharacters, setThirdCharacters] = useState(Chars3);

  const handleOnDragEnd = (result : any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceList = 
      source.droppableId === 'characters' ? characters :
      source.droppableId === 'otherCharacters' ? otherCharacters :
      thirdCharacters;

    const destinationList = 
      destination.droppableId === 'characters' ? characters :
      destination.droppableId === 'otherCharacters' ? otherCharacters :
      thirdCharacters;

    const [removed] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removed);

    if (source.droppableId === 'characters') {
      updateCharacters([...sourceList]);
    } else if (source.droppableId === 'otherCharacters') {
      setOtherCharacters([...sourceList]);
    } else {
      setThirdCharacters([...sourceList]);
    }
  };

  useEffect(() => {
    console.log(characters);
  }, [characters , otherCharacters , thirdCharacters]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Adventure Time Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* Existing Droppable components... */}
          <Droppable droppableId="characters" direction="horizontal">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, image}, index) => {
                  return (
                    <Draggable key={id} draggableId={id.toString()} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={image} alt={`${name} Thumb`} />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          {/* Make Sure you are add Other ID from your json file  */}
          {/*
           i do the import the same id but i change it inside the page.tsx 
           like : key={id} draggableId={`other-${id + 1}`} index={index+  1}
           this is not working if you have the same id in the same list becouse the id should be unique
              so i change the id to be unique by change all json file with Other one
           */}
          <Droppable droppableId="otherCharacters" direction="horizontal">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {otherCharacters.map(({id, name, image}, index) => {
                  return (
                    <Draggable key={id} draggableId={`other-${id}`} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={image} alt={`${name} Thumb`} />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          {/* */}
          <Droppable droppableId="thirdCharacters" direction="horizontal">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {thirdCharacters.map(({id, name, image}, index) => {
                  return (
                    <Draggable key={id} draggableId={`third-${id}`} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={image} alt={`${name} Thumb`} />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}