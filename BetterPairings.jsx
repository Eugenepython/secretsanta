import React from 'react';

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example usage:


const hooters = ['adam', 'brian', 'colin', 'dave', 'egeuen']

export function secretSanta(y) {
    const shuffledArray = shuffleArray(y)
    let newObjectArray = []
    //console.log(shuffledArray)
    let newArray = []
    let lastNumber = (shuffledArray.length - 1)
    //console.log(lastNumber)
    newArray.push(shuffledArray[lastNumber])
    for (let i = 0; i < lastNumber; i++) {
        newArray.push(shuffledArray[i])
    }
    //console.log(shuffledArray)
    //console.log(newArray)
    for (let j = 0; j < shuffledArray.length; j++) {
        const newObject = {
            Giver: shuffledArray[j],
            Reciever: newArray[j],
        }
        newObjectArray.push(newObject)
    }
    return newObjectArray;
}