"use client"
import { useEffect, useState } from "react";
import Chars from "@/api/characters.json";
import Chars2 from "@/api/characters2.json";
import {  DragDropContext , Droppable , Draggable } from "@hello-pangea/dnd";

export default function Home() {
  const [characters, updateCharacters] = useState(Chars);
  const [otherCharacters, setOtherCharacters] = useState(Chars2);

  const handleOnDragEnd = (result : any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Moving between lists
      const sourceList = source.droppableId === 'characters' ? characters : otherCharacters;
      const destinationList = destination.droppableId === 'characters' ? characters : otherCharacters;

      const [removed] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, removed);

      if (source.droppableId === 'characters') {
        updateCharacters([...sourceList]);
        setOtherCharacters([...destinationList]);
      } else {
        updateCharacters([...destinationList]);
        setOtherCharacters([...sourceList]);
      }
    } else {
      // Moving within the same list
      const list = source.droppableId === 'characters' ? characters : otherCharacters;
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);

      if (source.droppableId === 'characters') {
        updateCharacters([...list]);
      } else {
        setOtherCharacters([...list]);
      }
    }
  };

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Adventure Time Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
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
        </DragDropContext>
      </header>
     
    </div>
  );
}