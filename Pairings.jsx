// Pairings.jsx
import React from 'react';

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function pairUp(example) {
    let firstArray = [];
    let secondArray = [];
    let finalArray = [];

    for (let i = 0; i < example.length; i++) {
        if (i % 2 !== 0) {
            firstArray.push(example[i]);
        } else {
            secondArray.push(example[i]);
        }
    }

    for (let i = 0; i < firstArray.length; i++) {
        let littleArrays = [];
        littleArrays.push([firstArray[i], secondArray[i]]);
        finalArray.push(littleArrays);
    }

    return finalArray;
}

export function generatePairs(anArray) {
    let newArray = shuffleArray(anArray);
    let finalArray = pairUp(newArray);
    let oddOneOut;

    if (anArray.length % 2 !== 0) {
        oddOneOut = newArray.pop();
    }

    return {
        oddOneOut: oddOneOut,
        pairings: finalArray
    };
}

