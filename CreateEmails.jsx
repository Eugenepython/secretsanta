//CreateEmails.jsx
import React, { useEffect, useState } from 'react';
import { generatePairs } from './Pairings';
import { secretSanta } from './BetterPairings';
import { useEmailsLoaded } from './EmailsLoadedContext';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db, auth } from './Config';
import { useNavigate } from 'react-router-dom';



function createJsx(inputArray) {
    const jsxParagraphs = inputArray.map((item, index) => (
        <div>
            <p key={index}>{item}</p>
            <br></br>
        </div>
    ));
    return jsxParagraphs
}



function CreateEmails() {
    const { groupName, emails, emailsLoaded } = useEmailsLoaded();
    const [stageOne, setStageOne] = useState(false);
    const [thePairs, setThePairs] = useState(null);
    const navigate = useNavigate();
    const [showResult, setShowResult] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false); // State to track button click


    useEffect(() => {
        if (emails && emails.length > 1) {
            setStageOne(true);
            //console.log(emails)
        }
    }, [emailsLoaded]);






    const createEmail = async (y) => {
        setButtonClicked(true);
        const thePairs = y;
        const eachPairing = [];
        //console.log(thePairs)
        const emailsToSend = [];
        for (const pair of thePairs) {
            //console.log(pair.Giver.email)
            //console.log(pair.Giver.name)
            //console.log(pair.Reciever.name)
            const eachEmail = {
                to: pair.Giver.email,
                subject: 'Secret Santa for ' + groupName,
                html: `
                    <p style="font-size: 18px; color: #2d3d54;">Hi ${pair.Giver.name},</p>
                    <p style="font-size: 16px; color: #2d3d54;">
                        You have been paired with <strong>${pair.Reciever.name}</strong> for Secret Santa.
                    </p>
                    <p style="font-size: 16px; color: #2d3d54;">
                        Please buy a gift for them for Christmas.
                    </p>
                    <p style="font-size: 16px; color: #2d3d54;">Thanks,<br/>Santa</p>
                    <div style="border-bottom: 2px solid #2d3d54; margin-top: 15px;"></div>
                    <pre style="font-size: 14px; color: #2d3d54; margin: 15px;">
                     *
                    ***
                   *****
                  *******
                 *********
                ***********
               *************
              ***************
             *****************
            *******************
                    </pre>
                `,
            };





            emailsToSend.push(eachEmail);
            eachPairing.push({
                giver: pair.Giver.name,
                reciever: pair.Reciever.name,
            })
        }

        try {
            const docRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'pairings'), {
                groupName: groupName,
                pairings: eachPairing,
            });
            const response = await fetch('https://us-central1-santa-a56f6.cloudfunctions.net/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails: emailsToSend, eachPairing: eachPairing }),
            });
            //console.log(response);
            console.log(eachPairing)
            if (response.ok) {
                const data = await response.json();
                console.log('Emails sent successfully:', data);
                setShowResult(true)
            } else {
                console.error('Error sending emails:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending emails:', error);
        }
        setStageOne(false);
    };

    return (
        <div className='wholeThing'>

            <button className='funButton' onClick={() => navigate(`/yourpage`)}>Home</button>
            {!showResult && (
                <div>
                    <p>If you are sure, click below to send the emails out!</p>
                    <button className='funButton' onClick={() => createEmail(secretSanta(emails))} disabled={!stageOne || buttonClicked} >Send Email</button>
                </div>
            )}

            {showResult && (
                <div>
                    <h1>Success!</h1>
                    <p>Check your email for the secret santa pairings</p>
                </div>
            )}


        </div>
    );
}

export default CreateEmails;

