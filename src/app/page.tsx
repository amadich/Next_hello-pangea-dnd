"use client"
import { useEffect, useState } from "react";
import Chars from "@/api/characters.json";
import {  DragDropContext , Droppable , Draggable } from "@hello-pangea/dnd";

export default function Home() {
  const [characters, updateCharacters] = useState(Chars);

  function handleOnDragEnd(result : any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    
    
  }

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
                          <p>
                            { name }
                          </p>
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
